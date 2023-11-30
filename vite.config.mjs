/* eslint-env node */
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import autoprefixer from 'autoprefixer';
import browserslist from 'browserslist';
import legacy from '@vitejs/plugin-legacy';
import inspect from 'vite-plugin-inspect';

import path from 'node:path';
import child_process from 'node:child_process';
import resolveConfig from './resolve.js';

const hash = child_process.execSync('git describe --always --dirty=-dirty', { encoding: 'utf8' }).replace(/\n$/, '');

const hashify = (name) => name.replace('[hash]', hash);

const targets = browserslist(browserslist.loadConfig({ path: process.cwd() }));

const r = /(App_DynamicImport\.dynamicImport\(([A-Z]\w*)\.([A-Za-z_]\w*)\))/g;

const dynamicImport = () => ({
  name: 'dynamic-imports',
  transform(src, currentFile) {
    const moduleImportsToRemove = ['App.DynamicImport'];
    const withDynamicImports = src.replaceAll(r, (match, g, moduleName, componentName) => {
      moduleImportsToRemove.push(moduleName);
      const modulePath = `../${moduleName.replaceAll(/_/g, '.')}/index.js`;
      return `(() => import("${modulePath}").then(r => r.${componentName}))`;
    });
    const withStaticImportsRemoved = moduleImportsToRemove.reduce(
      (transformed, moduleName) =>
        transformed.replaceAll(new RegExp(`import \\* as ${moduleName} from (.*?);`, 'g'), ''),
      withDynamicImports,
    );
    const checkIfModulesAreIsolated =
      // This part matches modules that are being accessed with '.'
      // Say your module name in JS is My_Module. This checks that `My_Module.` never occures
      // `My_Module.myFn` is not allowed in lazy loading to have properly isolated modules
      moduleImportsToRemove.flatMap((moduleName) =>
        withStaticImportsRemoved.includes(`${moduleName}.`) ? [moduleName] : [],
      );

    checkIfModulesAreIsolated.map((moduleName) => this.error(`${currentFile} contains references to ${moduleName}.`));

    return { code: withStaticImportsRemoved };
  },
});

export default defineConfig(() => ({
  resolve: {
    alias: resolveConfig((p) => path.resolve(__dirname, p)),
  },
  plugins: [inspect(), dynamicImport(), splitVendorChunkPlugin(), legacy({ targets })],
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
  build: {
    sourcemap: 'hidden',
    manifest: true,
    chunkSizeWarningLimit: Infinity,
    rollupOptions: {
      output: {
        entryFileNames: hashify('assets/[name].[hash].js'),
        assetFileNames: hashify('assets/[name].[hash].[ext]'),
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:9999',
    },
  },
}));
