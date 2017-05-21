<template>
  <div class="app">
    <fork-this v-if="$route.name == 'index'"/>
    <el-row class='main'>
      <el-col :span="4"  :class="{hide: isMenuHidden, navCol: true}">
        <navbar :authUser="authUser"/>
      </el-col>
      <el-col :span="colSize" class="content">
        <el-row><headbar/></el-row>
        <el-row><nuxt/></el-row>
      </el-col>
    </el-row>
    <!--<el-row>
      <el-col :offset="offsetSize" :span="colSize">
        <foot/>
      </el-col>
    </el-row>-->
  </div>
</template>

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

<script>
import { mapGetters } from 'vuex'
import Navbar from '~components/Navbar'
import Footer from '~components/Footer'
import Headbar from '~components/Headbar'
import ForkThis from '~components/ForkThis'

export default {
  components: {
    Navbar,
    Headbar,
    ForkThis,
    foot: Footer
  },
  computed: {
    colSize () {
      return this.isMenuHidden ? 24 : 20
    },
    ...mapGetters(['authUser', 'isMenuHidden'])
  },
  data () {
    return {
    //  colSize: 20,
      offsetSize: 4
    }
  }
}
</script>
