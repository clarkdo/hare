import Nuxt from 'nuxt'
import { resolve } from 'path'

export default function createNuxt () {
  const rootDir = resolve(__dirname, '../../')
  let config = require(resolve(rootDir, 'nuxt.config.js'))
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  let nuxt = new Nuxt(config)
  return nuxt
}
