import Vue from "vue";
import VueRouter from "vue-router";
//const Home = import(/* webpackChunkName: "home" */ "../views/home/");
// import Home  from "../views/home/"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/base/collection"
  },
  /**  基础模块 */
  {
    path: "/base",
    name: "base",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "collection",
        name: "collection",
        component: () =>
          import(
            /* webpackChunkName: "collection" */ "../views/base/pages/collection.vue"
          )
      },
      {
        path: "colorLibrary",
        name: "colorLibrary",
        component: () =>
          import(
            /* webpackChunkName: "colorLibrary" */ "../views/base/pages/color-library.vue"
          )
      },
      {
        path: "salaryLevel",
        name: "salaryLevel",
        component: () =>
          import(
            /* webpackChunkName: "salaryLevel" */ "../views/base/pages/salary-level.vue"
          )
      },
      {
        path: "toolLibrary",
        name: "toolLibrary",
        component: () =>
          import(
            /* webpackChunkName: "salaryLevel" */ "../views/base/pages/tool-library.vue"
          )
      },
      {
        path: "deviceLibrary",
        name: "deviceLibrary",
        component: () =>
          import(
            /* webpackChunkName: "salaryLevel" */ "../views/base/pages/device-library.vue"
          )
      }
    ]
  },
  /**  基础模块 */
  /** 设置 */
  {
    path: "/set",
    name: "set",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "authority",
        name: "authority",
        component: () =>
          import(
            /* webpackChunkName: "authority" */ "../views/setting/pages/authority.vue"
          )
      },
      {
        path: "message",
        name: "message",
        component: () =>
          import(
            /* webpackChunkName: "colorLibrary" */ "../views/setting/pages/message.vue"
          )
      }
    ]
  },

  /**设置 */
  /**
   *  操作模块
   */
  {
    path: "/operation",
    name: "operation",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "control",
        name: "control",
        component: () =>
          import(
            /* webpackChunkName: "control" */ "../views/operation/pages/in-control.vue"
          )
      },
      {
        path: "data",
        name: "basicData",
        component: () =>
          import(
            /* webpackChunkName: "basicData" */ "../views/operation/pages/basic-data.vue"
          )
      }
    ]
  },

  /**
   * 操作模块结束
   */
  /**
   *  查询
   */
  {
    path: "/query",
    name: "query",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "materiel",
        name: "materiel",
        component: () =>
          import(
            /* webpackChunkName: "materiel" */ "../views/query/pages/materiel.vue"
          )
      },
      {
        path: "warning",
        name: "earlyWarning",
        component: () =>
          import(
            /* webpackChunkName: "earlyWarning" */ "../views/query/pages/early-warning.vue"
          )
      }
    ]
  },

  /**
   *  查询模块结束
   */
  /**
   *  常用
   */
  {
    path: "/common",
    name: "common",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "set",
        name: "set",
        component: () =>
          import(
            /* webpackChunkName: "set" */ "../views/common-user/pages/set.vue"
          )
      },
      {
        path: "other",
        name: "other",
        component: () =>
          import(
            /* webpackChunkName: "other" */ "../views/common-user/pages/other.vue"
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
