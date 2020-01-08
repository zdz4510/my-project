export default {
  path: "/dc",
  name: "dc-search",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "dc-search",
      name: "dc-search",
      meta: {
        title: "独立数据报表查询"
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
        title: "数据收集"
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
        title: "数据收集添加"
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
        title: "数据收集编辑"
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
        title: "独立数据收集"
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
        title: "包装解包配置"
      },
      component: () =>
        import(/* webpackChunkName: "unpack" */ "@/views/dc/pages/unpack.vue")
    },
    //包装解包配置编辑
    {
      path: "edit-dc-unpack",
      name: "edit-dc-unpack",
      meta: {
        title: "包装解包配置编辑"
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
        title: "LOT步骤状态变更"
      },
      component: () =>
        import(
          /* webpackChunkName: "lotStep" */ "@/views/dc/pages/lot-step.vue"
        )
    },
    //Lot拆分
    {
      path: "lotDivestiture",
      name: "lotDivestiture",
      meta: {
        title: "Lot拆分"
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
        title: "Lot 合并"
      },
      component: () =>
        import(
          /* webpackChunkName: "lotMerge" */ "@/views/dc/pages/lot-merge.vue"
        )
    }
  ]
};
