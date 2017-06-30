<template>
  <div>
    <div class="content">
      <el-row type="flex" justify="space-around">
        <el-col :span="10">
          <el-card>
            <div slot="header" class="clearfix">
              <span>Bar Chart</span>
            </div>
            <el-row>
              <bar-demo :width="3" :height="2"></bar-demo>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card>
            <div slot="header" class="clearfix">
              <span>Bar Chart</span>
            </div>
            <el-row>
              <line-demo :width="3" :height="2"></line-demo>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'class-component'
import BarDemo from '~components/charts/BarDemo'
import LineDemo from '~components/charts/LineDemo'

@Component({
  components: {
    BarDemo,
    LineDemo
  }
})
export default class Charts extends Vue {
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
}
</style>

