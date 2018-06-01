<template>
  <div>
    <h1>About Page</h1>
    <p>Hello, I am the about page :)</p>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'class-component'

@Component({
  head () {
    return {
      title: 'About'
    }
  }
})
export default class About extends Vue {}
</script>