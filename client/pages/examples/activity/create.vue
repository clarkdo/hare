<template>
  <div class="content">
    <el-row type="flex" justify="center" :gutter="0">
      <el-card style="width:90%">
        <div slot="header">
          <span>{{ $t(title) }}</span>
        </div>
        <new-activity ref="popActivity" :form-data="activity" />
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import NewActivity from '@/components/examples/activity/NewActivity'

const Activity = namespace('examples/activity')

@Component({
  components: {
    NewActivity
  }
})
export default class Create extends Vue {
  @Activity.Getter title

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
