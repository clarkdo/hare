const Koa = require('koa')
const Nuxt = require('nuxt')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '3000'
const body = require('koa-body')// body parser
const compose = require('koa-compose')// middleware composer
const compress = require('koa-compress')// HTTP compression
const session = require('koa-session')// session for flash messages
const debug = require('debug')('app')// small debugging utility

const app = new Koa()

const config = require('../nuxt.config.js')
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
  await next()
  await nuxt.render(ctx.req, ctx.res)
})

// return response time in X-Response-Time header
app.use(async function responseTime (ctx, next) {
  const t1 = Date.now()
  await next()
  const t2 = Date.now()
  ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms')
})

// HTTP compression
app.use(compress({}))

// only search-index www subdomain
app.use(async function robots (ctx, next) {
  await next()
  if (ctx.hostname.slice(0, 3) !== 'www') ctx.response.set('X-Robots-Tag', 'noindex, nofollow')
})

// parse request body into ctx.request.body
app.use(body())

// session for flash messages (uses signed session cookies, with no server storage)
app.use(session(app))// note koa-session@3.4.0 is v1 middleware which generates deprecation notice

// sometimes useful to be able to track each request...
app.use(async function (ctx, next) {
  debug(ctx.method + ' ' + ctx.url)
  await next()
})

// select sub-app (admin/api) according to host subdomain (could also be by analysing request.url);
// separate sub-apps can be used for modularisation of a large system, for different login/access
// rights for public/protected elements, and also for different functionality between api & web
// pages (content negotiation, error handling, handlebars templating, etc).

app.use(async function subApp (ctx, next) {
  // use subdomain to determine which app to serve: www. as default, or admin. or api
  ctx.state.subapp = ctx.hostname.split('.')[0]// subdomain = part before first '.' of hostname
  // note: could use root part of path instead of sub-domains e.g. ctx.request.url.split('/')[1]
  await next()
})

app.use(async function composeSubapp (ctx) { // note no 'next' after composed subapp
  switch (ctx.state.subapp) {
    case 'api': await compose(require('./server/api/app-api.js').middleware)(ctx); break
  }
})

app.listen(port, host)
console.info(`${process.version} listening on port ${host}:${port} (${app.env})`)

module.exports = app
