module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // your custom rules
  },
};