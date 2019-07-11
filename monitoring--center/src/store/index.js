import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

    state: {
      bounds: null,
        changeIcao: {
          gbasInfo: {
            icao: ''
          }
        },
        icaoUpdate: [],
        drawer: false,
        icao: '',
        errors: null,
        count: {
          green: 0,
          yellow: 0,
          red: 0
        }
    }
})

export default store
