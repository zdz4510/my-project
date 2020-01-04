import Vue from "vue";
import VueRouter from "vue-router";
import deviceRouter from "@/views/device/router/index.js";
import maintenanceRouter from "@/views/maintenance/router/index.js";
import store from "@/store/";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/base/base"
  },
  /**
   *  基础库
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
        component: () =>
          import(/* webpackChunkName: "base" */ "../views/base/pages/Base.vue")
      },
      {
        path: "add-base",
        name: "add-base",
        component: () =>
          import(
            /* webpackChunkName: "add-base" */ "../views/base/pages/AddBase.vue"
          )
      },
      {
        path: "edit-base",
        name: "edit-base",
        component: () =>
          import(
            /* webpackChunkName: "edit-base" */ "../views/base/pages/EditBase.vue"
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
        component: () =>
          import(
            /* webpackChunkName: "work-center" */ "../views/work-center/pages/WorkCenter.vue"
          )
      },
      {
        path: "add-work-center",
        name: "add-work-center",
        component: () =>
          import(
            /* webpackChunkName: "add-work-center" */ "../views/work-center/pages/AddWorkCenter.vue"
          )
      },
      {
        path: "edit-work-center",
        name: "edit-work-center",
        component: () =>
          import(
            /* webpackChunkName: "edit-work-center" */ "../views/work-center/pages/EditWorkCenter.vue"
          )
      }
    ]
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
        component: () =>
          import(
            /* webpackChunkName: "operation-maintain" */ "../views/operation-maintain/pages/OperationMaintain.vue"
          )
      },
      {
        path: "add-operation-maintain",
        name: "add-operation-maintain",
        component: () =>
          import(
            /* webpackChunkName: "add-operation-maintain" */ "../views/operation-maintain/pages/AddOperationMaintain.vue"
          )
      },
      {
        path: "edit-operation-maintain",
        name: "edit-operation-maintain",
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
    name: "operation-station",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "operation-station",
        name: "operation-station",
        component: () =>
          import(
            /* webpackChunkName: "operation-station" */ "../views/operation-station/pages/OperationStation.vue"
          )
      },
      {
        path: "add-operation-station",
        name: "add-operation-station",
        component: () =>
          import(
            /* webpackChunkName: "add-operation-station" */ "../views/operation-station/pages/AddOperationStation.vue"
          )
      },
      {
        path: "edit-operation-station",
        name: "edit-operation-station",
        component: () =>
          import(
            /* webpackChunkName: "edit-operation-station" */ "../views/operation-station/pages/EditOperationStation.vue"
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
        component: () =>
          import(
            /* webpackChunkName: "next-number" */ "../views/next-number/pages/NextNumber.vue"
          )
      }
    ]
  },

  /**
   * 物料维护
   */
  {
    path: "/material",
    name: "material",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "material-info",
        name: "material-info",
        component: () =>
          import(
            /* webpackChunkName: "material-info" */ "../views/material/pages/MaterialInfo.vue"
          )
      },
      {
        path: "add-material",
        name: "add-material",
        component: () =>
          import(
            /* webpackChunkName: "add-material" */ "../views/material/pages/AddMaterial.vue"
          )
      },
      {
        path: "edit-material",
        name: "edit-material",
        component: () =>
          import(
            /* webpackChunkName: "edit-material" */ "../views/material/pages/EditMaterial.vue"
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
        component: () =>
          import(
            /* webpackChunkName: "dc-search" */ "../views/dc/pages/DCSearch.vue"
          )
      },
      {
        path: "data-collection",
        name: "data-collection",
        component: () =>
          import(
            /* webpackChunkName: "data-collection" */ "../views/dc/pages/DataCollection.vue"
          )
      },
      {
        path: "add-data-collection",
        name: "add-data-collection",
        component: () =>
          import(
            /* webpackChunkName: "add-data-collection" */ "../views/dc/pages/AddDataCollection.vue"
          )
      },
      {
        path: "edit-data-collection",
        name: "edit-data-collection",
        component: () =>
          import(
            /* webpackChunkName: "edit-data-collection" */ "../views/dc/pages/EditDataCollection.vue"
          )
      },
      {
        path: "dc-collection",
        name: "dc-collection",
        component: () =>
          import(
            /* webpackChunkName: "dc-collection" */ "../views/dc/pages/DCCollection.vue"
          )
      }
    ]
  },
  {
    path: "/base",
    name: "base",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "base",
        name: "base",
        component: () =>
          import(/* webpackChunkName: "base" */ "../views/base/pages/Base.vue")
      },
      {
        path: "add-base",
        name: "add-base",
        component: () =>
          import(
            /* webpackChunkName: "add-base" */ "../views/base/pages/AddBase.vue"
          )
      },
      {
        path: "edit-base",
        name: "edit-base",
        component: () =>
          import(
            /* webpackChunkName: "edit-base" */ "../views/base/pages/EditBase.vue"
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
        component: () =>
          import(
            /* webpackChunkName: "work-center" */ "../views/work-center/pages/WorkCenter.vue"
          )
      },
      {
        path: "add-work-center",
        name: "add-work-center",
        component: () =>
          import(
            /* webpackChunkName: "add-work-center" */ "../views/work-center/pages/AddWorkCenter.vue"
          )
      },
      {
        path: "edit-work-center",
        name: "edit-work-center",
        component: () =>
          import(
            /* webpackChunkName: "edit-work-center" */ "../views/work-center/pages/EditWorkCenter.vue"
          )
      }
    ]
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
        component: () =>
          import(
            /* webpackChunkName: "operation-maintain" */ "../views/operation-maintain/pages/OperationMaintain.vue"
          )
      },
      {
        path: "add-operation-maintain",
        name: "add-operation-maintain",
        component: () =>
          import(
            /* webpackChunkName: "add-operation-maintain" */ "../views/operation-maintain/pages/AddOperationMaintain.vue"
          )
      },
      {
        path: "edit-operation-maintain",
        name: "edit-operation-maintain",
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
    name: "operation-station",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "operation-station",
        name: "operation-station",
        component: () =>
          import(
            /* webpackChunkName: "operation-station" */ "../views/operation-station/pages/OperationStation.vue"
          )
      },
      {
        path: "add-operation-station",
        name: "add-operation-station",
        component: () =>
          import(
            /* webpackChunkName: "add-operation-station" */ "../views/operation-station/pages/AddOperationStation.vue"
          )
      },
      {
        path: "edit-operation-station",
        name: "edit-operation-station",
        component: () =>
          import(
            /* webpackChunkName: "edit-operation-station" */ "../views/operation-station/pages/EditOperationStation.vue"
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
        component: () =>
          import(
            /* webpackChunkName: "next-number" */ "../views/next-number/pages/NextNumber.vue"
          )
      }
    ]
  },

  /**
   * 物料维护
   */
  {
    path: "/material",
    name: "material",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "material-info",
        name: "material-info",
        component: () =>
          import(
            /* webpackChunkName: "material-info" */ "../views/material/pages/MaterialInfo.vue"
          )
      },
      {
        path: "add-material",
        name: "add-material",
        component: () =>
          import(
            /* webpackChunkName: "add-material" */ "../views/material/pages/AddMaterial.vue"
          )
      },
      {
        path: "edit-material",
        name: "edit-material",
        component: () =>
          import(
            /* webpackChunkName: "edit-material" */ "../views/material/pages/EditMaterial.vue"
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
        component: () =>
          import(
            /* webpackChunkName: "dc-search" */ "../views/dc/pages/DCSearch.vue"
          )
      },
      {
        path: "data-collection",
        name: "data-collection",
        component: () =>
          import(
            /* webpackChunkName: "data-collection" */ "../views/dc/pages/DataCollection.vue"
          )
      },
      {
        path: "add-data-collection",
        name: "add-data-collection",
        component: () =>
          import(
            /* webpackChunkName: "add-data-collection" */ "../views/dc/pages/AddDataCollection.vue"
          )
      },
      {
        path: "edit-data-collection",
        name: "edit-data-collection",
        component: () =>
          import(
            /* webpackChunkName: "edit-data-collection" */ "../views/dc/pages/EditDataCollection.vue"
          )
      }
    ]
  },
  /**
   * 预警事件
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
        component: () =>
          import(
            /* webpackChunkName: "alarm-maintain" */ "../views/alarm/pages/AlarmMaintain.vue"
          )
      },
      {
        path: "add-alarm-maintain",
        name: "add-alarm-maintain",
        component: () =>
          import(
            /* webpackChunkName: "add-alarm-maintain" */ "../views/alarm/pages/AddAlarmMaintain.vue"
          )
      },
      {
        path: "edit-alarm-maintain",
        name: "edit-alarm-maintain",
        component: () =>
          import(
            /* webpackChunkName: "edit-alarm-maintain" */ "../views/alarm/pages/EditAlarmMaintain.vue"
          )
      },
      {
        path: "alarm-group",
        name: "alarm-group",
        component: () =>
          import(
            /* webpackChunkName: "alarm-group" */ "../views/alarm/pages/AlarmGroup.vue"
          )
      },
      {
        path: "add-alarm-group",
        name: "add-alarm-group",
        component: () =>
          import(
            /* webpackChunkName: "add-alarm-group" */ "../views/alarm/pages/AddAlarmGroup.vue"
          )
      },
      {
        path: "edit-alarm-group",
        name: "edit-alarm-group",
        component: () =>
          import(
            /* webpackChunkName: "edit-alarm-group" */ "../views/alarm/pages/EditAlarmGroup.vue"
          )
      }
    ]
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
