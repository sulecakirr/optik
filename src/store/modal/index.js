export default {
  namespaced: true,
  state: {
    modalClose: false,
    yenileKey: 0,
  },
  getters: {
    getModalClose(state) {
      return state.modalClose
    },
    getYenileKey(state) {
      return state.yenileKey
    },
  },
  mutations: {
    changeModalClose(state, val) {
      state.modalClose = val
    },
    changeYenileKey(state, val) {
      if(state.yenileKey > 100) {
        state.yenileKey = 0
      } else {
        state.yenileKey = val
      }
    },
  },
  actions: {
    changeModalClose({ commit }, val) {
      commit('changeModalClose', val)
    },
    changeYenileKey({ commit }, val) {
      commit('changeYenileKey', val)
    },
  },
}
