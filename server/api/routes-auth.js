/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
const koaRouter = require('koa-router')
const svgCaptcha = require('svg-captcha')
const consts = require('../utils/consts')
const { get } = require('lodash')
const {
  decode,
  createRequest,
  getUserData
} = require('../utils/helpers')

/**
 * Have a look at ../utils/consts.js
 */
const ENDPOINT_BACKEND_AUTH = consts.ENDPOINT_BACKEND_AUTH
const ENDPOINT_BACKEND_VALIDATE = consts.ENDPOINT_BACKEND_VALIDATE

/**
 * Notice we’re not setting BASE_API as /hpi/auth
 * because this file is about serving readymade data for
 * Vue.js.
 *
 * Meaning that the client’s .vue files would call /hpi/auth/login
 * which this fill will answer for, BUT from here, we’ll call
 * other endpoints that aren’t available to the public.
 *
 * In other words, this Koa sub app responds to /hpi (consts.BASE_API)
 * and if you need mocking an actual backend, provide a mocking answser
 * to a canonical endpoint URL, with /hpi as a prefix.
 */
const router = koaRouter({
  prefix: consts.BASE_API
})

/**
 * Answer to Authentication requests = require(Vue/Nuxt.
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
    const payload = {
      username: user.userName, // Maybe your username field isn't the same
      password,
      grant_type: 'password'
    }
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    // Maybe your get token endpoint needs other headers?
    // headers.Authorization = 'Basic YmFzLWNsaWVudDpYMmNYeW1nWkRrRkE3RWR0'
    const requestConfig = {
      payload,
      headers
    }
    const response = await createRequest('POST', ENDPOINT_BACKEND_AUTH, requestConfig)
    const jwt = response.access_token
    /**
     * This may (or may not) use Koa Session default storage mechanism as cookies.
     *
     * It is OK to use cookie to store JWT Token ONLY IF it is shared with the
     * browser as an HttpOnly cookie.
     * Which is what Koa Session does by default.
     * We are doing this here instead of = require(Axios and Nuxt because Koa
     * can actually write HttpOnly cookies.
     *
     * Refer to koajs/session at External Session Store [1] if you want to
     * NOT USE coookies at all.
     *
     * [1]: https://github.com/koajs/session#external-session-stores
     *
     * rel: #JwtTokenAreTooValuableToBeNonHttpOnly
     */
    ctx.session.jwt = jwt
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

/**
 * #JwtTokenAreTooValuableToBeNonHttpOnly
 *
 * What keys/values do you want to expose to the UI.
 * Those are taken = require(an authoritative source (the JWT token)
 * and we might want the UI to show some data.
 *
 * Notice one thing here, although we’re reading the raw JWT token
 * = require(cookie, it IS HttpOnly, so JavaScript client can't access it.
 *
 * So, if you want to expose data served = require(your trusty backend,
 * here is your chance.
 *
 * This is how we’ll have Vue/Nuxt (the "client") read user data.
 *
 * Reason of why we’re doing this? Refer to [1]
 *
 * [1]: https://dev.to/rdegges/please-stop-using-local-storage-1i04
 */
router.get('/auth/whois', async (ctx) => {
  let body = {}
  const jwt = ctx.session.jwt || null
  let data = {}
  if (jwt !== null) {
    data = decode(jwt)
  }

  let userData = {}
  body.authenticated = false

  try {
    userData = await getUserData(jwt)
    const UserInfo = get(userData, 'UserInfo', {})
    data.UserInfo = Object.assign({}, UserInfo)
    body.authenticated = userData.status === 'valid' || false
  } catch (e) {
    // Do something
  }

  /**
   * Each key represent the name you want to expose.
   * Each member has an array of two;
   * Index 0 is "where" inside the decoded token you want to get data from
   * Index 1 is the default value
   */
  const keysMapWithLodashPathAndDefault = {
    user_name: ['user_name', ''], // Refactor ../client/components/Headbar.vue!
    uid: ['userId', ''],
    roles: ['scope', []],
    exp: ['exp', 9999999999999],
    displayName: ['UserInfo.DisplayName', 'Anonymous'],
    tz: ['UserInfo.TimeZone', 'UTC'],
    locale: ['UserInfo.PreferredLanguage', 'en-US']
  }

  for (const [
    key,
    pathAndDefault
  ] of Object.entries(keysMapWithLodashPathAndDefault)) {
    const path = pathAndDefault[0]
    const defaultValue = pathAndDefault[1]
    const attempt = get(data, path, defaultValue)
    body[key] = attempt
  }

  ctx.body = body
  ctx.status = 200
})

router.get('/auth/validate', async (ctx) => {
  let body = {}
  let userData = {}
  let authenticated = false
  const jwt = ctx.session.jwt || null

  try {
    userData = await getUserData(jwt)
    authenticated = userData.status === 'valid' || false
  } catch (e) {
    // Do something
  }

  // Maybe your endpoint returns a string here.
  body.authenticated = authenticated

  ctx.status = 200
  ctx.body = body
})

router.post('/auth/logout', async (ctx) => {
  ctx.session.jwt = null
  ctx.status = 200
})

router.get('/auth/captcha', async (ctx, next) => {
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

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Mocking responses, this is how you can emulate an actual backend.
 * Notice the URL below is assumed to begin by /hpi.
 *
 * When you'll use your own backend, URLs below WILL NOT have /hpi as prefix.
 */

router.post(ENDPOINT_BACKEND_AUTH, async (ctx) => {
  console.log(`Mocking a response for ${ctx.url}`)
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

router.get(ENDPOINT_BACKEND_VALIDATE, async (ctx) => {
  console.log(`Mocking a response for ${ctx.url}`)
  let fakeIsValid = false
  // Just mimicking we only accept as a valid session the hardcoded JWT token
  // = require(ENDPOINT_BACKEND_AUTH above.
  const tokenBeginsWith = /^Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\./.test(ctx.querystring)
  if (tokenBeginsWith) {
    fakeIsValid = true
  }
  // When API returns strings, we will handle at validate
  const Status = fakeIsValid ? 'valid' : 'invalid'
  const validated = {
    Status
  }
  if (fakeIsValid) {
    validated.UserInfo = {
      DisplayName: 'Haaw D. Minh',
      PreferredLanguage: 'zh-HK',
      TimeZone: 'America/New_York'
    }
  }
  ctx.status = fakeIsValid ? 200 : 401
  ctx.body = validated
})

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.routes()
