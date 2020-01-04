const workingCertificateEdit = {
  // 初始化状态
  state: {
    workingCertificateList: []
  },
  // 编写动作
  mutations: {
    WORKINGCERTIFICATELIST(state, data) {
      state.workingCertificateList = data;
    }
  },
  // 取值
  getters: {
    workingCertificateList: function(state) {
      return state.workingCertificateList;
    }
  },
  // 创建驱动，可异步
  actions: {
    change2({ commit }, data) {
      commit("WORKINGCERTIFICATELIST", data);
    }
  }
};

export default workingCertificateEdit;
