import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import state from './state'
Vue.use(Vuex)
export default new Vuex.Store({
  getters,
  state
})
