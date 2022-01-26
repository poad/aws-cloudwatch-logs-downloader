module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: false
    },
    project: './electron-src/tsconfig.json',
    useJSXTextNode: true
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: [
    'jest'
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  // add your custom rules here
  rules: {
    '@typescript-eslint/indent': [
      'error',
      2
    ],
    'spaced-comment': [
      'error',
      'always',
      { markers: ['/ <reference'] }
    ],
    'import/no-extraneous-dependencies': ['off', {
      devDependencies: true,
      optionalDependencies: false,
    }],
    'max-len': ['error', {'code': 200}],
    'prefer-promise-reject-errors': ['off'],
    'import/extensions': ['off'],
    'jsx-a11y/anchor-is-valid': ['off'],
    'no-return-assign': ['off'],
  }
}
