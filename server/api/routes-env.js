/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Routes to handle Deployment Environment Variables exposition                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
const koaRouter = require('koa-router')
const consts = require('../utils/consts')

const router = koaRouter({
  prefix: consts.BASE_API
})

router.get('/env', async ctx => {
  // console.log(`${ctx.method} ${ctx.href}`)
  const body = {...ctx.processEnv}

  ctx.status = 200
  ctx.body = body
})

module.exports = router.routes()
