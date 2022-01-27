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
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'object-curly-spacing': ['error', 'always'],
    'indent': ['warn', 2, { SwitchCase: 1 }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'require-jsdoc': 'off',
    'new-cap': 'off',
    'prettier/prettier': ['error'],
    'no-undef': 'off',
    'jsdoc/no-undefined-types': 'off',
    // 'comma-dangle': ['error', 'always-multiline'],
  },
};
