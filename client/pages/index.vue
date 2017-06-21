<template>
  <div class="banner">
    <fork-this/>
    <div class="banner-sky"></div>
    <div class="container">
      <div class="banner-desc">
        <h2>Hare</h2>
        <p>Application boilerplate based on Vue.js 2.x, Koa 2.x, Element-UI and Nuxt.js</p>
      </div>
      <bar ref="bar" :width="500" :height="400" class="bar"></bar>
      <lineChart ref="line" :width="500" :height="400" class="line"></lineChart>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Bar, Line } from 'vue-chartjs'
import Component from 'class-component'
import ForkThis from '~components/ForkThis'

@Component({
  components: {
    ForkThis,
    Bar,
    lineChart: Line
  }
})
export default class Home extends Vue {
  mounted () {
    this.$refs['bar'].renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#20a0ff',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    })
    this.$refs['line'].renderChart({
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

<style scoped lang="scss">
.bar, .line {
  width: 35%;
  margin-top: 30px;
  position: absolute;
}
.bar {
  left: 10%
}
.line {
  left: 55%;
}
.banner {
  text-align: center;
  height: 100%;
  color: #fff;
  .container {
    padding: 0 20px;
    position: relative;
  }
}
.banner-sky {
  position: absolute;
  top: 0px;
  bottom: -15px;
  width: 100%;
  margin-top: 0px;
  transform-origin: center;
  background-image: linear-gradient(180deg, #0d1a44 13%, #3c4f91 56%, #5fc1e4 100%);
}
.banner-desc {
  padding-top: 110px;
  padding-left: 30px;
  font-size: 46px;
  position: relative;
  z-index: 10;
  h2 {
    font-size: 46px;
    margin: 0;
    color: #fff;
  }
  p {
    font-size: 20px;
    opacity: .8;
    line-height: 1.8;
    padding-left: 3px;
  }
}
@media (max-width: 1440px) {
  .banner .container {
    width: 100%;
    box-sizing: border-box;
  }
  .banner img {
    right: 0;
  }
}
@media (max-width: 1000px) {
  .banner .container {
    img {
      display: none;
    }
  }
}
@media (max-width: 768px) {
  .banner-desc {
    #line2 {
      display: none;
    }
    h2 {
      font-size: 32px;
    }
    p {
      width: auto;
    }
  }
}
</style>
