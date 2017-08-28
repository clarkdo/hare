import axios from 'axios'
import cookie from 'cookie'
import cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import consts from '@/utils/consts'

const inBrowser = typeof window !== 'undefined'
const jwtKey = consts.COOKIE_JWT

const cookieToken = req => {
  const cookieStr = req && req.headers && req.headers.cookie
  return !!cookieStr && cookie.parse(cookieStr)[jwtKey]
}

const serverToken = req => {
  let token = cookieToken(req)
  if (!token && req && req.session) {
    token = req.session.jwt
  }
  return token
}

export const clientToken = () => {
  if (!inBrowser || !window.localStorage.token) return null
  let token = JSON.parse(window.localStorage.token)
  if (new Date().getTime() >= token.exp) {
    return delToken()
  }
  return token ? token.value : null
}

export const decode = token => {
  return token ? jwtDecode(token) : null
}

export const user = req => {
  const token = req ? serverToken(req) : clientToken()
  return decode(token)
}

export const defaultHeader = jwt => {
  if (jwt) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export const saveToken = token => {
  if (process.server) return
  defaultHeader(token)
  const user = decode(token)
  cookies.set(jwtKey, token, { expires: new Date(user.exp) })
  window.localStorage.setItem('token', JSON.stringify({ value: token, exp: user.exp }))
  return user
}

export const delToken = () => {
  if (process.server) return
  defaultHeader()
  cookies.remove(jwtKey)
  window.localStorage.removeItem('token')
  window.localStorage.setItem('logout', Date.now())
}
