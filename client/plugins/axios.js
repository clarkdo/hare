import consts from '@/utils/consts'

// const API_PORT = process.env.API_PORT || '3000'
// const API_HOST = process.env.API_HOST || '127.0.0.1'
// const API_PREFIX = process.env.API_PREFIX || '/'

const AXIOS_TIMEOUT = process.env.AXIOS_TIMEOUT || consts.AXIOS_DEFAULT_TIMEOUT

/**
 * This plugin might be used from both the client and server side, from the context of Nuxt.
 * If you need to change defaults in that context, you can do it here.
 *
 * But you might also want to take a look at process.env.LB_ADDR, and set the private/internal hostnames
 * towards your data sources.
 */
export default async ({
  req,
  $axios
}) => {
  /*
  if (!process.client) {
    const baseURL = `http://${API_HOST}:${API_PORT}${API_PREFIX}`
    $axios.defaults.baseURL = baseURL
    $axios.defaults.browserBaseURL = baseURL
  }
  */
  $axios.defaults.timeout = AXIOS_TIMEOUT
  /*
  $axios.onRequest(config => {
    const verb = config.method.toUpperCase()
    const url = config.url
    console.log(`client/plugins/axios ${verb} ${url}`)
  })
  */
}
