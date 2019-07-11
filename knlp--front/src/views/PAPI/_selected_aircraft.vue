<template>
  <v-card>
    <v-card-title class="headline font-weight-regular justify-space-between">
      Выбор ВС
    </v-card-title>
    <v-divider></v-divider>
    
    <v-card-text style="height: 64vh;">
      <v-layout justify-center column>
        <section class="text-xs-center">
          <aircraft @saved="saveCraft"></aircraft>
          <span class="grey--text text--darken-1 subheading">
            Введите номер ВС
          </span>
        </section>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn :to="'/papi'">
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
export default {
    data: () => ({
      aircraft: null
    }),
    components: {
      Aircraft
    },
    mounted() {
      this.$store.commit('BACK_PAGE', '/papi')
    },
    computed: {
      isValid() {
        if (this.aircraft) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      saveCraft(item) {
        this.aircraft = item
      },
      submit() {
        this.$store.commit('SET_PAPI_AIRCRAFT', this.aircraft)
        this.$router.push('/papi/airport-selected')
      }
    }
  }
</script>

<style>
input {
  text-transform: uppercase;
}
</style>

