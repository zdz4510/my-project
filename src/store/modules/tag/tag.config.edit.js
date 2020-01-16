const tagConfigEdit = {
  // 初始化状态
  state: {
    tagConfigList: {
      labelUseType:'',    //标签应用类型
      useTemplateType:'',  //使用命令行设定
      printFileSize:'', //标签内存大小，单位KB
      labelDes:'',  //标签描述
      label:'',  //label
      labelStorage:'',
      labelLinkList:[],
      labelCommand:'',
      previewImage:'',


    }
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
