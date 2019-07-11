import {
  Line
} from 'vue-chartjs'
import {
  reactiveProp
} from '../../../mixins'

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        animation: false,
        responsive: true,
        bezierCurve: false,
        showAllTooltips: false,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            type: 'linear',
            position: 'left',
            ticks: {
              min: 0,
              max: 1000,
              stepSize: 100
            },
            gridLines: {
              color: 'rgba(255,255,255,0.1)'
            },
            scaleLabel: {
              display: true,
              labelString: 'Высота (М)',
              fontColor: "#fff"
            }
          }],
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
              ticks: {
                stepSize: 0.5,
                min: -11,
                max: 0
              },
              gridLines: {
                color: 'rgba(255,255,255,0.1)'
              },
              scaleLabel: {
                display: true,
                labelString: 'Удаление до порога ВПП (LTP/FTP) (км)',
                fontColor: "#fff"
              }
            }
          ]
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
