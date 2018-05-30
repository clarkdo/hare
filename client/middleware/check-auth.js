export default async ({
  redirect,
  route,
  store,
  req
}) => {
  // If nuxt generate, pass this middleware
  if (process.static) return
  const currentPath = route.path
  const isNotLogin = currentPath !== '/login'
  await store.dispatch('session/hydrate')
  let maybeAuthenticated = await store.getters['session/authenticated']
  if (isNotLogin && maybeAuthenticated === false) {
    redirect('/login', { page: route.fullPath })
  }
}
