export default {
  state: {
    transitionName: 'no',
    transitionMode: '',
  },
  getters: {
    transitionName: state => {
      return state.transitionName;
    },
    transitionMode: state => {
      return state.transitionMode;
    }
  },
  mutations: {
    updateTransitionName: (state, name) => {
      state.transitionName = name;
    },
    updateTransitionMode: (state, mode) => {
      state.transitionMode = mode;
    }
  },
  actions: {
    updateTransitionName: (context, name) => {
      context.commit('updateTransitionName', name);  
    },
    updateTransitionMode: (context, mode) => {
      context.commit('updateTransitionMode', mode);  
    }
  }
}