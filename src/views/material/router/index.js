export default {
  path: "/maintenance",
  name: "maintenance",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    //站位维护
    {
      path: "standingMaintenance",
      name: "standingMaintenance",
      meta: {
        title: "站位维护"
      },
      component: () =>
        import(
          /* webpackChunkName: "standingMaintenance" */ "@/views/maintenance/pages/standing-maintenance.vue"
        )
    }
  ]
};
