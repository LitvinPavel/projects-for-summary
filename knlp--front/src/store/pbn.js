import axios from 'axios'

const base = axios.create({
  baseURL: '/'
})

export default {
  state: {
    position: {
      time: '',
      position: '',
      gps: 0,
      glonass: 0,
      sbas: 0,
      isDiffMode: false,
      positionStatus: {
        segmentName: '',
        nextPoint: '',
        offset: 0.0,
        distanceToNextPoint: 0.0,
        heading: 0.0,
        totalDistance: 0.0,
        totalPercent: 0.0,
        offsetPercent: 0.0,
        routeState: 0,
        hdop: 0.0,
        vdop: 0.0,
        tdop: 0.0,
        positionSEP: 0.0,
        velocitySEP: 0.0,
        velocityX: 0.0,
        velocityY: 0.0,
        velocityZ: 0.0,
        velocity2D: 0.0,
        isButtonPressed: false
      }
    },
    airItems: [{
      name: '',
      icao: ''
    }],
    airport: {
      model: '',
      boardNumber: ''
    },
    aircraft: {},
    airportIcao: '',
    scheme: [],
    route: {},
    isActiveFly: false,
    tableRoute: [],
    allDatasetRoute: {},
    datasetRoute: [],
    points: [],
    pointMaxHeight: 2500
  },
  mutations: {
    SET_AIRPORT(state, payload) { state.airport = payload },
    SET_AIRCRAFT(state, payload) { state.aircraft = payload },
    SET_BOARD_NUMBER(state, payload) { state.aircraft.boardNumber = payload },
    SET_ROUTE(state, payload) { state.route = payload },
    SET_ACTIVE_FLY(state, payload) { state.isActiveFly = payload },
    SET_SCHEME(state, data) {
      state.scheme = data
    },
    CREATE_DATASET_ROUTE(state, data) {
      data.forEach(element => {
        state.datasetRoute.push({
          label: [element.fixId],
          pointRadius: 0,
          borderColor: '#be559b',
          borderWidth: 2,
          backgroundColor: '#be559b',
          data:[
            {
              x: element.percent,
              y: 0
            },
            {
              x: element.percent,
              y: state.pointMaxHeight
            }
          ]
        }) 
      })
    },
    CLEAR_BEFORE_START(state) {
      state.datasetRoute = []
      state.tableRoute = []
      state.points = []
    },
    STOP_FLY_AND_CLEAN(state) {
      state.datasetRoute = []
      state.allDatasetRoute = []
      state.tableRoute = []
      state.points = []
      state.airport = ''
      state.airItems = [{
        name: '',
        icao: ''
      }]
      state.scheme = []
      state.route = {}
      state.position.positionStatus = {
        segmentName: '',
        nextPoint: '',
        offset: 0.0,
        distanceToNextPoint: 0.0,
        heading: 0.0,
        totalDistance: 0.0,
        totalPercent: 0.0,
        offsetPercent: 0.0,
        routeState: 0,
        hdop: 0.0,
        vdop: 0.0,
        tdop: 0.0,
        positionSEP: 0.0,
        velocitySEP: 0.0,
        velocityX: 0.0,
        velocityY: 0.0,
        velocityZ: 0.0,
        velocity2D: 0.0,
        isButtonPressed: false
      }
    },
    INIT_POSITION_STATUS(state, data) {
      state.position = data
      state.tableRoute.unshift(data) 
      if (state.tableRoute.length > 50) {state.tableRoute.pop()}
      state.pointMaxHeight = (state.pointMaxHeight < (data.positionStatus.offset + 500)) ? data.positionStatus.offset + 1000 : state.pointMaxHeight
      state.datasetRoute.forEach(el => {
        el.data[1].y = state.pointMaxHeight
      })
      state.points.push({
        x: data.positionStatus.totalPercent,
        y: data.positionStatus.offset
      })
      let staticDataset = [
        {
          label: ['ОТКЛОНЕНИЕ'],
          pointRadius: 0,
          borderColor: '#008800',
          borderWidth: 4,
          fill: false,
          backgroundColor: '#008800',
          data: state.points
        },
        {
          label: ['ПРЕДЕЛ'],
          pointRadius: 0,
          borderColor: '#ff1100',
          fill: false,
          borderWidth: 4,
          backgroundColor: '#ff1100',
          data:[
            {
              x: 0.0,
              y: 1800
            },
            {
              x: 100.0,
              y: 1800
            }
          ]
        }
      ]
      let allDataset = staticDataset.concat(state.datasetRoute)
      state.allDatasetRoute = {
        datasets: allDataset
      }
    }
  },
  actions: {
    INIT_ROUTE({ commit, state }, payload) {
      state.route = payload.body
      commit('SET_ACTIVE_FLY', payload.status)
    },
    CHANGED_ROUTE({ commit }, payload) {
      commit('SET_ROUTE', payload)
    },
    INIT_SCHEME({ state, commit, dispatch }, payload) {
      commit('SET_SCHEME', payload.routes)
      state.airport.icaoCode = payload.airportIcao
      if (payload.segmentInfos) { commit('CREATE_DATASET_ROUTE', payload.segmentInfos) }
      if (payload.aircraft) {commit('SET_AIRCRAFT', payload.aircraft)}
      if (payload.currentRoute) {
        dispatch('INIT_ROUTE', {
          body: payload.currentRoute,
          status: true
        })
      } else {
        dispatch('INIT_ROUTE', {
          body: payload.routes[0],
          status: false
        })
      }
    },
    SET_RNAV({ state, dispatch }, payload) {
      base.post(`Procedure/SetRnav`, {
        aircraft: state.aircraft,
        airportIcao: state.airport.icaoCode,
        routes: payload
      }, {
          headers: { 'Content-type': 'application/json' }
        })
        .then(() => {
          dispatch('INIT_ROUTE', { body: payload[0], status: false })
        })
        .catch(err => {
          console.log(err)
        })
    }
    
  },
  getters: {
    isActiveFly(state) {
      return state.isActiveFly
    },
    route(state) {
      return state.route
    },
    scheme(state) {
      return state.scheme
    },
    position(state) {
      return state.position
    },
    AIRCRAFT: (state) => state.aircraft
  }
}
