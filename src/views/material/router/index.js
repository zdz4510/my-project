/**
 * 产品配置
 */
export default {
    path: "/material",
    name: "material",
    component: () =>
        import ( /* webpackChunkName: "layout" */ "@/views/layout/"),
    children: [{
            path: "materialInfo",
            name: "materialInfo",
            meta: {
                title: "物料维护"
            },
            component: () =>
                import (
                    /* webpackChunkName: "material-info" */
                    "@/views/material/pages/MaterialInfo.vue"
                )
        },
        {
            path: "addMaterial",
            name: "addMaterial",
            meta: {
                title: "物料维护添加"
            },
            component: () =>
                import (
                    /* webpackChunkName: "addMaterial" */
                    "@/views/material/pages/AddMaterial.vue"
                )
        },
        {
            path: "editMaterial",
            name: "editMaterial",
            meta: {
                title: "物料维护编辑"
            },
            component: () =>
                import (
                    /* webpackChunkName: "editMaterial" */
                    "@/views/material/pages/EditMaterial.vue"
                )
        },

        //工单维护
        {
            path: "workOrder",
            name: "workOrder",
            component: () =>
                import (
                    /* webpackChunkName: "work-order" */
                    "@/views/work-order/pages/work-order.vue"
                )
        },
        //工单下达
        {
            path: "issued",
            name: "issued",
            component: () =>
                import (
                    /* webpackChunkName: "issued" */
                    "@/views/issued/pages/issued.vue"
                )
        },
        //物料组维护
        {
            path: "materialGroup",
            name: "materialGroup",
            component: () =>
                import (
                    /* webpackChunkName: "materialGroup" */
                    "@/views/material/pages/material-group.vue"
                )
        },
        //物料组维护编辑
        {
            path: "materialGroupEdit",
            name: "materialGroupEdit",
            component: () =>
                import (
                    /* webpackChunkName: "materialGroupEdit" */
                    "@/views/material/pages/material-group-edit.vue"
                )
        },
        {
            path: "routeMaintenance",
            name: "routeMaintenance",
            component: () =>
                import (
                    /* webpackChunkName: "routeMaintenance" */
                    "@/views/material/pages/route-maintenance"
                )
        },
        //生产操作界面配置
        {
            path: "proConfiguration",
            name: "proConfiguration",
            meta: {
                title: "生产操作界面配置"
            },
            component: () =>
                import (
                    /* webpackChunkName: "pro-configuration" */
                    "@/views/material/pages/pro-configuration"
                )
        },
        //新增普通按钮(生产操作界面配置)
        {
            path: "addProConfig",
            name: "addProConfig",
            meta: {
                title: "新增普通按钮(生产操作界面配置)"
            },
            component: () =>
                import (
                    /* webpackChunkName: "add-pro-config" */
                    "@/views/material/pages/add-pro-config"
                )
        },
        //新增按钮组(生产操作界面配置)
        {
            path: "addGroupProCon",
            name: "addGroupProCon",
            meta: {
                title: "新增按钮组(生产操作界面配置)"
            },
            component: () =>
                import (
                    /* webpackChunkName: "add-group-pro-con" */
                    "@/views/material/pages/add-group-pro-con"
                )
        }
    ]
};