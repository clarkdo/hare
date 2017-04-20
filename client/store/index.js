import axios from 'axios'

export const state = {
  authUser: null
}

export const mutations = {
  SET_USER: function (state, authUser) {
    state.authUser = authUser
  }
}

export const getters = {
  authUser (state) {
    return state.authUser
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req: { session } }) {
    if (session && session.authUser) {
      commit('SET_USER', session.authUser)
    }
  },
  login ({ commit }, { userName, password, captcha }) {
    return axios.post('/api/login', {
      userName,
      password,
      captcha
    })
    .then((res) => {
      commit('SET_USER', res.data)
    })
    .catch((error) => {
      let message = error.message
      if (error.response.data) {
        message = (error.response.data.message || message)
      }
      throw new Error(message)
    })
  },

  logout ({ commit }) {
    return axios.post('/api/logout')
    .then(() => {
      commit('SET_USER', null)
    })
  }

}
