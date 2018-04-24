import test from 'ava'
import moxios from 'moxios'
import createNuxt from './helpers/create-nuxt'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null
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

// TODO: refactor test
// Init nuxt.js and create server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  // mock axios
  moxios.install()
  moxios.stubRequest('/hpi/auth/captcha', {
    status: 200,
    data: '验证码Mock'
  })
  nuxt = createNuxt()
  await nuxt.listen(3000, 'localhost')
})

// Example of testing only generated html
test.skip('Route /', async t => {
  const { html } = await nuxt.renderRoute('/', Object.assign({}, {req}))
  t.true(html.includes('Application boilerplate based on Vue.js 2.x, Koa 2.x, Element-UI, Axios, Vue i18n and Nuxt.js'))
})

test.skip('Route /about', async t => {
  const { html } = await nuxt.renderRoute('/about', Object.assign({}, {req}))
  t.true(html.includes('<h1>About Page</h1>'))
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', async t => {
  moxios.uninstall()
  await nuxt.close()
})
