<template>
  <v-app>
    <v-toolbar :height="80" style="z-index:999;">
      <v-toolbar-items>
        <v-img :src="logo" :width="100" :height="80"></v-img>
      </v-toolbar-items>
      <v-toolbar-title class="mr-4">
          <h3>Мониторинг передачи данных от датчиков ГНСС</h3>
      </v-toolbar-title>
      <v-divider class="mx-3" inset vertical></v-divider>
      <v-chip style="font-size: 1.5rem;">
        <v-checkbox
              v-model="statusId.green"
              color="green"
              :value="1"
              hide-details
            ></v-checkbox>
            {{$store.state.count.green}}
      </v-chip>
      <!--<v-chip style="font-size: 1.5rem;">
        <v-checkbox
              v-model="statusId.yellow"
              color="yellow"
              :value="2"
              hide-details
            ></v-checkbox>
            {{$store.state.count.yellow}}
      </v-chip>-->
      <v-chip style="font-size: 1.5rem;">
        <v-checkbox
              v-model="statusId.red"
              color="red"
              :value="3"
              hide-details
            ></v-checkbox>
            {{$store.state.count.red}}
      </v-chip>
      <v-divider class="mx-3" inset vertical></v-divider>
      <v-toolbar-items>
          <v-autocomplete class="ml-4 mt-2"
                          color="blue-grey lighten-2"
                          v-model="search"
                          item-text="airport"
                          placeholder="Поиск..."
                          :items="icaos"
                          return-object
                          @change="!search ? null : changedLccs(search.icao)">
              <template slot="no-data">
                  <v-list-tile>
                      <v-list-tile-title>
                      Не найдено                             
                      </v-list-tile-title>
                  </v-list-tile>
              </template>
              <template slot="selection" slot-scope="data">
                  {{ $store.state.drawer ? data.item.airport : null }}
              </template>
              <template slot="item" slot-scope="data">
                  <v-list-tile-content>
                      <v-list-tile-title v-html="data.item.airport"></v-list-tile-title>
                  </v-list-tile-content>
              </template>
          </v-autocomplete>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout wrap style="height: 90vh; margin: 0; padding: 0;">
      <v-map style="height: 100%;" :zoom.sync="zoom" :minZoom="minZoom" :maxZoom="maxZoom" :center="center" :bounds="$store.state.bounds" :maxBounds="maxBounds">
        <v-tilelayer :url="url"></v-tilelayer>
        <v-marker   v-for="c in lccsFilter" :lat-lng="[c.latitude, c.longitude]" :key="c.latitude" :icon="updates(c.icao)" @click="changedLccs(c.icao)">
            <v-tooltip><popup-content :data="c" /></v-tooltip>
        </v-marker>
        <v-circle 
          v-for="(point, index) in lccsFilter" 
          :lat-lng="[point.latitude, point.longitude]" 
          :color="optionsCircle.color" 
          :opacity="optionsCircle.opacity" 
          :weight="optionsCircle.weight" 
          :fillColor="optionsCircle.fillColor" 
          :radius="optionsCircle.radius"
          :key="index">
        </v-circle>
        <div style="position: absolute; bottom: 10px; left: 0; z-index: 1001; ">
          <div class="text-xs-center">
            <v-menu transition="slide-x-transition" top :nudge-width="200" offset-y>
              <v-btn slot="activator" color="primary">Легенда</v-btn>
              <v-list two-line>
                <template v-for="(l, l_id) in legends">
                  <v-list-tile :key="`${l_id}-tile`">
                  <v-list-tile-avatar>
                    <img :src="l.imgsm">
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-text="l.title"></v-list-tile-title>
                  </v-list-tile-content>
                  </v-list-tile>
                  <v-divider v-if="l_id < 2" :inset="true" :key="`${l_id}-divider`"></v-divider>
                </template>
              </v-list>
            </v-menu>
          </div>
        </div>
      </v-map>
      <icao-wrapper v-if="$store.state.drawer"></icao-wrapper>
    </v-layout>
    <v-alert
      style="position: fixed; z-index: 10000; bottom: 50%; left: 45%;"
      :value="connection.connection.connectionState ? isConnect : false"
      type="error"
    >
      Ошибка соединения с сервером
    </v-alert>
  </v-app>
</template>

