import isObject from '../jsModules/check-type';

export default {
  
  state: {
    shopHolidays : [],
    futureShopHolidays: [],
    employeeHolidays: []
  },

  getters: {
    shopHolidays: state => {
      return state.shopHolidays;
    },

    futureShopHolidays: state => {
      return state.futureShopHolidays;
    },

    employeeHolidays: state => {
      return state.employeeHolidays;
    }
    
  },

  mutations: {
    updateShopHolidays: (state, shopHolidays) => {
      state.shopHolidays = shopHolidays;
    },
    updateEmployeeHolidays: (state, employeeHolidays) => {
      state.employeeHolidays = employeeHolidays;
    },
    updateFutureShopHolidays: (state, futureShopHolidays) => {
      state.futureShopHolidays = futureShopHolidays;
    },
    addShopHoliday: (state, shopHoliday) => {
      state.shopHolidays.push(shopHoliday);
    },
    removeShopHoliday: (state, shopHolidayIndex) => {
      state.shopHolidays.splice(shopHolidayIndex, 1);
    }
  },

  actions: {
    updateLocalShopHolidays: (context, shopHolidays) => {
      context.commit('updateShopHolidays', shopHolidays);
    },

    updateEmployeeHolidays: (context) => {     
      const selectedEmployee = context.getters.selectedEmployee;
      const futureShopHolidays = context.getters.futureShopHolidays;
      let employeeShopHolidays = null;

      if (selectedEmployee && futureShopHolidays) {
        employeeShopHolidays = futureShopHolidays.filter(elm => {
          if (elm.employees[0] == 'all') {
            return elm;
          } else {
            if (elm.employees.indexOf(selectedEmployee.id) > -1) {
              return elm;
            }
          }
        });
      }

      if (employeeShopHolidays) {
        context.commit('updateEmployeeHolidays', employeeShopHolidays); 
      }

    },
    updateShopHolidays: (context, payload) => {
      return new Promise((resolve,reject) => {
        context.dispatch('updateIsLoading', true);
        let holidayDatabase = payload.scope.$firebase.database().ref('shop/holidays');
        let storeCommit = 'updateShopHolidays';
        
        if (payload.onlyFuture) {
          const today = new Date();
          today.setHours(0,0,0,0);
          holidayDatabase = holidayDatabase.orderByChild('endDate').startAt(today.getTime());
          storeCommit = 'updateFutureShopHolidays';
        } 

        holidayDatabase.once('value', (snapshot) => {
          if (snapshot.val()) {
            let data = snapshot.val();

            if (isObject(data)) {
              data = Object.keys(data).map((key) => data[key]);
            }
            context.commit(storeCommit, data);
            context.dispatch('updateEmployeeHolidays');
          }
          resolve();
        }).catch((error)=> {
          reject(error);
          console.log('failed to load holidays');
        });

      });
    },
    addShopHoliday: (context, shopHoliday) => {
      context.commit('addShopHoliday', shopHoliday); 
    },
    removeShopHoliday: (context, shopHolidayIndex) => {
      context.commit('removeShopHoliday', shopHolidayIndex); 
    }
  }

}
