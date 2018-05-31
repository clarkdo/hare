import consts from '@/utils/consts'

// const API_PORT = process.env.API_PORT || '3000'
// const API_HOST = process.env.API_HOST || '127.0.0.1'
// const API_PREFIX = process.env.API_PREFIX || '/'

const AXIOS_TIMEOUT = process.env.AXIOS_TIMEOUT || consts.AXIOS_DEFAULT_TIMEOUT

export default async ({
  req,
  $axios
}) => {
  if (!process.client) {
    // const baseURL = `http://${API_HOST}:${API_PORT}${API_PREFIX}`
    // $axios.defaults.baseURL = baseURL
    // $axios.defaults.browserBaseURL = baseURL
  }
  $axios.defaults.timeout = AXIOS_TIMEOUT
  $axios.onRequest(config => {
    const method = config.method
    const url = config.url
    console.log(` ${method} ${url}`)
  })
}
