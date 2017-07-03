<script>
import Component from 'class-component'
import { Bar, mixins } from 'vue-chartjs'

@Component({
  mixins: [mixins.reactiveData]
})
export default class ReactiveDemo extends Bar {
  chartData = ''
  created () {
    this.fillData()
  }
  mounted () {
    this.renderChart(this.chartData)
    setInterval(() => {
      this.fillData()
    }, 2000)
  }
  fillData () {
    const labels = [
      `January${this.getRandomInt()}`, 'February', 'March',
      'April', 'May', `June${this.getRandomInt()}`,
      'July', 'August', `September${this.getRandomInt()}`,
      'October', 'November', `December${this.getRandomInt()}`
    ]
    const data = []
    for (let index in labels) {
      data[index] = this.getRandomInt()
    }
    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data
        }
      ]
    }
  }
  getRandomInt () {
    return Math.floor(Math.random() * (50 - 5 + 1)) + 5
  }
}
</script>

