export default {
  path: "/device",
  name: "device",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "deviceType",
      name: "deviceType",
      component: () =>
        import(
          /* webpackChunkName: "deviceType" */ "@/views/device/pages/device-type.vue"
        )
    },
    {
      path: "deviceMaintenance",
      name: "deviceMaintenance",
      component: () =>
        import(
          /* webpackChunkName: "deviceMaintenance" */ "@/views/device/pages/device-maintenance.vue"
        )
    },
    {
      path: "deviceUpkeep",
      name: "deviceUpkeep",
      component: () =>
        import(
          /* webpackChunkName: "deviceUpkeep" */ "@/views/device/pages/device-upkeep.vue"
        )
    },
    //新增和编辑页面
    {
      path: "deviceTypeEdit",
      name: "deviceTypeEdit",
      component: () =>
        import(
          /* webpackChunkName: "deviceTypeEdit" */ "@/views/device/pages/device-type-edit.vue"
        )
    },
    {
      path: "deviceMaintenanceEdit",
      name: "deviceMaintenanceEdit",
      component: () =>
        import(
          /* webpackChunkName: "deviceMaintenanceEdit" */ "@/views/device/pages/device-maintenance-edit.vue"
        )
    },
    {
      path: "test",
      name: "test",
      component: () =>
        import(/* webpackChunkName: "test" */ "@/views/device/pages/test.vue")
    }
  ]
};
