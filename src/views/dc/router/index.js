export default {
  path: "/dc",
  name: "dc-search",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "dc-search",
      name: "dc-search",
      meta: {
        title: "独立数据报表查询",
        requiresAuth:true
      },
      component: () =>
        import(
          /* webpackChunkName: "dc-search" */ "@/views/dc/pages/DCSearch.vue"
        )
    },
    //数据收集
    {
      path: "data-collection",
      name: "data-collection",
      meta: {
        title: "数据收集",
        requiresAuth:true
      },
      component: () =>
        import(
          /* webpackChunkName: "data-collection" */ "@/views/dc/pages/DataCollection.vue"
        )
    },
    {
      path: "add-data-collection",
      name: "add-data-collection",
      meta: {
        title: "数据收集添加",
        requiresAuth:true
      },
      component: () =>
        import(
          /* webpackChunkName: "add-data-collection" */ "@/views/dc/pages/AddDataCollection.vue"
        )
    },
    {
      path: "edit-data-collection",
      name: "edit-data-collection",
      meta: {
        title: "数据收集编辑",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "edit-data-collection" */ "@/views/dc/pages/EditDataCollection.vue"
        )
    },
    //独立数据收集
    {
      path: "dc-collection",
      name: "dc-collection",
      meta: {
        title: "独立数据收集",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "dc-collection" */ "@/views/dc/pages/DCCollection.vue"
        )
    },
    //包装解包配置
    {
      path: "unpack",
      name: "unpack",
      meta: {
        title: "包装解包配置",
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "unpack" */ "@/views/dc/pages/unpack.vue")
    },
    //包装解包配置编辑
    {
      path: "edit-dc-unpack",
      name: "edit-dc-unpack",
      meta: {
        title: "包装解包配置编辑",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "edit-dc-unpack" */ "@/views/dc/pages/unpack-edit.vue"
        )
    },
    //LOT步骤状态变更
    {
      path: "lotStep",
      name: "lotStep",
      meta: {
        title: "LOT步骤状态变更",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "lotStep" */ "@/views/dc/pages/lot-step.vue"
        )
    },
    //LOT查询
    {
      path: "lotQuery",
      name: "lotQuery",
      meta: {
        title: "LOT查询",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "lotQuery" */ "@/views/dc/pages/lot-query.vue"
        )
    },
    //LOT步骤状态变更查看详情
    {
      path: "lotStepDetail",
      name: "lotStepDetail",
      meta: {
        title: "LOT步骤状态变更查看详情",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "lotStepDetail" */ "@/views/dc/pages/lot-step-detail.vue"
        )
    },
    //Lot拆分
    {
      path: "lotDivestiture",
      name: "lotDivestiture",
      meta: {
        title: "Lot拆分",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "lotDivestiture" */ "@/views/dc/pages/lot-divestiture.vue"
        )
    },
    //Lot 合并
    {
      path: "lotMerge",
      name: "lotMerge",
      meta: {
        title: "Lot 合并",
        requiresAuth:true
      },
      component: () =>
        import(
          /* webpackChunkName: "lotMerge" */ "@/views/dc/pages/lot-merge.vue"
        )
    },
    {
      path: "lotNum",
      name: "lotNum",
      meta: {
        title: "Lot 数量调整",
        requiresAuth:true
      },
      component: () =>
        import(
          /* webpackChunkName: "lotMerge" */ "@/views/dc/pages/lot-num.vue"
        )
    },
    //生产操作
    {
      path: "productionOperate",
      name: "productionOperate",
      meta: {
        title: "生产操作",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "productionOperate" */ "@/views/dc/pages/production-operate.vue"
        )
    }
  ]
};
