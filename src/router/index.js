import Vue from "vue";
import VueRouter from "vue-router";
import deviceRouter from "@/views/device/router/index.js";
import maintenanceRouter from "@/views/maintenance/router/index.js";
import certRouter from "@/views/cert-user/router/index.js";
import materialRouter from "@/views/material/router/index.js";
import ncRouter from "@/views/nc/router/index.js";
import store from "@/store/";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/base/base"
  },
  /**
   * 基础库
   */
  {
    path: "/base",
    name: "base",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "base",
        name: "base",
        meta: {
          title: "基础库"
        },
        component: () =>
          import(/* webpackChunkName: "base" */ "../views/base/pages/Base.vue")
      },
      {
        path: "add-base",
        name: "add-base",
        meta: {
          title: "基础库添加"
        },
        component: () =>
          import(
            /* webpackChunkName: "add-base" */ "../views/base/pages/AddBase.vue"
          )
      },
      {
        path: "edit-base",
        name: "edit-base",
        meta: {
          title: "基础库编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "edit-base" */ "../views/base/pages/EditBase.vue"
          )
      }
    ]
  },
  /**
   * 产品配置
   */
  {
    ...materialRouter
  },
  /**
   * 工序维护
   */
  {
    path: "/operation-maintain",
    name: "operation-maintain",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "operation-maintain",
        name: "operation-maintain",
        meta: {
          title: "工序维护"
        },
        component: () =>
          import(
            /* webpackChunkName: "operation-maintain" */ "../views/operation-maintain/pages/OperationMaintain.vue"
          )
      },
      {
        path: "add-operation-maintain",
        name: "add-operation-maintain",
        meta: {
          title: "工序维护添加"
        },
        component: () =>
          import(
            /* webpackChunkName: "add-operation-maintain" */ "../views/operation-maintain/pages/AddOperationMaintain.vue"
          )
      },
      {
        path: "edit-operation-maintain",
        name: "edit-operation-maintain",
        meta: {
          title: "工序维护编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "edit-operation-maintain" */ "../views/operation-maintain/pages/EditOperationMaintain.vue"
          )
      }
    ]
  },
  /**
   * 工序站位
   */
  {
    path: "/operation-station",
    name: "operation-maintain",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "operation-station",
        name: "operation-station",
        meta: {
          title: "工序站位维护"
        },
        component: () =>
          import(
            /* webpackChunkName: "operation-station" */ "../views/operation-station/pages/OperationStation.vue"
          )
      },
      {
        path: "add-operation-station",
        name: "add-operation-station",
        meta: {
          title: "工序站位维护添加"
        },
        component: () =>
          import(
            /* webpackChunkName: "add-operation-station" */ "../views/operation-station/pages/AddOperationStation.vue"
          )
      },
      {
        path: "edit-operation-station",
        name: "edit-operation-station",
        meta: {
          title: "工序站位维护编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "edit-operation-station" */ "../views/operation-station/pages/EditOperationStation.vue"
          )
      },
      /**
       * 包装解包配置
       */
      {
        path: "unpack",
        name: "unpack",
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
    path: "/work-center",
    name: "work-center",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "work-center",
        name: "work-center",
        meta: {
          title: "工作中心"
        },
        component: () =>
          import(
            /* webpackChunkName: "work-center" */ "../views/work-center/pages/WorkCenter.vue"
          )
      },
      {
        path: "add-work-center",
        name: "add-work-center",
        meta: {
          title: "工作中心添加"
        },
        component: () =>
          import(
            /* webpackChunkName: "add-work-center" */ "../views/work-center/pages/AddWorkCenter.vue"
          )
      },
      {
        path: "edit-work-center",
        name: "edit-work-center",
        meta: {
          title: "工作中心编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "edit-work-center" */ "../views/work-center/pages/EditWorkCenter.vue"
          )
      }
    ]
  },
  /**
   * 编码规则
   */
  {
    path: "/next-number",
    name: "next-number",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "next-number",
        name: "next-number",
        meta: {
          title: "编码规则"
        },
        component: () =>
          import(
            /* webpackChunkName: "next-number" */ "../views/next-number/pages/NextNumber.vue"
          )
      }
    ]
  },
  /**
   * 独立数据
   */
  {
    path: "/dc",
    name: "dc-search",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "dc-search",
        name: "dc-search",
        meta: {
          title: "独立数据报表查询"
        },
        component: () =>
          import(
            /* webpackChunkName: "dc-search" */ "../views/dc/pages/DCSearch.vue"
          )
      },
      //数据收集
      {
        path: "data-collection",
        name: "data-collection",
        meta: {
          title: "数据收集"
        },
        component: () =>
          import(
            /* webpackChunkName: "data-collection" */ "../views/dc/pages/DataCollection.vue"
          )
      },
      {
        path: "add-data-collection",
        name: "add-data-collection",
        meta: {
          title: "数据收集添加"
        },
        component: () =>
          import(
            /* webpackChunkName: "add-data-collection" */ "../views/dc/pages/AddDataCollection.vue"
          )
      },
      {
        path: "edit-data-collection",
        name: "edit-data-collection",
        meta: {
          title: "数据收集编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "edit-data-collection" */ "../views/dc/pages/EditDataCollection.vue"
          )
      },
      //独立数据收集
      {
        path: "dc-collection",
        name: "dc-collection",
        meta: {
          title: "独立数据收集"
        },
        component: () =>
          import(
            /* webpackChunkName: "dc-collection" */ "../views/dc/pages/DCCollection.vue"
          )
      }
    ]
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
        path: "alarm-maintain",
        name: "alarm-maintain",
        meta: {
          title: "预警事件维护"
        },
        component: () =>
          import(
            /* webpackChunkName: "alarm-maintain" */ "../views/alarm/pages/AlarmMaintain.vue"
          )
      },
      {
        path: "add-alarm-maintain",
        name: "add-alarm-maintain",
        meta: {
          title: "预警事件维护添加"
        },
        component: () =>
          import(
            /* webpackChunkName: "add-alarm-maintain" */ "../views/alarm/pages/AddAlarmMaintain.vue"
          )
      },
      {
        path: "edit-alarm-maintain",
        name: "edit-alarm-maintain",
        meta: {
          title: "预警事件维护编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "edit-alarm-maintain" */ "../views/alarm/pages/EditAlarmMaintain.vue"
          )
      },
      {
        path: "alarm-group",
        name: "alarm-group",
        meta: {
          title: "预警事件分组编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "alarm-group" */ "../views/alarm/pages/AlarmGroup.vue"
          )
      },
      {
        path: "add-alarm-group",
        name: "add-alarm-group",
        meta: {
          title: "预警事件分组编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "add-alarm-group" */ "../views/alarm/pages/AddAlarmGroup.vue"
          )
      },
      {
        path: "edit-alarm-group",
        name: "edit-alarm-group",
        meta: {
          title: "预警事件分组编辑"
        },
        component: () =>
          import(
            /* webpackChunkName: "edit-alarm-group" */ "../views/alarm/pages/EditAlarmGroup.vue"
          )
      },
      {
        path: "alarm-deal",
        name: "alarm-deal",
        meta: {
          title: "预警事件处理"
        },
        component: () =>
          import(
            /* webpackChunkName: "alarm-deal" */ "../views/alarm/pages/AlarmDeal.vue"
          )
      },
      //独立数据收集
      {
        path: "dc-collection",
        name: "dc-collection",
        meta: {
          title: "独立数据收集"
        },
        component: () =>
          import(
            /* webpackChunkName: "dc-collection" */ "../views/dc/pages/DCCollection.vue"
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
  console.log(to);
  console.log(from);
  next();
  document.title = to.meta.title;
  store.commit("PUSH", {
    name: to.name,
    title: to.meta.title || "",
    path: to.path
  });
});

export default router;
