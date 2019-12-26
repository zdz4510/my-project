import Vue from 'vue'
import Vuex from 'vuex'
import materialEdit from './modules/base/material.edit'  // 物料维护vuex module
import workCenterEdit from './modules/base/work.center.edit.js'  // 工作中心vuex module
import operationMaintainEdit from './modules/base/operation.maintain.edit.js'  // 工序维护vuex module
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
		workCenterEdit,
		operationMaintainEdit
  }
})
