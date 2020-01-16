const lotStepDetail = {
  // 初始化状态
  state: {
    lotStepDetailList: {},
    lotQueryList: []
  },
  // 编写动作
  mutations: {
    LOTSTEPDETAILLIST(state, data) {
      state.lotStepDetailList = data;
    },
    LOTQUERYLIST(state, data) {
      state.lotQueryList = data;
    }
  },
  // 取值
  getters: {
    lotStepDetailList: function(state) {
      return state.lotStepDetailList;
    },
    lotQueryList: function(state) {
      return state.lotQueryList;
    }
  },
  // 创建驱动，可异步
  actions: {
    // change2({ commit }, data) {
    //   commit("LOTSTEPDETAILLIST", data);
    // }
  }
};

export default lotStepDetail;
