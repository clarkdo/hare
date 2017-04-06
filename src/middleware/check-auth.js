export default function ({ isServer, store, req }) {
  const loggedUser = {
    username: 'Clark',
    email: 'clark.duxin@gmail.com',
    picture: require('~assets/img/' + ((req || {}).imageName || 'hare-logo-blue.svg'))
  }
  store.commit('SET_USER', loggedUser)
}
