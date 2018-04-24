import test from 'ava'
import createNuxt from './helpers/create-nuxt'

// We keep the nuxt and server instance
// So we can close them at the end of the test
let nuxt = null
const headers = {
  'accept-language': 'zh'
}
// Init Nuxt.js and create a server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  nuxt = createNuxt()
  await nuxt.listen(3000, 'localhost')
})

test('Route /login', async t => {
  const { html } = await nuxt.renderRoute('/login', {req: {session: {}, headers}})
  t.true(html.includes('placeholder="请输入用户名"'))
  t.true(html.includes('placeholder="请输入密码"'))
})

test('Route /login with locale [en]', async t => {
  const { html } = await nuxt.renderRoute('/login', {req: {session: {}, headers: {'accept-language': 'en'}}})
  t.true(html.includes('placeholder="User Name"'))
  t.true(html.includes('placeholder="Password"'))
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', async t => {
  await nuxt.close()
})
