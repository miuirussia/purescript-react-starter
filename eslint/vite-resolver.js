/* eslint-env node */
const path = require('node:path');
const resolve = require('resolve');
const log = require('debug')('eslint-plugin-import:resolver:vite');

const resolvePath = path.resolve('./resolve.js');

const unsafeResolvePath = (p, file) => {
  const modulePath = resolve.sync(p, {
    extensions: ['.mjs', '.js', '.json', '.node'],
    basedir: path.dirname(path.resolve(file)),
  });

  log('Resolved to:', modulePath);

  return {
    found: true,
    path: modulePath,
  };
};

exports.interfaceVersion = 2;
exports.resolve = function (source, file) {
  log('Resolving:', source, 'from:', file);

  const resolveConfig = require(resolvePath)((p) => path.resolve(path.dirname(resolvePath), p));
  try {
    const aliasPath = resolveConfig[source];
    if (aliasPath) {
      return unsafeResolvePath(aliasPath, file);
    } else if (source.startsWith('@/')) {
      const aliasPath = resolveConfig['@/'];
      if (aliasPath) {
        return unsafeResolvePath(`${aliasPath}${source.substring(2)}`, file);
      } else {
        return { found: false, path: null };
      }
    } else {
      return { found: false, path: null };
    }
  } catch (_) {
    return { found: false, path: null };
  }
};
