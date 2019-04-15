const xmlify = require('xmlify') // JS object to XML
const yaml = require('js-yaml') // JS object to YAML

module.exports = async function contentNegotiation(ctx, next) {
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
        ctx.log.info(`Could not convert to XML, falling back to default`)
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
}
