import Vue from 'vue'
import Vuex from 'vuex'

import base from './base'
import pbn from './pbn'
import papi from './papi'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    base,
    pbn,
    papi
  }
});
