import axios from 'axios'
import { setAuthHeader } from '~/utils/auth'

const PORT = process.env.PORT || '3000'

export default ({ req, isDev, isServer }) => {
  if (!isServer || req) {
    setAuthHeader(req)
  }
  axios.defaults.timeout = 5000
  // for generate
  if (isServer && !req) {
    axios.defaults.baseURL = `http://127.0.0.1:${PORT}`
  }
}
