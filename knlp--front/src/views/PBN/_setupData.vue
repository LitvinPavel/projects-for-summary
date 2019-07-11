<template>
  <v-card>
    <v-card-title class="headline font-weight-regular justify-space-between">
      Ввод установочных данных
    </v-card-title>
    <v-divider></v-divider>
    
    <v-card-text style="height: 64vh;">
    <v-layout justify-center column fill-height>
      <section class="text-xs-center">

        
      <aircraft @saved="saveCraft"></aircraft>
        
      <span class="grey--text text--darken-1 subheading">
      Введите номер ВС
    </span>
      <airport @saved="savePort"></airport>
    <span class="grey--text text--darken-1 subheading">
      Введите ICAO-код аэропорта
    </span>
      </section>
    </v-layout>
  </v-card-text>

    <v-divider></v-divider>
    <v-card-actions>
      <v-btn :to="'/pbn'">
        Назад
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn 
        :disabled="isValid" 
        color="primary"
        @click="submit">
        Выбрать
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Aircraft from '../../components/PBN/setupData/Aircraft.vue'
import Airport from '../../components/PBN/setupData/Airport.vue'

  export default {
    data: () => ({
      airport: null,
      aircraft: null
    }),
    components: {
      Aircraft,
      Airport
    },
    mounted() {
      this.$store.commit('BACK_PAGE', '/pbn')
    },
    computed: {
      isValid() {
        if (this.aircraft && this.airport) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      savePort(item) {
        this.airport = item
      },
      saveCraft(item) {
        this.aircraft = item
      },
      submit() {
        this.$store.commit('SET_AIRPORT', this.airport)
        this.$store.commit('SET_AIRCRAFT', this.aircraft)
        this.$router.push('/pbn/scheme-configuration')
      }
    }
  }
</script>
