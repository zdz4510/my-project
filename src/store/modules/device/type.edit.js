const typeEdit = {
  // 初始化状态
  state: {
    typeList: []
  },
  // 编写动作
  mutations: {
    SETTYPELIST(state, data) {
      state.typeList = data;
    }
  },
  // 取值
  getters: {
    typeList: function(state) {
      return state.typeList;
    }
  },
  // 创建驱动，可异步
  actions: {
    change2({ commit }, data) {
      commit("SETTYPELIST", data);
    }
  }
};

export default typeEdit;
