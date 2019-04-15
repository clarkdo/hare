import Vue from 'vue'

export default () => {
  const _oldOnError = Vue.config.errorHandler
  Vue.config.errorHandler = (error, vm) => {
    if (typeof _oldOnError === 'function') {
      _oldOnError.call(this, error, vm)
    }
    // custom operation
  }
}
