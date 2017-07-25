import axios from 'axios'
import { setAuthHeader, getUserFromLocalStorage } from '~/utils/auth'

const PORT = process.env.PORT || '3000'

export default ({ req, isDev, isServer, route, redirect }) => {
  if (!isServer) {
    setAuthHeader(req)
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401 && !getUserFromLocalStorage()) {
          redirect('/login', { page: route.fullPath })
        }
        return Promise.reject(error)
      }
    )
  }
  axios.defaults.timeout = 5000
  // for generate
  if (isServer && !req) {
    axios.defaults.baseURL = `http://127.0.0.1:${PORT}`
  }
}
