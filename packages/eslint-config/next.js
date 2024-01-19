/** @type {import("eslint").Linter.Config} */
const config = {
  plugins: ['@typescript-eslint'],
  extends: ['next/core-web-vitals', 'eslint-config-turbo'],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    '@typescript-eslint/array-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',

    'turbo/no-undeclared-env-vars': 'off',

    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: { attributes: false },
      },
    ],
  },
};

module.exports = config;
