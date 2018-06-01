<template>
  <div class="content">
    <el-row
      type="flex"
      justify="center"
      :gutter="0"
    >
      <el-card style="width:90%">
        <div slot="header">
          <span>{{$t('nav.list')}}</span>
          &nbsp;<small>(<a href="/hpi/examples/activity" target="_blank">/hpi/examples/activity</a>)</small>
        </div>
        <el-table
          ref="tb"
          :data="activities"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            property="id"
            align="center"
            label="#"
            width="100"
          />
          <el-table-column
            prop="account"
            :label="$t('activity.account')"
            width="100"
            sortable
          />
          <el-table-column
            :label="$t('activity.date')"
            width="120"
            sortable
          >
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="type"
            :label="$t('activity.type.label')"
            width="120"
            sortable
          >
            <template slot-scope="scope">{{$t(scope.row.type)}}</template>
          </el-table-column>
          <el-table-column
            prop="city"
            :label="$t('activity.city.label')"
            width="120"
          >
            <template slot-scope="scope">{{$t(scope.row.city)}}</template>
          </el-table-column>
          <el-table-column
            prop="priority"
            :label="$t('activity.priority.label')"
            width="120" 
          >
            <template slot-scope="scope">{{$t(scope.row.priority)}}</template>
          </el-table-column>
          <el-table-column
            prop="organizer"
            :label="$t('activity.organizer')"
            width="120"
          />
          <el-table-column
            prop="desc"
            :label="$t('activity.desc')"
            show-overflow-tooltip
          />
        </el-table>
      </el-card>
    </el-row>
    <el-row type="flex" justify="center" :gutter="0">
      <el-card style="width:90%">
        <div slot="header">
          <span>{{$t('nav.list')}}</span>
        </div>
        <el-table :data="activities" border tooltip-effect="dark">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item :label="$t('activity.city.label')+':'">
                  <span>{{ $t(props.row.city) }}</span>
                </el-form-item>
                <el-form-item :label="$t('activity.priority.label')+':'">
                  <span>{{ $t(props.row.priority) }}</span>
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
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
            <el-table-column
              prop="type"
              :label="$t('activity.type.label')"
              :filters="[{ text: 'Price', value: 'activity.type.price' }, { text: 'Rights', value: 'activity.type.rights' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
            <template slot-scope="tag">
              <el-tag
                :type="tag.row.type === 'activity.type.price' ? 'primary' : 'success'"
                close-transition
              >
                {{ $t(tag.row.type) }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import Vue from 'vue'
import Component, { Getter, namespace } from 'class-component'

const ActivityGetter = namespace('examples/activity', Getter)

@Component({
  methods: {
    handleSelectionChange (val) {
      this.selections = val
    },
    filterTag (value, row) {
      return row.type === value
    }
  },
  head () {
    return {
      title: 'Examples Activity Index'
    }
  }
})
export default class ExamplesActivity extends Vue {
  @ActivityGetter activities

  selections = []

  async asyncData ({
    store
  }) {
    await store.dispatch('examples/activity/hydrate')
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
