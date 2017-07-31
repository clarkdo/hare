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
      <el-row type="flex" justify="space-around">
        <el-col :span="10">
          <el-card>
            <div slot="header" class="clearfix">
              <span>Doughnut Chart</span>
            </div>
            <el-row>
              <doughnut-demo :width="3" :height="2"></doughnut-demo>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card>
            <div slot="header" class="clearfix">
              <span>Pie Chart</span>
            </div>
            <el-row>
              <pie-demo :width="3" :height="2"></pie-demo>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="10">
          <el-card>
            <div slot="header" class="clearfix">
              <span>Reactive Chart</span>
            </div>
            <el-row>
              <reactive-demo :width="3" :height="2"></reactive-demo>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card>
            <div slot="header" class="clearfix">
              <span>Scatter Chart</span>
            </div>
            <el-row>
              <scatter-demo :width="3" :height="2"></scatter-demo>
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
import BarDemo from '@/components/charts/BarDemo'
import PieDemo from '@/components/charts/PieDemo'
import LineDemo from '@/components/charts/LineDemo'
import ScatterDemo from '@/components/charts/ScatterDemo'
import DoughnutDemo from '@/components/charts/DoughnutDemo'
import ReactiveDemo from '@/components/charts/ReactiveDemo'

@Component({
  components: {
    BarDemo,
    PieDemo,
    LineDemo,
    ScatterDemo,
    DoughnutDemo,
    ReactiveDemo
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

