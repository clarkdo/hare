module.exports = async function responseTime(ctx, next) {
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
    ctx.log.info(`Received for ${logRequestUrlResponse}`, { ctx: debugObj, body, responseHeaders, requestHeaders })
  }
  const isHpi = /^\/hpi\//.test(ctx.request.url)
  const logHpi = false
  if (isHpi && logHpi && logHpiAuthLogin === false) {
    const headers = Object.assign({}, JSON.parse(JSON.stringify(ctx.request.header)))
    ctx.log.info(`Request headers for ${ctx.url}`, headers)
  }
}
