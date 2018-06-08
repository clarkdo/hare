const axios = require('axios')
const querystring = require('querystring')
const consts = require('../utils/consts')
const jwtDecode = require('jwt-decode')

/**
 * Have a look at ../utils/consts.js
 */
const LB_ADDR = process.env.LB_ADDR || consts.LB_ADDR
const AXIOS_TIMEOUT = process.env.AXIOS_TIMEOUT || consts.AXIOS_TIMEOUT_DEFAULT
const ENDPOINT_BACKEND_VALIDATE = process.env.ENDPOINT_BACKEND_VALIDATE || consts.ENDPOINT_BACKEND_VALIDATE

const decode = token => {
  return token ? jwtDecode(token) : null
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

const createRequestConfig = (verb, url, requestConfig) => {
  const {
    payload = null,
    ...remainder
  } = requestConfig
  const method = verb.toUpperCase()
  const baseURL = LB_ADDR
  const timeout = AXIOS_TIMEOUT
  let requestConfigObj = {
    ...remainder,
    method,
    baseURL,
    url,
    timeout
  }
  // Maybe stringify data, when
  // - 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  // - method is POST
  if (payload !== null) {
    requestConfigObj.data = querystring.stringify(payload)
  }
  // console.log(`createRequestConfig ${method} ${baseURL}${url}, requestConfig`, {...requestConfigObj})
  return requestConfigObj
}

function axiosRequestCatcher (e) {
  const status = e.response.status
  const statusText = e.response.statusText || e.message
  const {
    url,
    headers,
    method,
    params,
    baseURL
  } = e.response.config
  const recv = {
    status,
    statusText,
    data: e.response.data || {},
    config: {
      url,
      headers,
      method,
      params,
      baseURL
    }
  }
  console.log(`axiosRequestCatcher caught exception ${e.message}, serving:`, {
    ...recv
  })
  return recv
}

/**
 * Make an async off-the-band request.
 *
 * Notice that LB_ADDR can be superseeded to your own backend
 * instead of mocking (static) endpoint.
 *
 * Differeciation factor is when you use /hpi, Koa will take care of it
 * and yours MUST therefore NOT start by /hpi, and Koa will be out of the way.
 *
 * All of this is done when you set your own LB_ADDR environment setup
 * to point to your own API.
 */
const createRequest = async (method, url, requestConfig) => {
  // #TODO #refactorCreateRequestBackIntoKoa Make this only return a request configuration object, and factor axios out from this.
  const requestConfigObj = createRequestConfig(method, url, requestConfig)
  // let axiosRequestStatusCode = 0 // #axiosRequestDEBUG
  // let axiosRequestLog = `${requestConfigObj.method} ${requestConfigObj.baseURL}${requestConfigObj.url}` // #axiosRequestDEBUG
  // console.log(`createRequest for ${axiosRequestLog} BEGIN`, {...requestConfigObj}) // #axiosRequestDEBUG
  const recv = await axios.request(requestConfigObj).catch(e => axiosRequestCatcher(e))
  // axiosRequestStatusCode = recv.status || 0 // #axiosRequestDEBUG
  const data = Object.assign({}, recv.data)

  return Promise.resolve(data)
}

const getUserData = async (token) => {
  const userinfo = [
    'DisplayName',
    'PreferredLanguage',
    'TimeZone'
  ]
  const params = {
    Token: token,
    userinfo: userinfo.join(',')
  }

  /**
   * Would create a request like this;
   *
   *     GET /platform/uaano/oauth/validate?Token=111.222.333&userinfo=PreferredLanguage,TimeZone
   *
   * rel: #refactorCreateRequestBackIntoKoa
   */
  const response = await createRequest('GET', ENDPOINT_BACKEND_VALIDATE, { params })
  // console.log(`getUserData response`, {...response})

  const body = {
    status: response.Status
  }
  body.UserInfo = response.UserInfo || {}

  return Promise.resolve(body)
}

module.exports = {
  decode,
  handleTokenExp,
  createRequest,
  getUserData
}
