export default {
  path: "/certUser",
  name: "certUser",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "certUser",
      name: "certUser",
      meta:{
        title:'用户证明分配',
        requiresAuth:true
      },
      component: () =>
        import(
          /* webpackChunkName: "certUser" */ "@/views/cert-user/pages/CertUser.vue"
        )
    },
    {
      path: "addCertUser",
      name: "addCertUser",
      meta:{
        title:'用户证明分配新增',
        requiresAuth:true
      },
      component: () =>
        import(
          /* webpackChunkName: "addCertUser" */ "@/views/cert-user/pages/AddCertUser.vue"
        )
    },
    {
      path: "editCertUser",
      name: "editCertUser",
      meta:{
        title:'用户证明分配编辑',
        requiresAuth:true
      },
      component: () =>
        import(
          /* webpackChunkName: "editCertUser" */ "@/views/cert-user/pages/EditCertUser.vue"
        )
    },
  ]
};
