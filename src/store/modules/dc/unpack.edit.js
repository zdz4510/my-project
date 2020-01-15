const unpackEdit = {
  // 初始化状态
  state: {
    unpackEditList: []
  },
  // 编写动作
  mutations: {
    UNPACKEDIT(state, data) {
      state.unpackEditList = data;
    }
  },
  // 取值
  getters: {
    unpackEditList: function (state) {
      return state.unpackEditList;
    }
  },
  // 创建驱动，可异步
  actions: {
    change2({ commit }, data) {
      commit("UNPACKEDIT", data);
    }
  }
};

export default unpackEdit;
