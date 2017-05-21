import axios from 'axios'
import { setToken, unsetToken } from '~/utils/auth'

export const strict = true

export const state = {
  authUser: null,
  isMenuHidden: false
}

export const mutations = {
  SET_USER: function (state, authUser) {
    state.authUser = authUser
  },
  SET_MENU_HIDDEN: function (state) {
    state.isMenuHidden = !state.isMenuHidden
  }
}

export const getters = {
  authUser (state) {
    return state.authUser
  },
  isMenuHidden (state) {
    return state.isMenuHidden
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req: { session } }) {
    if (session && session.authUser) {
      commit('SET_USER', session.authUser)
    }
  },
  login ({ commit }, { userName, password, captcha }) {
    return axios.post('hpi/login', {
      userName,
      password,
      captcha
    })
    .then((res) => {
      commit('SET_USER', res.data)
      setToken(res.data['access_token'])
    })
    .catch((error) => {
      let message = error.message
      if (error.response.data) {
        message = (error.response.data.message || message)
      }
      throw new Error(message)
    })
  },
  logout ({ commit }, callback) {
    return axios.post('/hpi/logout')
    .then(() => {
      commit('SET_USER', null)
      unsetToken()
      callback()
    })
  },
  toggleMenu ({ commit }) {
    commit('SET_MENU_HIDDEN')
  }

}
