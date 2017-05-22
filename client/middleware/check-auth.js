import { getUserInSSR, getUserFromLocalStorage, setAuthHeader } from '~/utils/auth'

export default function ({ isServer, store, req, route, redirect }) {
   // If nuxt generate, pass this middleware
  if (isServer && !req) return
  const authUser = isServer ? getUserInSSR(req) : getUserFromLocalStorage()
  if (authUser && !store.state.authUser) {
    store.commit('SET_USER', authUser)
    setAuthHeader({ isServer, req })
  } else if (!authUser && route.name !== 'login') {
    redirect('/login')
  }
}
