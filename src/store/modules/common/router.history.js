import router from '@/router/'
const routerHistory = {
  // 初始化状态
  state: {
    historyList: []
  },
  // 编写动作
  mutations: {
    //进入路由
    PUSH(state, to) {
        state.historyList=  state.historyList.filter(item=>{
            return item.name!=to.name
        })
      state.historyList.push(to);
    },
    // 删除路由信息
    POP(state, deleteItem) {
        const len = state.historyList.length; 
        if(len==1){
            return ;
        }


        let flag = false;
      if(state.historyList[len-1].name==deleteItem.name){
            flag =true;
      }
      state.historyList = state.historyList.filter(item => {
        return item.name != deleteItem.name;
      });
      if(flag){
          let arr =state.historyList;
          let len =state.historyList.length;
        router.push({name:arr[len-1].name})
      }
    }
  },
  // 取值
  getters: {
    historyList: function(state) {
      return state.historyList;
    }
  },
  // 创建驱动，可异步
  actions: {}
};

export default routerHistory;
