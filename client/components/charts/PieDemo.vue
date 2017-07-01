<script>
import Component from 'class-component'
import { Pie } from 'vue-chartjs'

@Component
export default class PieDemo extends Pie {
  mounted () {
    this.renderChart({
      labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
      datasets: [
        {
          backgroundColor: [
            '#41b883',
            '#ffcd56',
            '#20a0ff',
            '#f87979'
          ],
          data: [4 / 15, 2 / 15, 8 / 15, 1 / 15]
        }
      ]
    }, {
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const item = data.datasets[tooltipItem.datasetIndex]
            return `${(item.data[tooltipItem.index] * 100).toFixed(2)}%`
          }
        }
      }
    })
  }
}
</script>
