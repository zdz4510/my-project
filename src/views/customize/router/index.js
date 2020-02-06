export default {
  path: "/customize",
  name: "customize",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "customize",
      name: "customize",
      meta:{
        title:'自定义字段维护',
        requiresAuth:true
      },
      component: () =>
        import(
          /* webpackChunkName: "customize" */ "@/views/customize/pages/Customize.vue"
        )
    },
  ]
};
