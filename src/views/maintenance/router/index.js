/**
 * 产品配置
 */
export default {
  path: "/material",
  name: "material",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "materialInfo",
      name: "materialInfo",
      meta: {
        title: "物料维护"
      },
      component: () =>
        import(
          /* webpackChunkName: "material-info" */ "@/views/material/pages/MaterialInfo.vue"
        )
    },
    {
      path: "addMaterial",
      name: "addMaterial",
      meta: {
        title: "物料维护添加"
      },
      component: () =>
        import(
          /* webpackChunkName: "addMaterial" */ "@/views/material/pages/AddMaterial.vue"
        )
    },
    {
      path: "editMaterial",
      name: "editMaterial",
      meta: {
        title: "物料维护编辑"
      },
      component: () =>
        import(
          /* webpackChunkName: "editMaterial" */ "@/views/material/pages/EditMaterial.vue"
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
