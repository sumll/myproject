/*
 * @author: SumO
 * @create: 2022-04-07 19:28 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-04-09 15:49 PM
 * @desc:
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none',
        requireLast: true
      }
    }]
  }
}
