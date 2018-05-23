// import { Nuxt } from 'nuxt'
// import { resolve } from 'path'
const { Nuxt } = require('nuxt')
const { resolve } = require('path')

// export default function createNuxt () {
module.exports = function createNuxt () {
  const rootDir = resolve(__dirname, '../../')
  let config = require(resolve(rootDir, 'nuxt.config.js'))
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  let nuxt = new Nuxt(config)
  return nuxt
}
