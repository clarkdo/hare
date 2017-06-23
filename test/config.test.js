import test from 'ava'
import Nuxt from 'nuxt'
import { resolve } from 'path'

const port = 4000
let nuxt = null
let server = null

// Init nuxt.js and create server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = require(resolve(rootDir, 'nuxt.config.js'))
  config.rootDir = rootDir
  config.dev = false
  nuxt = new Nuxt(config)
  await nuxt.build()
  server = new nuxt.Server(nuxt)
  server.listen(port, 'localhost')
})

// test('Vendor', async t => {
//   const vendor = nuxt.options.build.vendor
//   t.true(!!~vendor.indexOf('axios'), 'axios added to config')
//   t.true(!!~vendor.indexOf('element-ui'), 'element-ui added to config')
//   t.true(!!~vendor.indexOf('vue-class-component'), 'vue-class-component added to config')
//   t.true(!!~vendor.indexOf('vuex-class'), 'vuex-class added to config')
//   t.true(!!~vendor.indexOf('lodash/debounce'), 'lodash/debounce added to config')
// })

// test('Plugin', async t => {
//   const plugins = nuxt.options.plugins
//   t.is(plugins[0], '~plugins/element-ui', 'element-ui plugin added to config')
//   t.is(plugins[1], '~plugins/i18n', 'i18n plugin added to config')
//   t.is(plugins[2], '~plugins/auth-header', 'auth-header plugin added to config')
// })

test('Middleware', async t => {
  const { html, redirected } = await nuxt.renderRoute('/', {req: {headers: {'accept-language': 'zh'}}})
  t.true(html.includes('<div id="__nuxt"></div>'), 'auth plugin works 1')
  t.true(!html.includes('前端项目模板'), 'auth plugin works 2')
  t.true(redirected.path === '/login', 'auth plugin works 3')
  t.true(redirected.status === 302, 'auth plugin works')
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', t => {
  server.close()
  nuxt.close()
})
