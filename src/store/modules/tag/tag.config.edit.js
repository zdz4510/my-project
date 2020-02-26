const tagConfigEdit = {
  // 初始化状态
  state: {
    tagConfigList: {
       tagDes: "",
        //标签ID
        label: "", //标签id
        checked: true,
        useTemplateType:true,
        labelUseType: "",
        labelTemplate:'',
        labelDes:'',
        previewImage: "",
        labelCommand: "",
        labelLinkList: [],
        leftList:[],
        rightList:[],
        cloneLeftList:[],  // 克隆左边的
        v1:"", //左边输入key
        v2:'', // 右边输入key
        selectDeiveName:'',
        s1:'',
        s2:"10"


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
