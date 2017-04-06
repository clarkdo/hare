const Koa = require('koa') // Koa framework
const jwt = require('jsonwebtoken') // JSON Web Token implementation
const xmlify = require('xmlify') // JS object to XML
const yaml = require('js-yaml') // JS object to YAML
const bunyan = require('bunyan') // logging
const koaLogger = require('koa-bunyan') // logging

const app = new Koa() // API app

// content negotiation: api will respond with json, xml, or yaml
app.use(async function contentNegotiation (ctx, next) {
  await next()

  if (!ctx.body) return // no content to return

  // check Accept header for preferred response type
  const type = ctx.accepts('json', 'xml', 'yaml', 'text')

  switch (type) {
    case 'json':
    default:
      delete ctx.body.root // xml root element
      break // ... koa takes care of type
    case 'xml':
      ctx.type = type
      const root = ctx.body.root // xml root element
      delete ctx.body.root
      ctx.body = xmlify(ctx.body, root)
      break
    case 'yaml':
    case 'text':
      delete ctx.body.root // xml root element
      ctx.type = 'yaml'
      ctx.body = yaml.dump(ctx.body)
      break
    case false:
      ctx.throw(406) // "Not acceptable" - can't furnish whatever was requested
      break
  }
})

// handle thrown or uncaught exceptions anywhere down the line
app.use(async function handleErrors (ctx, next) {
  try {
    await next()
  } catch (e) {
    ctx.status = e.status || 500
    switch (ctx.status) {
      case 204: // No Content
        break
      case 401: // Unauthorized
        ctx.set('WWW-Authenticate', 'Basic')
        break
      case 403: // Forbidden
      case 404: // Not Found
      case 406: // Not Acceptable
      case 409: // Conflict
        ctx.body = {
          message: e.message,
          root: 'error'
        }
        break
      default:
      case 500: // Internal Server Error (for uncaught or programming errors)
        console.error(ctx.status, e.message)
        ctx.body = {
          message: e.message,
          root: 'error'
        }
        if (app.env !== 'production') ctx.body.stack = e.stack
        ctx.app.emit('error', e, ctx) // github.com/koajs/koa/wiki/Error-Handling
        break
    }
  }
})

// logging
const access = {
  type: 'rotating-file',
  path: './logs/api-access.log',
  level: 'trace',
  period: '1d',
  count: 4
}
const error = {
  type: 'rotating-file',
  path: './logs/api-error.log',
  level: 'error',
  period: '1d',
  count: 4
}
const logger = bunyan.createLogger({
  name: 'api',
  streams: [access, error]
})
app.use(koaLogger(logger, {}))

// ------------ routing

// public (unsecured) modules first

app.use(require('./routes-root.js'))
app.use(require('./routes-auth.js'))

// remaining routes require JWT auth (obtained from /auth and supplied in bearer authorization header)

app.use(async function verifyJwt (ctx, next) {
  if (!ctx.header.authorization) ctx.throw(401, 'Authorisation required')
  const [scheme, token] = ctx.header.authorization.split(' ')
  if (scheme !== 'Bearer') ctx.throw(401, 'Invalid authorisation')

  const roles = {
    g: 'guest',
    a: 'admin',
    s: 'su'
  }

  try {
    const payload = jwt.verify(token, 'koa-sample-app-signature-key') // throws on invalid token

    // valid token: accept it...
    ctx.state.user = payload // for user id  to look up user details
    ctx.state.user.Role = roles[payload.role] // for authorisation checks
  } catch (e) {
    if (e.message === 'invalid token') ctx.throw(401, 'Invalid JWT') // Unauthorized
    ctx.throw(e.status || 500, e.message) // Internal Server Error
  }

  await next()
})

app.use(require('./routes-members.js'))
app.use(require('./routes-teams.js'))
app.use(require('./routes-team-members.js'))

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = app
