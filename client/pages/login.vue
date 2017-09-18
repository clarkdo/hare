<template>
  <div class="login container">
    <header class="header" ref="header">
      <img class="logo" src="~/assets/img/logo.svg">
    </header>
    <img src="~/assets/img/login-bg.png" alt="" class="bg">
    <el-card>
      <el-form :model="user" ref="user" @keyup.enter.native='!logging && login()'>
        <el-form-item prop="userName" :rules="[{ required: true, message: $t('login.userRequired')}]">
          <el-col :span="24">
            <el-input v-model="user.userName" :placeholder="$t('login.userPlaceholder')"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="password" :rules="[{ required: true, message: $t('login.pwdRequired')}]">
          <el-col :span="24">
            <el-input v-model="user.password" type="password" :placeholder="$t('login.pwdPlaceholder')"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="captcha" :rules="[{ required: true, message: $t('login.captchaRequired')}]">
            <el-col :span="12">
              <el-input v-model="user.captcha" :placeholder="$t('login.captchaPlaceholder')"></el-input>
            </el-col>
            <el-col :offset="1" :span="11" ref="captcha">
              <div v-html="captchaSvg" @click='refreshCaptcha' class="captcha"></div>
            </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-button type="primary" class="login-btn" :loading="logging" @click="login">{{$t('login.login')}}</el-button>
          </el-col>
        </el-row>
        <!--<el-row>
          <el-col :span="5">
            <el-checkbox v-model="keepPwd">记住密码</el-checkbox>
          </el-col>
          <el-col :offset='14' :span="5">
            <label>忘记密码?</label>
          </el-col>
        </el-row>-->
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import debounce from '@/utils/debounce'
import Component from 'class-component'

@Component
export default class Login extends Vue {
  user = {
    userName: '',
    password: '',
    captcha: ''
  }
  rules = {}
  captchaSvg = ''
  // keepPwd = false
  logging = false
  layout () {
    return 'empty'
  }
  mounted () {
    this.getCaptcha()
  }
  login () {
    this.logging = true
    this.$refs.user.validate(async (valid) => {
      try {
        if (valid) {
          await this.$store.dispatch('login', this.user)
          this.$router.push(this.$route.query.page || '/')
        }
      } catch (e) {
        this.$message.warning(e.message)
      } finally {
        this.logging = false
      }
    })
  }
  async getCaptcha () {
    const params = {}
    if (this.$refs.captcha) {
      params.width = this.$refs.captcha.$el.clientWidth || 150
      params.height = this.$refs.captcha.$el.clientHeight || 36
    }
    const {data: captcha} = await axios.get('/hpi/captcha', { params })
    this.captchaSvg = captcha
  }

  refreshCaptcha = debounce(this.getCaptcha, 500)

  logout () {
    this.$store.dispatch('logout')
  }
}
</script>

<style scoped lang="scss">
img.bg {
  width: 100%;
  height: auto;
  min-width: 760px;
  // max-width: 1440px;
  min-height: 695px;
  // max-height: 800px;
  position: fixed;
}
.header {
  width: 100%;
  height: 60px;
  z-index: 100;
  position: relative;
  background-color: #fbfdff;
  img.logo {
    position: absolute;
    top: 12px;
    left: 100px;
  }
}
.el-card {
  width: 65%;
  margin-left: 20%;
  margin-top: 120px;
  @media (min-width: 760px) {
    width: 38%;
    margin-left: 50%;
    margin-top: 150px;
  }
  @media (min-width: 1012px) {
    width: 35%;
    margin-left: 55%;
    margin-top: 180px;
  }
  @media (min-width: 1430px) {
    width: 28%;
    margin-left: 60%;
    margin-top: 210px;
  }
  position: relative;
  .el-form {
    margin-top: 8%;
    margin-bottom: 8%;
    .captcha {
      max-height: 36px;
      cursor: pointer;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
