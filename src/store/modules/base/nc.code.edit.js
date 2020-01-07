export default {
	// 初始化状态
	state: {
		ncCodeEditList: []
	},
	// 编写动作
	mutations: {
		SETNCCODEEDITLIST(state, data) {
			state.ncCodeEditList = data;
		}
	},
	// 取值
	getters: {
		ncCodeEditList: function(state) {
			return state.ncCodeEditList;
		}
	},
	// 创建驱动，可异步
	actions: {
		setnccodeeditlist({ commit }, data) {
			commit("SETNCCODEEDITLIST", data);
		}
	}
}