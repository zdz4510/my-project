const standingBtnDistribute = {
  // 初始化状态
  state: {
    standingBtnDistributeEdit: {}
  },
  // 编写动作
  mutations: {
    STANDINGBTNDISTRIBUTEEDIT(state, data) {
      state.standingBtnDistributeEdit = data;
    }
  },
  // 取值
  getters: {
    standingBtnDistributeEdit: function(state) {
      return state.standingBtnDistributeEdit;
    }
  },
  // 创建驱动，可异步
  actions: {}
};

export default standingBtnDistribute;
