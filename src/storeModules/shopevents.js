export default {
  
  state: {
    shopEvents : [],
    shopUsers: []
  },

  getters: {
    shopEvents: state => {
      return state.shopEvents;
    },
    shopUsers: state => {
      return state.shopUsers;
    }
  },

  mutations: {
    updateShopEvents: (state, events) => {
      state.shopEvents = events;
    },
    updateShopUsers: (state, shopUsers) => {
      state.shopUsers = shopUsers;
    }
  },

  actions: {
    updateShopEvents: (context, events) => {
      context.commit('updateShopEvents', events); 
    },

    updateShopUsers: (context, shopUsers) => {
      context.commit('updateShopUsers', shopUsers); 
    }
  }

}
