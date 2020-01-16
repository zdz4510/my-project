const lotStepDetail = {
  // 初始化状态
  state: {
    lotStepDetailList: {}
  },
  // 编写动作
  mutations: {
    LOTSTEPDETAILLIST(state, data) {
      state.lotStepDetailList = data;
    }
  },
  // 取值
  getters: {
    lotStepDetailList: function(state) {
      return state.lotStepDetailList;
    }
  },
  // 创建驱动，可异步
  actions: {
    change2({ commit }, data) {
      commit("LOTSTEPDETAILLIST", data);
    }
  }
};

export default lotStepDetail;
