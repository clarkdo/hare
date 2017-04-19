import test from 'ava'
import Nuxt from 'nuxt'
import moxios from 'moxios'
import { resolve } from 'path'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null
let server = null

// Init Nuxt.js and create a server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  config.srcDir = resolve(__dirname, '../client')
  nuxt = new Nuxt(config)
  await nuxt.build()
  server = new nuxt.Server(nuxt)
  server.listen(4000, 'localhost')
  // mock axios
  moxios.install()
  moxios.stubRequest('/api/captcha', {
    status: 200,
    data: '验证码Mock'
  })
})

// Example of testing only generated html
test('Route / exits and render index HTML', async t => {
  let context = {
    req: {
      session: {
        authUser: {
          username: 'Clark',
          email: 'clark.duxin@gmail.com'
        }
      }
    }
  }
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('前端项目模板'))
})

// Example of testing via dom checking
test('Route / exits and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.el-card')
  t.not(element, null)
  t.is(element.className, 'el-card')
  // t.is(element.textContent, 'Hello world!')
  // t.is(window.getComputedStyle(element).color, 'red')
})

test('Route / exits and render HTML', async t => {
  let context = {
    req: {
      session: {
        authUser: {
          username: 'Clark',
          email: 'clark.duxin@gmail.com'
        }
      }
    }
  }
  const { html } = await nuxt.renderRoute('/about', context)
  t.true(html.includes('<h1>About Page</h1>'))
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', t => {
  moxios.uninstall()
  server.close()
  nuxt.close()
})
