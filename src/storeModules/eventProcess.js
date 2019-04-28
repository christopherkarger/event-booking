export default {
  state: {
    selectedDateAndTimeMessage: null,
    selectedService: {},
    selectedEmployee: {},
    selectedDate: {},
    selectedTime: {},
    availableTimes: [],
    customerName: null,
    customerTel: null
  },
  getters: {
    selectedEmployee: state => {
      return state.selectedEmployee;
    },
    selectedService: state => {
      return state.selectedService;
    },
    selectedDate: state => {
      return state.selectedDate;
    },
    selectedTime: state => {
      return state.selectedTime;
    },
    availableTimes: state => {
      return state.availableTimes;
    },
    customerName: state => {
      return state.customerName;
    },
    customerTel: state => {
      return state.customerTel;
    },
    selectedDateAndTimeMessage: state => {
      return state.selectedDateAndTimeMessage;
    }
  },
  mutations: {
    updateSelectedService: (state, services) => {
      state.selectedService = services;
    },
    updateSelectedEmployee: (state, employee) => {
      state.selectedEmployee = employee;
    },
    updateSelectedDate: (state, date) => {
      state.selectedDate = date;
    },
    updateSelectedTime: (state, time) => {
      state.selectedTime = time;
    },
    updateAvailableTimes: (state, times) => {
      state.availableTimes = times;
    },
    updateCustomerName: (state, name) => {
      state.customerName = name;
    },
    updateCustomerTel: (state, tel) => {
      state.customerTel = tel;
    },
    updateSelectedDateAndTimeMessage: (state, message) => {
      state.selectedDateAndTimeMessage = message;
    }
  }, 
  actions: {
    updateSelectedService: (context, services) => {
      context.commit('updateSelectedService', services); 
    },
    updateSelectedEmployee: (context, employee) => {
      context.commit('updateSelectedEmployee', employee); 
    },
    updateSelectedDate: (context, date) => {
      context.commit('updateSelectedDate', date); 
    },
    updateSelectedTime: (context, time) => {
      context.commit('updateSelectedTime', time);
    },
    updateAvailableTimes: (context, time) => {
      context.commit('updateAvailableTimes', time);
    },
    updateCustomerName: (context, name) => {
      context.commit('updateCustomerName', name);
    },
    updateCustomerTel: (context, tel) => {
      context.commit('updateCustomerTel', tel);
    },
    updateSelectedDateAndTimeMessage: (context, message) => {
      context.commit('updateSelectedDateAndTimeMessage', message);
    }
  }
} 