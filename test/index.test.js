import test from 'ava'
import Nuxt from 'nuxt'
import moxios from 'moxios'
import { resolve } from 'path'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null
let server = null
const req = {
  session: {
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJhdWQiOlsidGF0Il0sInVzZXJfbmFtZSI6IlRlc3RlciIsI' +
        'nNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDk0MjY4ODY0LCJ1c2' +
        'VySWQiOiIxIiwiYXV0aG9yaXRpZXMiOlsiYWRtaW4iXSwianR' +
        'pIjoiN2FkN2VjYzUtNTdmNy00MmZlLThmZmQtYjUxMTJkNTZm' +
        'M2NhIiwiY2xpZW50X2lkIjoidGF0LWNsaWVudCJ9.' +
        'ovWxqcBptquNR5QUBz1it2Z3Fr0OxMvWsnXHIHTcliI'
  }
}
// Init Nuxt.js and create a server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = require(resolve(rootDir, 'nuxt.config.js'))
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  // delete config.router.middleware
  nuxt = new Nuxt(config)
  await nuxt.build()
  server = new nuxt.Server(nuxt)
  server.listen(4000, 'localhost')
  // mock axios
  moxios.install()
  moxios.stubRequest('/hpi/captcha', {
    status: 200,
    data: '验证码Mock'
  })
})

// Example of testing only generated html
test('Route /', async t => {
  const { html } = await nuxt.renderRoute('/', Object.assign({}, {req}))
  t.true(html.includes('前端项目模板'))
})

test('Route /about', async t => {
  const { html } = await nuxt.renderRoute('/about', Object.assign({}, {req}))
  t.true(html.includes('<h1>About Page</h1>'))
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', t => {
  moxios.uninstall()
  server.close()
  nuxt.close()
})
