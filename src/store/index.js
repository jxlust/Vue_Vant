import Vue from  'vue'
import Vuex from 'vuex'
import actions from './action'
import mutations from './mutations'
import getters from './getter'
import state from './state'
Vue.use(Vuex)

const store =new Vuex.Store({
    mutations,
    actions,
    getters,
    state
})
export default store