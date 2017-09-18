import Vue from 'vue'
import Element from 'element-ui/lib/element-ui.common'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

// After plugin: i18n.js
export default ({ store: { state } }) => {
  const locale = state.locale === 'en' ? enLocale : zhLocale
  Vue.use(Element, { locale })
}
