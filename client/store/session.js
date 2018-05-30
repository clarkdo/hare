import Vue from 'vue'
import {
  get
} from 'lodash'

const fallbackLocale = 'zh-HK'
const fallbackLang = 'zh'
const fallbackTimeZone = 'Asia/Hong_Kong'
const fallbackDisplayName = 'Anonymous'

// See also ../../server/api/routes-auth.js at keysMapWithLodashPathAndDefault
const backendServiceKeyAuthenticatedBoolean = 'authenticated'
const backendServiceKeyDisplayNameString = 'displayName'
const backendServiceKeyTimeZoneString = 'tz'
const backendServiceKeyLocaleString = 'locale'

export const strict = true

export const state = () => ({
  user: {
    authenticated: false
  },
  locale: fallbackLocale,
  lang: fallbackLang,
  /**
   * If we checked "show me the accessToken" at login.
   *
   * This Should not be kept or persisted in localStorage/sessionStorage.
   * But can be useful if we want to allow user to get a copy of the accessToken
   * if they need it for issuing cURL/HTTP requests from their own systems.
   *
   * We're going to have this accessToken stored here temporarily until the user
   * had the chance to copy it for his own use.
   *
   * We do not need the accessToken anywhere else because ../../server/api/routes-auth.js
   * already is storing and managing that accessToken through HTTP Only Cookie.
   *
   * rel: #JwtTokenAreTooValuableToBeNonHttpOnly
   */
  accessToken: ''
})

export const mutations = {
  SET_USER (
    state,
    user = null
  ) {
    let values = {
      authenticated: false
    }
    if (user !== null) {
      values = Object.assign(values, user)
    }
    for (const [
      key,
      value
    ] of Object.entries(values)) {
      Vue.set(state.user, key, value)
    }
  },
  SET_LOCALE (
    state,
    locale
  ) {
    state.locale = locale
  },
  SET_LANG (
    state,
    lang
  ) {
    state.lang = lang
  },
  SET_ACCESS_TOKEN (
    state,
    accessToken
  ) {
    state.accessToken = accessToken
  }
}

export const getters = {
  lang (state) {
    return state.locale.toLowerCase().split('-')[0]
  },
  authenticated (state) {
    return get(state.user, backendServiceKeyAuthenticatedBoolean, false)
  },
  timeZone (state) {
    return get(state.user, backendServiceKeyTimeZoneString, fallbackTimeZone)
  },
  displayName (state) {
    return get(state.user, backendServiceKeyDisplayNameString, fallbackDisplayName)
  },
  token (state) {
    return state.accessToken
  }
}

export const actions = {
  async hydrate ({
    commit
  }) {
    const user = await this.$axios.get('/hpi/auth/whois').then(recv => recv.data)
    commit('SET_USER', user)
    const locale = get(user, backendServiceKeyLocaleString, fallbackLocale)
    commit('SET_LOCALE', locale)
  },
  async login ({
    dispatch,
    commit
  }, {
    userName,
    password,
    captcha,
    showAccessToken
  }) {
    try {
      const response = await this.$axios.post('/hpi/auth/login', {
        userName,
        password,
        captcha,
        showAccessToken
      }).then(recv => recv.data)
      const responseAccessToken = get(response, 'access_token', null)
      const requestShowAccessTokenTrue = showAccessToken === true
      if (requestShowAccessTokenTrue && responseAccessToken !== null) {
        commit('SET_ACCESS_TOKEN', responseAccessToken)
      }
      await dispatch('hydrate')
    } catch (error) {
      let message = error.message
      if (error.response.data) {
        message = error.response.data.message || message
      }
      throw new Error(message)
    }
  },
  async logout ({ commit }, callback) {
    await this.$axios.post('/hpi/auth/logout')
    commit('SET_USER')
    callback()
  }
}
