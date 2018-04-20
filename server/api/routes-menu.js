/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle /menu                                                                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
import koaRouter from 'koa-router'
import consts from '../utils/consts'

const SHOW_EXAMPLES = consts.SHOW_EXAMPLES === true

const router = koaRouter({
  prefix: consts.BASE_API
})

let menu = [
  {
    id: '1',
    name: 'nav.home',
    url: '/',
    icon: 'el-icon-menu'
  },
  {
    id: '3',
    name: 'nav.about',
    url: '/about',
    icon: 'el-icon-menu'
  }
]

if (SHOW_EXAMPLES) {
  menu = menu.concat([
    {
      id: '20',
      name: 'nav.kitchenSink',
      icon: 'el-icon-goods',
      children: [
        {
          id: '20-1',
          name: 'nav.demo',
          url: '/examples',
          icon: 'el-icon-share'
        },
        {
          id: '20-2',
          name: 'nav.list',
          url: '/examples/activity',
          icon: 'el-icon-view'
        },
        {
          id: '20-3',
          name: 'nav.create',
          url: '/examples/activity/create',
          icon: 'el-icon-message'
        },
        {
          id: '20-4',
          name: 'nav.charts',
          url: '/examples/charts',
          icon: 'el-icon-picture'
        }
      ]
    }
  ])
}

router.get('/ui/menu', async (ctx, next) => {
  ctx.assert(ctx.session.jwt, 401, 'Requires authentication')

  ctx.status = 200
  ctx.body = menu
})

module.exports = router.routes()
