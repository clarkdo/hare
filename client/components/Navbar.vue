<template>
  <div class="navbar">
    <el-menu class="el-menu-demo" default-active="1" theme="dark">
      <header>
          <img src="~assets/img/logo.svg" alt="Element">
      </header>
      <nuxt-link to="/" exact><el-menu-item index="1"><i class="el-icon-message"></i>{{$t("nav.home")}}</el-menu-item></nuxt-link>
      <el-submenu index="2" v-if="authUser" >
        <template slot="title"><i class="el-icon-edit"></i>{{$t("nav.activity")}}</template>
        <nuxt-link to="/demo" exact>
          <el-menu-item index="2-1">{{$t("nav.demo")}}</el-menu-item>
        </nuxt-link>
        <nuxt-link to="/marketing/activity/" exact>
          <el-menu-item index="2-2">{{$t("nav.list")}}</el-menu-item>
        </nuxt-link>
        <nuxt-link to="/marketing/activity/create" exact>
          <el-menu-item index="2-3">{{$t("nav.create")}}</el-menu-item>
        </nuxt-link>
      </el-submenu>
      <nuxt-link v-if="authUser" to="/about" exact>
        <el-menu-item index="3" v-if="authUser"><i class="el-icon-menu"></i>{{$t("nav.about")}}</el-menu-item>
      </nuxt-link>
    </el-menu>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'class-component'

@Component({
  props: {
    authUser: Object
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler () {
        this.isHome = /^(home|index)/.test(this.$route.name)
        this.headerStyle.backgroundColor = `rgba(32, 160, 255, ${this.isHome ? '0' : '1'})`
      }
    }
  }
})
export default class Navbar extends Vue {
  isHome = false
  scrolled = false
  headerStyle = { backgroundColor: 'rgba(32, 160, 255, 0)' }
  mounted () {
    function scroll (fn) {
      window.addEventListener('scroll', () => {
        fn()
      }, false)
    }
    scroll(() => {
      let top = (document.documentElement.scrollTop || document.body.scrollTop)
      if (this.isHome) {
        const threshold = 200
        let alpha = Math.min(top, threshold) / threshold
        this.headerStyle.backgroundColor = `rgba(32, 160, 255, ${alpha})`
        this.scrolled = false
      } else {
        this.scrolled = top > 0
        if (this.scrolled) {
          this.headerStyle.backgroundColor = '#14afff'
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;
  z-index: 9999;
  .el-menu {
    height: 100%;
    border-radius: 0;
    header {
      width: 100%;
      height: 60px;
      background-color: #324157;
      img {
        margin-left: 25%;
        margin-top: 10px;
      }
    }
  }
}
</style>
