<template>
  <div class="navbar">
    <el-menu class="el-menu-demo"
      :default-active="$route.path" theme="dark">
      <header>
          <el-row>
            <el-col :span="20">
              <img src="~/assets/img/logo.svg" alt="Element">
            </el-col>
            <el-col :span="4">
              <div class="nav-icon open" :class="{hide: isMenuHidden}" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </el-col>
          </el-row>
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
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { mapActions } from 'vuex'
import Component, {Getter, namespace } from 'class-component'

const MenuGetter = namespace('menu', Getter)

@Component({
  methods: {
    ...mapActions(['toggleMenu'])
  }
})
export default class Navbar extends Vue {
  @Getter isMenuHidden
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
  .nav-icon {
    span {
      background: #bfcbd9;
    }
  }
  .el-menu {
    height: 100%;
    border-radius: 0;
    header {
      .el-row {
        margin: 0px 20px;
        .nav-icon {
          float: right;
        }
      }
      width: 100%;
      height: 60px;
      background-color: #324157;
      img {
        margin-top: 10px;
      }
    }
  }
  @media (max-width: 768px) {
    position: inherit;
    width: 100%;
    height: auto;
    .el-menu {
      header {
        img {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
