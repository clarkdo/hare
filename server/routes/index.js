const consts = require('../utils/consts')
const auth = require('./auth')
const examples = require('./examples')
const menu = require('./menu')

module.exports = (app) => {
  app.use(auth)
  app.use(menu)

  if (consts.SHOW_EXAMPLES === true) {
    app.use(examples)
  }
}
