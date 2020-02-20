const maintenanceEdit = {
  // 初始化状态
  state: {
    maintenanceList: [
      {
        maintenanceForm: {
          //设备编号
          resource: "",
          //设备名称
          resourceDes: "",
          //设备状态
          resourceStatus: "",
          //工作中心
          workCenter: ""
        }
      }
    ]
  },
  // 编写动作
  mutations: {
    MAINTENANCEPELIST(state, data) {
      state.maintenanceList = data;
    }
  },
  // 取值
  getters: {
    maintenanceList: function(state) {
      return state.maintenanceList;
    }
  },
  // 创建驱动，可异步
  actions: {
    change2({ commit }, data) {
      commit("MAINTENANCEPELIST", data);
    }
  }
};

export default maintenanceEdit;
