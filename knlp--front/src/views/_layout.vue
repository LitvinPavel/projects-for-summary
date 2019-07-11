<template>

  <v-app dark>
    <!--HEADER-->
    <main  style="height: calc(100vh - 60px)">
      <!-- <div :class="btnState === 'yellow' ? 'button_pressed_event' : ''">
      </div> -->
      <v-toolbar height="100" v-if="($route.path !== '/') && ($route.path !== '/pbn/flyby-mode') && ($route.path !== '/papi/flyby-mode')">
        <v-btn  icon :to="$store.state.base.back" class="mb-3">
          <v-icon x-large>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="display-1 font-weight-thin text-xs-center py-2">{{$store.state.base.pageTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="text-xs-center py-4">
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <img src='../img/spectr.png' width="249" height="60" alt="spectr" />
      </v-toolbar>
      <v-snackbar class="py-2" :multi-line="true" :color="error.state" :top="true" :value="error.status">
        <v-layout class="py-2">
          <span class="title">{{ error.message }}</span>
          <v-icon @click="$store.commit('CLEAR_ERROR')">mdi-close</v-icon>
        </v-layout>
      </v-snackbar>
      <router-view />
    </main>
    
    <!--FOOTER-->
    <v-footer height="60" v-if="$route.path !== '/'">
    <v-toolbar height="60" class="custom_bar">
      <v-layout row justify-space-around>
      <v-flex v-if="panelVisibility.gpsVisible" class="_pa-2px">
        <v-card flat dark :class="[gnssStatus(position.gps), 'py-2', 'text-xs-center']">
          <span :class="[(position.gps >= 1 && position.gps < 5) ? 'black--text' : 'white--text', '_px-2px', 'title']">GPS - {{ position.gps }}</span>
        </v-card>
      </v-flex>
      <v-flex v-if="panelVisibility.glonassVisible" class="_pa-2px">
        <v-card flat dark :class="[gnssStatus(position.glonass), 'py-2', 'text-xs-center']">
          <span :class="[(position.glonass >= 1 && position.glonass < 5) ? 'black--text' : 'white--text', '_px-2px', 'title']">ГЛОНАСС - {{ position.glonass }}</span>
        </v-card>
      </v-flex>
      <v-flex v-if="panelVisibility.gbasVisible" class="_pa-2px">
        <v-card flat dark :class="[gbasState, 'py-2', 'text-xs-center']" @click="isSetting(0)">
          <span :class="[gbasState === 'yellow' ? 'black--text' : 'white--text', '_px-2px', 'title']">
            GBAS
            <v-icon size="22" v-if="position.isDiffMode" class="pl-1">mdi-crosshairs-gps</v-icon>
          </span>
        </v-card>
      </v-flex>
      <v-flex v-if="panelVisibility.buttonVisible" class="_pa-2px">
        <v-card flat dark :class="[btnState, 'py-2', 'text-xs-center']">
            <span :class="[btnState === 'yellow' ? 'black--text' : 'white--text']">
              <span class="_px-2px title">Кнопка {{ btnMode }}</span>
            </span>
        </v-card>
        <v-dialog v-model="setting" fullscreen hide-overlay transition="dialog-bottom-transition">
          <main-setting v-if="setting" v-model="setting" :activePanel="activesPanel" :autoClose="true" @saved="save"></main-setting>
        </v-dialog>
      </v-flex>
      <v-flex v-if="panelVisibility.positionVisible" class="_pa-2px">
        <v-card flat dark class="black py-2 text-xs-center" style="min-height: 40px;">
          <span class="_px-2px title white--text">{{ position.position }}</span>
        </v-card>
      </v-flex>
      <v-flex v-if="panelVisibility.timeVisible" class="_pa-2px">
        <v-card dark class="black py-2 text-xs-center" style="min-height: 40px;">
          <span class="_px-2px title white--text">{{ position.time }}</span>
        </v-card>
      </v-flex>
      </v-layout>
    </v-toolbar>
  </v-footer>
  </v-app>
</template>

<script>
  import * as SignalR from '@aspnet/signalr'
  import MainSetting from '../components/MainSetting.vue'

  export default {
    components: {
      MainSetting
    },
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
      connection: null,
      position: {},
      setting: false,
      activesPanel: null,
      getGBAS: [
        { text: 'Base Receivers Gbas', value: 'OOP 2' },
        { text: 'Continuation Index Gbas', value: 'GCID 1' },
        { text: 'Ellipsoid Height', value: '187.85' }
      ]
    }),
    beforeCreate() {
      this.$http.get(`/procedure/getstate`)
        .then(res => {
          if (res.data.procedureType === 2) {
            this.$store.dispatch('INIT_USER_DATA', res.data)
            this.$router.push('/papi/flyby-mode')
          }
          if (res.data.procedureType === 1) {
            this.$store.dispatch('INIT_SCHEME', res.data)
            this.$router.push('/pbn/flyby-mode')
          }
        })
        .catch((err) => {
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    },
    created() {
      this.connection = new SignalR.HubConnectionBuilder()
        .withUrl(process.env.VUE_APP_SIGNALR)
        .configureLogging(SignalR.LogLevel.Information)
        .build();
      this.connection.start()

    },
    mounted() {
      
      this.connection.on('UpdatePosition', data => {
        this.position = data
        if (data.positionStatus) {
          this.$store.commit('INIT_POSITION_STATUS', data)
        } 
        if (data.papiPositionStatus) {
          this.$store.commit('INIT_PAPI_POSITION_STATUS', data.papiPositionStatus)
        }
        
        this.connection.onclose(() => {
         let interval = setInterval(() => {
           this.connection.start()
             .then(() => {
               clearInterval(interval)
             })
             .catch(err => console.error(err.toString()))
         }, 5000)
        })
      })
      this.connection.on('UpdateButtonState', data => {
        this.$store.dispatch('getPressBtnState', data)
        
      })
      this.connection.on('UpdateGbasState', data => {
        this.$store.dispatch('getGbasState', data)
      })
      this.connection.on('CommandResult', data => {
        if(data.response.isError) {
          this.$store.commit('IS_ERROR', { Message: data.response.message, state: 'error' })
        } else {
          this.$store.commit('IS_ERROR', { Message: data.response.message, state: 'primary' })
        }
      })

    },
    computed: {
      btnMode() {
        return this.$store.getters.btnMode === 0 ? '1' : '2'
      },
      error() {
        return this.$store.getters.getError
      },
      btnState() {
        return this.$store.getters.pressBtnState 
      },
      gbasState() {
        return this.$store.getters.gbasState
      },
      panelVisibility() {
        return this.$store.getters.panelVisibility
      }
    },
    methods: {
      goBack() {
        this.$route.name ?
          this.$router.go(-1) :
          this.$router.push('/')
      },
      gnssStatus(quantity) {
        if (quantity >= 1 && quantity < 5) {
          return 'orange'
        } 
        else if (quantity >= 5) {
          return 'green'
        }
        else {
          return 'blue-grey darken-4'
        }
      },
      asStatus(quantity) { return quantity ? 'blue' : 'blue-grey darken-4' },
      save() {this.setting = false},
      isSetting(active) {
        this.activesPanel = active
        this.setting = true
      }
    }
  }
</script>

<style>
  html {
    overflow-y: hidden;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;      
  }
  .v-btn {
    font-size: 1.5rem;
  }
  .theme--dark.v-card,
  .theme--dark.v-table,
  .theme--dark.v-datatable .v-datatable__actions {
    background-color: transparent;
  }

  body,
  .application {
    font-size: 1em;
    text-transform: uppercase;
  }

  .theme--dark.v-toolbar {
    background-color: #033445;
  }

  .theme--dark.application {
    background: #000;
  }


  input,
  select,
  textarea,
  .v-label {
    font-size: 150%;
  }

  .v-breadcrumbs--large li {
    font-size: 1.5rem;
  }

  .inner-box {
    box-shadow: 0 0 5px #fff;
  }
  .custom_bar > div {
    padding-right: 2px !important;
    padding-left: 2px !important;
  }
  .custom_bar > div > div > span > span, .custom_bar > div > div > div > div > span > span {
    padding: 0 6px !important;
  }
  ._pa-2px {
    padding: 2px;
  }

  /* .button_pressed_event {
    position: absolute; 
    border: 10px solid #f4c436; 
    width: 100%; 
    height: 94%;
  } */
</style>
