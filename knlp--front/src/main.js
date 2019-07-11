import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import axios from 'axios';
const base = axios.create({
  baseURL: '/'
})

const nonAccessiblePage = {
  pbn: {
    link: '/pbn',
    abailable: true
  },
  setupData: {
    link: '/pbn/setup-data',
    abailable: true
  },
  pbnReports: {
    link: '/pbn/reports',
    abailable: true
  },
  knlp: {
    link: '/knlp',
    abailable: false
  },
  papi: {
    link: '/papi',
    abailable: true
  },
  papiSelectAircraft: {
    link: '/papi/aircraft-selected',
    abailable: true
  },
  papiReports: {
    link: '/papi/reports',
    abailable: true
  }
}

Vue.prototype.$http = base
Vue.prototype.$page = nonAccessiblePage
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  created() {
    this.$store.dispatch('getPanelVisibility')
    this.$store.dispatch('getActiveModes')
  },
  render: h => h(App),
}).$mount('#app');
