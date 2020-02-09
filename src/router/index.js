import Vue from "vue";
import VueRouter from "vue-router";
import deviceRouter from "@/views/device/router/index.js";
import maintenanceRouter from "@/views/maintenance/router/index.js";
import certRouter from "@/views/cert-user/router/index.js";
import materialRouter from "@/views/material/router/index.js";
import productRouter from "@/views/dc/router/index.js";
import tagRouter from "@/views/tag/router/index.js";
import ncRouter from "@/views/nc/router/index.js";
import scrapDeleteRouter from "@/views/scrap-delete/router/index.js";
import customizeRouter from "@/views/customize/router/index.js";
import baseRouter from "@/views/base/router/index.js";
import Welcome from "@/views/welcome";
import store from "@/store/";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/welcome/"
  },
  /**
   * 基础库
   */
  {
    ...baseRouter
  },
  /**
   * 产品配置
   */
  {
    ...materialRouter
  },
  {
    path: "/welcome",
    name: "welcome",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "",
        name: "welcomePage",
        meta: {
          title: "工序维护"
        },
        component: Welcome
      }
    ]
  },
  /**
   * 工序维护
   */
  {
    path: "/operationMaintain",
    name: "operationMaintain",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "operationMaintain",
        name: "operationMaintain",
        meta: {
          title: "工序维护"
        },
        component: () =>
          import(
            /* webpackChunkName: "operationMaintain" */ "../views/operation-maintain/pages/OperationMaintain.vue"
          )
      },
      {
        path: "addOperationMaintain",
        name: "addOperationMaintain",
        meta: {
          title: "工序维护添加"
        },
        component: () =>
          import(
            /* webpackChunkName: "addOperationMaintain" */ "../views/operation-maintain/pages/AddOperationMaintain.vue"
          )
      },
      {
        path: "editOperationMaintain",
        name: "editOperationMaintain",
        meta: {
          title: "工序维护编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "editOperationMaintain" */ "../views/operation-maintain/pages/EditOperationMaintain.vue"
          )
      }
    ]
  },
  /**
   * 工序站位
   */
  {
    path: "/operationStation",
    name: "operationStation",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "operationStation",
        name: "operationStation",
        meta: {
          title: "工序与站位关系维护"
        },
        component: () =>
          import(
            /* webpackChunkName: "operationStation" */ "../views/operation-station/pages/OperationStation.vue"
          )
      },
      {
        path: "addOperationStation",
        name: "addOperationStation",
        meta: {
          title: "工序站位维护添加"
        },
        component: () =>
          import(
            /* webpackChunkName: "addOperationStation" */ "../views/operation-station/pages/AddOperationStation.vue"
          )
      },
      {
        path: "editOperationStation",
        name: "editOperationStation",
        meta: {
          title: "工序站位维护编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "editOperationStation" */ "../views/operation-station/pages/EditOperationStation.vue"
          )
      },
      /**
       * 包装解包配置
       */
      {
        path: "unpack",
        name: "unpack",
        meta: {
          title: "包装解包配置"
        },
        component: () =>
          import(
            /* webpackChunkName: "dc-collection" */
            "../views/dc/pages/unpack.vue"
          )
      },
      /**
       * 包装解包配置/新增/编辑
       */
      {
        path: "unpackEdit",
        name: "unpackEdit",
        meta: {
          title: "包装解包配置编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "unpack-edit" */
            "../views/dc/pages/unpack-edit.vue"
          )
      }
    ]
  },
  /**
   * 工作中心
   */
  {
    path: "/workCenter",
    name: "workCenter",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "workCenter",
        name: "workCenter",
        meta: {
          title: "工作中心"
        },
        component: () =>
          import(
            /* webpackChunkName: "workCenter" */ "../views/work-center/pages/WorkCenter.vue"
          )
      },
      {
        path: "addWorkCenter",
        name: "addWorkCenter",
        meta: {
          title: "工作中心添加"
        },
        component: () =>
          import(
            /* webpackChunkName: "addWorkCenter" */ "../views/work-center/pages/AddWorkCenter.vue"
          )
      },
      {
        path: "editWorkCenter",
        name: "editWorkCenter",
        meta: {
          title: "工作中心编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "editWorkCenter" */ "../views/work-center/pages/EditWorkCenter.vue"
          )
      }
    ]
  },
  /**
   * 编码规则
   */
  {
    path: "/nextNumber",
    name: "nextNumber",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "nextNumber",
        name: "nextNumber",
        meta: {
          title: "编码规则"
        },
        component: () =>
          import(
            /* webpackChunkName: "nextNumber" */ "../views/next-number/pages/NextNumber.vue"
          )
      },
      {
        path: "addNextNumber",
        name: "addNextNumber",
        meta: {
          title: "编码规则添加"
        },
        component: () =>
          import(
            /* webpackChunkName: "addNextNumber" */ "../views/next-number/pages/AddNextNumber.vue"
          )
      },
      {
        path: "editNextNumber",
        name: "editNextNumber",
        meta: {
          title: "编码规则编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "editNextNumber" */ "../views/next-number/pages/EditNextNumber.vue"
          )
      }
    ]
  },
  /**
   * 生产
   */
  {
    path: "/dc",
    name: "dcSearch",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "dcSearch",
        name: "dcSearch",
        meta: {
          title: "独立数据报表查询"
        },
        component: () =>
          import(
            /* webpackChunkName: "dcSearch" */ "../views/dc/pages/DCSearch.vue"
          )
      },
      //数据收集
      {
        path: "dataCollection",
        name: "dataCollection",
        meta: {
          title: "数据收集"
        },
        component: () =>
          import(
            /* webpackChunkName: "dataCollection" */ "../views/dc/pages/DataCollection.vue"
          )
      },
      {
        path: "addDataCollection",
        name: "addDataCollection",
        meta: {
          title: "数据收集添加"
        },
        component: () =>
          import(
            /* webpackChunkName: "addDataCollection" */ "../views/dc/pages/AddDataCollection.vue"
          )
      },
      {
        path: "editDataCollection",
        name: "editDataCollection",
        meta: {
          title: "数据收集编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "editDataCollection" */ "../views/dc/pages/EditDataCollection.vue"
          )
      },
      //独立数据收集
      {
        path: "dcCollection",
        name: "dcCollection",
        meta: {
          title: "独立数据收集"
        },
        component: () =>
          import(
            /* webpackChunkName: "dcCollection" */ "../views/dc/pages/DCCollection.vue"
          )
      },
      // 包装解包作业
      {
        path: "packWork",
        name: "packWork",
        meta: {
          title: "包装解包作业"
        },
        component: () =>
          import(
            /* webpackChunkName: "dcCollection" */ "../views/dc/pages/packWork.vue"
          )
      }
    ]
  },
  //生产
  {
    ...productRouter
  },
  //标签管理
  {
    ...tagRouter
  },
  /**
   * 预警管理
   */
  {
    path: "/alarm",
    name: "alarm",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "alarmMaintain",
        name: "alarmMaintain",
        meta: {
          title: "预警事件维护"
        },
        component: () =>
          import(
            /* webpackChunkName: "alarmMaintain" */ "../views/alarm/pages/AlarmMaintain.vue"
          )
      },
      {
        path: "addAlarmMaintain",
        name: "addAlarmMaintain",
        meta: {
          title: "预警事件维护添加"
        },
        component: () =>
          import(
            /* webpackChunkName: "addAlarmMaintain" */ "../views/alarm/pages/AddAlarmMaintain.vue"
          )
      },
      {
        path: "editAlarmMaintain",
        name: "editAlarmMaintain",
        meta: {
          title: "预警事件维护编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "editAlarmMaintain" */ "../views/alarm/pages/EditAlarmMaintain.vue"
          )
      },
      {
        path: "alarmGroup",
        name: "alarmGroup",
        meta: {
          title: "预警事件分组编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "alarmGroup" */ "../views/alarm/pages/AlarmGroup.vue"
          )
      },
      {
        path: "addAlarmGroup",
        name: "addAlarmGroup",
        meta: {
          title: "预警事件分组编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "addAlarmGroup" */ "../views/alarm/pages/AddAlarmGroup.vue"
          )
      },
      {
        path: "editAlarmGroup",
        name: "editAlarmGroup",
        meta: {
          title: "预警事件分组编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "editAlarmGroup" */ "../views/alarm/pages/EditAlarmGroup.vue"
          )
      },
      {
        path: "alarmDeal",
        name: "alarmDeal",
        meta: {
          title: "预警事件处理"
        },
        component: () =>
          import(
            /* webpackChunkName: "alarmDeal" */ "../views/alarm/pages/AlarmDeal.vue"
          )
      }
    ]
  },
  /**
   * 用户证明分配
   */
  {
    ...certRouter
  },
  /**
   * 不合格代码管理
   */
  {
    ...ncRouter
  },
  /**
   * 自定义字段维护
   */
  {
    ...customizeRouter
  },
  /**
   * 报废/删除
   */
  {
    ...scrapDeleteRouter
  },
  /**
   * 设备维护模块
   */
  {
    ...deviceRouter
  },
  /**
   * 维护模块
   */
  {
    ...maintenanceRouter
  },

  /**
   *  常用设置
   */
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ "../views/login")
  }
  /**
   * 工单维护
   */
  // {
  //     path: "/workOrder",
  //     name: "workOrder",
  //     component: () =>
  //         import ( /* webpackChunkName: "layout" */ "../views/layout/"),
  //     children: [{
  //         path: "workOrder",
  //         name: "workOrder",
  //         component: () =>
  //             import (
  //                 /* webpackChunkName: "work-order" */
  //                 "@/views/work-order/pages/work-order.vue"
  //             )
  //     }, ]
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  store.commit("PUSH", {
    name: to.name,
    title: to.meta.title || "",
    path: to.path
  });
  let auth = to.matched.some(record => record.meta.requiresAuth);
  if (auth) {
    const token = Vue.$cookies.get("mcs.sessionId");
    const isLogin = token ? true : false;
    if (!isLogin) {
      // console.log('token  不存在');
      next({
        path: "/login",
        query: { redirect: to.fullPath } //把要跳转的地址作为参数传到下一步
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
