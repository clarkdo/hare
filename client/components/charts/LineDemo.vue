<script>
import Vue from 'vue'
import Component from 'class-component'
import { Line } from 'vue-chartjs'

/*
  Component class must inherit Vue or its descendant class
  when class property is used.
*/
@Component({
  extends: Line
})
export default class LineDemo extends Vue {
  chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Data One',
        fill: false,
        borderColor: '#20a0ff',
        backgroundColor: '#20a0ff',
        data: [40, 39, 10, 40, 39, 80, 40]
      },
      {
        label: 'Data Two',
        fill: false,
        borderColor: '#f87979',
        backgroundColor: '#f87979',
        data: [37, 14, 49, 28, 92, 58, 51]
      }
    ]
  }
  mounted () {
    this.renderChart(this.chartData, {
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const item = data.datasets[tooltipItem.datasetIndex]
            const desc = item.data[tooltipItem.index]
            return 'Data is: ' + desc
          }
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: true,
            drawTicks: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: true,
            drawTicks: false
          }
        }]
      }
    })
    // setInterval(() => {
    //   this.chartData.labels.push(this.chartData.labels[0])
    //   this.chartData.datasets[0].data.push((Math.random() * 100).toFixed())
    //   this.chartData.datasets[1].data.push((Math.random() * 100).toFixed())
    //   this.chartData.labels.shift()
    //   this.chartData.datasets[0].data.shift()
    //   this.chartData.datasets[1].data.shift()
    //   this._chart.update()
    // }, 1000)
  }
}
</script>
