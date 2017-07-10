export const state = () => ({
  city: 'GuangZhou'
})

export const mutations = {
  SET_CITY (state, city) {
    state.city = city || null
  }
}

export const getters = {
  city (state) {
    return state.city
  },
  foods (state) {
    return [{
      value: 'Golden Paste',
      label: '黄金糕'
    }, {
      value: 'Double-skinned Milk',
      label: '双皮奶',
      disabled: true
    }, {
      value: 'Oyster Omelet',
      label: '蚵仔煎'
    }, {
      value: 'Fine Noodles',
      label: '龙须面'
    }, {
      value: 'Beijing Roast Duck',
      label: '北京烤鸭'
    }]
  },
  cities (state) {
    return [{
      value: 'ShangHai',
      label: '上海'
    }, {
      value: 'BeiJing',
      label: '北京',
      disabled: true
    }, {
      value: 'GuangZhou',
      label: '广州'
    }, {
      value: 'ShenZhen',
      label: '深圳'
    }]
  },
  labels () {
    return [{
      value: 'st',
      label: 'activity.label.tag.st'
    }, {
      value: 'reduction',
      label: 'activity.label.tag.reduction'
    }, {
      value: 'points',
      label: 'activity.label.tag.points'
    }]
  },
  organizers () {
    return [{
      value: 'market',
      label: '市场部',
      children: [{
        value: 'market',
        label: '交易部'
      }, {
        value: 'execution',
        label: '执行部'
      }, {
        value: 'promotion',
        label: '推广部'
      }]
    }, {
      value: 'operation',
      label: '运营部'
    }, {
      value: 'sales',
      label: '销售部',
      children: [{
        value: 'regionSales',
        label: '大区销售',
        children: [{
          value: 'eastSales',
          label: '华东销售'
        }, {
          value: 'northSales',
          label: '华北销售'
        }, {
          value: 'southSales',
          label: '华南销售'
        }]
      }, {
        value: 'product',
        label: '商品部'
      }, {
        value: 'development',
        label: '客户发展'
      }]
    }]
  }
}

export const actions = {
  checkCity ({ commit }, city) {
    console.log(city)
    commit('SET_CITY', city)
  }
}
