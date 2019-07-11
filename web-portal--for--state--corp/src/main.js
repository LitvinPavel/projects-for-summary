require('../node_modules/bootstrap/dist/css/bootstrap.css')
require('../node_modules/bootstrap-vue/dist/bootstrap-vue.css')
import Vue from 'vue'
import VueRouter from 'vue-router'
import { Layout, Form, Nav, Dropdown, Image, FormFile, FormInput, FormSelect, FormGroup, Tabs, Button, Progress, Modal, Table } from 'bootstrap-vue/es/components';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueScrollTo from 'vue-scrollto'
import VueI18n from 'vue-i18n'
import store from './store'

import App from './App'
import Wrapper from './components/Layout.vue'
import Home from './components/Home.vue'
import RAIM from './components/RAIM.vue'
import Gbas from './components/Gbas/Gbas.vue'
import RaimAir from './components/Air/RAIM_Air.vue'
import RaimRouter from './components/Route/RAIM_Router.vue'
import RFTerritory from './components/Planning/RAIM_Planning.vue'
import CrewReport from './components/Report/CrewReport.vue'
import ReportSaved from './components/Report/ReportSaved.vue'
import En from './json/locale/en.json'
import Ru from './json/locale/ru.json'


Vue.use(VueRouter)
Vue.use(VueScrollTo)
Vue.use(Layout)
Vue.use(Form)
Vue.use(Nav)
Vue.use(Dropdown)
Vue.use(Image)
Vue.use(FormFile)
Vue.use(FormInput)
Vue.use(FormSelect)
Vue.use(FormGroup)
Vue.use(Tabs)
Vue.use(Button)
Vue.use(Progress)
Vue.use(Modal)
Vue.use(Table)
Vue.use(VueAxios, axios)
Vue.use(VueI18n)
Vue.config.productionTip = false

let lang = 'RUS'

if (navigator.language != ('ru-RU' || 'ru')) {
    lang = 'ENG'
}

export const i18n = new VueI18n({
  locale: lang,
  messages: {
    ENG: En,
    RUS: Ru
  }
})

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },
    { path: '/:id', component: Wrapper,
      children: [
        { path: '/RAIM', name: 'RAIM', component: RAIM },
        { path: '/RAIM/Air', name: 'RAIM Аэропорт', component: RaimAir },
        { path: '/RAIM/Route', name: 'RAIM Маршрут', component: RaimRouter },
        { path: '/RAIM/RFT', name: 'RAIM Территория РФ', component: RFTerritory },
          { path: '/Gbas', name: 'GBAS Российская Федерация', component: Gbas },
          { path: '/CrewReport', name: 'Доклады экипажей', component: CrewReport },
          { path: '/ReportSaved', component: ReportSaved },
      ]
    }
  ]
})

new Vue({
  i18n: i18n,
    el: '#app',
  store,
  router,
  render: h => h(App)
})
