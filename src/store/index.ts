import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    settingsPopup: false,
    modifiedByText: false,
    bidirectional: false,
    structureValue: [] as string[],
  },
  mutations: {
    OPEN_DRAWER(state) {
      state.drawer = true
    },
    CLOSE_DRAWER(state) {
      state.drawer = false
    },
    OPEN_SETTINGS_POPUP(state) {
      state.settingsPopup = true
    },
    CLOSE_SETTINGS_POPUP(state) {
      state.settingsPopup = false
    },
    SET_MODIFIED_BY_TEXT(state, value: boolean) {
      state.modifiedByText = value
    },
    SET_BIDIRECTIONAL(state, value: boolean) {
      state.bidirectional = value
    },
    SET_STRUCTURE_VALUE(state, value: string | string[]) {
      if (typeof value === 'string') {
        state.structureValue = value.split(',')
      } else {
        state.structureValue = value
      }
    },
  },
  actions: {},
  modules: {},
})
