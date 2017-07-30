import axios from 'axios'
import cookie from 'cookie'
import cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import consts from '~/utils/consts'

const inBrowser = typeof window !== 'undefined'
const jwtKey = consts.COOKIE_JWT

export const setToken = token => {
  if (process.SERVER_BUILD) return
  let exp = jwtDecode(token).exp
  window.localStorage.setItem(
    'token',
    JSON.stringify({
      value: token,
      exp: exp
    })
  )
  cookies.set(jwtKey, token, { expires: new Date(exp) })
  setAuthHeader()
}

export const unsetToken = () => {
  if (process.SERVER_BUILD) return
  window.localStorage.removeItem('token')
  cookies.remove(jwtKey)
  window.localStorage.setItem('logout', Date.now())
  setAuthHeader()
}

export const getUserFromToken = token => {
  return token ? jwtDecode(token) : null
}

export const getUserInSSR = req => {
  return getUserFromToken(getTokenInSSR(req))
}

export const getTokenInSSR = req => {
  return getTokenFromCookie(req) || getTokenFromSession(req)
}

export const getTokenFromSession = req => {
  if (req && req.session) {
    return req.session.jwt
  }
}

export const getTokenFromCookie = req => {
  const cookieStr = inBrowser ? document.cookie : req.headers.cookie
  const cookies = cookie.parse(cookieStr || '') || {}
  return cookies[jwtKey]
}

export const getUserFromLocalStorage = () => {
  const json = getTokenFromLocalStorage()
  return json ? jwtDecode(json) : undefined
}

export const getTokenFromLocalStorage = () => {
  if (window.localStorage && window.localStorage.token) {
    let token = JSON.parse(window.localStorage.token)
    if (new Date().getTime() >= token.exp) {
      unsetToken()
      return
    }
    return token ? token.value : null
  }
}

export const setAuthHeader = req => {
  let jwt = inBrowser ? getTokenFromLocalStorage() : getTokenInSSR(req)
  if (jwt) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}
