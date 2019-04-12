// import { Nuxt } from 'nuxt'
// import { resolve } from 'path'
const { resolve } = require('path')
const { Nuxt } = require('nuxt')

// export default function createNuxt () {
module.exports = function createNuxt() {
  const rootDir = resolve(__dirname, '../../')
  const config = require(resolve(rootDir, 'nuxt.config.js'))
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  const nuxt = new Nuxt(config)
  return nuxt
}
