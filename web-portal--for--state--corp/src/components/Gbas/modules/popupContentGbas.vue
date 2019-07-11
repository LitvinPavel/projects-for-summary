<template>
<div>
    <table class="table-hover table-bordered">
  <tbody>
    <tr>
      <th scope="row">Airport (ICAO):</th>
      <td>{{data.NameEn}} ( {{data.EnIcao}})</td>
    </tr>
    <tr>
      <th scope="row">Аэропорт (ИКАО):</th>
      <td>{{data.NameRus}} ( {{data.RusIcao}})</td>
    </tr>
    <tr>
      <th scope="row">Частота:</th>
      <td>{{data.Frequency}}</td>
    </tr>
    <tr>
      <th scope="row">Канал:</th>
      <td>{{data.RSDS}}</td>
    </tr>
    <tr>
      <th scope="row">Широта:</th>
      <td>{{data.Latitude}}</td>
    </tr>
    <tr>
      <th scope="row">Долгота:</th>
      <td>{{data.Longitude}}</td>
    </tr>
  </tbody>
</table>
    
</div>
    
       
</template>

<script>
export default {
  name: 'popupContentGbas',
  props: ['data']
  
}
</script>


