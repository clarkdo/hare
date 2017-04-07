<template>
  <div class="app">
    <fork-this/>
    <navbar/>
    <div class="main">
      <nuxt/>
    </div>
    <foot/>
  </div>
</template>

<style src="element-ui/lib/theme-default/index.css"></style>

<style scoped lang="scss">
.app {
  height: 100%;
}
</style>

<script>
import Navbar from '~components/Navbar'
import Footer from '~components/Footer'
import ForkThis from '~components/ForkThis'

export default {
  components: {
    Navbar,
    ForkThis,
    foot: Footer
  }
}
</script>
