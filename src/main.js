import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//import './registerServiceWorker'
import variables from './global-variables';
import firebase from './jsModules/firebase';
import detectTouch from './jsModules/detect-touch';

Vue.config.productionTip = false;
Vue.prototype.$variables = variables;
Vue.prototype.$firebase = firebase;

detectTouch();

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


