export default {
	// 初始化状态
	state: {
		nextNumberEditList: []
	},
	// 编写动作
	mutations: {
		SETNEXTNUMBEREDITLIST(state, data) {
			state.nextNumberEditList = data;
		}
	},
	// 取值
	getters: {
		nextNumberEditList: function(state) {
			return state.nextNumberEditList;
		}
	},
	// 创建驱动，可异步
	actions: {
		setnextnumbereditlist({ commit }, data) {
			commit("SETNEXTNUMBEREDITLIST", data);
		}
	}
}