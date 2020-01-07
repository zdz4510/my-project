/**
 * 产品配置
 */
export default {
  path: "/material",
  name: "material",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "material-info",
      name: "material-info",
      meta: {
        title: "物料维护"
      },
      component: () =>
        import(
          /* webpackChunkName: "material-info" */ "@/views/material/pages/MaterialInfo.vue"
        )
    },
    {
      path: "add-material",
      name: "add-material",
      meta: {
        title: "物料维护添加"
      },
      component: () =>
        import(
          /* webpackChunkName: "add-material" */ "@/views/material/pages/AddMaterial.vue"
        )
    },
    {
      path: "edit-material",
      name: "edit-material",
      meta: {
        title: "物料维护编辑"
      },
      component: () =>
        import(
          /* webpackChunkName: "edit-material" */ "@/views/material/pages/EditMaterial.vue"
        )
    },
    //工单维护
    {
      path: "workOrder",
      name: "workOrder",
      component: () =>
        import(
          /* webpackChunkName: "work-order" */ "@/views/work-order/pages/work-order.vue"
        )
    },
    //工单下达
    {
      path: "issued",
      name: "issued",
      component: () =>
        import(
          /* webpackChunkName: "issued" */ "@/views/issued/pages/issued.vue"
        )
    }
  ]
};
