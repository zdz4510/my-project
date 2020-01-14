/**
 * 报废/删除
 */
export default {
  path: "/scrapDelete",
  name: "scrapDelete",
  component: () => import(/* webpackChunkName: "layout" */ "@/views/layout/"),
  children: [
    {
      path: "scrapRecover",
      name: "scrapRecover",
      meta: {
        title: "报废/恢复"
      },
      component: () =>
        import(
          /* webpackChunkName: "scrap-delete" */ "@/views/scrap-delete/pages/ScrapRecover.vue"
        )
    },
    {
      path: "deleteRecover",
      name: "deleteRecover",
      meta: {
        title: "删除/恢复"
      },
      component: () =>
        import(
          /* webpackChunkName: "scrap-delete" */ "@/views/scrap-delete/pages/DeleteRecover.vue"
        )
    },

   
  ]
};
