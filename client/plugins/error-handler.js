import Vue from 'vue'

const _oldOnError = Vue.config.errorHandler
Vue.config.errorHandler = (error, vm) => {
  if (typeof _oldOnError === 'function') {
    _oldOnError.call(this, error, vm)
  }
  // custom operation
}
