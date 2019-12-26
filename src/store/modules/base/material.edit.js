export default {
	// 初始化状态
	state: {
		matEditList: []
	},
	// 编写动作
	mutations: {
		SETMATEDITLIST(state, data) {
			state.matEditList = data;
		}
	},
	// 取值
	getters: {
		matEditList: function(state) {
			return state.matEditList;
		}
	},
	// 创建驱动，可异步
	actions: {
		setmateditlist({ commit }, data) {
			commit("SETMATEDITLIST", data);
		}
	}
}