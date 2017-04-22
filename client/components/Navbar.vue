<template>
  <div class="headerWrapper">
    <header class="header" ref="header" :style="headerStyle" :class="{'scrolled': scrolled}">
      <div class="container">
        <h1>
          <nuxt-link to="/">
            <img src="~assets/img/hare-logo.svg" class="nav-logo">
            <img src="~assets/img/hare-logo-small.svg" class="nav-logo-small">
          </nuxt-link>
        </h1>
        <el-menu class="el-menu-demo" mode="horizontal" theme="dark">
          <nuxt-link to="/" exact><el-menu-item index="1">Home</el-menu-item></nuxt-link>
          <el-submenu index="2" v-if="authUser" >
            <template slot="title">业务菜单</template>
            <nuxt-link to="/demo" exact>
              <el-menu-item index="2-1">Demo</el-menu-item>
            </nuxt-link>
            <nuxt-link to="/demo" exact>
              <el-menu-item index="2-2">菜单2</el-menu-item>
            </nuxt-link>
            <nuxt-link to="/demo" exact>
              <el-menu-item index="2-3">菜单3</el-menu-item>
            </nuxt-link>
          </el-submenu>
          <nuxt-link v-if="authUser" to="/about" exact>
            <el-menu-item index="3" v-if="authUser">About</el-menu-item>
          </nuxt-link>
        </el-menu>
      </div>
    </header>
  </div>
</template>

<style lang="scss">
  .headerWrapper {
    height: 80px;
  }
  .header {
    top: 0;
    left: 0;
    color: #fff;
    width: 100%;
    height: 60px;
    z-index: 100;
    position: fixed;
    line-height: 80px;
    transition: all 0.5s ease;
    background-color: #20a0ff;
    .container {
      height: 100%;
      box-sizing: border-box;
    }
    h1 {
      margin: 0;
      float: left;
      font-size: 32px;
      font-weight: normal;
    }
    .el-menu--dark {
      margin: 0;
      padding: 0;
      left: 120px;
      float: left;
      line-height: 80px;
      background: transparent;
      transition: all 0.5s ease;
      background-color: transparent;
      .el-menu-item, .el-submenu .el-submenu__title {
        color: #fff;
        font-size: 16px;
        transition: all 0.5s ease;
        .el-submenu__icon-arrow {
          color: #fff;
        }
        &:hover {
          border-bottom-color: #77c4ff;
          background-color: rgba(32, 160, 255, 0.1);
        }
      }
      .is-active {
        border-bottom-color: #77c4ff;
      }
      .el-submenu .el-menu {
        background-color: #fff;
        .el-menu-item{
          color: #20a0ff;
          &:hover {
            background-color: rgba(32, 160, 255, 0.1);
          }
        }
      }
    }
    &.scrolled {
      height: 40px;
      .nav-logo {
        top: 5px;
        height: 30px;
      }
      .el-menu--dark.el-menu {
        left: 100px;
        .el-menu-item, .el-submenu .el-submenu__title {
          height: 40px;
          padding: 0 10px;
          font-size: 14px;
          line-height: 40px;
        }
        .el-submenu .el-menu {
          top: 45px;
        }
      }
    }
    .nav-logo,
    .nav-logo-small {
      top: 10px;
      height: 40px;
      position: fixed;
      vertical-align: sub;
      transition: all 0.5s ease;
    }
    .nav-logo-small {
      display: none;
    }
  }
  @media (max-width: 850px) {
    .header {
      .nav-logo {
        display: none;
      }
      .nav-logo-small {
        display: inline-block;
      }
      .nav-item {
        margin-left: 6px;
        &:last-child {
          margin-left: 10px;
        }
        a {
          padding: 0 5px;
        }
      }
    }
    &.scrolled {
      height: 40px;
      .nav-logo-small {
        top: 5px;
        height: 30px;
      }
    }
  }
  @media (max-width: 700px) {
    .header {
      .container {
        padding: 0 12px;
      }
      .nav-item a,
      .nav-lang {
        font-size: 12px;
        vertical-align: top;
      }
    }
  }
</style>

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
