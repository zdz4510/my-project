(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["layout"],{"162e":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"layout"}},[a("DsnHeader"),a("DsnLeftMenu",{on:{handleCollapse:e.handleCollapse}}),a("div",{staticClass:"content",class:e.isCollapse?"active":""},[a("div",{staticClass:"routerHistory"}),a("div",{staticClass:"pageContent"},[a("router-view")],1)]),e._e()],1)},n=[],s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"footer"}},[e._v(" this is footer ")])},i=[],o=(a("18fa"),a("2877")),r={},c=Object(o["a"])(r,s,i,!1,null,null,null),u=c.exports,d=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},f=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"header"}},[a("h1",[e._v("DISSONA MES管理系统")])])}],p=(a("3494"),{}),m=Object(o["a"])(p,d,f,!1,null,null,null),h=m.exports,v=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:e.isCollapse?"active":"",attrs:{id:"leftMenu"}},[a("div",{staticClass:"header"},[a("el-input",{directives:[{name:"show",rawName:"v-show",value:e.isCollapse,expression:"isCollapse"}],attrs:{"prefix-icon":"el-icon-search",placeholder:"请输入内容"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),a("i",{staticClass:"el-icon-s-fold",on:{click:e.handleMenuCollapse}})],1),a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"collapse-transition":!1,router:!0,"background-color":"rgb(39, 106, 179)","active-text-color":"rgb(255, 208, 75)","text-color":"#fff","default-active":"1-4-1",collapse:!e.isCollapse},on:{open:e.handleOpen,close:e.handleClose}},[a("el-submenu",{attrs:{index:"material"}},[a("template",{slot:"title"},[a("i",{staticClass:"el-icon-location"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("操作")])]),a("el-menu-item",{attrs:{index:"/material/material-info"}},[e._v("物料维护")]),a("el-menu-item",{attrs:{index:"/material/operation-maintain"}},[e._v("工序维护")]),a("el-menu-item",{attrs:{index:"/material/operation-station"}},[e._v("工序与站位关系维护")]),a("el-menu-item",{attrs:{index:"/material/work-center"}},[e._v("工作中心")]),a("el-menu-item",{attrs:{index:"/material/next-number"}},[e._v("编码规则")])],2)],1)],1)},C=[],_={data:function(){return{isCollapse:!0,search:""}},methods:{handleOpen:function(e,t){console.log(e,t),this.$emit("handleCollapse",this.isCollapse)},handleClose:function(e,t){console.log(e,t)},handleMenuCollapse:function(){this.isCollapse=!this.isCollapse,this.$emit("handleCollapse",this.isCollapse)}}},x=_,b=(a("3d50"),Object(o["a"])(x,v,C,!1,null,null,null)),w=b.exports,O={name:"Layout",components:{DsnFooter:u,DsnHeader:h,DsnLeftMenu:w},data:function(){return{isCollapse:!0}},methods:{handleCollapse:function(e){this.isCollapse=1==e}}},$=O,g=(a("f206"),Object(o["a"])($,l,n,!1,null,"0cdb8110",null));t["default"]=g.exports},"18fa":function(e,t,a){"use strict";var l=a("3a0f"),n=a.n(l);n.a},3494:function(e,t,a){"use strict";var l=a("5ca8"),n=a.n(l);n.a},"3a0f":function(e,t,a){},"3d50":function(e,t,a){"use strict";var l=a("4b97"),n=a.n(l);n.a},"4b97":function(e,t,a){},"5ca8":function(e,t,a){},c971:function(e,t,a){},f206:function(e,t,a){"use strict";var l=a("c971"),n=a.n(l);n.a}}]);
//# sourceMappingURL=layout.cd6b8126.js.map