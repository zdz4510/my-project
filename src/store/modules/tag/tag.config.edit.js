const tagConfigEdit = {
  // 初始化状态
  state: {
    tagConfigList: []
  },
  // 编写动作
  mutations: {
    TAGCONFIGLIST(state, data) {
      state.tagConfigList = data;
    }
  },
  // 取值
  getters: {
    tagConfigList: function(state) {
      return state.tagConfigList;
    }
  },
  // 创建驱动，可异步
  actions: {
    change2({ commit }, data) {
      commit("TAGCONFIGLIST", data);
    }
  }
};

export default tagConfigEdit;
