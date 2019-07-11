<template>
  <div>
    <v-btn color="primary" style="position: absolute; top: 50%; right: 460px; z-index: 1000; transform: rotate(90deg); border-top: 0;" @click="closed">
      <v-icon large>keyboard_arrow_up</v-icon>
    </v-btn>
    <v-navigation-drawer v-model="$store.state.drawer" width="500" absolute style="z-index: 1001;" right>
  <v-container fluid grid-list-md style="background: #fafafa;">
    <v-alert v-if="$store.state.errors" :value="true" type="error">
      Ошибка соединения с сервером
    </v-alert>
    <v-card style="background: #9cb7cb; margin-bottom: 10px;">
      <v-card-title>
        <h2 >{{ $store.state.changeIcao ? $store.state.changeIcao.gbasInfo.icao : $store.state.icao }}</h2>
      </v-card-title>
      <v-divider></v-divider>
      <v-layout v-for="(item, item_id) in gbasInfo" :key="item_id" style="border-bottom: 1px solid rgba(0,0,0,0.12); margin: 10px 15px; font-size: 1.2rem;">
        <v-list-tile-content style="font-weight: bold;">{{item.label}}</v-list-tile-content>
        <v-list-tile-content  class="align-end">{{ item.value }}</v-list-tile-content>
      </v-layout>
    </v-card>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-chip label outline style="font-size: 25px;" @click="isFirstNode = !isFirstNode">Первый комплект</v-chip>
      </v-card-title>
      <v-divider></v-divider>
      <v-layout v-show="isFirstNode" v-for="(item, item_id) in firstNode" :key="item_id" style="border-bottom: 1px solid rgba(0,0,0,0.12); margin: 10px 15px; font-size: 1.2rem;">
        <v-list-tile-content style="font-weight: bold;">{{item.label}}</v-list-tile-content>
        <v-list-tile-content  class="align-end">{{ item.value }}</v-list-tile-content>
      </v-layout>
    </v-card>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-chip label outline style="font-size: 25px;" @click="isSecondNode = !isSecondNode">Второй комплект</v-chip>
      </v-card-title>
      <v-divider></v-divider>
      <v-layout v-show="isSecondNode" v-for="(item, item_id) in secondNode" :key="item_id" style="border-bottom: 1px solid rgba(0,0,0,0.12); margin: 10px 15px; font-size: 1.2rem;">
        <v-list-tile-content style="font-weight: bold;">{{item.label}}</v-list-tile-content>
        <v-list-tile-content  class="align-end">{{ item.value }}</v-list-tile-content>
      </v-layout>
    </v-card>
  </v-container>
  </v-navigation-drawer>
  </div>
</template>

<script>
import { L } from 'vue2-leaflet'

  export default {
    data: () => ({    
      locale_options_utc: {
        year: 'numeric', 
        month: 'numeric',
        day: 'numeric',
        hour12: false,
        timeZone: 'UTC',
        timeZoneName: 'short'
      },
      h2: '',
      isSecondNode: true,
      isFirstNode: true,
      interval: null
    }),
    beforeDestroy() {
      clearInterval(this.interval)
        },
        mounted() {
                if (this.$store.state.drawer && this.$store.state.lccs !== '') {
                    this.interval = setInterval(() => {
                        this.axios.get(`api/gbas/status/${this.$store.state.icao}`)
                            .then((response) => {
                                this.$store.state.changeIcao = response.data
                                this.$store.state.errors = null
                            })
                            .catch(e => this.$store.state.errors = e)
                    }, 3000)
                }
        },
        computed: {
            gbasInfo() {
                let lccs = this.$store.state.changeIcao.gbasInfo
                let date = lccs ? new Date(this.$store.state.changeIcao.lastUpdate) : ''
                return [
                    { label: 'Аэропорт:', value: lccs.nameRus },
                    { label: 'ИКАО:', value: lccs.icaoRus },
                    { label: 'Частота:', value: lccs.frequency },
                    { label: 'Канал:', value: lccs.сhannel },
                    { label: 'Обновление:', value: this.$store.state.changeIcao.lastUpdate ? date.toLocaleTimeString('ru-RU', this.locale_options_utc) : '' }
                ]
            },
            firstNode() {
                let lccs = this.$store.state.changeIcao.firstNode
                let dFirstNode = lccs ? new Date(lccs.packetDateTime) : ''
                return [
                    { label: 'Спутников GPS:', value: lccs ? lccs.gpsCount : '' },
                    { label: 'Спутников ГЛОНАСС:', value: lccs ? lccs.glonassCount : '' },
                    { label: 'Точность(авт, B):', value: lccs ? lccs.stda_ealt.toFixed(4) : '' },
                    { label: 'Точность(авт, L):', value: lccs ? lccs.stda_elat.toFixed(4) : '' },
                    { label: 'Точность(авт, H):', value: lccs ? lccs.stda_elon.toFixed(4) : '' },
                    { label: 'Точность(дифф, B):', value: lccs ? lccs.diff_ealt.toFixed(4) : '' },
                    { label: 'Точность(дифф, L):', value: lccs ? lccs.diff_elat.toFixed(4) : '' },
                    { label: 'Точность(дифф, H):', value: lccs ? lccs.diff_elon.toFixed(4) : '' },
                    { label: 'Обновление (UTC):', value: lccs ? dFirstNode.toLocaleTimeString('ru-RU', this.locale_options_utc) : '' }
                ]
            },
            secondNode() {
                let lccs = this.$store.state.changeIcao.secondNode
                let dSecondNode = lccs ? new Date(lccs.packetDateTime) : ''
                return [
                    { label: 'Спутников GPS:', value: lccs ? lccs.gpsCount : '' },
                    { label: 'Спутников ГЛОНАСС:', value: lccs ? lccs.glonassCount : '' },
                    { label: 'Точность(авт, B):', value: lccs ? lccs.stda_ealt.toFixed(4) : '' },
                    { label: 'Точность(авт, L):', value: lccs ? lccs.stda_elat.toFixed(4) : '' },
                    { label: 'Точность(авт, H):', value: lccs ? lccs.stda_elon.toFixed(4) : '' },
                    { label: 'Точность(дифф, B):', value: lccs ? lccs.diff_ealt.toFixed(4) : '' },
                    { label: 'Точность(дифф, L):', value: lccs ? lccs.diff_elat.toFixed(4) : '' },
                    { label: 'Точность(дифф, H):', value: lccs ? lccs.diff_elon.toFixed(4) : '' },
                    { label: 'Обновление (UTC):', value: lccs ? dSecondNode.toLocaleTimeString('ru-RU', this.locale_options_utc) : '' }
                ]
            },
        },
        methods: {
      closed() {
        this.$store.state.drawer = false
        this.$store.state.icao = ''
        this.$store.state.bounds = L.latLngBounds([
          [100, -150],
          [-50, 350]
        ])
        
      }
    }
  }
</script>


