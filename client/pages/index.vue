<template>
  <div class="banner">
    <fork-this/>
    <div class="banner-sky"></div>
    <div class="container">
      <div class="banner-desc">
        <h2>前端项目模板</h2>
        <p>Hare，一套基于Vue.js 2.x, Koa 2.x, Element-UI and Nuxt.js项目模板。</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'class-component'
import ForkThis from '~components/ForkThis'

@Component({
  components: {
    ForkThis
  }
})
export default class Home extends Vue {
}
</script>

<style scoped lang="scss">
.banner {
  text-align: center;
  height: 100%;
  color: #fff;
  margin-bottom: 130px;
  .container {
    padding: 0 20px;
    position: relative;
  }
}
.banner-sky {
  position: absolute;
  top: 0px;
  bottom: -15px;
  width: 100%;
  margin-top: 0px;
  transform-origin: center;
  background-image: linear-gradient(180deg, #0d1a44 13%, #3c4f91 56%, #5fc1e4 100%);
}
.banner-desc {
  padding-top: 110px;
  padding-left: 30px;
  font-size: 46px;
  position: relative;
  z-index: 10;
  h2 {
    font-size: 46px;
    margin: 0;
    color: #fff;
  }
  p {
    font-size: 20px;
    opacity: .8;
    line-height: 1.8;
    padding-left: 3px;
  }
}
@media (max-width: 1440px) {
  .banner .container {
    width: 100%;
    box-sizing: border-box;
  }
  .banner img {
    right: 0;
  }
}
@media (max-width: 1000px) {
  .banner .container {
    img {
      display: none;
    }
  }
}
@media (max-width: 768px) {
  .banner-desc {
    #line2 {
      display: none;
    }
    h2 {
      font-size: 32px;
    }
    p {
      width: auto;
    }
  }
}
</style>
