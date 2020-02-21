import router from "@/router/";
const routerHistory = {
  // 初始化状态
  state: {
    historyList: []
  },
  // 编写动作
  mutations: {
    //进入路由
    PUSH(state, to) {
      // console.log('state, to')
      // console.log(state, to)
      //   state.historyList=  state.historyList.filter(item=>{
      //       return item.name!=to.name
      //   })
      // 如果是登陆侧不加入
      if (to.name === "login") {
        return;
      }
      let hasHistoryItem = state.historyList.some(item => {
        return item.name == to.name;
      });
      if (!hasHistoryItem) {
        state.historyList.push(to);
      }
    },
    // 删除路由信息
    POP(state, {deleteItem,current}) {
      console.log(deleteItem,current)
      const len = state.historyList.length;
      if (len == 1) {
        return;
      }
      // 如果删除的是当前的
      if(deleteItem.name===current.name){   // 删除的是当前的路由
        state.historyList = state.historyList.filter(item => {
          return item.name != deleteItem.name;
        });
        const len = state.historyList.length;
        const arr =  state.historyList
        router.push({ name: arr[len - 1].name });

        return
      }
      // 如果删除的不是当前的
      // let flag = false;
      state.historyList = state.historyList.filter(item => {
        return item.name != deleteItem.name;
      });
      // if (state.historyList[len - 1].name == deleteItem.name) {
      //   flag = true;
      // }
      // state.historyList = state.historyList.filter(item => {
      //   return item.name != deleteItem.name;
      // });
      // 如果删除的是当前的则最后一个高亮
      // if (flag) {
      //   let arr = state.historyList;
      //   let len = state.historyList.length;
      //   router.push({ name: arr[len - 1].name });
      // }
    },
    /**
     *  关闭所有
     */
    closeAll(state, currentName) {
      if (state.historyList.length <= 1) {
        return;
      }
      state.historyList = state.historyList.filter(item => {
        return item.name == currentName.name;
      });
    },
    /**
     *  关闭左边
     */
    closeLeft(state, currentName) {
      if (state.historyList.length <= 1) {
        return;
      }
      const index = state.historyList.findIndex(item => {
        return item.name == currentName;
      });
      if (index != -1) {
        state.historyList.splice(index - 1, 1);
      }
    },
    /**
     *  关闭右边
     */
    closeRight(state, currentName) {
      if (state.historyList.length <= 1) {
        return;
      }
      const index = state.historyList.findIndex(item => {
        return item.name == currentName;
      });
      if (state.historyList.length >= index + 2) {
        state.historyList.splice(index + 1, 1);
      }
    },
    /**
     *  关闭其他和关闭所有类似
     */
    closeOther(state, currentName) {
      if (state.historyList.length <= 1) {
        return;
      }
      state.historyList = state.historyList.filter(item => {
        return item.name == currentName;
      });
    },
    /**
     *
     * @param {*} state
     * @param {*} currentName 当前路由的名称
     */
    POPROUTER(state, currentName) {
      state.historyList = state.historyList.filter(item => {
        return item.name != currentName;
      });
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
