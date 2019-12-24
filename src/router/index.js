import Vue from "vue";
import VueRouter from "vue-router";
//const Home = import(/* webpackChunkName: "home" */ "../views/home/");
// import Home  from "../views/home/"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/material/material-info"
  },
  // {
  //   path: "/",
  //   redirect: "/base/collection"
  // },
  /**  基础模块 */
  // {
  //   path: "/base",
  //   name: "base",
  //   component: () =>
  //     import(/* webpackChunkName: "layout" */ "../views/layout/"),
  //   children: [
  //     {
  //       path: "collection",
  //       name: "collection",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "collection" */ "../views/base/pages/collection.vue"
  //         )
  //     },
  //     {
  //       path: "colorLibrary",
  //       name: "colorLibrary",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "colorLibrary" */ "../views/base/pages/color-library.vue"
  //         )
  //     },
  //     {
  //       path: "salaryLevel",
  //       name: "salaryLevel",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "salaryLevel" */ "../views/base/pages/salary-level.vue"
  //         )
  //     },
  //     {
  //       path: "toolLibrary",
  //       name: "toolLibrary",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "salaryLevel" */ "../views/base/pages/tool-library.vue"
  //         )
  //     },
  //     {
  //       path: "deviceLibrary",
  //       name: "deviceLibrary",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "salaryLevel" */ "../views/base/pages/device-library.vue"
  //         )
  //     },
  //     {
  //       path: "customerStorage",
  //       name: "customerStorage",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "salaryLevel" */ "../views/base/pages/customer-storage.vue"
  //         )
  //     }
  //   ]
  // },
  /**  基础模块 */
  /** 设置 */
  // {
  //   path: "/set",
  //   name: "set",
  //   component: () =>
  //     import(/* webpackChunkName: "layout" */ "../views/layout/"),
  //   children: [
  //     {
  //       path: "authority",
  //       name: "authority",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "authority" */ "../views/setting/pages/authority.vue"
  //         )
  //     },
  //     {
  //       path: "message",
  //       name: "message",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "colorLibrary" */ "../views/setting/pages/message.vue"
  //         )
  //     }
  //   ]
  // },

  /**设置 */
  /**
   *  操作模块
   */
  // {
  //   path: "/operation",
  //   name: "operation",
  //   component: () =>
  //     import(/* webpackChunkName: "layout" */ "../views/layout/"),
  //   children: [
  //     {
  //       path: "control",
  //       name: "control",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "control" */ "../views/operation/pages/in-control.vue"
  //         )
  //     },
  //     {
  //       path: "data",
  //       name: "basicData",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "basicData" */ "../views/operation/pages/basic-data.vue"
  //         )
  //     }
  //   ]
  // },

  /**
   * 操作模块结束
   */
  /**
   *  查询
   */
  // {
  //   path: "/query",
  //   name: "query",
  //   component: () =>
  //     import(/* webpackChunkName: "layout" */ "../views/layout/"),
  //   children: [
  //     {
  //       path: "materiel",
  //       name: "materiel",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "materiel" */ "../views/query/pages/materiel.vue"
  //         )
  //     },
  //     {
  //       path: "warning",
  //       name: "earlyWarning",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "earlyWarning" */ "../views/query/pages/early-warning.vue"
  //         )
  //     }
  //   ]
  // },

  /**
   *  查询模块结束
   */
  /**
   *  常用
   */
  // {
  //   path: "/common",
  //   name: "common",
  //   component: () =>
  //     import(/* webpackChunkName: "layout" */ "../views/layout/"),
  //   children: [
  //     {
  //       path: "set",
  //       name: "set",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "set" */ "../views/common-user/pages/set.vue"
  //         )
  //     },
  //     {
  //       path: "other",
  //       name: "other",
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "other" */ "../views/common-user/pages/other.vue"
  //         )
  //     }
  //   ]
  // },
  /**
   * 物料维护模块
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
        path: "operation-maintain",
        name: "operation-maintain",
        component: () =>
          import(
            /* webpackChunkName: "operation-maintain" */ "../views/material/pages/OperationMaintain.vue"
          )
      },
      {
        path: "operation-station",
        name: "operation-station",
        component: () =>
          import(
            /* webpackChunkName: "operation-station" */ "../views/material/pages/OperationStation.vue"
          )
      },
      {
        path: "work-center",
        name: "work-center",
        component: () =>
          import(
            /* webpackChunkName: "work-center" */ "../views/material/pages/WorkCenter.vue"
          )
      },
      {
        path: "next-number",
        name: "next-number",
        component: () =>
          import(
            /* webpackChunkName: "next-number" */ "../views/material/pages/NextNumber.vue"
          )
      }
    ]
  },
  /**
   * 设备维护模块
   */
  {
    path: "/device",
    name: "device",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "deviceType",
        name: "deviceType",
        component: () =>
          import(
            /* webpackChunkName: "deviceType" */ "../views/device/pages/device-type.vue"
          )
      },
      {
        path: "deviceMaintenance",
        name: "deviceMaintenance",
        component: () =>
          import(
            /* webpackChunkName: "deviceMaintenance" */ "../views/device/pages/device-maintenance.vue"
          )
      },
      {
        path: "deviceUpkeep",
        name: "deviceUpkeep",
        component: () =>
          import(
            /* webpackChunkName: "deviceUpkeep" */ "../views/device/pages/device-upkeep.vue"
          )
      },
      //新增和编辑页面
      {
        path: "deviceTypeEdit",
        name: "deviceTypeEdit",
        component: () =>
          import(
            /* webpackChunkName: "deviceTypeEdit" */ "../views/device/pages/device-type-edit.vue"
          )
      },
      {
        path: "deviceMaintenanceEdit",
        name: "deviceMaintenanceEdit",
        component: () =>
          import(
            /* webpackChunkName: "deviceMaintenanceEdit" */ "../views/device/pages/device-maintenance-edit.vue"
          )
      }
    ]
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

export default router;
