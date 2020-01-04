export default {
	// 初始化状态
	state: {
		alarmGroupEditList: []
	},
	// 编写动作
	mutations: {
		SETALARMGROUPEDITLIST(state, data) {
			state.alarmGroupEditList = data;
		}
	},
	// 取值
	getters: {
		alarmGroupEditList: function(state) {
			return state.alarmGroupEditList;
		}
	},
	// 创建驱动，可异步
	actions: {
		setalarmgroupeditlist({ commit }, data) {
			commit("SETALARMGROUPEDITLIST", data);
		}
	}
}