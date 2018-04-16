const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '3000'
const LB_ADDR = process.env.LB_ADDR || `http://${HOST}:${PORT}/hpi`

/**
 * Where to get your JWT/OAuth bearer token.
 *
 * Notice that, at the bottom, there is a Koa handler,
 * meaning that if you set value here as /foo/bar, it is assumed
 * this service will make an off-the-band request to /foo/bar
 * BUT ALSO allow you responding a mocking response from /hpi/foo/bar.
 *
 * To switch such behavior, you can set LB_ADDR constant.
 */
const ENDPOINT_BACKEND_AUTH = '/platform/uaano/oauth/token'

module.exports = Object.freeze({
  APP: 'hare',
  API: 'hpi',
  BASE_API: '/hpi',
  SESS_KEY: 'hare:sess',
  COOKIE_JWT: 'hare_jwt',
  HOST,
  PORT,
  ENDPOINT_BACKEND_AUTH,
  LB_ADDR
})
