const materialGroupEdit = {
  // 初始化状态
  state: {
    materialGroupList: [],
    proRow:[],
  },
  // 编写动作
  mutations: {
    MATERIALGROUPLIST(state, data) {
      state.materialGroupList = data;
    },
    PROROW(state, data) {
      state.proRow = data;
    },
  },
  // 取值
  getters: {
    materialGroupList: function(state) {
      return state.materialGroupList;
    },
    proRow:function(state) {
      return state.proRow;
    },
  },
  // 创建驱动，可异步
  actions: {
    change2({ commit }, data) {
      commit("MATERIALGROUPLIST", data);
    }
  }
};

export default materialGroupEdit;
