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
  if (token) {
    if (new Date().getTime() >= token.exp) {
      return delToken()
    }
    return token.value
  }
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

/**
 * Handle possibility where token endpoint, at exp returns seconds instead of µ seconds
 */
const handleTokenExp = exp => {
  let out = exp

  const milliseconds = new Date().getTime()
  // const millisecondsDigitCount = ((milliseconds).toString()).length
  const seconds = Math.floor(milliseconds / 1000)
  const secondsDigitCount = ((seconds).toString()).length

  const isExpressedInSeconds = ((exp).toString()).length === secondsDigitCount
  // const isExpressedInMilliSeconds = ((exp).toString()).length === millisecondsDigitCount

  // If the exp is 25 hours or less, adjust the time to miliseconds
  // Otherwise let's not touch it
  if (isExpressedInSeconds) {
    const durationInSeconds = Math.floor((exp - seconds))
    const hours = Math.floor(durationInSeconds / 3600)
    if (hours < 25) { // Make 25 configurable?
      out *= 1000
    }
  }

  return out
}

export const saveToken = token => {
  if (process.server) return
  defaultHeader(token)
  const user = decode(token)
  const exp = handleTokenExp(user.exp)
  const cookieData = {
    expires: new Date(exp)
  }
  cookies.set(jwtKey, token, cookieData)
  window.localStorage.setItem('token', JSON.stringify({ value: token, exp }))
  return user
}

export const delToken = () => {
  if (process.server) return
  defaultHeader()
  cookies.remove(jwtKey)
  window.localStorage.removeItem('token')
  window.localStorage.setItem('logout', Date.now())
}
