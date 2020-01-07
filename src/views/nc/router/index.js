export default {
  path: "/nc",
  name: "nc",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "nc-group",
      name: "nc-group",
      meta:{
        title:'不合格代码分组'
      },
      component: () =>
        import(
          /* webpackChunkName: "nc-group" */ "@/views/nc/pages/NcGroup.vue"
        )
    },
    {
      path: "add-nc-group",
      name: "add-nc-group",
      meta:{
        title:'不合格代码分组新增'
      },
      component: () =>
        import(
          /* webpackChunkName: "add-nc-group" */ "@/views/nc/pages/AddNcGroup.vue"
        )
    },
    {
      path: "edit-nc-group",
      name: "edit-nc-group",
      meta:{
        title:'不合格代码分组编辑'
      },
      component: () =>
        import(
          /* webpackChunkName: "edit-nc-group" */ "@/views/nc/pages/EditNcGroup.vue"
        )
    },
    {
      path: "nc-code",
      name: "nc-code",
      meta:{
        title:'不合格代码'
      },
      component: () =>
        import(
          /* webpackChunkName: "nc-code" */ "@/views/nc/pages/NcCode.vue"
        )
    },
    {
      path: "add-nc-code",
      name: "add-nc-code",
      meta:{
        title:'不合格代码新增'
      },
      component: () =>
        import(
          /* webpackChunkName: "add-nc-code" */ "@/views/nc/pages/AddNcCode.vue"
        )
    },
    {
      path: "edit-nc-code",
      name: "edit-nc-code",
      meta:{
        title:'不合格代码编辑'
      },
      component: () =>
        import(
          /* webpackChunkName: "edit-nc-code" */ "@/views/nc/pages/EditNcCode.vue"
        )
    },
  ]
};
