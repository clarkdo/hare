/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
const axios = require('axios')
const querystring = require('querystring')
const koaRouter = require('koa-router')
const svgCaptcha = require('svg-captcha')
const consts = require('../utils/consts')

/**
 * Feature flag whether or not we want to mock authentication.
 * This should maybe in consts, or via .env file. TODO.
 */
const AUTH_BACKEND_ENDPOINT = '/foo/bar'
const AUTH_BACKEND = consts.MOCK_AUTHENTICATION_ENDPOINT || AUTH_BACKEND_ENDPOINT

const router = koaRouter({
  prefix: consts.BASE_API
}) // router middleware for koa

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

if (typeof consts.MOCK_AUTHENTICATION_ENDPOINT === 'string') {
  headers.Authorization = 'Basic YmFzLWNsaWVudDpYMmNYeW1nWkRrRkE3RWR0'
}

var request = axios.create({
  baseURL: consts.LB_ADDR,
  timeout: 5000,
  headers
})

router.post('/login', async function getAuth (ctx) {
  const user = ctx.request.body
  if (!user || !user.userName || !user.password) {
    ctx.throw(401, '用户名/密码未填写')
  }
  if (ctx.session.captcha.toLowerCase() !== user.captcha.toLowerCase()) {
    ctx.throw(401, '验证码输入错误')
  }
  try {
    const response = await request.post(
      AUTH_BACKEND,
      querystring.stringify({
        username: user.userName,
        password: Buffer.from(user.password).toString('base64'),
        grant_type: 'password'
      })
    )
    ctx.body = Object.assign({}, response.data)
    ctx.session.jwt = response.data.access_token
  } catch (error) {
    ctx.log.error({
      error
    }, 'Call oath service failed!')
    let errMsg = '登录失败, 具体信息请联系维护人员'
    let data = null
    if ((data = error && error.response && error.response.data)) {
      errMsg = data.message || data.errors
    }
    ctx.throw(401, errMsg)
  }
})

router.post('/logout', async function logout (ctx) {
  ctx.session.jwt = null
  ctx.status = 200
})

router.get('/captcha', async function getAuth (ctx, next) {
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
 * Mocking Authentication response.
 */
if (typeof consts.MOCK_AUTHENTICATION_ENDPOINT === 'string') {
  router.post(consts.MOCK_AUTHENTICATION_ENDPOINT, async function getToken (ctx, next) {
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
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.routes()
