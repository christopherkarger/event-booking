export default {
  
  state: {
    isLoading: false
  },

  getters: {
    isLoading: state => {
      return state.isLoading;
    }
  },

  mutations: {
    updateIsLoading: (state, status) => {
      state.isLoading = status;
    }
    
  },

  actions: {
    updateIsLoading: (context, status) => {
      context.commit('updateIsLoading', status); 
    }
  }
}