import axios from 'axios'
import { defaultHeader, clientToken } from '@/utils/auth'

const PORT = process.env.PORT || '3000'

export default ({ req, redirect }) => {
  if (process.client) {
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
  } else {
    axios.defaults.baseURL = `http://127.0.0.1:${PORT}`
  }
  axios.defaults.timeout = 5000
}
