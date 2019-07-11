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
      <v-btn class="mt-2" :color="!isFly ? 'primary' : 'error'" @click="startFly">
        {{!isFly ? 'Запись' : 'Остановить' }}
      </v-btn>
      <v-btn class="mr-3 mt-2"  :disabled="!isFly" @click="startEvent">
        Событие
      </v-btn>
      <v-tab-item :value="'tab-1'" :key="1">
        <v-divider></v-divider>
        <monitoring-panel @event="startEvent" @fly="startFly"></monitoring-panel>
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
              <h2 class="display-1">{{lamp.number}}{{ lamp.litera }}</h2>
            </v-layout>
            <grafic-real-time v-if="elevation"></grafic-real-time>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item :value="'tab-4'" :key="4">
        <v-divider></v-divider>
        <v-card style="padding-top: 15px;">
          <v-card-text>
            <v-layout class="box-tab-item justify-center mb-2">
              <v-btn :disabled="isFly" block outline style="height: 80px;" @click="closed" class="display-1">Выйти из режима облета</v-btn>
            </v-layout>
              
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <v-dialog v-model="stopDialog" max-width="490">
                <v-card light>
                  <v-card-title class="headline">Подтвердите действие</v-card-title>
                  <v-card-text>Вы собираетесь завершить запись сессии</v-card-text>
                  <v-card-actions>
                    <v-btn flat @click="stopDialog = false">Отменить</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="stopFly">Принять</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
  </section>
</template>

<script>
  import MonitoringPanel from '../../components/PAPI/testFlight/Panel.vue'
  import TableRealTime from '../../components/PAPI/testFlight/Table.vue'
  import GraficRealTime from '../../components/PAPI/testFlight/Chart.vue'
  export default {
    components: {
      GraficRealTime,
      MonitoringPanel,
      TableRealTime
    },
    data: () => ({
      stopDialog: false
    }),
    computed: {
      elevation() {
        return this.$store.getters.USER_DATA.airport.runway.runwayInfo.ltpFtpElevation
      },
      isFly: {
        get() {
          return this.$store.getters.IS_FLY
        },
        set(val) {
          this.$store.commit('SET_IS_FLY', val)
        }
      },
      CHEAT_TABLE() {
        return this.$store.getters.CHEAT_TABLE
      },
      lamp() {
        return this.$store.getters.LAMP
      }
    },
    methods: {
      closed() {
        this.$http.get(`procedure/exit`)
        this.$router.push('/papi')
      },
      stopFly() {
        this.$http.get(`procedure/Stop`)
          .then(res => {
            this.stopDialog = false
            this.isFly = false
          })
          .catch(err => {
            console.log({err})
            // commit('IS_ERROR', { Message: err.response.data.Message, state: 'red' })
          } )
        this.$http.post(`Procedure/SavePapiChecks`, this.CHEAT_TABLE)
            .then(() => {
              // commit('IS_ERROR', { Message: 'Данные успешно сохранены.', state: 'primary' })
            })
            .catch(err => {
              console.log(err)
              // commit('IS_ERROR', { Message: 'При сохранении возникла ошибка.', state: 'red' })
            } )
      },
      startEvent() {
        //Логика кнопки Событие
        this.$http.get(`Procedure/PressButton`)
      },
      startFly() {
        if (this.isFly) {
          this.stopDialog = true
        } else {
          this.$store.commit('CLEAR_DATA')
          
          this.$http.post(`Procedure/StartPapi`, this.lamp)
          .then(res => {
            this.isFly = true
          })
          .catch(err => {
            console.log({err})
            // commit('IS_ERROR', { Message: err.response.data.Message, state: 'red' })
          } )
          
        }

        
      }
    }
  }
</script>

<style>
tbody>tr.non-active {
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
