/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Route to handle authentication /auth element                                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
import koaRouter from 'koa-router'
import constants from '../utils/constants'

const router = koaRouter({
  prefix: constants.BASE_API
}) // router middleware for koa

router.get('/activities', async function getActivities (ctx) {
  ctx.status = 200
  ctx.body = [{
    'account': '活动1',
    'date': '2017-1-1',
    'type': '价格优惠',
    'region': '北京',
    'priority': '高',
    'organizer': '市场部',
    'desc': 'Description example of activity 1'
  }, {
    'account': '活动2',
    'date': '2017-1-2',
    'type': '价格权益',
    'region': '北京',
    'priority': '高',
    'organizer': '市场部',
    'desc': 'Description example of activity 2'
  }, {
    'account': '活动3',
    'date': '2017-1-3',
    'type': '价格优惠',
    'region': '上海',
    'priority': '高',
    'organizer': '市场部',
    'desc': 'Description example of activity 3'
  }, {
    'account': '活动4',
    'date': '2017-2-4',
    'type': '价格优惠',
    'region': '上海',
    'priority': '中',
    'organizer': '运营部',
    'desc': 'Description example of activity 4'
  }, {
    'account': '活动5',
    'date': '2017-3-5',
    'type': '价格权益',
    'region': '大连',
    'priority': '高',
    'organizer': '销售部',
    'desc': 'Description example of activity in 大连 on March 5th'
  }, {
    'account': '活动6',
    'date': '2017-4-6',
    'type': '价格优惠',
    'region': '西安',
    'priority': '高',
    'organizer': '市场部推广部',
    'desc': 'Description example of activity in 西安'
  }, {
    'account': '活动7',
    'date': '2017-5-7',
    'type': '价格优惠',
    'region': '大连',
    'priority': '高',
    'organizer': '销售部华北销售',
    'desc': 'Description example of activity in 大连'
  }, {
    'account': '活动8',
    'date': '2017-6-8',
    'type': '价格优惠',
    'region': '重庆',
    'priority': '高',
    'organizer': '销售部华南销售',
    'desc': 'Description example of activity in 重庆'
  }, {
    'account': '活动9',
    'date': '2017-6-9',
    'type': '价格优惠',
    'region': '南京',
    'priority': '高',
    'organizer': '销售部华东销售',
    'desc': 'Description example of activity in 南京'
  }, {
    'account': '活动10',
    'date': '2017-9-10',
    'type': '价格权益',
    'region': 'New York',
    'priority': '高',
    'organizer': '销售部海外部',
    'desc': 'Description example of activity in New York'
  }]
})

module.exports = router.routes()
