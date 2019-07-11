<template>
  <div>
    <div class="text-xs-center">
      <v-chip small color="green" label text-color="white">Траектория ВС</v-chip>
      <v-chip small color="orange" label text-color="white">Глиссада на ВПП</v-chip>
      <v-chip small color="yellow" label text-color="black">чек позиции ВС</v-chip>
    </div>
    <div class="small">
      <line-chart style="font-size: 2rem;" :chart-data="papiDataSet"></line-chart>
    </div>
  </div>
</template>

<script>
  import LineChart from './ChartPreset.js'
  
  export default {
    components: {
      LineChart
    },
    computed: {
      papiDataSet: {
        get() {
          return {
            datasets: this.$store.getters.DATA_SET
          }
        },
        set(val) {
          return val
        }
        
      }
    }
  }
</script>

<style>
  .small>div {
    height: 65vh;
  }
</style>
