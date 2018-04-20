<template>
  <div class="login container">
    <img class="logo" src="~/assets/img/logo.svg">
    <el-row class="login-row" type="flex" justify="center">
      <el-col :xs="{span: 14, offset: 5}" :sm="{span: 10, offset: 7}" :lg="{span: 6, offset: 9}">
        <el-card>
          <el-form :model="user" ref="user" @keyup.enter.native='!logging && login()'>
            <el-form-item prop="userName" :rules="[{ required: true, message: $t('login.userRequired')}]">
              <el-col :span="24">
                <el-input v-model="user.userName" autofocus :placeholder="$t('login.userPlaceholder')"></el-input>
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import debounce from '@/utils/debounce'
import Component from 'class-component'

@Component
export default class Login extends Vue {
  user = {
    userName: '',
    password: '',
    captcha: ''
  }
  authenticated = false // #WatchHowDoWe ... How do we?
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
  async login () {
    const goBackTo = this.$route.query.page || '/'
    this.logging = true
    const valid = this.$refs.user.validate()
    try {
      if (valid) {
        await this.$store.dispatch('login', this.user)
        this.authenticated = await this.$store.getters.authenticated
      }
    } catch (e) {
      this.$message.warning(e.message)
    } finally {
      if (this.authenticated) {
        this.redirect(goBackTo)
      }
    }
    this.logging = false
  }
  redirect (goTo) {
    this.$router.push(goTo)
  }
  getCaptcha () {
    const params = {}
    if (this.$refs.captcha) {
      params.width = this.$refs.captcha.$el.clientWidth || 150
      params.height = this.$refs.captcha.$el.clientHeight || 36
    }
    this.captchaSvg = this.$axios.get('/hpi/auth/captcha', { params })
      .then(response => {
        // #WatchHowDoWe
        // Just passing through :|
        // TODO, improve this, figure out how @watch works
        const authenticated = this.$store.getters.authenticated
        if (authenticated) {
          this.redirect('/')
        }
        const data = response.data
        return data
      })
      .then(captcha => {
        this.captchaSvg = captcha
      })
      .catch(error => {
        const errorMessage = error.toString()
        this.captchaSvg = `<small style="line-height:1em;display:block;">${errorMessage}</small>`
      })
  }

  refreshCaptcha = debounce(this.getCaptcha, 500) // Note to you, reader, does this still work?
}
</script>

<style scoped lang="scss">
.login {
  background: url(~/assets/img/login-bg.jpeg) no-repeat center center fixed;
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  img.logo {
    position: fixed;
    top: 12px;
    left: 20px;
  }
  .login-row {
    height: 100%;
    flex-direction: column;
  }
}
.el-card {
  background-color: rgba(255, 255, 255, 0.5);
  .el-form {
    margin-top: 4%;
    margin-bottom: 4%;
    .captcha {
      background-color: rgba(255, 255, 255, 0.5);
      max-height: 36px;
      cursor: pointer;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
