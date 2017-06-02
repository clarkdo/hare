<template>
  <div class="app">
    <el-row class='main'>
      <el-col :span="4" :class="{hide: isMenuHidden, navCol: true}">
        <navbar :authUser="authUser"/>
      </el-col>
      <el-col :span="colSize" class="content">
        <el-row><headbar/></el-row>
        <el-row><nuxt/></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '~components/Navbar'
import Footer from '~components/Footer'
import Headbar from '~components/Headbar'

export default {
  components: {
    Navbar,
    Headbar,
    foot: Footer
  },
  computed: {
    colSize () {
      return this.isMenuHidden ? 24 : 20
    },
    ...mapGetters(['authUser', 'isMenuHidden'])
  }
}
</script>

<style src="element-ui/lib/theme-default/index.css"></style>

<style scoped lang="scss">
.navCol {
  &.hide {
    opacity: 0;
    width: 0;
    transition: width 0.5s, opacity 0.5s ease-out;
  }
  transition: width 0.5s, opacity 0.5s ease-in;
}
.app {
  height: 100%;
  .el-row.main {
    height: 100%;
    .el-col {
      height: 100%;
    }
    .content {
      transition: width 0.5s, opacity 0.5s ease-in;
    }
  }
}
</style>
