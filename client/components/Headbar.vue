<template>
  <div class="headbar">
    <!--<header class="header" ref="header" :style="headerStyle" :class="{'scrolled': scrolled}">-->
    <header class="header" ref="header">
      <div id="nav-icon" :class="{open: !isMenuHidden}" @click="toggleMenu()">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <!--<div class="container">
        <h1>
          <nuxt-link to="/">
            <img src="~assets/img/hare-logo.svg" class="nav-logo">
            <img src="~assets/img/hare-logo-small.svg" class="nav-logo-small">
          </nuxt-link>
        </h1>
      </div>-->
    </header>
  </div>
</template>

<style lang="scss" scoped>
.headbar {
  height: 60px;
  .header {
    /* Nav Icon */
    #nav-icon {
      width: 30px;
      height: 30px;
      position: relative;
      margin: 20px 5px;
      transform: rotate(0deg);
      transition: .5s ease-in-out;
      cursor: pointer;
      span {
        display: block;
        position: absolute;
        height: 4px;
        width: 100%;
        background: #324157;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
        &:nth-child(1) {
          top: 0px;
        }
        &:nth-child(2),
        &:nth-child(3) {
          top: 8px;
        }
        &:nth-child(4) {
          top: 16px;
        }
      }
      &.open span {
        &:nth-child(1) {
          top: 8px;
          width: 0%;
          left: 50%;
        }
        &:nth-child(2) {
          transform: rotate(45deg);
        }
        &:nth-child(3) {
          transform: rotate(-45deg);
        }
        &:nth-child(4) {
          top: 8px;
          width: 0%;
          left: 50%;
        }
      }
    }
    color: #fff;
    width: 100%;
    height: 60px;
    z-index: 100;
    position: fixed;
    line-height: 80px;
    transition: all 0.5s ease;
    background-color: #fff;
    background-color: #20a0ff;
    .container {
      padding-left: 40px;
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
}
</style>

<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
import Component, { Getter } from 'class-component'

@Component({
  methods: {
    ...mapActions(['toggleMenu'])
  }
})
export default class Headbar extends Vue {
  @Getter isMenuHidden
}
</script>
