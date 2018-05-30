<template>
  <div
    class="access-token--component"
  >
    <el-form
      label-width="120px"
      v-if="token"
    >
      <el-form-item label="Token">
        <el-input
          readonly
          select
          v-model="token"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          v-clipboard="token"
          type="primary"
        >
          {{$t('action.copy')}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import Component, { Getter, namespace } from 'class-component'

const SessionGetter = namespace('session', Getter)

@Component
export default class Headbar extends Vue {
  @SessionGetter token
}
</script>

<style lang="scss" scoped>
.el-form-item a {
  margin-left: 10px;
}
</style>
