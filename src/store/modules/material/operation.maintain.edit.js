export default {
	// 初始化状态
	state: {
		editList: []
	},
	// 编写动作
	mutations: {
		SETEDITLIST(state, data) {
			state.editList = data;
		}
	},
	// 取值
	getters: {
		editList: function(state) {
			return state.editList;
		}
	},
	// 创建驱动，可异步
	actions: {
		change2({ commit }, data) {
			commit("SETEDITLIST", data);
		}
	}
}