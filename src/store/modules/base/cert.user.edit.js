export default {
	// 初始化状态
	state: {
		certUserEditList: []
	},
	// 编写动作
	mutations: {
		SETCERTUSEREDITLIST(state, data) {
			state.certUserEditList = data;
		}
	},
	// 取值
	getters: {
		certUserEditList: function(state) {
			return state.certUserEditList;
		}
	},
	// 创建驱动，可异步
	actions: {
		setcertusereditlist({ commit }, data) {
			commit("SETCERTUSEREDITLIST", data);
		}
	}
}