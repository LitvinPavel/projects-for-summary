import axios from 'axios'

const base = axios.create({
  baseURL: '/'
})


export default {
  state: {
    error: {
      status: false,
      state: 'error',
      message: ''
    },
    success: false,
    back: '',
    pageTitle: '',
    btnMode: 0,
    friquency: 114350,
    pressBtnState: 'blue-grey darken-4',
    gbasState: 'blue-grey darken-4',
    activePages: {
      rnavActive:true,
      knlpActive:true,
      papiActive:true
    },
    panelVisibility: {
      GbasVisible: true,
      GlonassVisible: true,
      GpsVisible: true,
      ButtonVisible: true,
      PositionVisible: true,
      TimeVisible: true
    }
  },
  mutations: {
    IS_ERROR(state, payload) {
      state.error.status = true
      state.error.state = payload.state
      state.error.message = payload.Message
    },
    CLEAR_ERROR(state) {
      state.error.status = false
      state.error.message = ''
    },
    GET_SUCCESS(state, payload) {
      state.success = payload
    },
    BACK_PAGE(state, page) {
      state.back = page
    },
    INIT_PAGE_TITLE(state, page) {
      state.pageTitle = page
    },
    PRESS_BTN_MODE(state, payload) {
      state.btnMode = payload
    },
    SET_FRIQUENCY(state, payload) {
      state.friquency = payload
    },
    CHANGE_BTN_STATE(state, payload) {
      state.pressBtnState = payload
    },
    UPDATE_GBAS_STATE(state, payload) {
      state.gbasState = payload
    },
    SET_ACTIVE_MODES(state, payload) {
      state.activePages = payload
    },
    SET_PANEL_VISIBILITY(state, payload) {
      state.panelVisibility = payload
    }
  },
  actions: {
    getBtnMode({ commit }, payload) {
      commit('CLEAR_ERROR')
      base.get(`config/SetButtonMode?mode=${payload}`)
          .then(() => {
            commit('GET_SUCCESS', true)
            commit('PRESS_BTN_MODE', payload)
          })
          .catch(err => {
            commit('IS_ERROR', { Message: err.response.data, state: 'error' })
          })
    },
    getRecMode({ commit }, payload) {
      commit('CLEAR_ERROR')
      base.get(`config/UpdateFrequency?frequency=${payload}`)
          .then(() => {
            commit('GET_SUCCESS', true)
            commit('SET_FRIQUENCY', payload)
          })
          .catch(err => {
            commit('IS_ERROR', { Message: err.response.data, state: 'error' })
          })
    },
    getPressBtnState({ commit }, payload) {
      switch (payload) {
        case 0:
          commit('CHANGE_BTN_STATE', 'green')
          break
        case 1:
          commit('CHANGE_BTN_STATE', 'yellow')
          break
        case 2:
          commit('CHANGE_BTN_STATE', 'green')
          break
        case 3:
          commit('CHANGE_BTN_STATE', 'blue-grey darken-4')
          break
        default:
          commit('CHANGE_BTN_STATE', 'blue-grey darken-4')
          break;
      }
    },
    getGbasState({ commit }, payload) {
      switch (payload) {
        case 0:
          commit('UPDATE_GBAS_STATE', 'blue-grey darken-4')
          break
        case 1:
          commit('UPDATE_GBAS_STATE', 'green')
          break
        case 2:
          commit('UPDATE_GBAS_STATE', 'yellow')
          break
        case 3:
          commit('UPDATE_GBAS_STATE', 'blue-grey darken-4')
          break
        default:
          commit('UPDATE_GBAS_STATE', 'blue-grey darken-4')
          break;
      }
    },
    getPanelVisibility({ commit }) {
      commit('CLEAR_ERROR')
      base.get(`config/GetPanelVisibility`)
          .then(res => {
            commit('SET_PANEL_VISIBILITY', res.data)
          })
          .catch(err => {
            commit('IS_ERROR', { Message: err.response.data, state: 'error' })
          })
    },
    getActiveModes({ commit }) {
      commit('CLEAR_ERROR')
      base.get(`config/GetActiveModes`)
        .then(res => {
          commit('SET_ACTIVE_MODES', res.data)
        })
        .catch(err => {
          commit('IS_ERROR', { Message: err.response.data, state: 'error' })
        })
    }
  },
  getters: {
    btnMode(state) { return state.btnMode },
    getError(state) { return state.error },
    success(state) { return state.success },
    pressBtnState(state) { return state.pressBtnState },
    gbasState(state) { return state.gbasState },
    friquency(state) { return state.friquency },
    panelVisibility(state) { return state.panelVisibility },
    activePages(state) { return state.activePages }
  }
}
