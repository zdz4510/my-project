import Vue from "vue";
import Vuex from "vuex";
import materialEdit from "./modules/base/material.edit"; // 物料维护vuex module
import workCenterEdit from "./modules/base/work.center.edit.js"; // 工作中心vuex module
import operationMaintainEdit from "./modules/base/operation.maintain.edit.js"; // 工序维护vuex module
import operationStationEdit from "./modules/base/operation.station.edit.js"; // 工序站位维护vuex module
import typeEdit from "./modules/device/type.edit"; //设备类型vuex module
import maintenanceEdit from "./modules/device/maintenance.edit.js"; //设备维护vuex module
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    materialEdit,
    workCenterEdit,
    operationMaintainEdit,
		operationStationEdit,
    typeEdit,
    maintenanceEdit
  }
});
