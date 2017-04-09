import Koa from 'koa'// Koa framework
import jwt from 'jsonwebtoken'// JSON Web Token implementation
import xmlify from 'xmlify'// JS object to XML
import yaml from 'js-yaml'// JS object to YAML

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

export default app
