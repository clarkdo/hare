const Koa = require('koa')
const { Nuxt, Builder } = require('nuxt')
const bunyan = require('bunyan')
const mkdirp = require('mkdirp')
const koaBunyan = require('koa-bunyan')
const koaLogger = require('koa-bunyan-logger')
const koaConnect = require('koa-connect')
const body = require('koa-body') // body parser
const compose = require('koa-compose') // middleware composer
const compress = require('koa-compress') // HTTP compression
const session = require('koa-session') // session for flash messages
const api = require('./api')
const consts = require('./utils/consts')
const config = require('../nuxt.config.js')
const chalk = require('chalk')
const proxy = require('koa-proxies')

// Start nuxt.js
async function start () {
  const isWin = /^win/.test(process.platform)
  const host = consts.HOST
  const port = consts.PORT
  const app = new Koa()

  app.keys = ['hare-server']
  config.dev = !(app.env === 'production')

  // logging
  let logDir = process.env.LOG_DIR || (isWin ? 'C:\\\\log' : '/var/tmp/log')
  mkdirp.sync(logDir)
  logDir = logDir.replace(/(\\|\/)+$/, '') + (isWin ? '\\\\' : '/')

  const access = {
    type: 'rotating-file',
    path: `${logDir}hare-access.log`,
    level: config.dev ? 'debug' : 'info',
    period: '1d',
    count: 4
  }
  const error = {
    type: 'rotating-file',
    path: `${logDir}hare-error.log`,
    level: 'error',
    period: '1d',
    count: 4
  }
  const logger = bunyan.createLogger({
    name: 'hare',
    streams: [
      access,
      error
    ]
  })
  app.use(koaBunyan(logger, {
    level: config.dev ? 'debug' : 'info'
  }))
  app.use(koaLogger(logger))

  // select sub-app (admin/api) according to host subdomain (could also be by analysing request.url);
  // separate sub-apps can be used for modularisation of a large system, for different login/access
  // rights for public/protected elements, and also for different functionality between api & web
  // pages (content negotiation, error handling, handlebars templating, etc).

  app.use(async function subApp (ctx, next) {
    // use subdomain to determine which app to serve: www. as default, or admin. or api
    ctx.state.subapp = ctx.url.split('/')[1] // subdomain = part after first '/' of hostname
    // note: could use root part of path instead of sub-domains e.g. ctx.request.url.split('/')[1]
    await next()
  })

  const nuxt = new Nuxt(config)
  // Build only in dev mode
  if (config.dev) {
    const devConfigs = config.development
    if (devConfigs && devConfigs.proxies) {
      for (let proxyItem of devConfigs.proxies) {
        console.log(
          `Active Proxy: path[${proxyItem.path}] target[${proxyItem.target}]`
        )
        app.use(proxy(proxyItem.path, proxyItem))
      }
    }
    await new Builder(nuxt).build()
  }
  const nuxtRender = koaConnect(nuxt.render)

  app.use(async (ctx, next) => {
    await next()
    if (ctx.state.subapp !== consts.API) {
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset
      ctx.req.session = ctx.session
      await nuxtRender(ctx)
    }
  })

  // Add valid and beforeSave hooks here to ensure session is valid #TODO
  const SESSION_CONFIG = {
    key: consts.SESS_KEY
  }

  // session for flash messages (uses signed session cookies, with no server storage)
  app.use(session(SESSION_CONFIG, app))

  // return response time in X-Response-Time header
  app.use(async function responseTime (ctx, next) {
    const t1 = Date.now()
    await next()
    const t2 = Date.now()
    ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms')

    /**
     * In case you wanna see what you received from postRequest, or other endpoints.
     */
    const logRequestUrlResponse = '/hpi/auth/login'
    const logHpiAuthLogin = ctx.request.url === logRequestUrlResponse
    if (logHpiAuthLogin) {
      const debugObj = JSON.parse(JSON.stringify(ctx))
      const body = JSON.parse(JSON.stringify(ctx.body || null))
      const responseHeaders = JSON.parse(JSON.stringify(ctx.response.header))
      const requestHeaders = JSON.parse(JSON.stringify(ctx.request.header))
      console.log(`Received for ${logRequestUrlResponse}`, {ctx: debugObj, body, responseHeaders, requestHeaders})
    }
    const isHpi = /^\/hpi\//.test(ctx.request.url)
    const logHpi = false
    if (isHpi && logHpi && logHpiAuthLogin === false) {
      const headers = Object.assign({}, JSON.parse(JSON.stringify(ctx.request.header)))
      console.log(`Request headers for ${ctx.url}`, headers)
    }
  })

  // HTTP compression
  app.use(compress({}))

  // only search-index www subdomain
  app.use(async function robots (ctx, next) {
    await next()
    if (ctx.hostname.slice(0, 3) !== 'www') {
      ctx.response.set('X-Robots-Tag', 'noindex, nofollow')
    }
  })

  // parse request body into ctx.request.body
  app.use(body())

  // sometimes useful to be able to track each request...
  app.use(async function (ctx, next) {
    await next()
  })

  // note no 'next' after composed subapp, this must be the last middleware
  app.use(async function composeSubapp (ctx, next) {
    switch (ctx.state.subapp) {
      case consts.API:
        await compose(api.middleware)(ctx)
        break
    }
  })

  app.listen(port, host)
  const _host = host === '0.0.0.0' ? 'localhost' : host
  // eslint-disable-next-line no-console
  console.log('\n' + chalk.bgGreen.black(' OPEN ') + chalk.green(` http://${_host}:${port}\n`))
}

start()
