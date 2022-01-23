module.exports = {
  plugins: ['@typescript-eslint', 'jsdoc', 'prettier'],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsdoc/recommended',
    'next',
    'next/core-web-vitals',
    'xo',
    'prettier',
  ],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'object-curly-spacing': ['error', 'always'],
    'indent': ['warn', 2, { SwitchCase: 1 }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'require-jsdoc': 'off',
    'new-cap': 'off',
    'prettier/prettier': ['error'],
  },
};
