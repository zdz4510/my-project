export default {
	// 初始化状态
	state: {
		operationEditList: []
	},
	// 编写动作
	mutations: {
		SETOPERATIONEDITLIST(state, data) {
			state.operationEditList = data;
		}
	},
	// 取值
	getters: {
		operationEditList: function(state) {
			return state.operationEditList;
		}
	},
	// 创建驱动，可异步
	actions: {
		setoperationeditlist({ commit }, data) {
			commit("SETOPERATIONEDITLIST", data);
		}
	}
}