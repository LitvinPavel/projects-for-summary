<template>
      <div id="searchAir" >
        <autocomplete
          url="../wwwroot/json/raimAirData.json"
          anchor="Icao"
          label="Name"
          :min="2"
          placeholder="UUEE"
          :debounce="500"
          :on-select="getData">
        </autocomplete>
      </div>
</template>

<script>

import Autocomplete from 'vue2-autocomplete-js';
import 'vue2-autocomplete-js/dist/style/vue2-autocomplete.css'

export default {
  name: 'searchAir',
  components: { Autocomplete },
  methods: {
    getData(obj){
      this.$emit('selectObj', obj)
    }
  }
}
</script>
<style>
.autocomplete ul {
  left: 0;
  min-width: 100%;
  z-index: 99;
  font-family: inherit;
}
.autocomplete li {
  border: 1px solid #d3d3d3;
}
.autocomplete-input {
  width: 100%;
  border-radius: 5px;
  padding: 4px;
}
.autocomplete ul li a:hover, .autocomplete ul li.focus-list a {
    background:  #88A7BF;
}
</style>
