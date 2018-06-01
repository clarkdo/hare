export const strict = true

export const state = () => ({
  activities: [
    {
      'id': '0',
      'account': '0',
      'date': '2018-01-01',
      'type': 'activity.type.price',
      'city': 'activity.city.sz',
      'priority': 'activity.priority.medium',
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
    /**
     * We are not dealing with id columns here.
     * That should be done in some way.
     * Because, as it is, we may end up with two
     * entries with the same id.
     */
    for (const activity of values) {
      state.activities.push({...activity})
    }
  }
}

export const getters = {
  activities (state) {
    return state.activities
  },
  length (state) {
    return state.activities.length
  },
  filterBy: state => (key, seek) => state.activities.filter(activity => {
    const hasKey = Reflect.has(activity, key)
    const hasSeekNotFalse = hasKey ? activity[key] === seek : false
    return hasSeekNotFalse !== false
  }),
  title (state) {
    return 'activity.title.create'
  }
}

export const actions = {
  async hydrate ({
    commit
  }) {
    const activities = await this.$axios.get('/hpi/examples/activity').then(recv => recv.data)
    commit('SET_ACTIVITIES', activities)
  },
  async add ({
    commit,
    dispatch,
    state
  }, activity) {
    const hasNoId = Reflect.has(activity, 'id') === false
    if (hasNoId) {
      await dispatch('hydrate')
      const length = state.activities.length
      const newId = length + 1
      activity.id = `${newId}`
    }
    const activities = [activity]
    commit('SET_ACTIVITIES', activities)
  }
}
