export default function ({ store, redirect }) {
  if (!store.getters.isAuthenticated) {
    return redirect('/auth/sign-in')
  }
}
