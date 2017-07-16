import axios from 'axios'
import { getUserFromToken, setToken, unsetToken } from '~/utils/auth'

export const strict = true

export const state = () => ({
  authUser: null,
  locale: null,
  locales: ['zh', 'en'],
  isMenuHidden: false
})

export const mutations = {
  SET_USER: function (state, authUser) {
    state.authUser = authUser
  },
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
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
  nuxtServerInit ({ commit }, { req }) {},
  async login ({ commit }, { userName, password, captcha }) {
    try {
      const { data: { access_token: token } } = await axios.post('/hpi/login', {
        userName,
        password,
        captcha
      })
      setToken(token)
      commit('SET_USER', getUserFromToken(token))
    } catch (error) {
      let message = error.message
      if (error.response.data) {
        message = error.response.data.message || message
      }
      throw new Error(message)
    }
  },
  async logout ({ commit }, callback) {
    await axios.post('/hpi/logout')
    commit('SET_USER', null)
    unsetToken()
    callback()
  },
  toggleMenu ({ commit }) {
    commit('SET_MENU_HIDDEN')
  }
}
