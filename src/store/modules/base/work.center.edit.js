export default {
	// 初始化状态
	state: {
		workCenterEditList: []
	},
	// 编写动作
	mutations: {
		SETWORKCENTEREDITLIST(state, data) {
			state.workCenterEditList = data;
		}
	},
	// 取值
	getters: {
		workCenterEditList: function(state) {
			return state.workCenterEditList;
		}
	},
	// 创建驱动，可异步
	actions: {
		setworkcentereditlist({ commit }, data) {
			commit("SETWORKCENTEREDITLIST", data);
		}
	}
}