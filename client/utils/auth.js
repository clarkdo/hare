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
  window.localStorage.setItem('user', JSON.stringify(jwtDecode(token)))
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

export const getTokenFromCookie = (req) => {
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getTokenFromLocalStorage = () => {
  return window.localStorage.token
}

export const getUserFromCookie = (req) => {
  let jwt = getTokenFromCookie(req)
  return jwt ? jwtDecode(jwt) : null
}

export const getUserFromLocalStorage = () => {
  const json = window.localStorage.user
  return json ? JSON.parse(json) : undefined
}

export const setAuthHeader = ({isServer = false, req}) => {
  let jwt = isServer ? getTokenFromCookie(req) : getTokenFromLocalStorage()
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
}

export const setSecret = (secret) => window.localStorage.setItem('secret', secret)

export const checkSecret = (secret) => window.localStorage.secret === secret
