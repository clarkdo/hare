const bunyan = require('bunyan')
const mkdirp = require('mkdirp')
const koaBunyan = require('koa-bunyan')
const koaLogger = require('koa-bunyan-logger')

module.exports = function useLogger(app) {
  const isWin = /^win/.test(process.platform)
  // logging
  let logDir = process.env.LOG_DIR || (isWin ? 'C:\\\\log' : '/var/tmp/log')
  mkdirp.sync(logDir)
  logDir = logDir.replace(/(\\|\/)+$/, '') + (isWin ? '\\\\' : '/')

  const level = app.env === 'production' ? 'info' : 'debug'

  const access = {
    type: 'rotating-file',
    path: `${logDir}hare-access.log`,
    level,
    period: '1d',
    count: 4
  }
  const error = {
    type: 'rotating-file',
    path: `${logDir}hare-error.log`,
    level: 'error',
    period: '1d',
    count: 4
  }
  const logger = bunyan.createLogger({
    name: 'hare',
    streams: [
      access,
      error
    ]
  })
  app.use(koaBunyan(logger, { level }))
  app.use(koaLogger(logger))
}
