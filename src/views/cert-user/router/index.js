export default {
  path: "/cert-user",
  name: "cert-user",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "cert-user",
      name: "cert-user",
      meta:{
        title:'用户证明分配'
      },
      component: () =>
        import(
          /* webpackChunkName: "cert-user" */ "@/views/cert-user/pages/CertUser.vue"
        )
    },
    {
      path: "add-cert-user",
      name: "add-cert-user",
      meta:{
        title:'用户证明分配新增'
      },
      component: () =>
        import(
          /* webpackChunkName: "add-cert-user" */ "@/views/cert-user/pages/AddCertUser.vue"
        )
    },
    {
      path: "edit-cert-user",
      name: "edit-cert-user",
      meta:{
        title:'用户证明分配编辑'
      },
      component: () =>
        import(
          /* webpackChunkName: "edit-cert-user" */ "@/views/cert-user/pages/EditCertUser.vue"
        )
    },
  ]
};
