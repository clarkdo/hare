<template>
  <div class="headbar">
    <!--<header class="header" ref="header" :style="headerStyle" :class="{'scrolled': scrolled}">-->
    <header class="header" ref="header">
      <el-row>
        <el-col :span="5">
          <div id="nav-icon" :class="{open: !isMenuHidden}" @click="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </el-col>
        <el-col :offset="13" :span="2">
          <p v-if="authUser">
            <img src="~assets/img/avatar.svg" /> {{authUser.user_name}}
          </p>
        </el-col>
        <el-col :span="2">
          <p><img src="~assets/img/pwd.svg" /> 修改密码</p>
        </el-col>
        <el-col :span="2">
          <p @click="logout"><img src="~assets/img/exit.svg" /> 退出</p>
        </el-col>
      </el-row>
    </header>
  </div>
</template>

<style lang="scss" scoped>
.headbar {
  height: 60px;
  position: relative;
  .header {
    /* Nav Icon */
    #nav-icon {
      $first-top: 5px;
      $space: 8px;
      width: 27px;
      height: 30px;
      position: relative;
      margin: 15px 5px;
      transform: rotate(0deg);
      transition: .5s ease-in-out;
      cursor: pointer;
      span {
        display: block;
        position: absolute;
        height: 2px;
        width: 100%;
        background: #324157;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;
        &:nth-child(1) {
          top: $first-top;
        }
        &:nth-child(2),
        &:nth-child(3) {
          top: $first-top + $space;
        }
        &:nth-child(4) {
          top: $first-top + $space * 2;
        }
      }
      &.open span {
        &:nth-child(1) {
          top: $first-top + $space;
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
          top: $first-top + $space;
          width: 0%;
          left: 50%;
        }
      }
    }
    .el-col:nth-child(2),
    .el-col:nth-child(3),
    .el-col:nth-child(4) {
      cursor: pointer;
      color: #5e6d82;
      border-left: 1px solid #c0ccda;
      p {
        margin: 0 auto;
        text-align: center;
        img {
          vertical-align:middle
        }
      }
    }
    width: 100%;
    height: 60px;
    z-index: 100;
    line-height: 60px;
    border-bottom: 1px solid #c0ccda;
    transition: all 0.5s ease;
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
  @Getter authUser

  logout () {
    this.$store.dispatch('logout', () => {
      this.$router.push('/login')
    })
  }
}
</script>
