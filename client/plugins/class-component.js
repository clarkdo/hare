import Component from 'vue-class-component'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'asyncData',
  'fetch',
  'middleware',
  'layout',
  'transition',
  'scrollToTop'
])

export { Component as default, State, Getter, Action, Mutation, namespace }
