/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Routes to handle authentication                                                               */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
import koaRouter from 'koa-router'
import svgCaptcha from 'svg-captcha'
import translatorFactory from '../utils/translator'
import consts from '../utils/consts'
import { get } from 'lodash'
import {
  decode,
  createRequest,
  getUserData
} from '../utils/helpers'

/**
 * Have a look at ../utils/consts.js
 */
const ENDPOINT_BACKEND_AUTH = consts.ENDPOINT_BACKEND_AUTH
const ENDPOINT_BACKEND_VALIDATE = consts.ENDPOINT_BACKEND_VALIDATE

/*
 * Feature flag whether or not we want to mock authentication.
 * This should maybe in consts, or via .env file. TODO.
 */
const MOCK_ENDPOINT_BACKEND = consts.MOCK_ENDPOINT_BACKEND === true

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
 * Refer to ../utils/translator
 * One would want to detect user locale and serve in proper language
 * but more work would be needed here, because this isn’t run
 * client-side and with fresh data for every load, here it’s a runtime
 * that has a persistent state.
 * We therefore can’t have Koa keep in-memory ALL possible translations.
 */
const translator = translatorFactory('en')

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
router.post('/auth/login', async (ctx) => {
  const user = ctx.request.body
  if (!user || !user.userName || !user.password) {
    ctx.throw(401, translator.translate('auth.login.required.missing'))
  }
  let enforceCaptcha = false
  const shouldBe = ctx.session.captcha.toLowerCase() || 'bogus-user-captcha-entry'
  const userCaptchaEntry = user.captcha.toLowerCase() || 'bogus-should-be'
  enforceCaptcha = shouldBe !== userCaptchaEntry
  // enforceCaptcha = false
  if (enforceCaptcha) {
    ctx.throw(401, translator.translate('auth.login.captcha.invalid'))
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
     * We are doing this here instead of from Axios and Nuxt because Koa
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
    let message = translator.translate('auth.login.service.error')
    ctx.log.error({ error }, message)
    let data = null
    if ((data = error && error.response && error.response.data)) {
      message = data.message || data.errors
    }
    ctx.throw(401, message)
  }
})

/**
 * #JwtTokenAreTooValuableToBeNonHttpOnly
 *
 * What keys/values do you want to expose to the UI.
 * Those are taken from an authoritative source (the JWT token)
 * and we might want the UI to show some data.
 *
 * Notice one thing here, although we’re reading the raw JWT token
 * from cookie, it IS HttpOnly, so JavaScript client can't access it.
 *
 * So, if you want to expose data served from your trusty backend,
 * here is your chance.
 *
 * This is how we’ll have Vue/Nuxt (the "client") read user data.
 *
 * Reason of why we’re doing this? Refer to [1]
 *
 * [1]: https://dev.to/rdegges/please-stop-using-local-storage-1i04
 */
router.get('/auth/whois', async (ctx) => {
  let body = {
    authenticated: false
  }
  const jwt = ctx.session.jwt || null
  let data = {}
  if (jwt !== null) {
    data = decode(jwt)
  }
  let userData = {}
  try {
    userData = await getUserData(jwt)
    const UserInfo = get(userData, 'UserInfo', {})
    data.UserInfo = Object.assign({}, UserInfo)
    body.authenticated = userData.status === 'valid' || false
  } catch (e) {
    // Nothing to do, body.authenticated defaults to false. Which would be what we want.
  }

  /**
   * Each key represent the name you want to expose.
   * Each member has an array of two;
   * Index 0 is "where" inside the decoded token you want to get data from
   * Index 1 is the default value
   */
  const keysMapWithLodashPathAndDefault = {
    userName: ['UserInfo.UserName', 'anonymous'],
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

  ctx.status = 200
  ctx.body = body
})

/**
 * This is to compensate using localStorage for token
 * Ideally, this should NOT be used as-is for a production Web App.
 * Only moment you’d want to expose token is if you have SysAdmins
 * who wants to poke APIs manually and needs their JWT tokens.
 */
router.get('/auth/token', async (ctx) => {
  ctx.assert(ctx.session.jwt, 401, 'Requires authentication')
  let body = {}
  try {
    const token = ctx.session.jwt
    body.jwt = token
  } catch (e) {
    // Nothing to do, body.authenticated defaults to false. Which would be what we want.
  }

  ctx.status = 200
  ctx.body = body
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
    // Nothing to do, body.authenticated defaults to false. Which would be what we want.
  }

  // Maybe your endpoint returns a string here.
  body.authenticated = authenticated

  ctx.status = 200
  ctx.body = body
})

router.post('/auth/logout', async (ctx) => {
  ctx.assert(ctx.session.jwt, 401, 'Requires authentication')
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

if (MOCK_ENDPOINT_BACKEND) {
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
    // from ENDPOINT_BACKEND_AUTH above.
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
        UserName: 'admin',
        DisplayName: 'Haaw D. Minh',
        FirstName: 'Haaw',
        LastName: 'D. Minh',
        Email: 'root@example.org',
        PreferredLanguage: 'zh-HK',
        TimeZone: 'Asia/Hong_Kong'
      }
    }
    ctx.status = fakeIsValid ? 200 : 401
    ctx.body = validated
  })
} /* END MOCK_ENDPOINT_BACKEND */

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.routes()
