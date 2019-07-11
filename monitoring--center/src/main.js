require('../node_modules/vuetify/src/stylus/app.styl')
//const signalR = require('../node_modules/@aspnet/signalr/dist/browser/signalr')
import Vue from 'vue'
import Vuetify from 'vuetify'

import VDivider from 'vuetify/lib/components/VDivider'
import VImg from 'vuetify/lib/components/VImg'
import VMenu from 'vuetify/lib/components/VMenu'
import VAlert from 'vuetify/lib/components/VAlert'
import VAvatar from 'vuetify/lib/components/VAvatar'
import VAutocomplete from 'vuetify/lib/components/VAutocomplete'
import VCheckbox from 'vuetify/lib/components/VCheckbox'

import VApp from 'vuetify/lib/components/VApp'
import VNavigationDrawer from 'vuetify/lib/components/VNavigationDrawer'
import VBtn from 'vuetify/lib/components/VBtn'
import VIcon from 'vuetify/lib/components/VIcon'
import VChip from 'vuetify/lib/components/VChip'

import VGrid from 'vuetify/lib/components/VGrid'
import transitions from 'vuetify/lib/components/transitions'
import VToolbar from 'vuetify/lib/components/VToolbar'
import VList from 'vuetify/lib/components/VList'
import VCard from 'vuetify/lib/components/VCard'


import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import App from './App.vue'

//Vue.use(HubConnectionBuilder,LogLevel)

Vue.use(VueAxios, axios)
Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VCard,
    VChip,
    VToolbar,
    VDivider,
    VImg,
    VMenu,
    VAlert,
    VAvatar,
    VAutocomplete,
    VCheckbox,
    transitions
  },
  theme: {
    primary: '#184369',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#d50101',
    info: '#2196F3',
    success: '#00a721',
    warning: '#e8e50f'
  }
})

//Vue.prototype.$signalR = signalR

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})