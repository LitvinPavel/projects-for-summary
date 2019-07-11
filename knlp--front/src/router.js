import Vue from 'vue'
import Router from 'vue-router'

import Layout from './views/_layout.vue'
import Home from './views/_home.vue'
import RNAVMenu from './views/PBN/_rnavMenu.vue'
import SetupData from './views/PBN/_setupData.vue'
import SchemeConfig from './views/PBN/_schemeConfig.vue'
import Reports from './views/PBN/_reports.vue'
import FlybyModeRnav from './views/PBN/_flybyMode.vue'

import PapiMenu from './views/PAPI/_papiMenu.vue'
import SelectedAircraft from './views/PAPI/_selected_aircraft.vue'
import PapiReports from './views/PAPI/_papiReports.vue'
import VPPPreview from './views/PAPI/___preview.vue'
import SelectedVPP from './views/PAPI/__selected_vpp.vue'
import SelectAir from './views/PAPI/_select_air.vue'
import FlybyModePapi from './views/PAPI/_testFlightPapi.vue'

const routes = [{
  path: '/',
  component: Layout,
  children: [
    {
      path: '',
      component: Home,
    },
    {
      path: '/pbn/',
      name: 'PBN (RNAV, RNP)',
      component: RNAVMenu,
    },
    {
      path: '/pbn/setup-data',
      name: 'Ввод установочных данных',
      component: SetupData,
    },
        {
          path: '/pbn/scheme-configuration',
          name: 'Конфигурация схемы',
          component: SchemeConfig,
        },
        {
          path: '/pbn/reports',
          name: 'Отчеты',
          component: Reports,
        },
        {
          path: '/pbn/flyby-mode',
          name: 'Режим облета',
          component: FlybyModeRnav,
        },
        //papi
        {
          path: '/papi/',
          name: 'Облет огней PAPI',
          component: PapiMenu,
        },
        {
          path: '/papi/aircraft-selected',
          name: 'Выбор борта',
          component: SelectedAircraft,
        },
        {
          path: '/papi/reports',
          name: 'Отчеты',
          component: PapiReports,
        },
        {
          path: '/papi/vpp-preview',
          name: 'Предварительный просмотр параметров ВПП',
          component: VPPPreview
        },
        {
          path: '/papi/vpp-selected',
          name: 'Выбор ВПП',
          component: SelectedVPP
        },
        {
          path: '/papi/airport-selected',
          name: 'Выбор аэропорта',
          component: SelectAir
        },
        {
          path: '/papi/flyby-mode',
          name: 'Режим облета огней PAPI',
          component: FlybyModePapi
        }
  ],
}]

Vue.use(Router)

const router = new Router({
  routes,
})

export default router
