/* eslint-env node */
const path = require('path');

module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      [path.resolve('./eslint/vite-resolver')]: true,
      node: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier',
  ],
  plugins: ['react', 'import', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    'no-console': 1,
    'no-extra-semi': 2,
    'no-irregular-whitespace': 2,
    'no-unexpected-multiline': 2,
    'no-unreachable': 2,
    eqeqeq: [
      2,
      'always',
      {
        null: 'ignore',
      },
    ],
    'guard-for-in': 2,
    'no-alert': 2,
    'no-eval': 2,
    'no-implied-eval': 2,
    curly: 2,
    strict: 2,
    'no-undef': 2,
    'no-unused-vars': [
      2,
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    'arrow-body-style': [2, 'as-needed'],
    'no-trailing-spaces': 2,
    quotes: [2, 'single', 'avoid-escape'],
    semi: 2,
    'prefer-const': 2,
    'react/no-direct-mutation-state': 2,
    'react/no-unknown-property': 2,
    'react/react-in-jsx-scope': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        jsxBracketSameLine: false,
      },
    ],
  },
};
