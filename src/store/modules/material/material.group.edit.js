const materialGroupEdit = {
  // 初始化状态
  state: {
    materialGroupList: []
  },
  // 编写动作
  mutations: {
    MATERIALGROUPLIST(state, data) {
      state.materialGroupList = data;
    }
  },
  // 取值
  getters: {
    materialGroupList: function(state) {
      return state.materialGroupList;
    }
  },
  // 创建驱动，可异步
  actions: {
    change2({ commit }, data) {
      commit("MATERIALGROUPLIST", data);
    }
  }
};

export default materialGroupEdit;
