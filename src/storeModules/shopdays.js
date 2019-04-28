import days from '@/jsModules/days';

export default {
  state: {
    daysWereLoaded: false,
    days
  },

  getters: {
    shopDaysWereLoaded: state => {
      return state.daysWereLoaded;
    },

    shopDays: state => {
      return state.days;
    }  
  },

  mutations: {
    updateShopDays: (state, days) => {
      state.days = days;
    },
    addShopTime: (state, payload) => {
      state.days[payload.day].times.push(payload.time);
    },
    removeShopTime: (state, payload) => {
      state.days[payload.day].times.splice(payload.timeIndex, 1);
    },
    updateShopDaysWereLoaded: (state, status) => {
      state.daysWereLoaded = status;
    }
  },

  actions: {
    updateLocalShopDays: (context, days) => {
      context.commit('updateShopDays', days);
    },
    updateShopDays: (context, scope) => {      
      return new Promise((resolve, reject) => {
        context.dispatch('updateIsLoading', true);

        const openingTimesDatabase = scope.$firebase.database().ref('shop/openingTimes');
        openingTimesDatabase.once('value', (snapshot) => {
          if (snapshot.val()) {
            const days = snapshot.val();
            days.forEach(day => {
              if (!day.times) {day.times = [];}
            });
            context.commit('updateShopDays', days);
            context.dispatch('updateShopDaysWereLoaded', true);
          }
          resolve();
        }).catch((error)=> {
          reject(error);
          console.log('failed to load shop hours');
        });

      });

    },  
    addShopTime: (context, payload) => {
      context.commit('addShopTime', payload); 
    },
    removeShopTime:  (context, payload) => {
      context.commit('removeShopTime', payload); 
    },
    updateShopDaysWereLoaded:  (context, status) => {
      context.commit('updateShopDaysWereLoaded', status); 
    }
  }
}