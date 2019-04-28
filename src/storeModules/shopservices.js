export default {
  
  state: {
    services : []
  },

  getters: {
    services: state => {
      return state.services;
    }
    
  },

  mutations: {
    updateServices: (state, services) => {
      state.services = services;
    },
    addService: (state, service) => {
      state.services.push(service);
    },
    removeService: (state, serviceIndex) => {
      state.services.splice(serviceIndex, 1);
    }
  },

  actions: {
    updateLocalServices : (context, services) => {
      context.commit('updateServices', services);
    },
    updateServices: (context, scope) => {
      return new Promise((resolve,reject) => {
        context.dispatch('updateIsLoading', true);

        scope.$firebase.database().ref('shop/services').once('value', (snapshot) => {
          if (snapshot.val()) {
            context.commit('updateServices', snapshot.val());
          }
          resolve();
        }).catch((error)=> {
          reject(error);
          console.log('failed to load services');
        });

      });
    },
    addService: (context, service) => {
      context.commit('addService', service); 
    },
    removeService: (context, servicesIndex) => {
      context.commit('removeService', servicesIndex); 
    }
  }

}
