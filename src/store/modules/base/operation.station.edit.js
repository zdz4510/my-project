export default {
	// 初始化状态
	state: {
		stationEditList: []
	},
	// 编写动作
	mutations: {
		SETSTATIONEDITLIST(state, data) {
			state.stationEditList = data;
		}
	},
	// 取值
	getters: {
		stationEditList: function(state) {
			return state.stationEditList;
		}
	},
	// 创建驱动，可异步
	actions: {
		setstationeditlist({ commit }, data) {
			commit("SETSTATIONEDITLIST", data);
		}
	}
}