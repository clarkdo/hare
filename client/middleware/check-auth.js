import { user as getUser } from '@/utils/auth'

export default function ({ isServer, store, req, route, redirect }) {
  // If nuxt generate, pass this middleware
  if (isServer && !req) return
  const user = getUser(isServer ? req : null)
  if (user && !store.state.authUser) {
    store.commit('SET_USER', user)
  } else if (!user && route.name !== 'login') {
    redirect('/login', { page: route.fullPath })
  }
}
