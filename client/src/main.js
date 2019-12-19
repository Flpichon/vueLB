import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'

Vue.use(Notifications);
Vue.config.productionTip = false;
Vue.config.devtools = true
Vue.use(Vuelidate);
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
