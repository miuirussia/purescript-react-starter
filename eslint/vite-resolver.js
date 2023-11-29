/* eslint-env node */
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const resolve = require('resolve');
const log = require('debug')('eslint-plugin-import:resolver:vite');

const viteConfigPath = path.resolve('./vite.config.mjs');
const hash = crypto
  .createHash('md5')
  .update(fs.readFileSync(viteConfigPath).toString(), 'utf-8')
  .digest('hex')
  .toString()
  .substring(0, 10);

const getViteConfig = () => {
  const tempConfig = path.resolve(`./node_modules/.eslint/vite.config.${hash}.js`);
  if (!fs.existsSync(tempConfig)) {
    fs.mkdirSync(path.dirname(tempConfig), { recursive: true });
    require('esbuild').buildSync({
      entryPoints: [viteConfigPath],
      platform: 'node',
      bundle: true,
      packages: 'external',
      outfile: tempConfig,
    });

    const configText = fs.readFileSync(tempConfig).toString();
    fs.writeFileSync(tempConfig, configText.replace(/__dirname/g, JSON.stringify(path.dirname(viteConfigPath))));
  }

  return require(tempConfig).default();
};

exports.interfaceVersion = 2;
exports.resolve = function (source, file) {
  log('Resolving:', source, 'from:', file);

  const viteConfig = getViteConfig();
  try {
    const aliasPath = viteConfig.resolve.alias[source];
    if (aliasPath) {
      const modulePath = resolve.sync(aliasPath, {
        extensions: ['.mjs', '.js', '.json', '.node'],
        basedir: path.dirname(path.resolve(file)),
      });

      log('Resolved to:', modulePath);

      return {
        found: true,
        path: modulePath,
      };
    } else {
      return { found: false, path: null };
    }
  } catch (_) {
    return { found: false, path: null };
  }
};
