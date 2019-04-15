const body = require('koa-body') // body parser
const compress = require('koa-compress') // HTTP compression
const session = require('koa-session') // session for flash messages

const consts = require('../utils/consts')
const content = require('./content')
const examples = require('./errors')
const responseTime = require('./response-time')

module.exports = (app) => {
  // Add valid and beforeSave hooks here to ensure session is valid #TODO
  const SESSION_CONFIG = {
    key: consts.SESS_KEY
  }

  // session for flash messages (uses signed session cookies, with no server storage)
  app.use(session(SESSION_CONFIG, app))

  app.use(responseTime)
  // HTTP compression
  app.use(compress({}))
  // only search-index www subdomain
  app.use(async function robots(ctx, next) {
    await next()
    if (ctx.hostname.slice(0, 3) !== 'www') {
      ctx.response.set('X-Robots-Tag', 'noindex, nofollow')
    }
  })
  // parse request body into ctx.request.body
  app.use(body())
  app.use(content)
  app.use(examples)
}
