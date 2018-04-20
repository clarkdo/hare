/**
 * Nuxt Server API Side-Car (Using Koa).
 *
 * Should mirror with ../client/utils/consts.js
 * But here, we should have only what matters for the backend.
 *
 * In other words, where Nuxt will read data from.
 * This will be what serves all data to Nuxt client,
 * and will read from our backends.
 * It will also ensure only authenticated requests yields data.
 */

import consts from '../../client/utils/consts'

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
const ENDPOINT_BACKEND_VALIDATE = '/platform/uaano/oauth/validate'

// Please, reader, fix this with proper environment variable management before deploying (!)
const MOCK_ENDPOINT_BACKEND = true

export default Object.freeze({
  HOST,
  PORT,
  LB_ADDR,
  ENDPOINT_BACKEND_AUTH,
  ENDPOINT_BACKEND_VALIDATE,
  MOCK_ENDPOINT_BACKEND,
  ...consts
})
