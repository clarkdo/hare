import test from 'ava'
import createNuxt from './helpers/create-nuxt'

let nuxt = null

// Init nuxt.js and create server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  nuxt = createNuxt()
  nuxt.listen(4000, 'localhost')
})

test('Vendor', async t => {
  const vendor = nuxt.options.build.vendor
  t.true(!!~vendor.indexOf('axios'), 'axios added to config')
  t.true(!!~vendor.indexOf('element-ui'), 'element-ui added to config')
  t.true(!!~vendor.indexOf('vue-class-component'), 'vue-class-component added to config')
  t.true(!!~vendor.indexOf('vuex-class'), 'vuex-class added to config')
  t.true(!!~vendor.indexOf('vue-clipboards'), 'vue-clipboards added to config')
})

test('Plugin', async t => {
  const plugins = nuxt.options.plugins
  t.is(plugins[0], '@/plugins/i18n', 'i18n plugin added to config')
  t.is(plugins[1], '@/plugins/element-ui', 'element-ui plugin added to config')
  t.is(plugins[2], '@/plugins/axios-defaults', 'axios defaults plugin added to config')
  t.is(plugins[3].src, '@/plugins/clipboard', 'clipboard plugin added to config')
  t.is(plugins[4].src, '@/plugins/error-handler', 'error handler plugin added to config')
})

test('Middleware', async t => {
  const { html, redirected } = await nuxt.renderRoute('/', {req: {headers: {'accept-language': 'zh'}}})
  t.true(html.includes('<div id="__nuxt"></div>'), 'auth plugin works 1')
  t.true(!html.includes('前端项目模板'), 'auth plugin works 2')
  t.true(redirected.path === '/login', 'auth plugin works 3')
  t.true(redirected.status === 302, 'auth plugin works')
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', t => {
  nuxt.close()
})
