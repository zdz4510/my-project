/**
 * 产品配置
 */
export default {
  path: "/tag",
  name: "tag",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    //标签配置
    {
      path: "tagConfig",
      name: "tagConfig",
      meta: {
        title: "标签配置",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "tagConfig" */ "@/views/tag/pages/tag-config.vue"
        )
    },
    //标签配置编辑
    {
      path: "tagConfigEdit",
      name: "tagConfigEdit",
      meta: {
        title: "标签配置编辑",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "tagConfigEdit" */ "@/views/tag/pages/tag-config-edit.vue"
        )
    },
    //标签打印
    {
      path: "tagPrint",
      name: "tagPrint",
      meta: {
        title: "标签打印",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "tagPrint" */ "@/views/tag/pages/tag-print.vue"
        )
    },
     //标签编辑
     {
      path: "tagEdit",
      name: "tagEdit",
      meta: {
        title: "标签编辑",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "tagEdit" */ "@/views/tag/pages/tag-edit.vue"
        )
    }
  ]
};
