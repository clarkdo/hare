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
              用户: {{authUser.userName}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" class="logout" @click="logout">注销</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card v-else>
          <el-form :model="user" :rules="rules" ref="user">
            <el-form-item prop="userName" :rules="[{ required: true, message: '用户名不能为空'}]">
              <el-col :span="24">
                <el-input v-model="user.userName" placeholder="用户名"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item prop="password" :rules="[{ required: true, message: '密码不能为空'}]">
              <el-col :span="24">
                <el-input v-model="user.password" type="password" placeholder="密码"></el-input>
              </el-col>
            </el-form-item>
            <el-row>
              <el-col :span="24">
                <el-button type="primary" class="login" :loading="logining" @click="login">登录</el-button>
              </el-col>
            </el-row>
          </el-form>
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
      position: relative;
    }
    img {
      position: absolute;
      top: 15px;
      right: -10px;
    }
  }
  .banner-sky {
    position: absolute;
    top: -150px;
    bottom: -15px;
    width: 100%;
    margin-top: -140px;
    transform: skewY(-5deg);
    transform-origin: center;
    background-image: linear-gradient(180deg, #0d1a44 13%, #3c4f91 56%, #5fc1e4 100%);
  }
  img.banner-stars {
    top: -10px;
    left: 50%;
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
  .cards {
    margin: 0 auto 110px;
    width: 1140px;
    .container {
      padding: 0;
      margin: 0 -11px;
      width: auto;
    }
    li {
      width: 33.33333%;
      padding: 0 19px;
      box-sizing: border-box;
      float: left;
      list-style: none;
    }
    img {
      width: 160px;
      height: 120px;
    }
  }
  .card {
    height: 430px;
    width: 100%;
    background:#ffffff;
    border:1px solid #eaeefb;
    border-radius:5px;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    transition: all .3s ease-in-out;
    bottom: 0;
    img {
      margin: 66px auto 60px;
    }
    h3 {
      margin: 0;
      font-size: 18px;
      color: #1f2f3d;
      font-weight: normal;
    }
    p {
      font-size: 14px;
      color: #99a9bf;
      padding: 0 25px;
      line-height: 1.8;
    }
    a {
      height: 53px;
      line-height: 52px;
      font-size: 14px;
      color: #20a0ff;
      text-align: center;
      border: 0;
      border-top: 1px solid #eaeefb;
      padding: 0;
      cursor: pointer;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #fff;
      border-radius: 0 0 5px 5px;
      transition: all .3s;
      text-decoration: none;
      display: block;
      &:hover {
        color: #fff;
        background: #20a0ff;
      }
    }
    &:hover {
      bottom: 6px;
      box-shadow: 0px 6px 18px 0px rgba(232,237,250,0.50);
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
  @keyframes blink {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @media (max-width: 1140px) {
    .cards {
      width: 100%;
      .container {
        width: 100%;
      }
    }
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
    .cards {
      li {
        width: 80%;
        margin: 0 auto 20px;
        float: none;
      }
      .card {
        height: auto;
        padding-bottom: 54px;
      }
    }
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
  import theaterJS from 'theaterjs'
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['authUser'])
    },
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
    },
    data () {
      return {
        user: {
          userName: '',
          password: ''
        },
        rules: {},
        logining: false
      }
    },
    methods: {
      login () {
        this.logining = true
        setTimeout(function () {
          this.logining = false
        }.bind(this), 1000)
        this.$refs.user.validate((valid) => {
          if (valid) {
            this.$store.dispatch('login', {
              userName: this.user.userName,
              password: this.user.password
            })
            .then(() => {
              this.user.userName = ''
              this.user.password = ''
            })
            .catch((e) => {
              this.$message.warning(e.message)
            })
          }
        })
      },
      logout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
