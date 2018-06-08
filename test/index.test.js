import test from 'ava'
import moxios from 'moxios'
import createNuxt from './helpers/create-nuxt'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null
const req = {
  headers: {
    'accept-language': 'zh',
    Cookie: 'hare:sess=eyJjYXB0Y2hhIjoiR2hDTCIsImp3dCI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoZFdRaU9sc2lZbUZ6SWwwc0luVnpaWEpmYm1GdFpTSTZJbUZrYldsdUlpd2ljMk52Y0dVaU9sc2ljbVZoWkNKZExDSmxlSEFpT2prNU9UazVPVGs1T1RrNU9Ua3NJblZ6WlhKSlpDSTZJalF3TWpnNFlqZGxOV0pqWkRjM016TXdNVFZpWTJRM1ptUTNNakl3TURBeElpd2lZWFYwYUc5eWFYUnBaWE1pT2xzaVlXUnRhVzRpWFN3aWFuUnBJam9pTnpKbFl6TmpORE10TURNd1lTMDBNV1ZrTFdGaVlqSXRZamRoTWpZNU5UQTJPVEl6SWl3aVkyeHBaVzUwWDJsa0lqb2lZbUZ6TFdOc2FXVnVkQ0o5LnV3eXd6aU5ldEh5ZlNkaXFjSnQ2WFVHeTRWX1dZSFI0SzZsN09QMlZCOUkiLCJfZXhwaXJlIjoxNTI4NTYyNDA0NDkwLCJfbWF4QWdlIjo4NjQwMDAwMH0=; hare:sess.sig=0gGUUVRpb3VRbsj8ibRHRXlie30'
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
  moxios.stubRequest('/hpi/auth/whois', {
    status: 200,
    data: {
      authenticated: true,
      userName: 'admin',
      displayName: 'Haaw D. Minh',
      tz: 'Asia/Hong_Kong',
      locale: 'zh-HK'
    }
  })
  moxios.stubRequest('/hpi/auth/validate', {
    status: 200,
    data: {
      authenticated: true
    }
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
