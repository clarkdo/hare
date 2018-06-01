export default async ({
  redirect,
  route,
  store,
  req
}) => {
  // If nuxt generate, pass this middleware
  if (process.static) return
  const path = route.path
  const isNotLogin = /\/login$/.test(path) !== true
  const isHydrated = await store.getters['session/hydrated']
  // const isClient = process.client
  // const isServer = process.server
  // console.log('client/middleware/check-auth', { path, isNotLogin, isHydrated, isClient, isServer })
  if (!isHydrated) {
    await store.dispatch('session/hydrate')
  }
  let authenticated = await store.getters['session/authenticated']
  if (isNotLogin && authenticated === false) {
    redirect('/login', { page: route.fullPath })
  }
}
