import test from 'ava'
import createNuxt from './helpers/create-nuxt'

let nuxt = null
/*
const req = {
  headers: {
    'accept-language': 'zh',
    Cookie: 'hare:sess=eyJjYXB0Y2hhIjoiR2hDTCIsImp3dCI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoZFdRaU9sc2lZbUZ6SWwwc0luVnpaWEpmYm1GdFpTSTZJbUZrYldsdUlpd2ljMk52Y0dVaU9sc2ljbVZoWkNKZExDSmxlSEFpT2prNU9UazVPVGs1T1RrNU9Ua3NJblZ6WlhKSlpDSTZJalF3TWpnNFlqZGxOV0pqWkRjM016TXdNVFZpWTJRM1ptUTNNakl3TURBeElpd2lZWFYwYUc5eWFYUnBaWE1pT2xzaVlXUnRhVzRpWFN3aWFuUnBJam9pTnpKbFl6TmpORE10TURNd1lTMDBNV1ZrTFdGaVlqSXRZamRoTWpZNU5UQTJPVEl6SWl3aVkyeHBaVzUwWDJsa0lqb2lZbUZ6TFdOc2FXVnVkQ0o5LnV3eXd6aU5ldEh5ZlNkaXFjSnQ2WFVHeTRWX1dZSFI0SzZsN09QMlZCOUkiLCJfZXhwaXJlIjoxNTI4NTYyNDA0NDkwLCJfbWF4QWdlIjo4NjQwMDAwMH0=; hare:sess.sig=0gGUUVRpb3VRbsj8ibRHRXlie30'
  }
}
*/

// Init nuxt.js and create server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  nuxt = createNuxt()
  await nuxt.listen(3000, 'localhost')
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
  t.is(plugins[1], '@/plugins/i18n', 'i18n plugin added to config')
  t.is(plugins[2], '@/plugins/element-ui', 'element-ui plugin added to config')
  t.is(plugins[3], '@/plugins/axios', '@nuxtjs/axios module adjustments present')
  t.is(plugins[4].src, '@/plugins/clipboard', 'clipboard plugin added to config')
  t.is(plugins[5].src, '@/plugins/error-handler', 'error handler plugin added to config')
  t.is(plugins[6].src, '@/plugins/persistedstate', 'Vuex persistedstate plugin added to config')
})

test('Modules', async t => {
  const modules = nuxt.options.modules
  // For some reason plugins[1] is '@/plugins/i18n', yet it should be at index 0
  // Whereas here, modules[0] in nuxt.config.js is indeed at index 0.
  t.is(modules[0], '@nuxtjs/axios', 'Axios Nuxt Module')
  t.is(modules[1][0], '@nuxtjs/dotenv', 'DotEnv Nuxt Module')
  t.is(modules[1][1].only[0], 'HOST', 'DotEnv only setting, with HOST option as the first')
})

/*
test('Middleware', async t => {
  const { html, redirected } = await nuxt.renderRoute('/', Object.assign({}, {req}))
  t.true(html.includes('<div id="__nuxt"></div>'), 'auth plugin works 1')
  t.true(!html.includes('前端项目模板'), 'auth plugin works 2')
  t.true(redirected.path === '/login', 'auth plugin works 3')
  t.true(redirected.status === 302, 'auth plugin works')
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', async t => {
  await nuxt.close()
})
*/
