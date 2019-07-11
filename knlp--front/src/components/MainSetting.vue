<template>
  <v-card color="black" class="hide-overflow" style="position: relative;" @click.ctrl="isAdminSetting">
    <v-toolbar absolute dark scroll-off-screen scroll-target="#scrolling-techniques">
      <v-btn icon dark @click="$emit('saved')">
        <v-icon x-large color="red">mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="display-1 font-weight-thin">Настройки</v-toolbar-title>
    </v-toolbar>
    <div id="scrolling-techniques" class="scroll-y" style="max-height: 100vh;">
      <v-card-text style="margin-top: 80px;">
        <v-expansion-panel v-model="active" focusable>
          <v-expansion-panel-content :key="0" class="grey darken-4 mb-2">
            <div slot="header" class="display-1">Приемник</div>
            <v-card>
              <v-card-text>
                <h2 class="headline mb-3">Частота приемника</h2>
                <v-text-field solo light v-model="frequency" :mask="'###.###'" clearable></v-text-field>
                <span class="grey--text text--darken-1 title">
                  108.025 МГц - 117.975 МГц
                </span>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <template v-if="success">
                  <span class="success--text">Применено</span>
                  <v-icon color="success" class="mr-3">mdi-check</v-icon>
                </template>
                <v-btn :loading="recLoading" :disabled="recLoading" color="primary" @click="sendRec">
                  Применить
                </v-btn>
                
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content :key="1" class="grey darken-4 mb-2">
            <div slot="header" class="display-1">Кнопка</div>
            <v-card>
              <v-card-text>
                <v-radio-group v-model="btnMode" @click="$store.commit('GET_SUCCESS', false)" row>
                  <v-layout row style="width: 62vw;">
                  <v-radio color="primary" label="Режим 1" :value="0"></v-radio>
                  <v-spacer></v-spacer>
                  <v-radio color="primary" label="Режим 2" :value="1"></v-radio>
                  </v-layout>
                </v-radio-group>
                <v-layout row>
                  <v-flex xs5>
                    <span class="grey--text text--darken-1 headline text-none">
                    Регистрация событий при непрерывно нажатой кнопке. Подходит для регистрации единичных чеков, или непродолжительных событий.
                  </span>
                  </v-flex>
                  <v-flex xs6 offset-xs1>
                    <span class="grey--text text--darken-1 headline text-none">
                    При нажатии кнопки происходит переключение в режим регистрации событий. При повторном нажатии режим отключается. Подходит для регистрации продолжительных событий.
                  </span>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <template v-if="success">
                  <span class="success--text">Применено</span>
                  <v-icon color="success" class="mr-3">mdi-check</v-icon>
                </template>
                <v-btn :loading="btnLoading" :disabled="btnLoading" color="primary" @click="sendBtn">
                  Применить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>

           <v-expansion-panel-content v-if="adminSections" :key="2" class="grey darken-4 mb-2">
            <div slot="header" class="display-1">Доступность режимов</div>
            <v-card>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 sm4 md4>
                    <v-switch v-model="activePages.knlpActive" color="primary" label="КНЛП"></v-switch>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-switch v-model="activePages.rnavActive" color="primary" label="PBN (RNAV, RNP)"></v-switch>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-switch v-model="activePages.papiActive" color="primary" label="Облет огней PAPI"></v-switch>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <template v-if="success">
                  <span class="success--text">Применено</span>
                  <v-icon color="success" class="mr-3">mdi-check</v-icon>
                </template>
                <v-btn color="primary" @click="sendActivePages">
                  Применить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>

           <v-expansion-panel-content v-if="adminSections" :key="3" class="grey darken-4 mb-2">
            <div slot="header" class="display-1">Панель состояния</div>
            <v-card>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 sm4 md4>
                    <v-switch color="primary" v-model="panelVisibility.gbasVisible" label="GBAS"></v-switch>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-switch color="primary" v-model="panelVisibility.glonassVisible" label="ГЛОНАСС"></v-switch>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-switch color="primary" v-model="panelVisibility.gpsVisible" label="GPS"></v-switch>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-switch color="primary" v-model="panelVisibility.buttonVisible" label="КНОПКА"></v-switch>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-switch color="primary" v-model="panelVisibility.positionVisible" label="МЕСТОПОЛОЖЕНИЕ"></v-switch>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-switch color="primary" v-model="panelVisibility.timeVisible" label="ВРЕМЯ"></v-switch>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <template v-if="success">
                  <span class="success--text">Применено</span>
                  <v-icon color="success" class="mr-3">mdi-check</v-icon>
                </template>
                <v-btn  color="primary" @click="sendPanelVisibility">
                  Применить
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>

          <v-expansion-panel-content v-if="adminSections" :key="4" class="grey darken-4 mb-2">
            <div slot="header" class="display-1">Удалить ВС из базы</div>
            <v-card>
              <v-card-text>
                <v-layout row wrap>
                  <v-autocomplete
                    v-model="aircraft"
                    :items="aircrafts"
                    :search-input.sync="getCraft"
                    label="№ ВС..."
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
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <template v-if="success">
                  <span class="success--text">Применено</span>
                  <v-icon color="success" class="mr-3">mdi-check</v-icon>
                </template>
                <v-btn  color="primary" @click="dellAircraft">Удалить</v-btn>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-if="adminSections" :key="5" class="grey darken-4">
            <div slot="header" class="display-1">Добавить тестовый маршрут в базу</div>
            <add-test-route :success="success"></add-test-route>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
  import AddTestRoute from './PBN/AddTestRoute'
  export default {
    components: { AddTestRoute },
    props: ['activePanel', 'autoClose'],
    data: () => ({
      recLoader: null,
      recLoading: false,
      recCheck: null,
      btnLoader: null,
      btnLoading: false,
      aircraftId: null,
      aircraft: {},
      aircrafts: [],
      getCraft: null,
      adminSections: false
    }),
    watch: {
      recLoader () {
        const l = this.recLoader
        this[l] = !this[l]
        this[l] = false
        this.recLoader = null
      },
      btnLoader () {
        const l = this.btnLoader
        this[l] = !this[l]
        this[l] = false
        this.btnLoader = null
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
    },
    beforeDestroy() {
      this.$store.commit('GET_SUCCESS', false)
    },
    computed: {
      active: {
        get() {
          return this.activePanel
        },
        set() {
          this.$store.commit('GET_SUCCESS', false)
        }
      },
      success() { return this.$store.getters.success },
      btnMode: {
        get() {
          return this.$store.getters.btnMode
        },
        set(val) {
          this.$store.commit('PRESS_BTN_MODE', val)
        }
      },
      frequency: {
        get() {
          return this.$store.getters.friquency
        },
        set(val) {
          this.$store.commit('SET_FRIQUENCY', val)
        }
      },
      panelVisibility: {
        get() {
          return this.$store.getters.panelVisibility
        },
        set(val) {
          this.$store.commit('SET_PANEL_VISIBILITY', val)
        }
      },
      activePages: {
        get() {
          return this.$store.getters.activePages
        },
        set(val) {
          this.$store.commit('SET_ACTIVE_MODES', val)
        }
      }
    },
    methods: {
      //Скрывает разделы "Доступность режимов", "Панель состояния", "Удалить ВС из базы" (Ctrl + Click)
      isAdminSetting() {
        this.adminSections = !this.adminSections
      },
      //
      active() {
        this.$store.commit('GET_SUCCESS', false)
      },
      sendRec () {
        this.recLoader = 'recLoading'
        this.$store.dispatch('getRecMode', this.frequency)
        if (this.autoClose) {
          this.$emit('saved')
        }
      },
      sendBtn () {
        this.btnLoader = 'btnLoading'
        this.$store.dispatch('getBtnMode', this.btnMode)
        if (this.autoClose) {
          this.$emit('saved')
        }
      },
      sendPanelVisibility() {
          this.$http.post(`config/SetPanelVisibility`, this.panelVisibility, {
              headers: { 'Content-type': 'application/json' }
            })
          .then(() => {
            this.$store.commit('GET_SUCCESS', true)
          })
          .catch(err => {
            console.log(err)
          })
      },
      sendActivePages() {
        this.$http.post(`config/SetActiveModes`, this.activePages, {
              headers: { 'Content-type': 'application/json' }
            })
          .then(() => {
            this.$store.commit('GET_SUCCESS', true)
          })
          .catch(err => {
            console.log(err)
          })
      },
      dellAircraft() {
        if (this.aircraft) {
          this.$http.delete(`Aircraft/Delete?aircraftId=${this.aircraft.id}`)
            .then(() => {
              this.aircraft = null
              this.$store.commit('GET_SUCCESS', true)
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    }
  }
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
