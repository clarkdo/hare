<template>
  <div>
    <div class="banner">
      <div class="banner-sky"></div>
      <img class="banner-stars" src="~assets/img/stars.png" alt="Element">
      <div class="container">
        <div class="banner-desc">
          <h2>前端项目模板</h2>
          <div id="line2" class="actor"></div>
          <p>Hare，一套基于Vue.js 2.x, Koa 2.x, Element-UI and Nuxt.js项目模板。</p>
        </div>
        <img src="~assets/img/banner-bg.svg" alt="Element">
        <el-card v-if="authUser">
          <el-row>
            <el-col :span="24">
              欢迎登录本系统!
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              用户: {{authUser.user_name}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" class="logout" @click="logout">注销</el-button>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .actor {
    min-height: 65px;
    &:after {
      content: '';
      width: 6px;
      height: 50px;
      vertical-align: -8px;
      margin-left: 5px;
      background-color: #fff;
      display: inline-block;
      animation: blink 400ms infinite alternate;
    }
  }
  .banner {
    position: relative;
    height: 420px;
    color: #fff;
    margin-bottom: 130px;
    .container {
      padding: 0 20px;
      position: relative;
    }
    img {
      position: absolute;
      top: 15px;
      right: 0px;
    }
  }
  .banner-sky {
    position: absolute;
    top: 0px;
    bottom: -15px;
    width: 100%;
    margin-top: 0px;
    //transform: skewY(-5deg);
    transform-origin: center;
    background-image: linear-gradient(180deg, #0d1a44 13%, #3c4f91 56%, #5fc1e4 100%);
  }
  img.banner-stars {
    top: 100px;
    left: 60%;
    transform: translateX(-50%);
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
      width: 420px;
      line-height: 1.8;
      padding-left: 3px;
    }
  }
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-card {
    color: #000;
    width: 300px;
    margin-left: 30px;
    text-align: center;
    .login {
      width: 100%;
    };
  }
  .captcha {
    height: 36px;
  }
  @keyframes blink {
    from { opacity: 0; }
    to { opacity: 1; }
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
    .banner-stars {
      display: none;
    }
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

<script>
import Vue from 'vue'
import theaterJS from 'theaterjs'
import Component, { Getter } from 'class-component'

@Component
export default class Home extends Vue {
  @Getter authUser

  mounted () {
    function typing (theater) {
      theater
        .addScene('产品设计师', 1800, -5, 800)
        .addScene('交互设计师', 1800, -5, 500)
        .addScene('视觉设计师', 1800, -5, 700)
        .addScene('产品经理', 1800, -4, 600)
        .addScene('前端工程师', 1800, -5, 800)
        .addScene((done) => {
          typing(theater)
          done()
        })
    }
    var theater = theaterJS()
    theater
      .on('type:start, erase:start', function () {
        theater.getCurrentActor().$element.classList.add('typing')
      })
      .on('type:end, erase:end', function () {
        theater.getCurrentActor().$element.classList.remove('typing')
      })
    theater
      .addActor('line2', { speed: 0.5, accuracy: 1 })
      .addScene(2600)
      .addScene('line2:只为守护世界和平', 300, -6, 1000)
      .addScene('让你少加班', 300, -5)
      .addScene('line2:只为这样的你: ', 400)
      .addScene((done) => {
        typing(theater)
        done()
      })
  }
  logout () {
    this.$store.dispatch('logout', () => {
      this.$router.push('/login')
    })
  }
}
</script>
