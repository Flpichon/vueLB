import Vue from 'vue'
import './plugins/axios'
import './plugins/chartist'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import Notifications from 'vue-notification'
import './plugins/element.js'
import './components'

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
