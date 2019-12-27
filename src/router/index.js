import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/base/base"
  },
  /**
   *  基础库
   */
	{
		path: "/base",
		name: "base",
		component: () =>
			import(/* webpackChunkName: "layout" */ "../views/layout/"),
		children: [
			{
				path: "base",
				name: "base",
				component: () =>
					import(
						/* webpackChunkName: "base" */ "../views/base/pages/Base.vue"
					)
			},{
				path: "add-base",
				name: "add-base",
				component: () =>
					import(
						/* webpackChunkName: "add-base" */ "../views/base/pages/AddBase.vue"
					)
			},{
				path: "edit-base",
				name: "edit-base",
				component: () =>
					import(
						/* webpackChunkName: "edit-base" */ "../views/base/pages/EditBase.vue"
					)
			}
		]
	},
	/**
	 * 工作中心
	 */
	{
		path: "/work-center",
		name: "work-center",
		component: () =>
			import(/* webpackChunkName: "layout" */ "../views/layout/"),
		children: [
			{
				path: "work-center",
				name: "work-center",
				component: () =>
					import(
						/* webpackChunkName: "work-center" */ "../views/work-center/pages/WorkCenter.vue"
					)
			},{
				path: "add-work-center",
				name: "add-work-center",
				component: () =>
					import(
						/* webpackChunkName: "add-work-center" */ "../views/work-center/pages/AddWorkCenter.vue"
					)
			},{
				path: "edit-work-center",
				name: "edit-work-center",
				component: () =>
					import(
						/* webpackChunkName: "edit-work-center" */ "../views/work-center/pages/EditWorkCenter.vue"
					)
			},
		]
	},
	/**
	 * 工序维护
	 */
	{
		path: "/operation-maintain",
		name: "operation-maintain",
		component: () =>
			import(/* webpackChunkName: "layout" */ "../views/layout/"),
		children: [
			{
				path: "operation-maintain",
				name: "operation-maintain",
				component: () =>
					import(
						/* webpackChunkName: "operation-maintain" */ "../views/operation-maintain/pages/OperationMaintain.vue"
					)
			},{
				path: "add-operation-maintain",
				name: "add-operation-maintain",
				component: () =>
					import(
						/* webpackChunkName: "add-operation-maintain" */ "../views/operation-maintain/pages/AddOperationMaintain.vue"
					)
			},{
				path: "edit-operation-maintain",
				name: "edit-operation-maintain",
				component: () =>
					import(
						/* webpackChunkName: "edit-operation-maintain" */ "../views/operation-maintain/pages/EditOperationMaintain.vue"
					)
			},
		]
	},
	/**
	 * 工序站位
	 */
	{
		path: "/operation-station",
		name: "operation-station",
		component: () =>
			import(/* webpackChunkName: "layout" */ "../views/layout/"),
		children: [
			{
				path: "operation-station",
				name: "operation-station",
				component: () =>
					import(
						/* webpackChunkName: "operation-station" */ "../views/operation-station/pages/OperationStation.vue"
					)
			},
			{
				path: "add-operation-station",
				name: "add-operation-station",
				component: () =>
					import(
						/* webpackChunkName: "add-operation-station" */ "../views/operation-station/pages/AddOperationStation.vue"
					)
			},{
				path: "edit-operation-station",
				name: "edit-operation-station",
				component: () =>
					import(
						/* webpackChunkName: "edit-operation-station" */ "../views/operation-station/pages/EditOperationStation.vue"
					)
			},
		]
	},
	/**
	 * 编码规则
	 */
	{
		path: "/next-number",
		name: "next-number",
		component: () =>
			import(/* webpackChunkName: "layout" */ "../views/layout/"),
		children: [
			{
				path: "next-number",
				name: "next-number",
				component: () =>
					import(
						/* webpackChunkName: "next-number" */ "../views/next-number/pages/NextNumber.vue"
					)
			},
		]
	},
	
	/**
	 * 物料维护
	 */
	{
		path: "/material",
		name: "material",
		component: () =>
			import(/* webpackChunkName: "layout" */ "../views/layout/"),
		children: [
			{
				path: "material-info",
				name: "material-info",
				component: () =>
					import(
						/* webpackChunkName: "material-info" */ "../views/material/pages/MaterialInfo.vue"
					)
			},{
				path: "add-material",
				name: "add-material",
				component: () =>
					import(
						/* webpackChunkName: "add-material" */ "../views/material/pages/AddMaterial.vue"
					)
			},{
				path: "edit-material",
				name: "edit-material",
				component: () =>
					import(
						/* webpackChunkName: "edit-material" */ "../views/material/pages/EditMaterial.vue"
					)
			}
		]
	},
	/**
	 * 独立数据
	 */
	{
		path: "/dc",
		name: "dc-search",
		component: () =>
			import(/* webpackChunkName: "layout" */ "../views/layout/"),
		children: [
			{
				path: "dc-search",
				name: "dc-search",
				component: () =>
					import(
						/* webpackChunkName: "dc-search" */ "../views/dc/pages/DCSearch.vue"
					)
			},
		]
	},
  /**
   * 设备维护模块
   */
  {
    path: "/device",
    name: "device",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../views/layout/"),
    children: [
      {
        path: "deviceType",
        name: "deviceType",
        component: () =>
          import(
            /* webpackChunkName: "deviceType" */ "../views/device/pages/device-type.vue"
          )
      },
      {
        path: "deviceMaintenance",
        name: "deviceMaintenance",
        component: () =>
          import(
            /* webpackChunkName: "deviceMaintenance" */ "../views/device/pages/device-maintenance.vue"
          )
      },
      {
        path: "deviceUpkeep",
        name: "deviceUpkeep",
        component: () =>
          import(
            /* webpackChunkName: "deviceUpkeep" */ "../views/device/pages/device-upkeep.vue"
          )
      },
      //新增和编辑页面
      {
        path: "deviceTypeEdit",
        name: "deviceTypeEdit",
        component: () =>
          import(
            /* webpackChunkName: "deviceTypeEdit" */ "../views/device/pages/device-type-edit.vue"
          )
      },
      {
        path: "deviceMaintenanceEdit",
        name: "deviceMaintenanceEdit",
        component: () =>
          import(
            /* webpackChunkName: "deviceMaintenanceEdit" */ "../views/device/pages/device-maintenance-edit.vue"
          )
      },
      {
        path: "test",
        name: "test",
        component: () =>
          import(
            /* webpackChunkName: "test" */ "../views/device/pages/test.vue"
          )
      }
    ]
  },
  /**
   *  常用设置
   */
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ "../views/login")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
