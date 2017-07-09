<template>
  <div class="content">
    <el-row type="flex" justify="center" :gutter="0">
      <el-card style="width:90%">
        <div slot="header" class="clearfix">
          <span>{{$t('nav.list')}}</span>
        </div>
        <el-table ref="tb" :data="activities" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="account" :label="$t('activity.account')" width="120" sortable>
          </el-table-column>
          <el-table-column :label="$t('activity.date')" width="120" sortable>
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="type" :label="$t('activity.type')" width="120" sortable>
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
      </el-card>
    </el-row>
    <el-row type="flex" justify="center" :gutter="0">
      <el-card style="width:90%">
        <div slot="header" class="clearfix">
          <span>{{$t('nav.list')}}</span>
        </div>
        <el-table :data="activities" border tooltip-effect="dark">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item :label="$t('activity.area')+':'">
                  <span>{{ props.row.region }}</span>
                </el-form-item>
                <el-form-item :label="$t('activity.priority')+':'">
                  <span>{{ props.row.priority }}</span>
                </el-form-item>
                <el-form-item :label="$t('activity.organizer')+':'">
                  <span>{{ props.row.organizer }}</span>
                </el-form-item>
                <el-form-item :label="$t('activity.desc')+':'">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="account" :label="$t('activity.account')">
          </el-table-column>
          <el-table-column :label="$t('activity.date')">
            <template scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
           <el-table-column
            prop="type"
            :label="$t('activity.type')"
            :filters="[{ text: '优惠', value: '价格优惠' }, { text: '权限', value: '价格权益' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template scope="tag">
              <el-tag
                :type="tag.row.type === '价格优惠' ? 'primary' : 'success'"
                close-transition>{{tag.row.type}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
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

  filterTag (value, row) {
    return row.type === value
  }
}
</script>

<style lang="scss" scoped>
.content {
  margin-bottom: 35px;
  .el-row {
    margin-top: 35px;
  }
  .el-card .el-row {
    margin-top: 20px;
  }
  .el-card .el-row:first-child {
    margin-top: 0px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
