<script>
import Vue from 'vue'
import Component from 'class-component'
import { Scatter } from 'vue-chartjs'

@Component({
  extends: Scatter
})
export default class ScatterDemo extends Vue {
  chartData = {
    datasets: [{
      label: 'Alibaba',
      fill: false,
      borderColor: '#f87979',
      backgroundColor: '#f87979',
      data: [{
        x: -2,
        y: -4
      }, {
        x: -1,
        y: -1
      }, {
        x: 0,
        y: 0
      }, {
        x: 1,
        y: 3
      }, {
        x: 2,
        y: 4
      }]
    },
    {
      label: 'Google',
      fill: false,
      borderColor: '#7acbf9',
      backgroundColor: '#7acbf9',
      data: [{
        x: -2,
        y: -4
      }, {
        x: -1,
        y: -3
      }, {
        x: 0,
        y: 1
      }, {
        x: 1,
        y: 1
      }, {
        x: 2,
        y: 6
      }]
    }]
  }
  mounted () {
    this.renderChart(this.chartData)
  }
}
</script>
