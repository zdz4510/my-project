const materialEdit = {
  // 初始化状态
  state: {
    materialList: []
  },
  // 编写动作
  mutations: {
    MATERIALLIST(state, data) {
      state.materialList = data;
    }
  },
  // 取值
  getters: {
    materialList: function(state) {
      return state.materialList;
    }
  },
  // 创建驱动，可异步
  actions: {
    change2({ commit }, data) {
      commit("MATERIALLIST", data);
    }
  }
};

export default materialEdit;
