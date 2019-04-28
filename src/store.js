import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import shopdays from './storeModules/shopdays';
import shopaddress from './storeModules/shopaddress';
import shoptelephone from './storeModules/shoptelephone';
import shopemployees from './storeModules/shopemployees';
import shopservices from './storeModules/shopservices';
import shopholidays from './storeModules/shopholidays';
import shopevents from './storeModules/shopevents';
import eventProcess from './storeModules/eventProcess';
import user from './storeModules/user';
import loading from './storeModules/loading';
import modal from './storeModules/modal';
import transition from './storeModules/transition';


export default new Vuex.Store({
  state: {
   
  },
  modules: {
    user,
    shopdays,
    shopaddress,
    shoptelephone,
    shopemployees,
    shopservices,
    shopholidays,
    shopevents,
    eventProcess,
    loading,
    transition,
    modal
  },
  getters: {
  
  },
  mutations: {
  
  },
  actions: {

  }
})
