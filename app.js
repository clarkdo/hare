const Koa = require('koa')
const app = new Koa()
const Nuxt = require('nuxt')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '3000'

const config = require('./nuxt.config.js')
config.dev = !(app.env === 'production')

const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}

app.use(async (ctx, next) => {
  ctx.status = 200 // koa defaults to 404 when it sees that status is unset
  await nuxt.render(ctx.req, ctx.res)
})

app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
