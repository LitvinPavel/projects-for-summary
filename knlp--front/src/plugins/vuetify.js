import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#14a443',
    secondary: '#909090',
    accent: '#cccccc',
    error: '#f43636',
    info: '#00f3ff',
    success: '#66c74e',
    warning: '#f4c436',
    disabled: '#727272',
    red: '#ff1100',
    blue: '#000fff',
    green: '#008800',
    yellow: '#F9A825'
  },
  iconfont: 'mdi',
})
