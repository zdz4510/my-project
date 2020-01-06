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
    //站位维护编辑
    {
      path: "standingMaintenanceEdit",
      name: "standingMaintenanceEdit",
      meta: {
        title: "站位维护编辑"
      },
      component: () =>
        import(
          /* webpackChunkName: "standingMaintenanceEdit" */ "@/views/maintenance/pages/standing-maintenance-edit.vue"
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
    //上岗证维护编辑
    {
      path: "workingCertificateMaintenanceEdit",
      name: "workingCertificateMaintenanceEdit",
      meta: {
        title: "上岗证维护编辑"
      },
      component: () =>
        import(
          /* webpackChunkName: "workingCertificateMaintenanceEdit" */ "@/views/maintenance/pages/working-certificate-maintenance-edit.vue"
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
    //通用代码定义维护编辑
    {
      path: "genericCodeDefinitionEdit",
      name: "genericCodeDefinitionEdit",
      meta: {
        title: "通用代码定义维护编辑"
      },
      component: () =>
        import(
          /* webpackChunkName: "genericCodeDefinitionEdit" */ "@/views/maintenance/pages/generic-code-definition-edit.vue"
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
    },
    //通用代码数据维护编辑
    {
      path: "genericCodeDataEdit",
      name: "genericCodeDataEdit",
      meta: {
        title: "通用代码数据维护编辑"
      },
      component: () =>
        import(
          /* webpackChunkName: "genericCodeDataEdit" */ "@/views/maintenance/pages/generic-code-data-edit.vue"
        )
    }
  ]
};
