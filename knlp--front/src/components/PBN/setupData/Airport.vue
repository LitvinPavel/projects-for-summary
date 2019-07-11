<template>
  <v-autocomplete v-model.lazy="airport"
                      :items="$store.state.pbn.airItems"
                      :search-input.sync="getAir"
                      item-text="icaoCode"
                      label="ICAO код..."
                      validate-on-blur
                      @input="$emit('saved', airport)"
                      hide-no-data
                      return-object
                      solo
                      light
                      class="mt-5">
        <template slot="selection" slot-scope="data">
          <b class="pr-4">{{ data.item.icaoCode }}</b>
          <i>{{ data.item.name }}</i>
        </template>
        <template slot="item" slot-scope="data">
          <v-list-tile-content>
            <v-list-tile-title light class="title font-weight-thin">
              <b class="pr-4">{{ data.item.icaoCode }}</b>
              <i>{{ data.item.name }}</i>
            </v-list-tile-title>
          </v-list-tile-content>
        </template>
        <template slot="no-data">
          <span class="pa-2">Нет данных</span>
        </template>
      </v-autocomplete>
</template>

<script>
  export default {
    data: () => ({
      airport: '',
      valid: false,
      getAir: null
    }),
    watch: {
      getAir(val) {
        if (val) {
          if (val.length > 1) {
            this.$http.get(`arnad/FindAirports?icao=${val}`)
              .then(res => {
                this.$store.state.pbn.airItems = res.data
              })
              .catch(err => {
                if (err.response.statusText) {
                  return
                  // const error = {
                  //   status: true,
                  //   message: err.response.statusText
                  // }
                  // this.$store.commit('isError', error)
                } else if (!err.response) {
                  const error = {
                    status: true,
                    message: 'ERR_CONNECTION_REFUSED'
                  }
                  this.$store.commit('IS_ERROR', error)
                } else {
                  const error = {
                    status: true,
                    message: err.response.data
                  }
                  this.$store.commit('IS_ERROR', error)
                }
              })
          }
        }
      }
    }
  }
</script>
