import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { firestorePlugin } from 'vuefire'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(firestorePlugin)
Vue.use(require('vue-moment'));

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
