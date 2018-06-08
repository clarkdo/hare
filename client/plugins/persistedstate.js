/**
 * Selectively persist Vuex state along with Nuxt in Universal App mode
 *
 * CONTEXT:
 *
 * Nuxt supports SSR (a.k.a. Server-Side Render, or "Universal Mode")
 * but vuex-persistedstate initial implementation would only work in
 * SPA mode (a.k.a. Single Page App mode) [1]
 * This is why official sample [3] sets nuxt.config.js to `{mode: "spa"}`
 * and as stated in [3];
 *
 * > (...) because the server doesn't know about the local persisted state (...)
 *
 * Some attempts were made [4] and decided to use Cookies. This would be unacceptable here.
 *
 * [1]: https://github.com/nuxt/nuxt.js/issues/972#issuecomment-332308183
 * [2]: https://github.com/nuxt/nuxt.js/issues/972#issuecomment-311499047
 * [3]: https://github.com/nuxt/nuxt.js/blob/dev/examples/vuex-persistedstate/nuxt.config.js
 * [4]: https://github.com/nuxt/nuxt.js/issues/3031
 */

/**
  * Using solution [5] from mnishihan.
  *
  * > Solution is simple. Just create a nuxt plugin with following code that
  * > utilises onNuxtReady handler and register that plugin with
  * > ssr: false in nuxt.config.js
  *
  * [5]: https://github.com/nuxt/nuxt.js/issues/972#issuecomment-332665946
  *
  * See also https://github.com/robinvdvleuten/vuex-persistedstate/issues/30#issuecomment-394046852
  */

import createPersistedState from 'vuex-persistedstate'

const persistedStateConfig = {
  // The key to store the persisted state under. (default: vuex)
  key: 'hare',

  // An array of any paths to partially persist the state.
  // If no paths are given, the complete state is persisted.
  paths: [
    'menu.hidden',
    'session.locale'
  ]

  // <Function>: A function that will be called to reduce the state to persist based on the given paths.
  // Defaults to include the values.
  // reducer: (state, paths) => {
  //   // See https://github.com/robinvdvleuten/vuex-persistedstate/blob/master/index.js#L37
  // },
}

export default ({
  store,
  isHMR
}) => {
  // context.isServer has been deprecated, please use process.server instead.
  // const isServer = process.server

  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  if (isHMR) return

  // process.client should always be true, because nuxt.conf.js plugin entry has ssr: false. But just in case.
  if (process.client) {
    window.onNuxtReady((nuxt) => {
      createPersistedState(persistedStateConfig)(store) // vuex plugins can be connected to store, even after creation
    })
  }
}
