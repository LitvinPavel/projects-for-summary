<template>
  <v-card-text style="height: 64vh;">
    <v-layout justify-center column fill-height>
      <section class="text-xs-center">
        <v-autocomplete
          v-model="aircraft"
          :items="aircrafts"
          :search-input.sync="getCraft"
          @input="$emit('saved', aircraft)"
          label="№ борта..."
          validate-on-blur
          hide-no-data
          item-text="name"
          autofocus
          return-object
          solo
          light
        >
        <template slot="no-data">
          <span class="pa-2">Нет данных</span>
        </template>
      </v-autocomplete>
        <span class="grey--text text--darken-1 subheading">
          Введите номер борта
        </span>
        <v-autocomplete 
          v-model.lazy="airport"
          :items="airports"
          :search-input.sync="getPort"
          item-text="icaoCode"
          label="ICAO код..."
          validate-on-blur
          hide-no-data
          return-object
          solo
          light
          class="mt-5"
        >
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
        <span class="grey--text text--darken-1 subheading">
          Введите ICAO-код аэропорта
        </span>
      </section>
    </v-layout>
  </v-card-text>
</template>

<script>
  export default {
    data: () => ({
      aircraft: {},
      aircrafts: [],
      airports: [],
      airport: {},
      valid: false,
      getPort: null,
      getCraft: null
    }),
    watch: {
      getPort(val) {
          if (val.length > 1) {
            this.$http.get(`arnad/FindAirports?icao=${val}`)
              .then(res => {
                this.airports = res.data
              })
              .catch(err => {
                  const error = {
                    status: true,
                    message: err.response.data
                  }
                  this.$store.commit('IS_ERROR', error)
              })
          }
      },
      getCraft(val) {
            this.$http.get(`Aircraft/Find?name=${val}`)
              .then(res => {
                this.aircrafts = res.data
              })
              .catch(err => {
                  const error = {
                    status: true,
                    message: err.response.data
                  }
                  this.$store.commit('IS_ERROR', error)
              })
      }
    }
  }
</script>

<style scoped>

</style>