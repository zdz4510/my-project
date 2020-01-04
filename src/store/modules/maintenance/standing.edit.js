const standingEdit = {
  // 初始化状态
  state: {
    standingList: []
  },
  // 编写动作
  mutations: {
    STANDINGLIST(state, data) {
      state.standingList = data;
    }
  },
  // 取值
  getters: {
    standingList: function(state) {
      return state.standingList;
    }
  },
  // 创建驱动，可异步
  actions: {
    change2({ commit }, data) {
      commit("STANDINGLIST", data);
    }
  }
};

export default standingEdit;
