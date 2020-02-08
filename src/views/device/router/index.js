export default {
  path: "/device",
  name: "device",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "deviceType",
      name: "deviceType",
      meta: {
        title: "deviceType",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "deviceType" */ "@/views/device/pages/device-type.vue"
        )
    },
    {
      path: "deviceMaintenance",
      name: "deviceMaintenance",
      meta: {
        title: "deviceMaintenance",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "deviceMaintenance" */ "@/views/device/pages/device-maintenance.vue"
        )
    },
    {
      path: "deviceUpkeep",
      name: "deviceUpkeep",
      meta: {
        title: "deviceUpkeep",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "deviceUpkeep" */ "@/views/device/pages/device-upkeep.vue"
        )
    },
    //新增和编辑页面
    {
      path: "deviceTypeEdit",
      name: "deviceTypeEdit",
      meta: {
        title: "新增和编辑",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "deviceTypeEdit" */ "@/views/device/pages/device-type-edit.vue"
        )
    },
    {
      path: "deviceMaintenanceEdit",
      name: "deviceMaintenanceEdit",
      meta: {
        title: "deviceMaintenanceEdit",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "deviceMaintenanceEdit" */ "@/views/device/pages/device-maintenance-edit.vue"
        )
    },
    {
      path: "test",
      name: "test",
      meta: {
        title: "测试",
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "test" */ "@/views/device/pages/test.vue")
    }
  ]
};
