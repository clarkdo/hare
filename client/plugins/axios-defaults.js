import axios from 'axios'
import { setAuthHeader } from '~/utils/auth'

export default ({ req, isDev, isServer }) => {
  setAuthHeader(req)
  axios.defaults.timeout = 5000
}
