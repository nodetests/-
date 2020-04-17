import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import right from './right'
import goods from './goods'
import order from './order'
import reports from './reports'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   
  },
  mutations: {
   
  },
  getters: {
  
  },
  actions: {
   
  },
  modules: {
    user,right,goods,order,reports
  }
})
