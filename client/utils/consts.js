/**
 * Nuxt (client) defaults constants.
 *
 * Should mirror with ../server/utils/consts.js
 * But here, we should have only what matters for the client.
 */
export default Object.freeze({
  APP: 'hare',
  API: 'hpi',
  BASE_API: '/hpi',
  SESS_KEY: 'hare:sess',
  COOKIE_JWT: 'hare_jwt',
  // Allow /examples
  SHOW_EXAMPLES: true,
  // Maybe your backend needs longer before timing out
  AXIOS_DEFAULT_TIMEOUT: 50000
})
