export const state = () => ({
  activities: [
    {
      'account': '0',
      'date': '2018-01-01',
      'type': 'price',
      'region': '北京',
      'priority': '高',
      'organizer': '市场部',
      'desc': 'Activity 0, as a default Vuex activity entry'
    }
  ]
})

export const mutations = {
  SET_ACTIVITIES (
    state,
    values
  ) {
    for (const activity of values) {
      state.activities.push(Object.assign({}, activity))
    }
  }
}

export const actions = {
  add ({ commit }, activity) {
    const payload = [activity]
    commit('SET_ACTIVITIES', payload)
  }
}

export const getters = {
  activities (state) {
    return state.activities
  },
  title (state) {
    return 'activity.title.create'
  }
}
