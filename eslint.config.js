import { ESLint } from 'eslint';

export default new ESLint({
  overrideConfig: {
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:cypress/recommended',
      'prettier',
    ],
    plugins: ['cypress', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    env: {
      'cypress/globals': true,
    },
  },
});
