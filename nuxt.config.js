module.exports = {
  srcDir: 'src/',
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
      { rel: 'icon', type: 'image/x-icon', href: 'https://nuxtjs.org/favicon.ico' }
    ]
  },
  /*
  ** Build config
  */
  build: {
    vendor: [
      'axios',
      'element-ui'
    ],
    filenames: {
      vendor: 'vendor.[hash].js',
      app: 'hare.[chunkhash].js',
      css: 'hare.[chunkhash].css'
    }
  },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    '~assets/css/main.css'
  ],
  /*
  ** Add element-ui in our app, see plugins/element-ui.js file
  */
  plugins: ['~plugins/element-ui']
}
