/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
import axios from 'axios'
import querystring from 'querystring'
import koaRouter from 'koa-router'
import svgCaptcha from 'svg-captcha'
import constants from '../utils/constants'

const router = koaRouter({
  prefix: constants.BASE_API
}) // router middleware for koa

var request = axios.create({
  baseURL: constants.LB_ADDR,
  timeout: 5000,
  headers: {
    'Authorization': 'Basic YmFzLWNsaWVudDpYMmNYeW1nWkRrRkE3RWR0',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
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
    const response = await request.post('/platform/uaano/oauth/token', querystring.stringify({
      username: user.userName,
      password: Buffer.from(user.password).toString('base64'),
      grant_type: 'password'
    }))
    ctx.body = Object.assign({}, response.data)
    ctx.session.jwt = response.data.access_token
  } catch (error) {
    ctx.log.error({error}, 'Call oath service failed!')
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
  let captcha = svgCaptcha.create({
    size: 4,
    noise: 1,
    height: 36,
    fontSize: 40,
    // background: '#e8f5ff',
    ignoreChars: '0oO1iIl'
  })
  ctx.session.captcha = captcha.text
  ctx.type = 'image/svg+xml'
  ctx.body = captcha.data
})

router.get('/menus', async function getMenus (ctx) {
  ctx.status = 200
  ctx.type = 'application/json'
  ctx.body = [
    {
      id: '1',
      name: 'nav.home',
      url: '/',
      icon: 'el-icon-menu'
    }, {
      id: '2',
      name: 'nav.activity',
      icon: 'el-icon-edit',
      children: [
        {
          id: '2-1',
          name: 'nav.demo',
          url: '/examples',
          icon: 'el-icon-share'
        }, {
          id: '2-2',
          name: 'nav.list',
          url: '/examples/activity',
          icon: 'el-icon-view'
        }, {
          id: '2-3',
          name: 'nav.create',
          url: '/examples/activity/create',
          icon: 'el-icon-message'
        }, {
          id: '2-3',
          name: 'nav.charts',
          url: '/examples/charts',
          icon: 'el-icon-picture'
        }
      ]
    }, {
      id: '3',
      name: 'nav.about',
      url: '/about',
      icon: 'el-icon-setting'
    }
  ]
})

router.post('/platform/uaano/oauth/token', async function getToken (ctx, next) {
  ctx.body = {
    'access_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
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