<script>
    import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
  import { L } from 'vue2-leaflet'
    import { LMap, LTileLayer, LMarker, LCircle, LTooltip } from 'vue2-leaflet'
    import PopupContentLccs from './components/popupContentLccs.vue'
  import successIcon from './img/icon/lccs_sm.png'
  import warningIcon from './img/icon/rtm-y.png'
  import errorIcon from './img/icon/rtm-r.png'
  import IcaoWrapper from './components/changeIcaoWrapper.vue'
  import nppf from './img/nppf-icon.png'



  export default {
    data: () => ({
      connection: null,
        err: null,
        search: {
            icao: '',
            airport: ''
        },
      legend: false,
      legends: [
        { title: 'ЛККС на связи', imgsm: successIcon },
        //{ title: 'Один комплект на связи', imgsm: warningIcon },
        { title: 'Нет связи с ЛККС', imgsm: errorIcon }
      ],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoom: 3,
      minZoom: 3,
      maxZoom: 18,
      bounds: L.latLngBounds([
        [100, -150],
        [-50, 350]
      ]),
      maxBounds: L.latLngBounds([
        [100, -150],
        [-50, 350]
      ]),
      center: [64, 100],
      gbasState: [],
      optionsCircle: {
        color: "green",
        fillColor: "green",
        radius: 350000,
        weight: 0.6,
        opacity: 0.5
      },
      icons: null,
      logo: nppf,
      statusId: {
        green: 1,
        yellow: 2,
        red: 3
      }
    }),
    created() {
        this.axios.get('api/gbas/States')
        .then((response) => {
          this.gbasState = response.data
          this.err = null
        })
        .catch(e => {
          console.log(e.toString())
          this.err = true
        })
      this.connection = new HubConnectionBuilder()
          .withUrl('rt')
          .configureLogging(LogLevel.Information)
        .build();
      this.connection.start()
    },
    mounted() {
      this.$store.state.bounds = this.bounds
      this.connection.on('UpdateStates', data => {
        this.gbasState = data
        this.$store.state.count = {
          green: 0,
          yellow: 0,
          red: 0
        }
        this.gbasState.forEach(data => {
          switch (data.status) {
            case 1: this.$store.state.count.green++
              break
            case 2: this.$store.state.count.yellow++
              break
            case 3: this.$store.state.count.red++
              break
          }
        })
        return this.$store.state.count
      })  
      this.connection.onclose(() => {
        let interval = setInterval(() => {
          this.connection.start()
            .then(() => {
              clearInterval(interval)
            })
            .catch(err => console.error(err.toString()))
        }, 5000)
      })
    },
    computed: {
      isConnect() {return this.connection.connection.connectionState !== 1},
      counts() {
        return [
          {color: 'success', value: this.$store.state.count.green, check: this.statusId.green },
          {color: 'warning', value: this.$store.state.count.yellow, check: this.statusId.yellow },
          {color: 'error', value: this.$store.state.count.red, check: this.statusId.red }
        ]
      },
      icaos() {
          return this.lccsFilter.map(v => {
           return { icao: v.icao, airport: v.icao + ' (' + v.airport + ')' }
        })
      },
      lccsFilter() {
        return this.statusId ? this.gbasState.filter(v => 
        v.status == this.statusId.green || 
        v.status == this.statusId.yellow || 
        v.status == this.statusId.red) : this.gbasState}
    },
    methods: {
      updates(icao) {
        let isIcao = this.gbasState.find(v => v.icao === icao)
        let isIcon = successIcon
        if (isIcao.status === 1) isIcon = successIcon
        if (isIcao.status === 2) isIcon = warningIcon
        if (isIcao.status === 3) isIcon = errorIcon
        let divIcon = L.divIcon({
          html: `<div class="my-label"><img width="24" height="24" src="${isIcon}"/><br>${isIcao.icao}</div>`  
        })
        let icon = L.icon({ iconUrl: isIcon, iconSize: [24, 24] }) 
        return this.zoom > 4 ? divIcon : icon
        },
      changedLccs(gbas) {
          this.axios.get(`api/gbas/status/${gbas}`).then((response) => {
          this.$store.state.icao = response.data.gbasInfo.icao
          this.$store.state.changeIcao = response.data
          this.$store.state.bounds = L.latLngBounds([
            [this.$store.state.changeIcao.gbasInfo.latitude - 2, this.$store.state.changeIcao.gbasInfo.longitude - 2],
            [this.$store.state.changeIcao.gbasInfo.latitude + 2, this.$store.state.changeIcao.gbasInfo.longitude + 2]
          ])
          this.$store.state.drawer = true
        })  
      }  
    },
    components: {
      'v-map': LMap,
      'v-tilelayer': LTileLayer,
      'v-marker': LMarker,
      'v-circle': LCircle,
      'v-tooltip': LTooltip,
      'popup-content': PopupContentLccs,
      IcaoWrapper
    },
  }
</script>

<style>
  @import "~leaflet/dist/leaflet.css";
  html {
    overflow-y: hidden;
  }
  .application {
    font-family: "Times New Roman", "Times CY", "Nimbus Roman No9 L", serif;
  }
  h1, h2, h3, h4 {
    font-family: "Times New Roman", "Times CY", "Nimbus Roman No9 L", serif;
    color: #184369;
    text-shadow: -2px 4px 6px rgba(22, 22, 24, 0.35);
    font-weight: 500;
    line-height: 1.2;
  }
  h1 {
    font-size: 40px;
  }
  h2 {
    font-size: 30px;
  }
  .my-label {
    font-family: "Times New Roman", "Times CY", "Nimbus Roman No9 L", serif;
    width: 250px;
    font-size: 21px;
    font-weight: bold;
    color: black;
    margin-top: -7px;
    margin-left: -120px;
    text-align: center;
    text-shadow: white 1px 1px 0, white -1px -1px 0, white -1px 1px 0, white 1px -1px 0;
  }
</style>