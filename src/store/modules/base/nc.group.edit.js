export default {
	// 初始化状态
	state: {
		ncGroupEditList: []
	},
	// 编写动作
	mutations: {
		SETNCGROUPEDITLIST(state, data) {
			state.ncGroupEditList = data;
		}
	},
	// 取值
	getters: {
		ncGroupEditList: function(state) {
			return state.ncGroupEditList;
		}
	},
	// 创建驱动，可异步
	actions: {
		setncGroupeditlist({ commit }, data) {
			commit("SETNCGROUPEDITLIST", data);
		}
	}
}