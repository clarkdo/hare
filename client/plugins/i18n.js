import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Negotiator from 'negotiator'
import consts from '../utils/consts'
import { defaultsDeep } from 'lodash'

Vue.use(VueI18n)

export default async ({ app, store, req }) => {
  const fallbackLang = 'zh'
  if (process.server) {
    const negotiator = new Negotiator(req)
    const negotiatorDetectedLang = negotiator.language(store.state.locales)
    store.commit('session/SET_LANG', negotiatorDetectedLang || fallbackLang)
  }

  // Project specific locales
  let en = require('@/locales/en.json')
  let fr = require('@/locales/fr.json')
  let zh = require('@/locales/zh.json')

  // Add Examples locales ONLY if we need them for example/kitchen-sink work.
  if (consts.SHOW_EXAMPLES === true) {
    const examplesLocaleEn = require('@/locales/examples/en.json')
    const examplesLocaleFr = require('@/locales/examples/fr.json')
    const examplesLocaleZh = require('@/locales/examples/zh.json')
    en = defaultsDeep(examplesLocaleEn, en)
    fr = defaultsDeep(examplesLocaleFr, fr)
    zh = defaultsDeep(examplesLocaleZh, zh)
  }

  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  const sessionLang = store.getters['session/lang']
  app.i18n = new VueI18n({
    locale: sessionLang,
    fallbackLocale: fallbackLang,
    messages: { en, fr, zh }
  })
}
