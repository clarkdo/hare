module.exports = async function handleErrors(ctx, next) {
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
        ctx.log.error(ctx.status, e.message)
        ctx.body = {
          root: 'error'
          // ...e
        }
        if (ctx.app.env !== 'production') ctx.body.stack = e.stack
        ctx.app.emit('error', e, ctx) // github.com/koajs/koa/wiki/Error-Handling
        break
    }
  }
}
