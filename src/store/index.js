import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Restaurants from './modules/restaurants'
import Files from './modules/files'
import Menus from './modules/menus'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Auth,
    Restaurants,
    Files,
    Menus
  },
  strict: debug
})