<template>
  <div class="app">
    <el-row class="main">
      <el-col :sm="4" :xs="24" :class="{hide: isMenuHidden, navCol: true}">
        <navbar :class="{hide: isMenuHidden, navCol: true}"></navbar>
      </el-col>
      <el-col :sm="colSize" :xs="24" class="content">
        <el-row><headbar></headbar></el-row>
        <el-row><nuxt></nuxt></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Headbar from '@/components/Headbar'

export default {
  components: {
    Navbar,
    Headbar
  },
  computed: {
    colSize () {
      return this.isMenuHidden ? 24 : 20
    },
    ...mapGetters(['isMenuHidden'])
  }
}
</script>

<style scoped lang="scss">

.app {
  height: 100%;
  .el-row.main {
    height: 100%;
    .el-col {
      height: 100%;
    }
    .navCol {
      transition: width 0.5s, opacity 0.15s ease-out;
      &.hide {
        transition: width 0.5s, opacity 2s ease-in;
      }
    }
    .content {
       transition: width 0.5s, opacity 0.5s ease-in;
     }
  }
  @media (max-width: 768px) {
    height: auto;
  }
}
</style>
