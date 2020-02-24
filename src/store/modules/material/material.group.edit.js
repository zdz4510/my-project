const materialGroupEdit = {
  // 初始化状态
  state: {
    materialGroupList: [],
    allMessage:{
      canChangeOperation: "",
      canChangeQty: "",
      canChangeResource: "",
      createTime: "",
      createUserId: "",
      createUserName: "",
      defaultOperationRef: "",
      defaultResourceRef: "",
      deleteFlag: "",
      lotInWorkButtonId: "",
      lotQueueButtonId: "",
      modifyTime: "",
      modifyUserId: "",
      modifyUserName: "",
      podButtons: [
        {
          buttionDesc: "",
          buttonId: "",
          groupFlag: true,
          imageIcon: "",
          location: "",
          podActivities: [
            {
              activity: "",
              activityDes: "",
              activityType: "",
              clearsLot: true,
              podButtonRef: "",
              reference: "",
              sequence: "",
              tenantSiteCode: ""
            }
          ],
          podButtonRef: "",
          podButtons: [null],
          podConfigRef: "",
          reference: "",
          sequence: "",
          tenantSiteCode: ""
        }
      ],
      podConfigDesc: "",
      podConfigName: "",
      reference: "",
      showQty: "",
      status: "",
      tenantSiteCode: ""
    },
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
    ALLMESSAGE(state, data) {
      // console.log("数据是？",data)
      state.allMessage = data;
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
    allMessage:function(state) {
      return state.allMessage;
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
