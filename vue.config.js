const pkg = require('./package.json')

module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    /* disable insertion of assets as data urls b'z' Phaser doesn't support it */
    const rules = ['images', 'media']
    rules.forEach((rule) => {
      config.module
        .rule(rule)
        .use('url-loader')
        .tap((options) => {
          options.limit = false
          return options
        })
    })

    // set doc title
    config.plugin('html').tap((args) => {
      args[0].title = pkg.html.title
      return args
    })
  },
}
