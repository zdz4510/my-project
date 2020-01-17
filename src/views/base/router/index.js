export default {
  path: "/base",
  name: "base",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "base",
      name: "base",
      meta: {
        title: "基础库"
      },
      component: () =>
        import(/* webpackChunkName: "base" */ "@/views/base/pages/Base.vue")
    },
    {
      path: "addBase",
      name: "addBase",
      meta: {
        title: "基础库添加"
      },
      component: () =>
        import(
          /* webpackChunkName: "addBase" */ "@/views/base/pages/AddBase.vue"
        )
    },
    {
      path: "editBase",
      name: "editBase",
      meta: {
        title: "基础库编辑"
      },
      component: () =>
        import(
          /* webpackChunkName: "editBase" */ "@/views/base/pages/EditBase.vue"
        )
    },
    //站位按钮分配
    {
      path: "standingButtonDistribute",
      name: "standingButtonDistribute",
      meta: {
        title: "站位按钮分配"
      },
      component: () =>
        import(
          /* webpackChunkName: "standingButtonDistribute" */ "@/views/base/pages/standing-button-distribute.vue"
        )
    },
    //站位按钮分配编辑
    {
      path: "standingButtonDistributeEdit",
      name: "standingButtonDistributeEdit",
      meta: {
        title: "站位按钮分配编辑"
      },
      component: () =>
        import(
          /* webpackChunkName: "standingButtonDistribute" */ "@/views/base/pages/standing-button-distribute-edit.vue"
        )
    }
  ]
};
