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
    },
    //上岗证维护
    {
      path: "workingCertificateMaintenance",
      name: "workingCertificateMaintenance",
      meta: {
        title: "上岗证维护"
      },
      component: () =>
        import(
          /* webpackChunkName: "workingCertificateMaintenance" */ "@/views/maintenance/pages/working-certificate-maintenance.vue"
        )
    },
    //通用代码定义维护
    {
      path: "genericCodeDefinition",
      name: "genericCodeDefinition",
      meta: {
        title: "通用代码定义维护"
      },
      component: () =>
        import(
          /* webpackChunkName: "genericCodeDefinition" */ "@/views/maintenance/pages/generic-code-definition.vue"
        )
    },
    //通用代码数据维护
    {
      path: "genericCodeData",
      name: "genericCodeData",
      meta: {
        title: "通用代码数据维护"
      },
      component: () =>
        import(
          /* webpackChunkName: "genericCodeData" */ "@/views/maintenance/pages/generic-code-data.vue"
        )
    }
  ]
};
