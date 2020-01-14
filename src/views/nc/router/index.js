export default {
  path: "/nc",
  name: "nc",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "ncGroup",
      name: "ncGroup",
      meta:{
        title:'不合格代码分组'
      },
      component: () =>
        import(
          /* webpackChunkName: "ncGroup" */ "@/views/nc/pages/NcGroup.vue"
        )
    },
    {
      path: "addNcGroup",
      name: "addNcGroup",
      meta:{
        title:'不合格代码分组新增'
      },
      component: () =>
        import(
          /* webpackChunkName: "addNcGroup" */ "@/views/nc/pages/AddNcGroup.vue"
        )
    },
    {
      path: "editNcGroup",
      name: "editNcGroup",
      meta:{
        title:'不合格代码分组编辑'
      },
      component: () =>
        import(
          /* webpackChunkName: "editNcGroup" */ "@/views/nc/pages/EditNcGroup.vue"
        )
    },
    {
      path: "ncCode",
      name: "ncCode",
      meta:{
        title:'不合格代码'
      },
      component: () =>
        import(
          /* webpackChunkName: "ncCode" */ "@/views/nc/pages/NcCode.vue"
        )
    },
    {
      path: "addNcCode",
      name: "addNcCode",
      meta:{
        title:'不合格代码新增'
      },
      component: () =>
        import(
          /* webpackChunkName: "addNcCode" */ "@/views/nc/pages/AddNcCode.vue"
        )
    },
    {
      path: "editNcCode",
      name: "editNcCode",
      meta:{
        title:'不合格代码编辑'
      },
      component: () =>
        import(
          /* webpackChunkName: "editNcCode" */ "@/views/nc/pages/EditNcCode.vue"
        )
    },
    {
      path: "ncLog",
      name: "ncLog",
      meta:{
        title:'不合格代码编辑'
      },
      component: () =>
        import(
          /* webpackChunkName: "ncLog" */ "@/views/nc/pages/NcLog.vue"
        )
    },
  ]
};
