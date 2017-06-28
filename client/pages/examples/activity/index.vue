<template>
  <div>
    <div class="content">
      <el-table ref="tb" :data="activities" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="account" :label="$t('activity.account')" width="120">
        </el-table-column>
        <el-table-column :label="$t('activity.date')" width="120">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="type" :label="$t('activity.type')" width="120">
        </el-table-column>
        <el-table-column prop="region" :label="$t('activity.area')" width="120">
        </el-table-column>
        <el-table-column prop="priority" :label="$t('activity.priority')" width="120">
        </el-table-column>
        <el-table-column prop="organizer" :label="$t('activity.organizer')" width="120">
        </el-table-column>
        <el-table-column prop="desc" :label="$t('activity.desc')" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import Component from 'class-component'

// TODO: https://github.com/ktsn/vuex-class/issues/9
@Component({
  methods: {
    handleSelectionChange (val) {
      this.selections = val
    }
  }
})
export default class Example extends Vue {
  selections = []

  async asyncData ({ isServer }) {
    let {data: activities} = await axios.get('/hpi/activities')
    return {activities}
  }
}
</script>

<style lang="scss" scoped>
.content {
  // width: 70%;
  // margin-left: 15%;
  // text-align: center;
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
