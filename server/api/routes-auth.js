/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
import koaRouter from 'koa-router'
import svgCaptcha from 'svg-captcha'
import constants from '../utils/constants'

const router = koaRouter({
  prefix: constants.BASE_API
}) // router middleware for koa

router.post('/login', async function getAuth (ctx) {
  const user = ctx.request.body
  if (!user || !user.userName || !user.password) ctx.throw(401, 'Username/password not found')
  if (user.userName === 'admin' && user.password === 'admin') {
    if (ctx.session.captcha.toLowerCase() !== user.captcha.toLowerCase()) {
      ctx.throw(401, '验证码输入错误')
    }
    let payload = {
      id: 1, // to get user details
      role: 'admin' // make role available without db query
    }
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
    'eyJhdWQiOlsidGF0Il0sInVzZXJfbmFtZSI6IlRlc3RlciIsI' +
    'nNjb3BlIjpbInJlYWQiXSwiZXhwIjoxNDk0MjY4ODY0LCJ1c2' +
    'VySWQiOiIxIiwiYXV0aG9yaXRpZXMiOlsiYWRtaW4iXSwianR' +
    'pIjoiN2FkN2VjYzUtNTdmNy00MmZlLThmZmQtYjUxMTJkNTZm' +
    'M2NhIiwiY2xpZW50X2lkIjoidGF0LWNsaWVudCJ9.' +
    'ovWxqcBptquNR5QUBz1it2Z3Fr0OxMvWsnXHIHTcliI'
    delete user.password
    ctx.body = Object.assign({token: token}, user, payload)
    ctx.session.authUser = user
  } else {
    ctx.throw(401, 'Username/password not found')
  }
})

router.post('/logout', async function logout (ctx) {
  ctx.session.authUser = null
  ctx.status = 200
})

router.get('/captcha', async function getAuth (ctx, next) {
  await next()
  let captcha = svgCaptcha.create({height: 36, fontSize: 40})
  ctx.session.captcha = captcha.text
  ctx.type = 'image/svg+xml'
  ctx.body = captcha.data
})

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.routes()
