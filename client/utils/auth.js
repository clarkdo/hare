import axios from 'axios'
import cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'

const getQueryParams = () => {
  const params = {}
  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3
  })
  return params
}

export const extractInfoFromHash = () => {
  if (process.SERVER_BUILD) return
  const { id_token, state } = getQueryParams()
  return {
    token: id_token,
    secret: state
  }
}

export const setToken = (token) => {
  if (process.SERVER_BUILD) return
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(getUserFromToken(token)))
  cookie.set('jwt', token)
  setAuthHeader({})
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')
  window.localStorage.removeItem('secret')
  cookie.remove('jwt')
  window.localStorage.setItem('logout', Date.now())
  setAuthHeader({})
}

export const getUserFromToken = (token) => {
  return token ? jwtDecode(token) : null
}

export const getUserInSSR = (req) => {
  let jwt = getTokenFromSSR(req)
  return getUserFromToken(jwt)
}

export const getTokenFromSSR = (req) => {
  return getTokenFromCookie(req) || getTokenFromSession(req)
}

export const getTokenFromSession = (req) => {
  if (!req || !req.session || !req.session.authUser) return
  return req.session.authUser.access_token
}

export const getTokenFromCookie = (req) => {
  if (!req || !req.headers || !req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getUserFromLocalStorage = () => {
  const json = getTokenFromLocalStorage()
  return json ? JSON.parse(json) : undefined
}

export const getTokenFromLocalStorage = () => {
  return window.localStorage ? window.localStorage.user : null
}

export const setAuthHeader = ({isServer = false, req}) => {
  let jwt = isServer ? getUserInSSR(req) : getTokenFromLocalStorage()
  if (jwt) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export const setSecret = (secret) => window.localStorage.setItem('secret', secret)

export const checkSecret = (secret) => window.localStorage.secret === secret
