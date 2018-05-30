
export const strict = true

export const state = () => ({
  locales: [
    'en',
    'fr',
    'zh'
  ]
})

export const actions = {
  /**
   * This is run ONLY from the backend side.
   *
   * > If the action nuxtServerInit is defined in the store, Nuxt.js will call it with the context
   * > (only from the server-side).
   * > It's useful when we have some data on the server we want to give directly to the client-side.
   *
   * https://nuxtjs.org/guide/vuex-store#the-nuxtserverinit-action
   * https://github.com/nuxt/docs/blob/master/en/guide/vuex-store.md
   */
  nuxtServerInit ({
    commit
  }, {
    req
  }) {
    /** Do things here **/
  }
}
