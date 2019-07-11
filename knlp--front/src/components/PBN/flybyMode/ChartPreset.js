import {
  Line
} from 'vue-chartjs'
import {
  reactiveProp
} from '../../../mixins'

Chart.pluginService.register({
  beforeRender: function (chart) {
    if (chart.config.options.showAllTooltips) {
      chart.pluginTooltips = []
      chart.config.data.datasets.forEach(function (dataset, i) {
        chart.getDatasetMeta(i).data.forEach(function (sector, j) {
          if (sector._datasetIndex > 1 && sector._index === 1) {
            chart.pluginTooltips.push(new Chart.Tooltip({
              _chart: chart.chart,
              _chartInstance: chart,
              _data: chart.data,
              _options: chart.options.tooltips,
              _active: [sector]
            }, chart))
          }

        })
      })
      chart.options.tooltips.enabled = false
    }
  },
  afterDraw: function (chart, easing) {
    if (chart.config.options.showAllTooltips) {
      if (!chart.allTooltipsOnce) {
        if (easing !== 1) return
        chart.allTooltipsOnce = true
      }
      chart.options.tooltips.enabled = true
      Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
        tooltip.initialize()
        tooltip.update()
        tooltip.pivot()
        tooltip.transition(easing).draw()
      })
      chart.options.tooltips.enabled = false
    }
  }
})

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        animation: false,
        responsive: true,
        bezierCurve: false,
        showAllTooltips: true,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || ''
              var x = data.datasets[tooltipItem.datasetIndex].data[1].x === 0 ? data.datasets[
                tooltipItem.datasetIndex].data[1].x : ''
              return `${x} ${label}`
            }
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{

            gridLines: {
              color: 'rgba(255,255,255,0.1)'
            },
            scaleLabel: {
              display: true,
              labelString: 'ОТКЛОНЕНИЕ (М)',
              fontColor: "#fff"
            }
          }],
          xAxes: [

            {
              type: 'linear',
              position: 'bottom',
              ticks: {
                min: 0,
                max: 100,
                stepSize: 5
              },
              gridLines: {
                color: 'rgba(255,255,255,0.1)'
              },
              scaleLabel: {
                display: true,
                labelString: 'ДИСТАНЦИЯ (%)',
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
