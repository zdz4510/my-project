import Vue from "vue";
import Vuex from "vuex";
import routerHistory from './modules/common/router.history'
import materialEdit from "./modules/base/material.edit"; // 物料维护vuex module
import workCenterEdit from "./modules/base/work.center.edit.js"; // 工作中心vuex module
import operationMaintainEdit from "./modules/base/operation.maintain.edit.js"; // 工序维护vuex module
import operationStationEdit from "./modules/base/operation.station.edit.js"; // 工序站位维护vuex module
import dataCollectionEdit from "./modules/base/data.collection.edit.js"; // 数据收集维护vuex module
import alarmMaintainEdit from "./modules/base/alarm.maintain.edit.js"; // 预警维护vuex module
import alarmGroupEdit from "./modules/base/alarm.group.edit.js"; // 预警分组vuex module
import typeEdit from "./modules/device/type.edit"; //设备类型vuex module
import maintenanceEdit from "./modules/device/maintenance.edit.js"; //设备维护vuex module
import standingEdit from "./modules/maintenance/standing.edit.js"; //站位维护vuex module
import workCert from "./modules/maintenance/working.certificate.edit.js"; //上岗证维护vuex module
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
		routerHistory,
    materialEdit,
    workCenterEdit,
    operationMaintainEdit,
    operationStationEdit,
    dataCollectionEdit,
    alarmMaintainEdit,
    alarmGroupEdit,
    typeEdit,
    maintenanceEdit,
    standingEdit,
    workCert
  }
});
