<script>
import Component from 'class-component'
import { Doughnut } from 'vue-chartjs'

@Component
export default class DoughnutDemo extends Doughnut {
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
          data: [40, 20, 80, 10]
        }
      ]
    })
  }
}
</script>
