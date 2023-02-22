module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'react-app',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    // rules to match existing code quality standard
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    // remove these rules after react update
    'import/no-cycle': 0,
    'no-param-reassign': [2, { 'props': false }],
    'no-shadow': 0,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'prefer-destructuring': ['error', { 'object': true, 'array': false }],
    'jsx-quotes': [2, 'prefer-double'],
    'no-plusplus': 0,
    'semi': [2, "always"]
},
};
