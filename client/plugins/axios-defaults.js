import axios from 'axios'
import { defaultHeader, clientToken } from '@/utils/auth'

const PORT = process.env.PORT || '3000'

export default ({ req, isServer, redirect }) => {
  if (!isServer) {
    defaultHeader(clientToken())
    axios.interceptors.response.use(
      response => response,
      error => {
        if (
          error.response.status === 401 &&
          !clientToken() &&
          location.pathname !== '/login'
        ) {
          redirect('/login', { page: location.pathname + location.search })
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
