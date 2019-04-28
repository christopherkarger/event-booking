export default {
  state: {
    address: null
  },

  getters: {
    shopAddress: state => {
      return state.address;
    } 
  },

  mutations: {
    updateShopAddress: (state, address) => {
      state.address = address;
    }
  },

  actions: {
    updateShopAddress: (context, scope) => {
      return new Promise((resolve, reject) => {
        context.dispatch('updateIsLoading', true);

        const shopAddressDatabase = scope.$firebase.database().ref('shop/address');
        shopAddressDatabase.once('value', (snapshot) => {
          if (snapshot.val() !== null) {
            context.commit('updateShopAddress', snapshot.val());
          }
          resolve();
        }).catch((error)=> {
          reject(error);
          console.log('failed to load shop address');
        });
        
      });     
    }
  }
}