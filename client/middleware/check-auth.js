import { getUserInSSR, getUserFromLocalStorage } from '@/utils/auth'

export default function ({ isServer, store, req, route, redirect }) {
  // If nuxt generate, pass this middleware
  if (isServer && !req) return
  const user = isServer ? getUserInSSR(req) : getUserFromLocalStorage()
  if (user && !store.state.authUser) {
    store.commit('SET_USER', user)
  } else if (!user && route.name !== 'login') {
    redirect('/login', { page: route.fullPath })
  }
}
