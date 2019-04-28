export default {
  state: {
    telephone: null
  },

  getters: {
    shopTelephone: state => {
      return state.telephone;
    } 
  },

  mutations: {
    updateShopTelephone: (state, telephone) => {
      state.telephone = telephone;
    }
  },

  actions: {
    updateShopTelephone: (context, scope) => {  
      return new Promise((resolve, reject) => {
        context.dispatch('updateIsLoading', true);

        const shopTelephoneDatabase = scope.$firebase.database().ref('shop/telephone');
        shopTelephoneDatabase.once('value', (snapshot) => {
          if (snapshot.val() !== null) {
            context.commit('updateShopTelephone', snapshot.val());
          }
          resolve();
        }).catch((error)=> {
          console.log('failed to load shop telephone');
          reject(error);
          
        });
      });
    }
  }
}