const PORT = process.env.PORT || '3000'

export default Object.freeze({
  API: 'hpi',
  BASE_API: '/hpi',
  HOST: process.env.HOST || '127.0.0.1',
  PORT,
  LB_ADDR: process.env.LB_ADDR || `http://localhost:${PORT}/hpi`
})
