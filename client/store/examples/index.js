export const state = () => ({
  city: 'activity.city.ly',
  foods: [{
    value: 'Golden Paste',
    label: '黄金糕'
  },
  {
    value: 'Double-skinned Milk',
    label: '双皮奶',
    disabled: true
  },
  {
    value: 'Oyster Omelet',
    label: '蚵仔煎'
  },
  {
    value: 'Fine Noodles',
    label: '龙须面'
  },
  {
    value: 'Beijing Roast Duck',
    label: '北京烤鸭'
  }],
  // #TODO Review how choices are handled between value and translation tag
  cities: [{
    value: 'activity.city.sh',
    label: 'activity.city.sh'
  },
  {
    value: 'activity.city.bj',
    label: 'activity.city.bj',
    disabled: true
  },
  {
    value: 'activity.city.gz',
    label: 'activity.city.gz'
  },
  {
    value: 'activity.city.ly',
    label: 'activity.city.ly'
  },
  {
    value: 'activity.city.ny',
    label: 'activity.city.ny'
  },
  {
    value: 'activity.city.sz',
    label: 'activity.city.sz'
  }],
  labels: [{
    value: 'activity.label.tag.st',
    label: 'activity.label.tag.st'
  },
  {
    value: 'reduction',
    label: 'activity.label.tag.reduction'
  },
  {
    value: 'points',
    label: 'activity.label.tag.points'
  }],
  organizers: [{
    value: 'market',
    label: '市场部',
    children: [{
      value: 'market',
      label: '交易部'
    },
    {
      value: 'execution',
      label: '执行部'
    },
    {
      value: 'promotion',
      label: '推广部'
    }]
  },
  {
    value: 'operation',
    label: '运营部'
  },
  {
    value: 'sales',
    label: '销售部',
    children: [{
      value: 'regionSales',
      label: '大区销售',
      children: [{
        value: 'eastSales',
        label: '华东销售'
      },
      {
        value: 'northSales',
        label: '华北销售'
      },
      {
        value: 'southSales',
        label: '华南销售'
      }]
    },
    {
      value: 'product',
      label: '商品部'
    },
    {
      value: 'development',
      label: '客户发展'
    }]
  }]
})

export const getters = {
  city (state) {
    return state.city
  },
  organizers (state) {
    return state.organizers
  },
  cities (state) {
    return state.cities
  },
  foods (state) {
    return state.foods
  },
  labels (state) {
    return state.labels
  }
}

export const mutations = {
  SET_CITY (state, city) {
    state.city = city || null
  }

}

export const actions = {
  checkCity ({ commit }, city) {
    commit('SET_CITY', city)
  }
}
