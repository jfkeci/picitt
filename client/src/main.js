import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'

import axios from 'axios'

import messageMixin from './mixins/messageMixin'
Vue.mixin(messageMixin)

Vue.config.productionTip = false

let url = 'http://localhost:3000/api'
axios.defaults.baseURL = url

Vue.prototype.$apiUrl = url
Vue.prototype.$appUrl = 'http://localhost:8080/'

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
