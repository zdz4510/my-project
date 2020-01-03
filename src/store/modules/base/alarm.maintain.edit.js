export default {
	// 初始化状态
	state: {
		alarmMaintainEditList: []
	},
	// 编写动作
	mutations: {
		SETALARMMAINTAINEDITLIST(state, data) {
			state.alarmMaintainEditList = data;
		}
	},
	// 取值
	getters: {
		alarmMaintainEditList: function(state) {
			return state.alarmMaintainEditList;
		}
	},
	// 创建驱动，可异步
	actions: {
		setalarmmaintaineditlist({ commit }, data) {
			commit("SETALARMMAINTAINEDITLIST", data);
		}
	}
}