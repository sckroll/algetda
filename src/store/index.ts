import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    settingsPopup: false,
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
  },
  actions: {},
  modules: {},
})
