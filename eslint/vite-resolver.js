/* eslint-env node */
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const resolve = require('resolve');
const log = require('debug')('eslint-plugin-import:resolver:vite');

const resolvePath = path.resolve('./resolve.js');

exports.interfaceVersion = 2;
exports.resolve = function (source, file) {
  log('Resolving:', source, 'from:', file);

  const resolveConfig = require(resolvePath)(p => path.resolve(path.dirname(resolvePath), p));
  log(resolveConfig);
  try {
    const aliasPath = resolveConfig[source];
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
