const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || '3000'

module.exports = Object.freeze({
  APP: 'hare',
  API: 'hpi',
  BASE_API: '/hpi',
  SESS_KEY: 'hare:sess',
  COOKIE_JWT: 'hare_jwt',
  HOST,
  PORT,
  MOCK_AUTHENTICATION_ENDPOINT: '/platform/uaano/oauth/token',
  LB_ADDR: process.env.LB_ADDR || `http://${HOST}:${PORT}/hpi`
})
