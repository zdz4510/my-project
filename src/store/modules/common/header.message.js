/**
 *  公共的下拉框
 */
// import { getAllCatery } from "@/api/base/catery.api.js"; // 获取所有的品类
// import { getClientList } from "@/api/style/order.api.js"; // 获取客户列表
const selectList = {
  // 初始化状态
  state: {
    notificationList: [{avatar: '', content: '蒂姆·库克回复了你的邮件', date: '2020-1-1'}], // 消息通知
    attentionList: [{avatar: '', content: '史蒂夫·乔布斯 关注了你', date: '2020-1-1'}], // 关注通知
    agendaList: [{content: '待办通知', date: '2019-3-3', state: '1'}] // 待办通知 
  },
  // 编写动作
  mutations: {
    NOTIFICATIONLIST(state, list) {
      state.notificationList = list;
    },
    ATTENTIONLIST(state, list) {
      state.attentionList = list;
    },
    AGENDALIST(state, list) {
      state.agendaList = list;
    }
  },
  // 取值
  getters: {
    notificationList: function(state) {
      return state.notificationList;
    },
    attentionList: function(state) {
      return state.attentionList;
    },
    AGENDALIST: function(state) {
      return state.agendaList;
    }
  },
  // 创建驱动，可异步
  actions: {
    //异步获取消息数据
    GETNOTIFICATIONLIST({ commit }) {
        commit("NOTIFICATIONLIST", 'list');
    },

    /**
     * 获取通知数据
     * @param { } param0
     */
    GETATTENTIONLIST({ commit }) {
        commit("ATTENTIONLIST", 'list');
    },
    /**
     * 获取通知数据
     * @param { } param0
     */
    GETAGENDALIST({ commit }) {
      commit("AGENDALIST", 'list');
  }
  }
};

export default selectList;
