import Vue from 'vue'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'

class TraceEvent {
  bind (el, binding, vnode) {
    if (isEqual(binding) || isEmpty(binding.value)) return

    let args = []
    // use modifier as events
    let events = Object.keys(binding.modifiers).map(modifier => {
      if (binding.modifiers[modifier]) {
        return modifier
      }
    })

    // passing parameters as object
    if (typeof binding.value === 'object') {
      let value = binding.value
      if (value.category) args.push(value.category)
      if (value.action) args.push(value.action)
      if (value.label) args.push(value.label)
      if (value.value) args.push(value.value)
      if (value.nodeid) args.push(value.nodeid)

      // passing parameters as string separate by comma
    } else if (typeof binding.value === 'string') {
      args = binding.value.split(',')
      args.forEach((arg, i) => (args[i] = arg.trim()))
    }

    if (!events.length) events.push('click') // listen click event by default

    // addEventListener for each event, call trackEvent api
    events.forEach((event) => {
      el.addEventListener(event, () => console.log(arguments), false)
    })
  }
}

Vue.directive('trace', new TraceEvent())
