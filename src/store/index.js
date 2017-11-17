import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import state from './state'
Vue.use(Vuex);
let mutations = {
  LOGININ: (state, info) => {
    state.userInfo = info;
  }
}
export default new Vuex.Store({getters, state})
