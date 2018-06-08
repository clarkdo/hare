const {
  SHOW_EXAMPLES_DEFAULT
} = require('./consts')

/**
 * This file contains a simplistic map of what environment variables we want to expose.
 * Nothing too formal to do here, no validation is planned for this, thus far.
 *
 * Any key in this file would seek
 * null means we're OK defaulting to null, if no environment variable had been found at startup.
 * false means don't show if nothing was found.
 */
const keys = require('./env-exportables.json')

/**
 * Provide a prefered default if non had been found at startup.
 */
const exportablesDefaultsMap = {
  SHOW_EXAMPLES: SHOW_EXAMPLES_DEFAULT
}

/**
 * Handle string "true" so it becomes boolean.
 * Useful for this case, because we're importing from Shell Environment variables and there are no boolean types.
 */
const stringToBoolean = s => typeof s === 'string' && /^(true|false)$/ig.test(s)

// See also ../../nuxt.config.js
const processEnv = hashMap => {
  const exportables = {...keys} // Create a copy, like Object.assign.
  for (const [
    key,
    nullOrFalse
  ] of Object.entries(exportables)) {
    if (Reflect.has(hashMap, key)) {
      let value = hashMap[key]
      if (typeof value === 'string' && stringToBoolean(value)) {
        value = hashMap[key].toLowerCase() === 'true'
      }
      exportables[key] = JSON.parse(JSON.stringify(value))
    } else {
      if (Object.keys(exportablesDefaultsMap).includes(key)) {
        // If value is NOT SET, but WE DO HAVE a default value.
        exportables[key] = JSON.parse(JSON.stringify(exportablesDefaultsMap[key]))
      } else if (nullOrFalse === false) {
        // If value is false, we do not show it if nothing is present
        // If value is null, and no value is set, set null (i.e. use the already set value above.)
        Reflect.deleteProperty(exportables, key)
      }
    }
  }

  return Object.freeze({...exportables})
}

module.exports = processEnv
