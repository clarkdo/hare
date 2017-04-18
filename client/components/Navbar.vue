<template>
  <div class="headerWrapper">
    <header class="header" ref="header" :style="headerStyle">
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
    height: 60px;
    background-color: #20a0ff;
    color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 80px;
    z-index: 100;
    position: fixed;
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
    .el-menu {
      float: right;
      line-height: 80px;
      background: transparent;
      padding: 0;
      margin: 0;
    }
    .el-menu--dark {
      background-color: transparent;
      .el-menu-item, .el-submenu .el-submenu__title {
        color: #fff;
        font-size: 16px;
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
        .el-menu-item{
          color: #20a0ff;
          &:hover {
            background-color: rgba(32, 160, 255, 0.1);
          }
        }
        background-color: #fff;
      }
    }
    .nav-logo,
    .nav-logo-small {
      position: fixed;
      top: 10px;
      vertical-align: sub;
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
  export default {
    props: ['authUser'],
    data () {
      return {
        isHome: false,
        headerStyle: {
          backgroundColor: 'rgba(32, 160, 255, 0)'
        }
      }
    },
    watch: {
      '$route.path': {
        immediate: true,
        handler () {
          this.isHome = /^(home|index)/.test(this.$route.name)
          this.headerStyle.backgroundColor = `rgba(32, 160, 255, ${this.isHome ? '0' : '1'})`
        }
      }
    },
    mounted () {
      function scroll (fn) {
        window.addEventListener('scroll', () => {
          fn()
        }, false)
      }
      scroll(() => {
        if (this.isHome) {
          const threshold = 200
          let alpha = Math.min((document.documentElement.scrollTop || document.body.scrollTop), threshold) / threshold
          this.headerStyle.backgroundColor = `rgba(32, 160, 255, ${alpha})`
        }
      })
    }
  }
</script>
