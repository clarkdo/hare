const webpack = require('webpack')
module.exports = {
  srcDir: 'client/',
  buildDir: 'dist/client/',
  rootDir: './',
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
    extractCSS: true,
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }]
      ]
    },
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : 'hare.[chunkhash:12].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : 'hare.chunk.[chunkhash:12].js',
      css: ({ isDev }) => isDev ? '[name].css' : 'hare.[contenthash:12].css'
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh|en|fr/)
    ]
  },
  /*
  ** Customize the Progress Bar
  */
  loading: {
    color: '#60bbff'
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
    'element-ui/lib/theme-chalk/index.css',
    {src: '@/assets/styles/main.scss', lang: 'scss'}
  ],
  /*
  ** Add element-ui in our app, see plugins/element-ui.js file
  */
  plugins: [
    '@/plugins/i18n',
    '@/plugins/element-ui',
    {src: '@/plugins/clipboard', ssr: false},
    {src: '@/plugins/error-handler', ssr: false}
  ],
  modules: [
    '@nuxtjs/webpackmonitor',
    '@nuxtjs/axios'
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
        rewrite: path => path.replace(/^\/pages(\/|\/\w+)?$/, '/service')
      } */
    ]
  }
}
