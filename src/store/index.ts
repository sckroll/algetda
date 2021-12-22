import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    settingsPopup: false,
    modifiedByText: false,
    bidirectional: false,
    traversingQueue: false,
    structureValue: [] as string[],
    queueCommand: '',
    targetValue: '',
    targetIndex: -1,
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
      let linkedListValue

      if (typeof value === 'string') {
        state.structureValue = value.split(',')
        linkedListValue = value
      } else {
        state.structureValue = value
        linkedListValue = value.join(',')
      }

      localStorage.setItem('algetdaLinkedList', linkedListValue)
    },
    START_TRAVERSING_QUEUE(state) {
      state.traversingQueue = true
      state.queueCommand = ''
    },
    STOP_TRAVERSING_QUEUE(state) {
      state.traversingQueue = false
      state.queueCommand = ''
    },
    SET_QUEUE_COMMAND(state, command: string) {
      state.queueCommand = command
    },
    SET_TARGET_VALUE(state, value: string) {
      state.targetValue = value
    },
    SET_TARGET_INDEX(state, index: number) {
      state.targetIndex = index
    },
  },
  actions: {},
  modules: {},
})
