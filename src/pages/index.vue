<template>
  <div>
    <super-secret-div v-if="isAuthenticated"/>
    <div class="content">
      <h1>Hello, {{ loggedUser ? loggedUser.username : 'friend' }}!</h1>
      <p>
        This is a super simple example of how to use <a href="https://github.com/nuxt/nuxt.js" target="_blank">Nuxt.js</a> and <a href="https://auth0.com" target="_blank">Auth0</a> together.
      </p>
      <p v-if="!isAuthenticated">
        You're not authenticated yet. Maybe you want to <nuxt-link to="/auth/sign-in" class="link">sign in</nuxt-link> and see what happens?
      </p>
      <p v-else>
        Now that you're authenticated, maybe you should try going to our <nuxt-link to="/secret" class="link">super secret page</nuxt-link>!
      </p>
      <el-row>
        <el-col :span="24">
          <el-button>Default Button</el-button>
          <el-button type="primary">Primary Button</el-button>
          <el-button type="text">Text Button</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input-number v-model="num1" :min="1" :max="10"></el-input-number>
        </el-col>
      </el-row>
      <el-card>
        Element 卡片演示
      </el-card>
      <el-radio-group v-model="radioval">
        <el-radio-button label="1">上海6</el-radio-button>
        <el-radio-button label="2" :disabled="true">北京</el-radio-button>
        <el-radio-button label="3">广州</el-radio-button>
        <el-radio-button label="4">深圳</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SuperSecretDiv from '~components/SuperSecretDiv'

export default {
  computed: mapGetters([
    'isAuthenticated',
    'loggedUser'
  ]),
  data () {
    return {
      "num1": "1",
      "radioval": "1"
    }
  },
  components: {
    SuperSecretDiv
  }
}
</script>

<style scoped>
.content {
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
}
</style>
