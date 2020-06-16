module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {},
  env: {
    browser: true
  },
  extends: [
    'standard',
    'standard-jsx',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/standard',
    'prettier/react',
    'prettier/@typescript-eslint'
  ],
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'prefer-const': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
