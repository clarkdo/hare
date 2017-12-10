import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Negotiator from 'negotiator'

Vue.use(VueI18n)

export default ({ app, store, req }) => {
  if (process.server) {
    const negotiator = new Negotiator(req)
    const lang = negotiator.language(store.state.locales)
    store.commit('SET_LANG', lang || 'zh')
  }
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale || 'zh',
    fallbackLocale: 'zh',
    messages: {
      zh: require('@/locales/zh.json'),
      en: require('@/locales/en.json')
    }
  })
}
