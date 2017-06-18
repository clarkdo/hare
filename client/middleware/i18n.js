export default function ({ app, store, route, params, error, redirect, hotReload }) {
  // Check if middleware called from hot-reloading, ignore
  if (hotReload) return
  // Get locale from params
  const defaultLocale = 'zh'
  const locale = params.lang || defaultLocale
  if (store.state.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  // Set locale
  store.commit('SET_LANG', locale)
  app.i18n.locale = store.state.locale
  // If route is /en/... -> redirect to /...
  if (locale === defaultLocale && route.fullPath.indexOf(`/${defaultLocale}`) === 0) {
    return redirect(route.fullPath.replace(/^\/zh/, '/'))
  }
}
