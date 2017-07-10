<template>
  <div class="content">
    <el-row type="flex" justify="center" :gutter="0">
      <el-card style="width:90%">
        <div slot="header" class="clearfix">
          <span>{{$t(title)}}</span>
        </div>
        <new-activity :form-data="activity" ref="popActivity"></new-activity>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import NewActivity from '~components/activity/NewActivity'
import Component, { Getter, namespace } from 'class-component'

const ActivityGetter = namespace('examples/activity/index', Getter)

@Component({
  components: {
    NewActivity
  }
})
export default class Create extends Vue {
  @ActivityGetter title

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
  padding-top: 20px;
}
</style>
