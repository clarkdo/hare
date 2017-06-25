import test from 'ava'
import moxios from 'moxios'
import createNuxt from './helpers/create-nuxt'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null
let server = null
const req = {
  headers: {
    'accept-language': 'zh'
  },
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

// Init nuxt.js and create server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  // mock axios
  moxios.install()
  moxios.stubRequest('/hpi/captcha', {
    status: 200,
    data: '验证码Mock'
  })
  nuxt = createNuxt()
  server = new nuxt.Server(nuxt)
  server.listen(4000, 'localhost')
})

// Example of testing only generated html
test('Route /', async t => {
  const { html } = await nuxt.renderRoute('/', Object.assign({}, {req}))
  t.true(html.includes('Application boilerplate based on Vue.js 2.x, Koa 2.x, Element-UI and Nuxt.js'))
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
