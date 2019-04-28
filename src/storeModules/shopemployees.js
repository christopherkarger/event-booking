export default {
  
  state: {
    employees : []
  },

  getters: {
    employees: state => {
      return state.employees;
    }
  },

  mutations: {
    updateEmployees: (state, employees) => {
      state.employees = employees;
    },
    addEmployee: (state, employee) => {
      state.employees.push(employee);
    },
    removeEmployee: (state, employeeIndex) => {
      state.employees.splice(employeeIndex, 1);
    },
    addEmployeeTime: (state, payload) => {
      state.employees[payload.employeeIndex].days[payload.dayIndex].times.push(payload.time);
    },
    removeEmployeeTime: (state, payload) => {
      state.employees[payload.employeeIndex].days[payload.employeeDayIndex].times.splice(payload.employeeTimeIndex, 1);
    },
  },

  actions: {
    updateLocalEmployees: (context, employees) => {
      context.commit('updateEmployees', employees);
    },
    updateEmployees: (context, scope) => {
      return new Promise((resolve, reject) => {
        context.dispatch('updateIsLoading', true);

        scope.$firebase.database().ref('shop/employees').once('value', (snapshot) => {
          if (snapshot.val()) {
            const employees = snapshot.val();
            employees.forEach((employee,index) => {
              employee.index = index;
              const days = employee.days;
              days.forEach(day => {
                if (!day.times) { day.times = []; }
              });
            });    
            context.commit('updateEmployees', employees);
          }
          resolve();
        }).catch((error) => {
          reject();
          console.log(error)  
        });
 
      });
    },
    addEmployee: (context, employee) => {
      context.commit('addEmployee', employee); 
    },
    removeEmployee: (context, employeeIndex) => {
      context.commit('removeEmployee', employeeIndex); 
    },
    addEmployeeTime: (context, payload) => {
      context.commit('addEmployeeTime', payload); 
    },
    removeEmployeeTime: (context, payload) => {
      context.commit('removeEmployeeTime', payload); 
    }
  }
}