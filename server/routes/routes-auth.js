/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const router = require('koa-router')() // router middleware for koa

router.post('/api/login', async function getAuth (ctx) {
  const user = ctx.request.body
  if (!user) ctx.throw(404, 'Username/password not found')
  try {
    if (!user.password) ctx.throw(404, 'Username/password not found')

    const payload = {
      id: 1, // to get user details
      role: 'admin' // make role available without db query
    }
    const token = 'token-example'
    ctx.body = Object.assign({token: token}, user, payload)
  } catch (e) { // e.g. "data is not a valid scrypt-encrypted block"
    ctx.throw(404, 'Username/password not found')
  }
})

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.middleware()
