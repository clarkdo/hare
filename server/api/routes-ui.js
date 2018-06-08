/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle /ui                                                                           */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
const koaRouter = require('koa-router')
const consts = require('../utils/consts')
const menu = require('../models/menu')

const router = koaRouter({
  prefix: consts.BASE_API
})

const includingExamples = (assertion = true) => item => {
  const assertIncludeExample = assertion === true
  // Defaults to true. Anything could be an example.
  // So we have to be careful at what we might end up with in production build.
  let isExample = true
  const idFieldExists = Reflect.has(item, 'id')
  // Make it in example range if id is missing
  const idFieldFirstDigits = idFieldExists ? item.id.split('-')[0] : 1000
  if (idFieldExists) {
    const idFieldInteger = Number.parseInt(idFieldFirstDigits)
    // Assuming id 9999-99 IS NOT an example
    // Assuming id 1000-00 IS an example
    isExample = idFieldInteger > 999
  }
  return isExample === false || isExample === assertIncludeExample
}

router.get('/ui/menu', async (ctx, next) => {
  ctx.assert(ctx.session.jwt, 401, 'Require authentication')

  const body = menu.filter(i => includingExamples(process.env.SHOW_EXAMPLES === 'true')(i))

  ctx.status = 200
  ctx.body = body
})

module.exports = router.routes()
