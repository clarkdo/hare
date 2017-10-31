import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import axios from 'axios'
import bunyan from 'bunyan'
import mkdirp from 'mkdirp'
import koaBunyan from 'koa-bunyan'
import koaLogger from 'koa-bunyan-logger'
import koaConnect from 'koa-connect'
import body from 'koa-body' // body parser
import compose from 'koa-compose' // middleware composer
import compress from 'koa-compress' // HTTP compression
import session from 'koa-session' // session for flash messages
import api from './api'
import consts from './utils/consts'
import config from '../nuxt.config.js'
import chalk from 'chalk'
import debugModule from 'debug' // small debugging utility
import proxy from 'koa-proxies'

// Start nuxt.js
async function start () {
  const isWin = /^win/.test(process.platform)
  const host = consts.HOST
  const port = consts.PORT
  const debug = debugModule('app')
  const app = new Koa()

  app.keys = ['hare-server']
  config.dev = !(app.env === 'production')
  axios.defaults.baseURL = `http://127.0.0.1:${port}`

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
    streams: [access, error]
  })
  app.use(koaBunyan(logger, { level: 'info' }))
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
  nuxt.showOpen = () => {
    const _host = host === '0.0.0.0' ? 'localhost' : host
    // eslint-disable-next-line no-console
    console.log('\n' + chalk.bgGreen.black(' OPEN ') + chalk.green(` http://${_host}:${port}\n`))
  }
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
    debug(ctx.method + ' ' + ctx.url)
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
}

start()
