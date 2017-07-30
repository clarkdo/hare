<template>
  <div class="navbar">
    <el-menu v-if="menus && menus.length" class="el-menu-demo"
      :default-active="$route.path" theme="dark">
      <header>
          <img src="~@/assets/img/logo.svg" alt="Element">
      </header>
      <div v-for="menu in menus" :key="menu.id">
        <el-submenu v-if="menu.children && menu.children.length" :index="menu.url || menu.name">
          <template slot="title"><i v-if="menu.icon" :class="menu.icon"></i>{{menu.name}}</template>
          <nuxt-link v-for="subMenu in menu.children" :key="subMenu.id" :to="subMenu.url" exact>
            <el-menu-item :index="subMenu.url || subMenu.name">
              <i v-if="subMenu.icon" :class="subMenu.icon"></i>{{subMenu.name}}
            </el-menu-item>
          </nuxt-link>
        </el-submenu>
        <nuxt-link v-else :to="menu.url" exact>
          <el-menu-item :index="menu.url || menu.name">
            <i v-if="menu.icon" :class="menu.icon"></i>{{menu.name}}
            </el-menu-item>
        </nuxt-link>
      </div>
    </el-menu>
    <ul v-else class="el-menu el-menu-demo el-menu--dark">
      <header>
          <img src="~@/assets/img/logo.svg" alt="Element">
      </header>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Component, {Getter, namespace } from 'class-component'

const MenuGetter = namespace('menu', Getter)

@Component
export default class Navbar extends Vue {
  @MenuGetter menus

  async beforeMount () {
    let {data: menus} = await axios.get('/hpi/menus')
    if (Array.isArray(menus) && menus.length) {
      this.$store.dispatch('menu/addAll', this.translateMenus(menus))
    }
  }

  translateMenus (menus) {
    return menus.map((menu) => {
      const subMenus = menu.children
      if (Array.isArray(subMenus) && subMenus.length) {
        this.translateMenus(subMenus)
      }
      menu.name = this.$t(menu.name || '')
      return menu
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;
  width: 16.66667%;
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
