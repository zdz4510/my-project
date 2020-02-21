const themeEdit = {
    // 初始化状态
    state: {
      themeList: {}
    },
    // 编写动作
    mutations: {
      THEMELIST(state, data) {
        console.log(data,"111")
        state.themeList = data;
      }
    },
    // 取值
    getters: {
      themeListGet: function(state) {
        return state.themeList;
      }
    },
    // 创建驱动，可异步
    actions: {
      change2({ commit }, data) {
        commit("themeList", data);
      }
    }
  };
  
  export default themeEdit;
  