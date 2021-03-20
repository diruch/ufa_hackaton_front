import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import Axios from 'axios'
import { ACCESS_TOKEN_NAME, FINGERPRINT_NAME, AUTHORIZATION_HEADER_NAME } from './services/constants'

import routes from './router/routes'

Vue.use(VueRouter)

Vue.prototype.$http = Axios
const token = localStorage.getItem(ACCESS_TOKEN_NAME)
const fingerprint = localStorage.getItem(FINGERPRINT_NAME)
if (token && fingerprint) {
  Vue.prototype.$http.defaults.headers.common[AUTHORIZATION_HEADER_NAME] = token
  Vue.prototype.$http.defaults.headers.common[FINGERPRINT_NAME] = fingerprint
}

const router = new VueRouter({
  mode: 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
