<template>
  <div>
  <div class="text-xs-center">
    <v-chip small color="green" label text-color="white">ОТКЛОНЕНИЕ</v-chip>
    <v-chip small color="red" label text-color="white">{{ $store.state.pbn.route.specificationStr }}</v-chip>
    <v-chip small color="#be559b" label text-color="white">ТОЧКИ МАРШРУТА</v-chip>
  </div>
      <div class="small">
    <line-chart style="font-size: 2rem;" :chart-data="$store.state.pbn.allDatasetRoute"></line-chart>
  </div>
  </div>
  
</template>

<script>
  import LineChart from './ChartPreset.js'
  
  export default {
    components: {
      LineChart
    }
  }
</script>

<style>
  .small>div {
    height: 65vh;
  }
</style>
