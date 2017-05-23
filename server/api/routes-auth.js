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
  timeout: 1000,
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
      password: new Buffer(user.password).toString('base64'),
      grant_type: 'password'
    }))
    ctx.body = Object.assign({}, response.data)
    ctx.session.authUser = user
  } catch (error) {
    ctx.throw(401, error.response ? error.response.data.errors : '登录失败, 具体信息请联系维护人员')
  }
})

router.post('/logout', async function logout (ctx) {
  ctx.session.authUser = null
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

router.post('/platform/uaano/oauth/token', async function getToken (ctx, next) {
  ctx.body = {
    'access_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJhdWQiOlsidGF0Il0sInVzZXJfbmFtZSI6IlRlc3RlciIsI' +
      'nNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDk0MjY4ODY0LCJ1c2' +
      'VySWQiOiIxIiwiYXV0aG9yaXRpZXMiOlsiYWRtaW4iXSwianR' +
      'pIjoiN2FkN2VjYzUtNTdmNy00MmZlLThmZmQtYjUxMTJkNTZm' +
      'M2NhIiwiY2xpZW50X2lkIjoidGF0LWNsaWVudCJ9.' +
      'ovWxqcBptquNR5QUBz1it2Z3Fr0OxMvWsnXHIHTcliI'
  }
})
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.routes()
