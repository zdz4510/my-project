(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["add-work-center"],{"1dde":function(e,t,r){var a=r("d039"),n=r("b622"),o=r("60ae"),l=n("species");e.exports=function(e){return o>=51||!a((function(){var t=[],r=t.constructor={};return r[l]=function(){return{foo:1}},1!==t[e](Boolean).foo}))}},"30f5":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"operate mtb10"},[r("el-button",{staticClass:"mr25 pad1025",attrs:{size:"small",type:"primary"},on:{click:e.goBack}},[e._v("返回")]),r("el-button",{staticClass:"mr25 pad1025",attrs:{size:"small",type:"primary"},on:{click:function(t){return e.save("addForm")}}},[e._v("保存")]),r("el-button",{staticClass:"mr25 pad1025",attrs:{size:"small",type:"warning"},on:{click:function(t){return e.resetForm("addForm")}}},[e._v("重置")])],1),r("div",{staticClass:"addForm"},[r("el-form",{ref:"addForm",staticClass:"add-form",attrs:{inline:!0,model:e.addForm,rules:e.rules,"label-width":e.formLabelWidth}},[r("el-form-item",{attrs:{label:"工作中心:",prop:"workCenter"}},[r("el-input",{model:{value:e.addForm.workCenter,callback:function(t){e.$set(e.addForm,"workCenter",t)},expression:"addForm.workCenter"}})],1),r("el-form-item",{attrs:{label:"描述:",prop:"workCenter"}},[r("el-input",{model:{value:e.addForm.workCenterDes,callback:function(t){e.$set(e.addForm,"workCenterDes",t)},expression:"addForm.workCenterDes"}})],1),r("el-tabs",{attrs:{type:"card"},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[r("el-tab-pane",{attrs:{label:"基础信息",name:"first"}},[r("el-row",[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"状态:",prop:"status",required:""}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.addForm.status,callback:function(t){e.$set(e.addForm,"status",t)},expression:"addForm.status"}},e._l(e.status,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1)],1),r("el-row",[r("el-col",{attrs:{span:24}},[r("el-form-item",{attrs:{label:"类别:",prop:"type",required:""}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择"},model:{value:e.addForm.type,callback:function(t){e.$set(e.addForm,"type",t)},expression:"addForm.type"}},e._l(e.type,(function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1)],1)],1),r("el-tab-pane",{attrs:{label:"工作中心维护",name:"second"}},[r("el-transfer",{attrs:{filterable:"","filter-method":e.filterMethod,titles:["未分配工作中心","已分配工作中心"],data:e.data},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1),r("el-tab-pane",{attrs:{label:"用户",name:"third"}},[r("el-transfer",{attrs:{filterable:"","filter-method":e.filterMethod,titles:["未分配用户","已分配用户"],data:e.data},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)],1),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",[e._v("重 置")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialog=!1}}},[e._v("确 定")])],1)],1)],1)])},n=[],o=r("68ae"),l={name:"add-work-center",data:function(){var e=function(e,t,r){var a=/^\d{1,5}(?:\.\d{1,3})?$/;if(!a.test(t))return r(new Error("小数点前5位后3位数字;正数"));r()};return{formLabelWidth:"120px",activeName:"first",units:[{value:"CELL"},{value:"DIE"},{value:"GLASS"},{value:"PCS"},{value:"WAFER"}],status:[{value:"1",label:"已启用"},{value:"2",label:"未启用"}],type:[{value:"1",label:"车间"},{value:"2",label:"产线"}],rules:{qtyRequired1:[{validator:e,trigger:"blur"}],qtyRequired2:[{validator:e,trigger:"blur"}],qtyRequired3:[{validator:e,trigger:"blur"}]},addForm:{mat:"",matRev:"",currentRev:"",matDes:"",unit1:"",unit2:"",unit3:"",qtyRequired1:"",qtyRequired2:"",qtyRequired3:"",matType:"1",client:"",clientMat:"",vebdor:"",vebdorMat:"",matStatus:"",modified_user_id:"",length:"1",lengthErrorRange:"1",lengthUnit:"1",width:"1",widthErrorRange:"1",widthUnit:"1",thickness:"1",thicknessErrorRange:"1",thicknessUnit:"1",weight:"1",weightErrorRange:"1",weightUnit:"1"},options:[{value:"1",label:"辅料"},{value:"2",label:"原材料"},{value:"3",label:"半成品"},{value:"4",label:"成品"}],lengthUnit:[{value:"1",label:"MM"},{value:"10",label:"CM"}],weightUnit:[{value:"1",label:"g"},{value:"1000",label:"Kg"}]}},methods:{save:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;console.log(t.addForm);var r=t.addForm;Object(o["c"])(r).then((function(e){"success"==e.data.message&&(t.$message({type:"success",message:"保存成功!"}),setTimeout((function(){t.$router.push({path:"/work-center/work-center"})}),1e3))}))}))},resetForm:function(e){this.$refs[e].resetFields()},goBack:function(){this.$router.push({path:"/work-center/work-center"})}}},i=l,s=(r("8fb8"),r("2877")),c=Object(s["a"])(i,a,n,!1,null,"3e8d3164",null);t["default"]=c.exports},"68ae":function(e,t,r){"use strict";r.d(t,"b",(function(){return n})),r.d(t,"c",(function(){return o})),r.d(t,"a",(function(){return l}));r("99af");var a=r("8e44"),n=function(e){return a["a"].post("".concat(window.VUE_APP_URL,"/mes/workCenter/findPage?currentPage=").concat(e.currentPage,"&pageSize=").concat(e.pageSize,"&workCenter=").concat(e.workCenter))},o=function(e){return a["a"].post("".concat(window.VUE_APP_URL,"/mes/workCenter/save?workCenter=").concat(e.workCenter,"&workCenterDes=").concat(e.workCenterDes,"&workCenterRelation=").concat(e.workCenterRelation,"&status=").concat(e.status,"&workCenterType=").concat(e.workCenterType))},l=function(e){return a["a"].post("".concat(window.VUE_APP_URL,"/mes/workCenter/delete"),e)}},8418:function(e,t,r){"use strict";var a=r("c04e"),n=r("9bf2"),o=r("5c6c");e.exports=function(e,t,r){var l=a(t);l in e?n.f(e,l,o(0,r)):e[l]=r}},"8fb8":function(e,t,r){"use strict";var a=r("b77e"),n=r.n(a);n.a},"99af":function(e,t,r){"use strict";var a=r("23e7"),n=r("d039"),o=r("e8b5"),l=r("861d"),i=r("7b0b"),s=r("50c4"),c=r("8418"),u=r("65f0"),d=r("1dde"),f=r("b622"),m=r("60ae"),v=f("isConcatSpreadable"),p=9007199254740991,b="Maximum allowed index exceeded",w=m>=51||!n((function(){var e=[];return e[v]=!1,e.concat()[0]!==e})),k=d("concat"),h=function(e){if(!l(e))return!1;var t=e[v];return void 0!==t?!!t:o(e)},g=!w||!k;a({target:"Array",proto:!0,forced:g},{concat:function(e){var t,r,a,n,o,l=i(this),d=u(l,0),f=0;for(t=-1,a=arguments.length;t<a;t++)if(o=-1===t?l:arguments[t],h(o)){if(n=s(o.length),f+n>p)throw TypeError(b);for(r=0;r<n;r++,f++)r in o&&c(d,f,o[r])}else{if(f>=p)throw TypeError(b);c(d,f++,o)}return d.length=f,d}})},b77e:function(e,t,r){}}]);
//# sourceMappingURL=add-work-center.52cd990a.js.map