import consts from './consts.json'

/**
 * Nuxt (client) defaults constants.
 *
 * Should mirror with ../server/utils/consts.js
 * But here, we should have only what matters for the client.
 */
export default Object.freeze(
  ...consts
)
