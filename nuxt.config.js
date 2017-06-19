module.exports = {
  srcDir: 'client/',
  dev: (process.env.NODE_ENV !== 'production'),
  /*
  ** Router config
  */
  router: {
    middleware: [
      'check-auth'
    ]
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
      config.resolve.alias['class-component'] = '~plugins/class-component'
      // const PostCompile = require('post-compile-webpack-plugin')
      // dev && isClient && config.plugins.push(new PostCompile(() => {
      //   if (process.env.NODE_ENV !== 'production') {
      //     let host = process.env.HOST || '127.0.0.1'
      //     let port = process.env.PORT || '3000'
      //     require('opn')(`http://${host}:${port}`)
      //   }
      // }))
    },
    vendor: [
      'axios',
      'element-ui',
      'vue-class-component',
      'vuex-class',
      'vue-i18n',
      'negotiator',
      'lodash/debounce'
    ],
    extractCSS: true,
    filenames: {
      vendor: 'vendor.[hash:12].js',
      app: 'hare.[chunkhash:12].js',
      css: 'hare.[contenthash:12].css'
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
    'normalize.css/normalize.css',
    'element-ui/lib/theme-default/index.css',
    {src: '~assets/css/main.scss', lang: 'scss'}
  ],
  /*
  ** Add element-ui in our app, see plugins/element-ui.js file
  */
  plugins: [
    '~plugins/element-ui',
    '~plugins/i18n',
    {src: '~plugins/auth-header', ssr: false}
  ],

  // koa-proxies for dev, options reference https://github.com/nodejitsu/node-http-proxy#options
  development: {
    proxies: [
      /* {
        path: '/hpi/',
        target: 'http://localhost:3000/',
        logs: true,
        prependPath: false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/octocat(\/|\/\w+)?$/, '/vagusx')
      } */
    ]
  }
}
