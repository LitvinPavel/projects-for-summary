import axios from 'axios'

const base = axios.create({
  baseURL: '/'
})

export default {
  state: {
    papiPositionStatus: {},
    isFly: false,
    userData: {
      aircraft: {},
      airport: {
        name: '',
        icaoCode: '',
        runway: {
          identifier: '',
          runwayInfo: {
            ltpFtpLatitude: 0,
            ltpFtpLongitude: 0,
            ltpFtpElevation: 0,
            magneticBearing: 0,
            lampsOffset: 0,
            tch: 0,
            gpa: 0,
            lamps: []
          },
        }
      }
    },
    currentLamp: {
      angle: 0,
      angleDeg: 0,
      litera: '',
      number: 0
    },
    airport: {
      name: '',
      icaoCode: '',
      runways: []
    },
    runway: {
      identifier: '',
      runwayInfo: {
        ltpFtpLatitude: 0,
        ltpFtpLongitude: 0,
        ltpFtpElevation: 0,
        magneticBearing: 0,
        lampsOffset: 0,
        tch: 0,
        gpa: 0,
        lamps: 0
      },
    },
    dataPosition: [],
    checkPosition: [],
    staticDataSet: [{
      pointRadius: 0,
      borderColor: 'orange',
      fill: false,
      borderWidth: 3,
      backgroundColor: 'orange',
      borderDash: [5,5],
      data: [
        {
          x: -11,
          y: 600
        },
        {
          x: 0,
          y: 10
        }
      ]
    }],
    dataSet: [],
    cheatTable: [],
  },
  mutations: {
    CLEAR_DATA(state) {
      state.dataSet = []
      state.dataPosition = [],
      state.checkPosition = []
      state.staticDataSet = [{
        pointRadius: 0,
        borderColor: 'orange',
        fill: false,
        borderWidth: 3,
        backgroundColor: 'orange',
        borderDash: [5,5],
        data: [
          {
            x: -11,
            y: 600
          },
          {
            x: 0,
            y: 10
          }
        ]
      }],
      state.cheatTable = []
      state.papiPositionStatus = {}
    },
    INIT_PAPI_POSITION_STATUS(state, payload) {
      state.papiPositionStatus = payload
        state.dataPosition.push({
          x: -(payload.distanceLtpFtp / 1000),
          y: payload.elevationFromLtpFtp
        })
        if (payload.isButtonPressed) {
          state.cheatTable.unshift(payload) 
          state.staticDataSet.push({
            pointRadius: 4,
            borderColor: 'green',
            fill: false,
            borderWidth: 3,
            backgroundColor: 'yellow',
            data: [{
              x: -(payload.distanceLtpFtp / 1000).toFixed(2),
              y: payload.elevationFromLtpFtp.toFixed(2)
            }]
          })
        }
      state.dataSet = state.staticDataSet.concat([{
        pointRadius: 0,
        borderColor: 'green',
        fill: false,
        borderWidth: 3,
        backgroundColor: 'green',
        data: state.dataPosition
      }])
      
      
      
    },
    SET_IS_FLY(state, payload) { state.isFly = payload },
    UPDATE_USER_DATA(state, payload) {
      state.userData.airport.name = state.airport.name
      state.userData.airport.icaoCode = state.airport.icaoCode
      state.userData.airport.runway = state.runway
      state.userData.airport.runway.runwayInfo.lamps = payload
    },
    SET_GLIDE_PATH(state, payload) {
      state.staticDataSet = [{
        pointRadius: 0,
        borderColor: 'orange',
        fill: false,
        borderWidth: 1,
        backgroundColor: 'orange',
        borderDash: [5,5],
        data: [
          {
            x: payload.x1 / 1000,
            y: payload.y1
          },
          {
            x: payload.x2 / 1000,
            y: payload.y2
          }
        ]
      }]
    },
    SET_CURRENT_LAMP(state, payload) { state.currentLamp = payload },
    SET_PAPI_AIRCRAFT(state, payload) { state.userData.aircraft = payload },
    SAVE_AIRPORT(state, payload) { state.airport = payload },
    SET_RUNWAY_IDENTIFIER(state, payload) { state.runway.identifier = payload },
    SET_LTP_FTP_LATITUDE(state, payload) { state.runway.runwayInfo.ltpFtpLatitude  = payload },
    SET_LTP_FTP_LONGITUDE(state, payload) { state.runway.runwayInfo.ltpFtpLongitude  = payload },
    SET_LTP_FTP_ELEVATION(state, payload) { state.runway.runwayInfo.ltpFtpElevation  = payload },
    SET_MAGNETIC_BEARING(state, payload) { state.runway.runwayInfo.magneticBearing  = payload },
    SET_LAMPS_OFFSET(state, payload) { state.runway.runwayInfo.lampsOffset  = payload },
    SET_TCH(state, payload) { state.runway.runwayInfo.tch  = payload },
    SET_GPA(state, payload) { state.runway.runwayInfo.gpa  = payload },
    SET_LAMPS(state, payload) { state.runway.runwayInfo.lamps  = payload },
    UPDATE_CHEAT_TABLE(state, payload) { state.cheatTable = payload }
  },
  actions: {
    SAVE_RUNWAY_INFO({ commit }, payload) {
      commit('SET_RUNWAY_IDENTIFIER', payload.identifier)
      commit('SET_LTP_FTP_LATITUDE', payload.runwayInfo.ltpFtpLatitude)
      commit('SET_LTP_FTP_LONGITUDE', payload.runwayInfo.ltpFtpLongitude)
      commit('SET_LTP_FTP_ELEVATION', payload.runwayInfo.ltpFtpElevation)
      commit('SET_MAGNETIC_BEARING', payload.runwayInfo.magneticBearing)
      commit('SET_LAMPS_OFFSET', payload.runwayInfo.lampsOffset)
      commit('SET_TCH', payload.runwayInfo.tch)
      commit('SET_GPA', payload.runwayInfo.gpa)
      commit('SET_LAMPS', payload.runwayInfo.lamps)
    },
    SET_USER_DATA({ commit, state }, payload) {
      commit('UPDATE_USER_DATA', payload)
      base.post(`procedure/setPapi`, {
        aircraft: state.userData.aircraft,
        airportIcao: state.userData.airport.icaoCode,
        runway: state.userData.airport.runway
      }, {
        headers: { 'Content-type': 'application/json' }
      })
    },
    INIT_USER_DATA({state, commit}, payload) {
      state.userData.aircraft = payload.aircraft
      state.userData.airport.icaoCode = payload.airportIcao
      state.userData.airport.runway = payload.selectedRunway
      state.runway.runwayInfo.lamps = payload.selectedRunway.runwayInfo.lamps
      if (payload.selectedLamp) {
        state.currentLamp = payload.selectedLamp
        state.isFly = true
        commit('SET_GLIDE_PATH', payload.glidePathLine)
      } else {
        state.currentLamp = payload.selectedRunway.runwayInfo.lamps[0]
      }
    }
  },
  getters: {
    LAMPS: (state) => state.runway.runwayInfo.lamps,
    AIRPORT(state) { return state.airport },
    RUNWAY_IDENTIFIER: (state) => state.runway.identifier,
    RUNWAY: (state) => state.runway,
    LTP_FTP_LATITUDE: (state) => state.runway.runwayInfo.ltpFtpLatitude,
    LTP_FTP_LONGITUDE: (state) => state.runway.runwayInfo.ltpFtpLongitude,
    LTP_FTP_ELEVATION: (state) => state.runway.runwayInfo.ltpFtpElevation,
    MAGNETIC_BEARING: (state) => state.runway.runwayInfo.magneticBearing,
    LAMPS_OFFSET: (state) => state.runway.runwayInfo.lampsOffset,
    TCH: (state) => state.runway.runwayInfo.tch,
    GPA: (state) => state.runway.runwayInfo.gpa,
    USER_DATA(state) { return state.userData },
    LAMP: (state) => state.currentLamp,
    papiPS: (state) => state.papiPositionStatus,
    IS_FLY: (state) => state.isFly,
    DATA_POSITION: (state) => ({
        pointRadius: 0,
        borderColor: 'green',
        fill: false,
        borderWidth: 3,
        backgroundColor: 'green',
        data: state.dataPosition
    }),
    DATA_SET: (state) => state.dataSet,
    CHEAT_TABLE: (state) => state.cheatTable,
  }
}
