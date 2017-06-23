import { setAuthHeader } from '~/utils/auth'

export default ({ req }) => {
  setAuthHeader(req)
}
