const Koa = require('koa') // Koa framework
const xmlify = require('xmlify') // JS object to XML
const yaml = require('js-yaml') // JS object to YAML
const auth = require('./routes-auth')
const examples = require('./routes-examples')
const ui = require('./routes-ui')
const env = require('./routes-env')

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
      try {
        const root = ctx.body.root // xml root element
        delete ctx.body.root
        ctx.body = xmlify(ctx.body, root)
        ctx.type = type // Only change type if xmlify did not throw
      } catch (e) {
        console.log(`Could not convert to XML, falling back to default`)
      }
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
      case 403: // Forbidden
      case 404: // Not Found
      case 406: // Not Acceptable
      case 409: // Conflict
        ctx.body = {
          root: 'error'
          // ...e
        }
        break
      default:
      case 500: // Internal Server Error (for uncaught or programming errors)
        console.error(ctx.status, e.message)
        ctx.body = {
          root: 'error'
          // ...e
        }
        if (app.env !== 'production') ctx.body.stack = e.stack
        ctx.app.emit('error', e, ctx) // github.com/koajs/koa/wiki/Error-Handling
        break
    }
  }
})

// ------------ routing

// public (unsecured) modules first

app.use(env)
app.use(auth)
app.use(ui)

/**
 * #TODO Figure out how we could optionally add a route
 *
 * Possibly like this;
 *
 * ```js
 * app.use(async function maybeAddExamples (ctx, next) {
 *  if (Reflect.has(ctx.processEnv, 'SHOW_EXAMPLES') && ctx.processEnv.SHOW_EXAMPLES === true) {
 *    // Add the route.
 *  }
 *  next()
 * })
 * ```
 *
 * See https://koajs.com/#context
 */

if (process.env.SHOW_EXAMPLES === 'true') {
  app.use(examples)
}

// verify token here

// custom modules here

module.exports = app
