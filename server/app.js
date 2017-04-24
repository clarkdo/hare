import Koa from 'koa'
import Nuxt from 'nuxt'
import bunyan from 'bunyan'
import koaLogger from 'koa-bunyan'
import body from 'koa-body'// body parser
import compose from 'koa-compose'// middleware composer
import compress from 'koa-compress'// HTTP compression
import session from 'koa-session'// session for flash messages
import api from './api'
import constants from './utils/constants'
import config from '../nuxt.config.js'
import debugModule from 'debug'// small debugging utility

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '3000'
const debug = debugModule('app')
const app = new Koa()

config.dev = !(app.env === 'production')
app.keys = ['hare-server']

// logging
const access = {
  type: 'rotating-file',
  path: '/var/tmp/log/hare-access.log',
  level: 'trace',
  period: '1d',
  count: 4
}
const error = {
  type: 'rotating-file',
  path: '/var/tmp/log/hare-error.log',
  level: 'error',
  period: '1d',
  count: 4
}
const logger = bunyan.createLogger({
  name: 'hare',
  streams: [access, error]
})
app.use(koaLogger(logger, {}))

// select sub-app (admin/api) according to host subdomain (could also be by analysing request.url);
// separate sub-apps can be used for modularisation of a large system, for different login/access
// rights for public/protected elements, and also for different functionality between api & web
// pages (content negotiation, error handling, handlebars templating, etc).

app.use(async function subApp (ctx, next) {
  // use subdomain to determine which app to serve: www. as default, or admin. or api
  ctx.state.subapp = ctx.url.split('/')[1]// subdomain = part after first '/' of hostname
  // note: could use root part of path instead of sub-domains e.g. ctx.request.url.split('/')[1]
  await next()
})

// session for flash messages (uses signed session cookies, with no server storage)
app.use(session(app))// note koa-session@3.4.0 is v1 middleware which generates deprecation notice

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
  await next()
  if (ctx.state.subapp !== constants.API) {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    ctx.req.session = ctx.session
    await nuxt.render(ctx.req, ctx.res)
  }
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

// sometimes useful to be able to track each request...
app.use(async function (ctx, next) {
  debug(ctx.method + ' ' + ctx.url)
  await next()
})

// note no 'next' after composed subapp, this must be the last middleware
app.use(async function composeSubapp (ctx, next) {
  switch (ctx.state.subapp) {
    case constants.API: await compose(api.middleware)(ctx); break
  }
})

app.listen(port, host)
console.info(`${process.version} listening on port ${host}:${port} (${app.env})`)

export default app
