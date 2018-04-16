/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
const axios = require('axios')
const querystring = require('querystring')
const koaRouter = require('koa-router')
const svgCaptcha = require('svg-captcha')
const consts = require('../utils/consts')

/**
 * Have a look at ../utils/consts.js
 */
const ENDPOINT_BACKEND_AUTH = consts.ENDPOINT_BACKEND_AUTH

/**
 * Notice we're not setting BASE_API as /hpi/auth
 * because this file is about serving readymade data for
 * Vue.js.
 *
 * Meaning that the client's .vue files would call /hpi/auth/login
 * which this fill will answer for, BUT from here, we'll call
 * other endpoints that aren't available to the public.
 *
 * In other words, this Koa sub app responds to /hpi (consts.BASE_API)
 * and if you need mocking an actual backend, provide a mocking answser
 * to a canonical endpoint URL, with /hpi as a prefix.
 */
const router = koaRouter({
  prefix: consts.BASE_API
})

/**
 * Answer to Authentication requests from Vue/Nuxt.
 *
 * Notice we're also setting a cookie here.
 * That is because we WANT it to be HttpOnly, Nuxt (in ../client/)
 * can't really do that.
 *
 * Since a JWT token is authentication proof, we do not want it to be
 * stolen or accessible.
 * HttpOnly Cookie is made for this.
 */
router.post('/auth/login', async function getAuth (ctx) {
  const user = ctx.request.body
  if (!user || !user.userName || !user.password) {
    ctx.throw(401, '用户名/密码未填写')
  }
  let enforceCaptcha = ctx.session.captcha.toLowerCase() !== user.captcha.toLowerCase()
  // enforceCaptcha = false
  if (enforceCaptcha) {
    ctx.throw(401, '验证码输入错误')
  }
  try {
    // Assuming your API only wants base64 encoded version of the password
    const password = Buffer.from(user.password).toString('base64')
    const data = {
      username: user.userName, // Maybe your username field isn't the same
      password,
      grant_type: 'password'
    }
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    // Maybe your get token endpoint needs other headers?
    // headers.Authorization = 'Basic YmFzLWNsaWVudDpYMmNYeW1nWkRrRkE3RWR0'
    const response = await postRequest(ENDPOINT_BACKEND_AUTH, data, headers)
    const accessToken = response.access_token
    ctx.cookies.set('accessToken', accessToken, {signed: true})
    ctx.session.jwt = accessToken
    ctx.body = response
  } catch (error) {
    ctx.log.error({ error }, 'Call OAuth get token service failed!')
    let errMsg = '登录失败, 具体信息请联系维护人员'
    let data = null
    if ((data = error && error.response && error.response.data)) {
      errMsg = data.message || data.errors
    }
    ctx.throw(401, errMsg)
  }
})

router.post('/auth/logout', async function logout (ctx) {
  ctx.session.jwt = null
  ctx.status = 200
})

router.get('/auth/captcha', async function getAuth (ctx, next) {
  await next()
  const width = ctx.request.query.width || 150
  const height = ctx.request.query.height || 36
  let captcha = svgCaptcha.create({
    width,
    height,
    size: 4,
    noise: 1,
    fontSize: width > 760 ? 40 : 30,
    // background: '#e8f5ff',
    ignoreChars: '0oO1iIl'
  })
  ctx.session.captcha = captcha.text
  ctx.type = 'image/svg+xml'
  ctx.body = captcha.data
})

/**
 * Make an async off-the-band POST request.
 *
 * Notice that LB_ADDR can be superseeded to your own backend
 * instead of mocking (static) endpoint.
 *
 * Differeciation factor is when you use /hpi, Koa will take care of it
 * and yours MUST therefore NOT start by /hpi, and Koa will be out of the way.
 *
 * All of this is done when you set your own LB_ADDR environment setup
 * to point to your own API.
 */
const postRequest = async (url, payload, headers) => {
  const recv = await axios.request({
    timeout: consts.AXIOS_DEFAULT_TIMEOUT,
    baseURL: consts.LB_ADDR,
    method: 'POST',
    url,
    headers,
    data: querystring.stringify(payload)
  })

  const data = Object.assign({}, recv.data)

  return Promise.resolve(data)
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Mocking responses, this is how you can emulate an actual backend.
 * Notice the URL below is assumed to begin by /hpi.
 *
 * When you'll use your own backend, URLs below WILL NOT have /hpi as prefix.
 */

router.post(ENDPOINT_BACKEND_AUTH, async function getToken (ctx, next) {
  /**
   * The following JWT access_token contains;
   * See https://jwt.io/
   *
   * ```json
   * {
   *   "aud": [
   *     "bas"
   *   ],
   *   "user_name": "admin",
   *   "scope": [
   *     "read"
   *   ],
   *   "exp": 9999999999999,
   *   "userId": "40288b7e5bcd7733015bcd7fd7220001",
   *   "authorities": [
   *     "admin"
   *   ],
   *   "jti": "72ec3c43-030a-41ed-abb2-b7a269506923",
   *   "client_id": "bas-client"
   * }
   * ```
   */
  ctx.body = {
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJhdWQiOlsiYmFzIl0sInVzZXJfbmFtZSI6ImFkbWluIiwic' +
      '2NvcGUiOlsicmVhZCJdLCJleHAiOjk5OTk5OTk5OTk5OTksIn' +
      'VzZXJJZCI6IjQwMjg4YjdlNWJjZDc3MzMwMTViY2Q3ZmQ3MjI' +
      'wMDAxIiwiYXV0aG9yaXRpZXMiOlsiYWRtaW4iXSwianRpIjoi' +
      'NzJlYzNjNDMtMDMwYS00MWVkLWFiYjItYjdhMjY5NTA2OTIzI' +
      'iwiY2xpZW50X2lkIjoiYmFzLWNsaWVudCJ9.' +
      'uwywziNetHyfSdiqcJt6XUGy4V_WYHR4K6l7OP2VB9I'
  }
})

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.routes()
