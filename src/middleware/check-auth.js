export default function ({ isServer, store, req }) {
  const loggedUser = {}
  store.commit('SET_USER', loggedUser)
}
