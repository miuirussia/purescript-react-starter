/* eslint-env node */
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import autoprefixer from 'autoprefixer';
import browserslist from 'browserslist';
import legacy from '@vitejs/plugin-legacy';
import inspect from 'vite-plugin-inspect';

import path from 'node:path';
import child_process from 'node:child_process';

const hash = child_process.execSync('git describe --always --dirty=-dirty', { encoding: 'utf8' }).replace(/\n$/, '');

const hashify = (name) => name.replace('[hash]', hash);

const targets = browserslist(browserslist.loadConfig({ path: process.cwd() }));

export default defineConfig(() => ({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      Main: path.resolve(__dirname, 'output/Main'),
      'Test.Main': path.resolve(__dirname, 'output/Test.Main'),
    },
  },
  plugins: [inspect(), splitVendorChunkPlugin(), legacy({ targets })],
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
