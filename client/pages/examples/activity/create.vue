<template>
  <div class="content">
    <el-row type="flex" justify="center" :gutter="0">
      <el-card style="width:90%">
        <div slot="header">
          <span>{{$t('activity.title.create')}}</span>
        </div>
        <new-activity :form-data="activity" ref="popActivity"></new-activity>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'class-component'
import NewActivity from '@/components/examples/activity/NewActivity'

@Component({
  components: {
    NewActivity
  },
  head () {
    return {
      title: 'Examples Activity Create'
    }
  }
})
export default class Create extends Vue {
  activity = {
    account: '',
    city: '',
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
