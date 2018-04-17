export default async ({
  redirect,
  route,
  store,
  req,
  $axios
}) => {
  // If nuxt generate, pass this middleware
  if (process.static) return
  const maybeReq = process.server ? req : null
  const hasSession = maybeReq !== null && !!maybeReq.session
  let maybeAuthenticated = await store.getters.authenticated
  if (hasSession === true && maybeAuthenticated === false) {
    const { data } = await $axios.get('/hpi/auth/whois')
    store.commit('SET_USER', data)
    maybeAuthenticated = data.authenticated || false
  }
  const currentPath = route.path
  const isNotLogin = currentPath !== '/login'
  if (isNotLogin && maybeAuthenticated === false) {
    redirect('/login', { page: route.fullPath })
  }
}
