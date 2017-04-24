module.exports = {
  srcDir: 'client/',
  dev: (process.env.NODE_ENV !== 'production'),
  /*
  ** Router config
  */
  router: {
    middleware: 'check-auth'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Hare 2.0',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Build config
  */
  build: {
    publicPath: '/hare/',
    babel: {
      plugins: ['transform-decorators-legacy', 'transform-class-properties']
    },
    extend (config, { dev, isClient }) {
      const PostCompile = require('post-compile-webpack-plugin')
      config.resolve.alias['class-component'] = '~plugins/class-component'
      dev && isClient && config.plugins.push(new PostCompile(() => {
        if (process.env.NODE_ENV !== 'production') {
          let host = process.env.HOST || '127.0.0.1'
          let port = process.env.PORT || '3000'
          require('opn')(`http://${host}:${port}`)
        }
      }))
    },
    vendor: [
      'axios',
      'element-ui',
      'vue-class-component'
    ],
    filenames: {
      vendor: 'vendor.[hash].js',
      app: 'hare.[chunkhash].js',
      css: 'hare.[chunkhash].css'
    },
    plugins: []
  },
  /*
  ** Generate config
  */
  generate: {
    dir: '.generated'
  },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    {src: '~assets/css/main.scss', lang: 'scss'}
  ],
  /*
  ** Add element-ui in our app, see plugins/element-ui.js file
  */
  plugins: ['~plugins/element-ui']
}
