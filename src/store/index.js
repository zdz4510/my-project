import Vue from 'vue'
import Vuex from 'vuex'
import materialEdit from './modules/material/material.edit'  // 物料维护vuex module
import workCenterEdit from './modules/material/work.center.edit.js'  // 工作中心vuex module
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    materialEdit,
		workCenterEdit
  }
})
