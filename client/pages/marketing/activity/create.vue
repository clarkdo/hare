<template>
  <div>
    <div class="content" v-if="authUser">
        <new-activity :form-data="activity" ref="popActivity"></new-activity>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import NewActivity from '~components/activity/NewActivity'
import Component, { Getter } from 'class-component'

// TODO: https://github.com/ktsn/vuex-class/issues/9
@Component({
  components: {
    NewActivity
  }
})
export default class Demo extends Vue {
  @Getter authUser

  activity = {
    account: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    priority: '',
    rate: 0,
    organizer: [],
    desc: '',
    label: []
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 70%;
  margin-left: 15%;
  text-align: center;
  padding-top: 20px;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin: 15px 0;
}
.el-carousel .new-activity {
  margin-left: 16.66667%;
  width: 66.66667%;
}
</style>

<style>
.el-select.input-sel .el-input {
  width: 110px;
}
</style>
