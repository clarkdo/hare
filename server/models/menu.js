const items = [
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
  },
  // Assuming id > 999 are examples.
  {
    id: '1000',
    name: 'nav.kitchenSink',
    icon: 'el-icon-goods',
    children: [
      {
        id: '1000-1',
        name: 'nav.demo',
        url: '/examples',
        icon: 'el-icon-share'
      },
      {
        id: '1000-2',
        name: 'nav.list',
        url: '/examples/activity',
        icon: 'el-icon-view'
      },
      {
        id: '1000-3',
        name: 'nav.create',
        url: '/examples/activity/create',
        icon: 'el-icon-message'
      },
      {
        id: '1000-4',
        name: 'nav.charts',
        url: '/examples/charts',
        icon: 'el-icon-picture'
      }
    ]
  }
]

module.exports = [...items]
