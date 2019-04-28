export default { 
  state: {
    modalVisible: false
  },

  getters: {
    modalVisible: state => {
      return state.modalVisible;
    }
  },

  mutations: {
    updateModalVisible: (state, status) => {
      state.modalVisible = status;
    }
  },

  actions: {
    updateModalVisible: (context, status) => {
      context.commit('updateModalVisible', status); 
    }
  }
}