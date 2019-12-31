export default {
	// 初始化状态
	state: {
		dataCollectionEditList: []
	},
	// 编写动作
	mutations: {
		SETDATACOLLECTIONEDITLIST(state, data) {
			state.dataCollectionEditList = data;
		}
	},
	// 取值
	getters: {
		dataCollectionEditList: function(state) {
			return state.dataCollectionEditList;
		}
	},
	// 创建驱动，可异步
	actions: {
		setdatacollectioneditlist({ commit }, data) {
			commit("SETDATACOLLECTIONEDITLIST", data);
		}
	}
}