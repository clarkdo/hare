<template>
  <el-form-item
    :label="$t('session.accessTokenComponent.label')"
    :error="accessTokenFieldMessage"
  >
    <el-input
      v-model="token"
      readonly
      select
    >
      <el-button
        v-clipboard="token"
        slot="append"
      >
          {{$t('action.copy')}}
      </el-button>
    </el-input>
  </el-form-item>
</template>

<script>
import Vue from 'vue'
import Component, { Getter, namespace } from 'class-component'

const SessionGetter = namespace('session', Getter)

@Component
export default class AccessToken extends Vue {
  @SessionGetter token
  accessTokenFieldMessage = null

  created () {
    const hasToken = this.token !== ''
    const message = hasToken ? null : this.$t('session.accessTokenComponent.mustCheckShowAccessToken')
    this.accessTokenFieldMessage = message
  }
}
</script>

<style lang="scss" scoped>
.el-form-item a {
  margin-left: 10px;
}
</style>
