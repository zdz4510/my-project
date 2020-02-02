import Vue from "vue";
import Vuex from "vuex";
import routerHistory from "./modules/common/router.history";
import materialEdit from "./modules/base/material.edit"; // 物料维护vuex module
import materialGroupEdit from "@/store/modules/material/material.group.edit.js";
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
import certUserEdit from "./modules/base/cert.user.edit.js"; //用户证明分配vuex module
import ncGroupEdit from "./modules/base/nc.group.edit.js"; //不合格代码组vuex module
import ncCodeEdit from "./modules/base/nc.code.edit.js"; //不合格代码vuex module
import tagConfigEdit from "./modules/tag/tag.config.edit.js"; //不合格代码vuex module
import nextNumberEdit from "./modules/base/next.number.edit.js"; //编码规则vuex module
import unpackEdit from "./modules/dc/unpack.edit.js"; //包装解包的vuex module
import lotStepDetail from "./modules/dc/lot.step.detail.js"; //lot步骤详情vuex module
import materiaListlEdit from "./modules/maintenance/materialList.edit"; //物料清单维护详情vuex module
import standingBtnDistributeEdit from "./modules/base/standing.btn.distribute.edit.js"; //站位按钮分配vuex module
import themeEdit from "./modules/theme/theme.group.edit";
import userinfo from './modules/base/userinfo'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    routerHistory,
    materialEdit,
    materialGroupEdit,
    workCenterEdit,
    operationMaintainEdit,
    operationStationEdit,
    dataCollectionEdit,
    alarmMaintainEdit,
    alarmGroupEdit,
    typeEdit,
    maintenanceEdit,
    standingEdit,
    workCert,
    certUserEdit,
    ncGroupEdit,
    ncCodeEdit,
    tagConfigEdit,
    nextNumberEdit,
    unpackEdit,
    lotStepDetail,
    materiaListlEdit,
    themeEdit,
    standingBtnDistributeEdit,
    userinfo
  }
});
