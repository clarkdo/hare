/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
import koaRouter from 'koa-router'
import consts from '../utils/consts'

const router = koaRouter({
  prefix: consts.BASE_API
}) // router middleware for koa

const defaultNavigation = [
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

const examplesRoutes = [
  {
    id: '2',
    name: 'nav.kitchenSink',
    icon: 'el-icon-goods',
    children: [
      {
        id: '2-1',
        name: 'nav.demo',
        url: '/examples',
        icon: 'el-icon-share'
      },
      {
        id: '2-2',
        name: 'nav.list',
        url: '/examples/activity',
        icon: 'el-icon-view'
      },
      {
        id: '2-3',
        name: 'nav.create',
        url: '/examples/activity/create',
        icon: 'el-icon-message'
      },
      {
        id: '2-4',
        name: 'nav.charts',
        url: '/examples/charts',
        icon: 'el-icon-picture'
      }
    ]
  }
]

router.get('/ui/menu', async function getMenus (ctx) {
  ctx.status = 200
  ctx.type = 'application/json'
  let navigation = [...defaultNavigation]
  if (consts.SHOW_EXAMPLES === true) {
    navigation = navigation.concat(examplesRoutes)
  }
  ctx.body = navigation
})

module.exports = router.routes()
