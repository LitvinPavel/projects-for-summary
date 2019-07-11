<template>
  <v-card>
    <v-card-title class="headline font-weight-regular justify-space-between pb-0">
      <span>Предварительный просмотр</span>
      <span>ВПП - {{ identifier }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="py-1">
       <v-stepper v-model="e1" dark>
        <v-stepper-header >
          <v-stepper-step editable :complete="e1 > 1" step="1">КООРДИНАТЫ ПОРОГА ВПП</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable :complete="e1 > 2" step="2">параметры глиссады</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="3">PAPI</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>

          <v-stepper-content class="pa-2" step="1">
            <ltp-ftp @next="e1 = 2"></ltp-ftp>
          </v-stepper-content>

          <v-stepper-content class="pa-2" step="2">
            <gpa-mb @prev="e1 = 1" @next="e1 = 3"></gpa-mb>
          </v-stepper-content>

          <v-stepper-content class="pa-2" step="3">
            <tch-lo @prev="e1 = 2" @next="send"></tch-lo>
          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script>
import LtpFtp from '../../components/PAPI/vpp/LtpFtp.vue'
import GpaMb from '../../components/PAPI/vpp/GpaMb.vue'
import TchLo from '../../components/PAPI/vpp/TchLo.vue'
  export default {
    components: {
      LtpFtp,
      GpaMb,
      TchLo
    },
    data: () => ({
      e1: 0,
      valid: true
    }),
    mounted() {
      this.$store.commit('BACK_PAGE', '/papi/vpp-selected') 
    },
    computed: {
      airport: {
        get() {
          return this.$store.getters.AIRPORT
        },
        set(val) {
          this.$store.commit('SAVE_AIRPORT', val)
        }
      },
      runway() {
        return this.$store.getters.RUNWAY
      },
      identifier() {
        return this.$store.getters.RUNWAY_IDENTIFIER
      }
    },
    methods: {
      send(val) {
        this.airport.runways.map(element => {
          if (element.identifier === this.identifier) {
            element.runwayInfo = this.runway.runwayInfo
            element.runwayInfo.lamps = val
          }
        })
        this.$store.commit('CLEAR_ERROR')
        this.$http.post(`papidb/Update`, this.airport, {
            headers: {
              'Content-type': 'application/json'
            }
          })
          .then(() => {})
          .catch(err => {
            this.$store.commit('IS_ERROR', {
              Message: err.response.data.Message,
              state: 'red'
            })
          })
        this.$store.dispatch('SET_USER_DATA', val)
          .then(res => {
            this.$router.push('/papi/flyby-mode')
          })
          .catch(err => {
            commit('IS_ERROR', { Message: 'Операция не выполнена', state: 'red' })
          } )

      }
    }
  }
</script>


<style>

</style>