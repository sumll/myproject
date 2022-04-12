/*
 * @author: SumO
 * @create: 2022-04-09 16:30 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-04-09 16:54 PM
 * @desc:
 */
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        // eslint-disable-next-line quotes
        prependData: `@import "~@/styles/variables.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagounews.com',
        changeOrigin: true // 把请求头中的 host 配置为 target
      },
      '/front': {
        target: 'http://edufront.lagounews.com',
        changeOrigin: true
      }
    }
  }
}