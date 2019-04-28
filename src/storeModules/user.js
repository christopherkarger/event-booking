export default {
  state: {
    loginService: '',
    isLoggedIn: false,
    name: null,
    email: null,
    uid: null,
    isAdmin: false
  },
  getters: {
    loginService: state => {
      return state.loginService;
    },

    isLoggedIn: state => {
      return state.isLoggedIn;
    },

    userName: state => {
      return state.name;
    },
    
    userEmail: state => {
      return state.email;
    },

    uid: state => {
      return state.uid;
    },
    isAdmin: state => {
      return state.isAdmin;
    },
  },
  mutations: {
    setLoginService: (state, service) => {
      state.loginService = service;
    },

    setLoggedInStatus: (state, status) => {
      state.isLoggedIn = status;
    },

    setUserName: (state, name) => {
      state.name = name;
    },

    setUserEmail: (state, email) => {
      state.email = email;
    },
    
    setUserId: (state, uid) => {
      state.uid = uid;
    },

    setIsAdmin: (state, isAdmin) => {
      state.isAdmin = isAdmin;
    }
  },

  actions: {
    setLoginService: (context, service) => {
      context.commit('setLoginService', service); 
    },

    setLoggedInStatus: (context, status) => {
      context.commit('setLoggedInStatus', status); 
    },

    setUserName: (context, name) => {
      context.commit('setUserName', name); 
    },

    setUserEmail: (context, email) => {
      context.commit('setUserEmail', email); 
    },

    setUserId: (context, uid) => {
      context.commit('setUserId', uid); 
    },

    setIsAdmin: (context, isAdmin) => {
      context.commit('setIsAdmin', isAdmin); 
    }
  }

}