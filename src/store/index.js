import Vue from "vue";
import Vuex from "vuex";
import typeEdit from "./modules/device/type.edit"; //设备类型vuex module

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    typeEdit
  }
});
