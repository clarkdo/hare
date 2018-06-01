/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Routes to define development "kitchen sink" samples                                           */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
const koaRouter = require('koa-router')
const consts = require('../utils/consts')

const router = koaRouter({
  prefix: consts.BASE_API
}) // router middleware for koa

router.get('/examples/activity', async (ctx) => {
  ctx.assert(ctx.session.jwt, 401, 'Requires authentication')
  ctx.status = 200
  // id is a string, because some systems exposes other things than integers when being exposed through HTTP
  // For instance, UUID is a popular Globally Unique ID scheme, and is typically exposed as a string.
  // This doesn't mean the backend stores it as a string though.
  ctx.body = [{
    'id': '1',
    'account': '活动1',
    'date': '2017-1-1',
    'type': 'activity.type.price',
    'city': 'activity.city.bj',
    'priority': 'activity.priority.high',
    'organizer': '市场部',
    'desc': 'Description example of activity 1'
  },
  {
    'id': '2',
    'account': '活动2',
    'date': '2017-1-2',
    'type': 'activity.type.rights',
    'city': 'activity.city.bj',
    'priority': 'activity.priority.high',
    'organizer': '市场部',
    'desc': 'Description example of activity 2'
  },
  {
    'id': '3',
    'account': '活动3',
    'date': '2017-1-3',
    'type': 'activity.type.price',
    'city': 'activity.city.sh',
    'priority': 'activity.priority.low',
    'organizer': '市场部',
    'desc': 'Description example of activity 3'
  },
  {
    'id': '4',
    'account': '活动4',
    'date': '2017-2-4',
    'type': 'activity.type.price',
    'city': 'activity.city.sh',
    'priority': 'activity.priority.medium',
    'organizer': '运营部',
    'desc': 'Description example of activity 4'
  },
  {
    'id': '5',
    'account': '活动5',
    'date': '2017-3-5',
    'type': 'activity.type.rights',
    'city': '大连',
    'priority': 'activity.priority.high',
    'organizer': '销售部',
    'desc': 'Description example of activity in 大连 (Dalian, not in the activity.city[*] translated city names list), on March 5th'
  },
  {
    'id': '6',
    'account': '活动6',
    'date': '2017-4-6',
    'type': 'activity.type.price',
    'city': 'activity.city.gz',
    'priority': 'activity.priority.high',
    'organizer': '市场部推广部',
    'desc': 'Description example of activity in 广州'
  },
  {
    'id': '7',
    'account': '活动7',
    'date': '2017-5-7',
    'type': 'activity.type.price',
    'city': 'activity.city.sh',
    'priority': 'activity.priority.high',
    'organizer': '销售部华北销售',
    'desc': 'Description example of activity in Shanghai'
  },
  {
    'id': '8',
    'account': '活动8',
    'date': '2017-6-8',
    'type': 'activity.type.price',
    'city': 'activity.city.sz',
    'priority': 'activity.priority.high',
    'organizer': '销售部华南销售',
    'desc': 'Description example of activity in 深圳'
  },
  {
    'id': '9',
    'account': '活动9',
    'date': '2017-6-9',
    'type': 'activity.type.price',
    'city': '南京',
    'priority': 'activity.priority.high',
    'organizer': '销售部华东销售',
    'desc': 'Description example of activity in 南京'
  },
  {
    'id': '10',
    'account': '活动10',
    'date': '2017-9-10',
    'type': 'activity.type.rights',
    'city': 'activity.city.ny',
    'priority': 'activity.priority.high',
    'organizer': '销售部海外部',
    'desc': 'Description example of activity in New York'
  },
  {
    'id': '11',
    'account': '123',
    'date': '2018-05-31',
    'type': 'activity.type.price',
    'city': 'activity.city.ly',
    'priority': 'activity.priority.high',
    'organizer': '市场部',
    'desc': 'Description example of activity 11. Lets see if we can use key names for translatable data, instead of hardcoded result value'
  }]
})

module.exports = router.routes()
