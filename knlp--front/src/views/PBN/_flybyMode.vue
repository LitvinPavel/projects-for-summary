<template>
  <section>
    <v-tabs fixed-tabs height="60" color="transparent">
      <v-tab href="#tab-1">
        <v-icon size="48">mdi-gesture-tap</v-icon>
      </v-tab>
      <v-tab href="#tab-2">
        <v-icon size="48">mdi-table-large</v-icon>
      </v-tab>
      <v-tab href="#tab-3">
        <v-icon size="48">mdi-chart-line</v-icon>
      </v-tab>
      <v-tab href="#tab-4">
        <v-icon color="error" size="48">mdi-exit-to-app</v-icon>
      </v-tab>
      <v-spacer></v-spacer>
      <v-btn class="mt-2" :color="!isActiveFly ? 'primary' : 'error'" @click="startFly">
        {{!isActiveFly ? 'Запись' : 'Остановить' }}
      </v-btn>
      <v-btn class="mr-3 mt-2"  :disabled="!isActiveFly" @click="startEvent">
        Событие
      </v-btn>
      <v-tab-item :value="'tab-1'" :key="1">
        <v-divider></v-divider>
        <monitoring-panel @startEvent="startEvent" @startFly="startFly"></monitoring-panel>
      </v-tab-item>
      <v-tab-item :value="'tab-2'" :key="2">
        <v-divider></v-divider>
        <table-real-time></table-real-time>
      </v-tab-item>
      <v-tab-item :value="'tab-3'" :key="3">
        <v-divider></v-divider>
        <v-card style="padding-top: 15px;">
          <v-card-text>
            <v-layout class="box-tab-item justify-center mb-2">
              <h2 class="display-1">{{ $store.state.pbn.route.sidStarApproachId }}</h2>
            </v-layout>
            <grafic-real-time></grafic-real-time>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item :value="'tab-4'" :key="4">
        <v-divider></v-divider>
        <v-card style="padding-top: 15px;">
          <v-card-text>
            <v-layout class="box-tab-item justify-center mb-2">
              <v-btn :disabled="$store.state.pbn.isActiveFly" block outline style="height: 80px;" @click="closed" class="display-1">Выйти из режима облета</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="exit" max-width="490">
      <exit-check v-model="exitTo" @stoped="stoped($event)"></exit-check>
    </v-dialog>
  </section>
</template>

<script>
  import exitCheck from '../../components/exitCheck.vue'
  import MonitoringPanel from '../../components/PBN/flybyMode/Panel.vue'
  import TableRealTime from '../../components/PBN/flybyMode/Table.vue'
  import GraficRealTime from '../../components/PBN/flybyMode/Chart.vue'
  export default {
    components: {
      GraficRealTime,
      MonitoringPanel,
      TableRealTime,
      exitCheck
    },
    data: () => ({
      exit: false,
      exitTo: false,
    }),
    mounted() {
      if (!this.$store.state.pbn.route) {
        this.$store.state.pbn.route = this.$store.state.pbn.scheme[0]
      }
    },
    computed: {
      isActiveFly() {
        return this.$store.getters.isActiveFly
      },
      route() {
        return this.$store.getters.route
      },
    },
    methods: {
      closed() {
        this.$http.get(`Procedure/exit`)
          .then(() => {
            this.$store.commit('STOP_FLY_AND_CLEAN')
            this.$router.push('/pbn')
          })
      },
      stoped(val) {
        this.exit = false
        if (val) {
          this.$http.get(`Procedure/Stop`)
            .then(() => {
              //Логика кнопки Прервать облет
              this.$store.commit('SET_ACTIVE_FLY', false)
            }) 
        }
      },
      startEvent() {
        this.$http.get(`Procedure/PressButton`)
            .then(() => {}) 
      },
      startFly() {
        if (this.isActiveFly) {
          this.exit = true 
        } else {
          this.$http.post(`Procedure/startRnav?id=${this.route.sidStarApproachId}`)
            .then((res) => {
              //Логика кнопки Начать облет
              this.$store.commit('CLEAR_BEFORE_START')
              this.$store.commit('SET_ACTIVE_FLY', true)
              this.$store.commit('CREATE_DATASET_ROUTE', res.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
    }
  }
</script>

<style>
  .flyby tbody>tr.non-active {
    background: #f4c436;
    color: #000;
  }
  .flyby {
    height: 65vh;
    overflow-y: auto;
  }
  .flyby>.v-table__overflow {
    padding: 0 5px;
  }
  .flyby tbody>tr:nth-child(1) td {
    font-size: 1.5rem;
  }
  .box-tab-item {
    border: 1px solid #fff;
    padding: 10px;
    border-radius: 2px;
  }
  .btn-action-custom>button,
  .btn-action-custom>div {
    margin: 0 15px;
  }
  .v-list__tile__title {
    font-size: 1.5rem;
    font-weight: 800;
  }
  a.v-list__tile--active {
    color: black !important;
  }
</style>
