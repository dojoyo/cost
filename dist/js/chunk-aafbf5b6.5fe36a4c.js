(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-aafbf5b6"],{2304:function(t,e,i){"use strict";i("98a4")},"28f0":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{visible:t.dialogVisible,width:"800px","append-to-body":!0,"show-close":!1,top:"50px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[i("i",{staticClass:"iconfont icon-shenpi_normal"}),t._v(" 合同信息\n      ")]),i("div",{staticClass:"options",staticStyle:{display:"flex","align-items":"center"}},[i("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.preview()}}},[t._v("在线预览")]),i("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(e){return t.hideDialog()}}})],1),i("div",{staticClass:"clear"})]),i("div",{staticClass:"main-wrap"},[i("el-scrollbar",{style:{height:t.height}},[i("el-form",{ref:"detail",attrs:{model:t.detail,"label-width":"120px"}},[i("div",{staticClass:"wrap"},[i("div",{staticClass:"form-content"},[i("div",{staticClass:"tips-title"},[t._v("\n                其他信息\n              ")]),i("el-form-item",{attrs:{label:"项目名称",prop:"projectName",rules:{required:!0,message:"请输入项目名称"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.detail.projectName,callback:function(e){t.$set(t.detail,"projectName",e)},expression:"detail.projectName"}})],1),i("el-form-item",{attrs:{label:"项目简称",prop:"projectShortName",rules:{required:!0,message:"请输入项目简称"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.detail.projectShortName,callback:function(e){t.$set(t.detail,"projectShortName",e)},expression:"detail.projectShortName"}})],1)],1)])])],1)],1),i("el-dialog",{attrs:{visible:t.viewDialogVisible,width:"800px","append-to-body":!0,"show-close":!1,top:"50px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.viewDialogVisible=e}}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[i("i",{staticClass:"iconfont icon-shenpi_normal"}),t._v(" 合同信息\n        ")]),i("div",{staticClass:"options",staticStyle:{display:"flex","align-items":"center"}},[i("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.generate()}}},[t._v("生成附件")]),i("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(e){t.viewDialogVisible=!1}}})],1),i("div",{staticClass:"clear"})]),i("iframe",{attrs:{id:"pdfPlayer",src:t.pdf,frameborder:"0",width:"100%",height:t.height}})])],1)},s=[],o=i("b62b"),l={name:"",components:{},props:{code:{type:String,default:function(){return"PI05_1"}},sign:String},data:function(){return{enumType:{},dialogVisible:!1,detail:{},height:"",promoter:[],curView:"",viewDialogVisible:!1,pdf:""}},mounted:function(){this.height=document.body.clientHeight-200+"px",this.getEnum("ContractSignType")},methods:{getEnum:function(t,e){var i=this;o["a"].getEnum(t).then((function(a){200===a.code&&(e&&a.data.unshift({name:"全部",value:""}),i.$set(i.enumType,t,a.data))})).catch((function(t){console.log(t)}))},show:function(t){console.log(t),this.curView=t,this.dialogVisible=!0},hideDialog:function(){this.dialogVisible=!1,this.viewDialogVisible=!1},preview:function(){var t=this;this.$refs["detail"].validate((function(e){if(e){var i={contractTemplateCode:t.code,data:t.detail};o["a"].getTemplatePreview(i).then((function(e){var i=e.headers,a=(i["x-file-name"],new Blob([e.data],{type:i["content-type"]})),s=".";t.pdf=s+"/pdfjs/web/viewer.html?file="+window.URL.createObjectURL(a),t.viewDialogVisible=!0})).catch((function(t){console.log(t)}))}}))},generate:function(){var t=this;this.$refs["detail"].validate((function(e){if(e){var i={contractTemplateCode:t.code,data:t.detail};o["a"].generateTemplate(i).then((function(e){e&&200===e.code&&(t.$message.success({message:"操作成功！",duration:1500}),t.$emit("SET_CONTRACT",e.data),t.hideDialog())})).catch((function(t){console.log(t)}))}}))}}},n=l,c=(i("2304"),i("a6a3"),i("4ac2")),r=Object(c["a"])(n,a,s,!1,null,"313946de",null);e["default"]=r.exports},"3cdc":function(t,e,i){},"98a4":function(t,e,i){},a6a3:function(t,e,i){"use strict";i("3cdc")}}]);