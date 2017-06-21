<<script>
import Component from 'class-component'
import { Line } from 'vue-chartjs'

@Component
export default class Home extends Line {
  mounted () {
    this.renderChart({
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
    }, {
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const item = data.datasets[tooltipItem.datasetIndex]
            const desc = item.data[tooltipItem.index]
            return 'Data is: ' + desc
          }
        }
      }
    })
  }
}
</script>
