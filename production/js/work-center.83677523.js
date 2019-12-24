(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["work-center"],{"0fb8":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"search-bar"},[a("el-form",{ref:"searchForm",staticClass:"form-style",attrs:{inline:!0,model:e.searchForm,rules:e.rules},nativeOn:{submit:function(e){e.preventDefault()}}},[a("el-form-item",{attrs:{label:"工作中心:",prop:"workCenter"}},[a("el-input",{attrs:{placeholder:"请输入内容"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onEnterSearch(t)}},model:{value:e.searchForm.workCenter,callback:function(t){e.$set(e.searchForm,"workCenter",t)},expression:"searchForm.workCenter"}})],1)],1)],1),a("div",{staticClass:"operate ml30 mtb10"},[a("el-button",{staticClass:"mr25 pad1025",attrs:{size:"small",type:"success"},on:{click:e.search}},[e._v("查询")]),a("el-button",{staticClass:"mr25 pad1025",attrs:{size:"small",type:"primary",disabled:this.checkedList.length>0},on:{click:function(t){e.dialog=!0}}},[e._v("新增")]),a("el-button",{staticClass:"mr25 pad1025",attrs:{size:"small",type:"warning",disabled:1!=this.checkedList.length},on:{click:function(t){e.dialog=!0}}},[e._v("编辑")]),a("el-button",{staticClass:"mr25 pad1025",attrs:{size:"small",type:"danger",disabled:0===this.checkedList.length},on:{click:e.del}},[e._v("删除")])],1),a("div",{},[a("el-table",{ref:"multipleTable",attrs:{data:this.tableData.data,"tooltip-effect":"dark","row-key":"workCenter"},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55","reserve-selection":!0}}),a("el-table-column",{attrs:{type:"index",label:"序号"}}),a("el-table-column",{attrs:{prop:"workCenter",label:"工作中心"}}),a("el-table-column",{attrs:{prop:"workCenterDes",label:"工作中心描述"}}),a("el-table-column",{attrs:{label:"类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1==t.row.workCenterType?"车间":"产线"))]}}])}),a("el-table-column",{attrs:{label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1==t.row.status?"已启用":2==t.row.status?"未启用":"--"))]}}])})],1),a("el-pagination",{staticClass:"mtb20",attrs:{background:"","current-page":this.tableData.page.currentPage,"page-sizes":[1,10,15,20,30,50],"page-size":this.tableData.page.pageSize,layout:"->, total, prev, pager, next, sizes, jumper",total:this.tableData.page.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),a("el-dialog",{attrs:{title:"新增",visible:e.dialog},on:{"update:visible":function(t){e.dialog=t}}},[a("el-form",{ref:"addForm",staticClass:"add-form",attrs:{inline:!0,model:e.addForm,rules:e.rules,"label-width":e.formLabelWidth}},[a("el-form-item",{attrs:{label:"工作中心:",prop:"workCenter"}},[a("el-input",{model:{value:e.addForm.workCenter,callback:function(t){e.$set(e.addForm,"workCenter",t)},expression:"addForm.workCenter"}})],1),a("el-form-item",{attrs:{label:"描述:",prop:"workCenter"}},[a("el-input",{model:{value:e.addForm.workCenterDes,callback:function(t){e.$set(e.addForm,"workCenterDes",t)},expression:"addForm.workCenterDes"}})],1),a("el-tabs",{attrs:{type:"card"},on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"基础信息",name:"first"}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"状态:",prop:"status",required:""}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.addForm.status,callback:function(t){e.$set(e.addForm,"status",t)},expression:"addForm.status"}},e._l(e.status,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"类别:",prop:"type",required:""}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.addForm.type,callback:function(t){e.$set(e.addForm,"type",t)},expression:"addForm.type"}},e._l(e.type,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1)],1)],1),a("el-tab-pane",{attrs:{label:"工作中心维护",name:"second"}},[a("el-transfer",{attrs:{filterable:"","filter-method":e.filterMethod,titles:["未分配工作中心","已分配工作中心"],data:e.data},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),a("el-tab-pane",{attrs:{label:"用户",name:"third"}},[a("el-transfer",{attrs:{filterable:"","filter-method":e.filterMethod,titles:["未分配用户","已分配用户"],data:e.data},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",[e._v("重 置")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialog=!1}}},[e._v("确 定")])],1)],1)],1)],1)},n=[],l=(a("c975"),a("841c"),a("99af"),a("8e44")),o=function(e){return l["a"].post("".concat(window.VUE_APP_URL,"/mes/workCenter/findPage?currentPage=").concat(e.currentPage,"&deleteFlag=").concat(e.deleteFlag,"&pageSize=").concat(e.pageSize,"&workCenter=").concat(e.workCenter))},s=function(e){return l["a"].delete("".concat(window.VUE_APP_URL,"/mes/workCenter/delete"),{params:e})},i={name:"work-center",data:function(){var e=function(){var e=[],t=["上海","北京","广州","深圳","南京","西安","成都"],a=["上海","北京","广州","深圳","南京","西安","成都"];return t.forEach((function(t,r){e.push({label:t,key:r,pinyin:a[r]})})),e};return{checkedList:[],formLabelWidth:"120px",dialog:!1,data:e(),value:[],filterMethod:function(e,t){return t.pinyin.indexOf(e)>-1},activeName:"first",searchForm:{workCenter:"",tenantSiteCode:"",deleteFlag:!1},addForm:{workCenter:"",workCenterDes:""},workCenterForm:{code:"",status:""},rules:{},tableData:{data:[],page:{currentPage:1,pageSize:10,total:0}},status:[{value:"1",label:"已启用"},{value:"2",label:"未启用"}],type:[{value:"1",label:"车间"},{value:"2",label:"产线"}]}},created:function(){this.search()},methods:{onEnterSearch:function(){return!1},search:function(){var e=this,t={deleteFlag:!1,tenantSiteCode:this.searchForm.tenantSiteCode,workCenter:this.searchForm.workCenter,pageSize:this.tableData.page.pageSize,currentPage:this.tableData.page.currentPage};o(t).then((function(t){e.tableData.data=t.data.data.data,e.tableData.page.total=t.data.data.total}))},handleSizeChange:function(e){console.log(e),this.tableData.page.pageSize=e,this.search()},handleCurrentChange:function(e){this.tableData.page.currentPage=e,this.search()},handleSelectionChange:function(e){this.checkedList=e,console.log(e)},del:function(){var e=this;this.$confirm("是否删除所选数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var t={};s(t).then((function(t){console.log(t,"adddata"),e.$message({type:"success",message:"删除成功!"})}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},submitForm:function(e){this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;console.log("submit!")}))},resetForm:function(e){this.$refs[e].resetFields()}}},c=i,u=(a("d57d"),a("2877")),d=Object(u["a"])(c,r,n,!1,null,"7c5add5c",null);t["default"]=d.exports},"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},"1dde":function(e,t,a){var r=a("d039"),n=a("b622"),l=a("60ae"),o=n("species");e.exports=function(e){return l>=51||!r((function(){var t=[],a=t.constructor={};return a[o]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},8418:function(e,t,a){"use strict";var r=a("c04e"),n=a("9bf2"),l=a("5c6c");e.exports=function(e,t,a){var o=r(t);o in e?n.f(e,o,l(0,a)):e[o]=a}},"841c":function(e,t,a){"use strict";var r=a("d784"),n=a("825a"),l=a("1d80"),o=a("129f"),s=a("14c3");r("search",1,(function(e,t,a){return[function(t){var a=l(this),r=void 0==t?void 0:t[e];return void 0!==r?r.call(t,a):new RegExp(t)[e](String(a))},function(e){var r=a(t,e,this);if(r.done)return r.value;var l=n(e),i=String(this),c=l.lastIndex;o(c,0)||(l.lastIndex=0);var u=s(l,i);return o(l.lastIndex,c)||(l.lastIndex=c),null===u?-1:u.index}]}))},"99af":function(e,t,a){"use strict";var r=a("23e7"),n=a("d039"),l=a("e8b5"),o=a("861d"),s=a("7b0b"),i=a("50c4"),c=a("8418"),u=a("65f0"),d=a("1dde"),f=a("b622"),p=a("60ae"),m=f("isConcatSpreadable"),h=9007199254740991,b="Maximum allowed index exceeded",v=p>=51||!n((function(){var e=[];return e[m]=!1,e.concat()[0]!==e})),g=d("concat"),k=function(e){if(!o(e))return!1;var t=e[m];return void 0!==t?!!t:l(e)},w=!v||!g;r({target:"Array",proto:!0,forced:w},{concat:function(e){var t,a,r,n,l,o=s(this),d=u(o,0),f=0;for(t=-1,r=arguments.length;t<r;t++)if(l=-1===t?o:arguments[t],k(l)){if(n=i(l.length),f+n>h)throw TypeError(b);for(a=0;a<n;a++,f++)a in l&&c(d,f,l[a])}else{if(f>=h)throw TypeError(b);c(d,f++,l)}return d.length=f,d}})},a79f:function(e,t,a){},c975:function(e,t,a){"use strict";var r=a("23e7"),n=a("4d64").indexOf,l=a("b301"),o=[].indexOf,s=!!o&&1/[1].indexOf(1,-0)<0,i=l("indexOf");r({target:"Array",proto:!0,forced:s||i},{indexOf:function(e){return s?o.apply(this,arguments)||0:n(this,e,arguments.length>1?arguments[1]:void 0)}})},d57d:function(e,t,a){"use strict";var r=a("a79f"),n=a.n(r);n.a}}]);
//# sourceMappingURL=work-center.83677523.js.map