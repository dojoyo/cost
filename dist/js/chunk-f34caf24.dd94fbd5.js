(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f34caf24"],{"3d8b":function(t,e,i){"use strict";i("d5cc")},"75bf":function(t,e,i){},d5cc:function(t,e,i){},d7bc:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{visible:t.dialogVisible,width:"800px","append-to-body":!0,"show-close":!1,top:"50px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[i("i",{staticClass:"iconfont icon-shenpi_normal"}),t._v(" 合同信息\n    ")]),i("div",{staticClass:"options",staticStyle:{display:"flex","align-items":"center"}},[i("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.preview()}}},[t._v("在线预览")]),i("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.generate()}}},[t._v("在线生成")]),i("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(e){return t.hideDialog()}}})],1),i("div",{staticClass:"clear"})]),i("div",{staticClass:"main-wrap"},[i("el-scrollbar",{style:{height:t.height}},[i("el-form",{ref:"detail",attrs:{model:t.detail,"label-width":"120px"}},[i("div",{staticClass:"wrap"},[i("div",{staticClass:"form-content"},[i("div",{staticClass:"tips-title"},[t._v("\n              甲方信息\n            ")]),i("el-form-item",{attrs:{label:"甲方签署主体公司全称",prop:"partyAName",rules:{required:!0,message:"请输入甲方签署主体公司全称"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.detail.partyAName,callback:function(e){t.$set(t.detail,"partyAName",e)},expression:"detail.partyAName"}})],1),i("el-form-item",{attrs:{label:"甲方公司注册地址",prop:"partyACompanyAddress",rules:{required:!0,message:"请输入甲方公司注册地址"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.detail.partyACompanyAddress,callback:function(e){t.$set(t.detail,"partyACompanyAddress",e)},expression:"detail.partyACompanyAddress"}})],1)],1)]),i("div",{staticClass:"wrap"},[i("div",{staticClass:"form-content"},[i("div",{staticClass:"tips-title"},[t._v("\n              乙方信息\n            ")]),i("div",{staticStyle:{float:"left",width:"49%"}},[i("el-form-item",{attrs:{label:"乙方签署主体公司全称",prop:"partyBName",rules:{required:!0,message:"请输入乙方签署主体公司全称"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.detail.partyBName,callback:function(e){t.$set(t.detail,"partyBName",e)},expression:"detail.partyBName"}})],1)],1),i("div",{staticStyle:{float:"left",width:"49%","margin-left":"2%"}},[i("el-form-item",{attrs:{label:"乙方签署主体公司简称",prop:"partyBShortName",rules:{required:!0,message:"请输入乙方签署主体公司简称"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.detail.partyBShortName,callback:function(e){t.$set(t.detail,"partyBShortName",e)},expression:"detail.partyBShortName"}})],1)],1),i("div",{staticClass:"clear"}),i("el-form-item",{attrs:{label:"乙方公司注册地址",prop:"partyBCompanyAddress",rules:{required:!0,message:"请输入乙方公司注册地址"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.detail.partyBCompanyAddress,callback:function(e){t.$set(t.detail,"partyBCompanyAddress",e)},expression:"detail.partyBCompanyAddress"}})],1)],1)]),i("div",{staticClass:"wrap"},[i("div",{staticClass:"form-content"},[i("div",{staticClass:"tips-title"},[t._v("\n              其他信息\n            ")]),i("el-form-item",{attrs:{label:"签署方式"}},t._l(t.enumType.ContractSignType,(function(e,a){return i("el-radio",{key:a,attrs:{label:e.value,disabled:""},model:{value:t.detail.signType,callback:function(e){t.$set(t.detail,"signType",e)},expression:"detail.signType"}},[t._v(t._s(e.name))])})),1),i("el-form-item",{attrs:{label:"项目名称",prop:"projectName",rules:{required:!0,message:"请输入项目名称"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.detail.projectName,callback:function(e){t.$set(t.detail,"projectName",e)},expression:"detail.projectName"}})],1)],1)])])],1)],1),i("el-dialog",{attrs:{visible:t.viewDialogVisible,width:"800px","append-to-body":!0,"show-close":!1,top:"50px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.viewDialogVisible=e}}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[i("i",{staticClass:"iconfont icon-shenpi_normal"}),t._v(" 合同信息\n      ")]),i("div",{staticClass:"options",staticStyle:{display:"flex","align-items":"center"}},[i("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(e){return t.generate()}}},[t._v("生成附件")]),i("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(e){t.viewDialogVisible=!1}}})],1),i("div",{staticClass:"clear"})]),i("iframe",{attrs:{id:"pdfPlayer",src:t.pdf,frameborder:"0",width:"100%",height:t.height}})])],1)},s=[],l=i("b62b"),n={name:"",components:{},props:{code:{type:String,default:function(){return"IE02_2"}},sign:String},data:function(){return{enumType:{},dialogVisible:!1,detail:{},height:"",promoter:[],curView:"",viewDialogVisible:!1,pdf:""}},mounted:function(){this.height=document.body.clientHeight-200+"px",this.getEnum("ContractSignType")},methods:{getEnum:function(t,e){var i=this;l["a"].getEnum(t).then((function(a){200===a.code&&(e&&a.data.unshift({name:"全部",value:""}),i.$set(i.enumType,t,a.data))})).catch((function(t){console.log(t)}))},show:function(t){console.log(t),this.curView=t,this.detail.signType=this.sign,this.dialogVisible=!0},hideDialog:function(){this.dialogVisible=!1},preview:function(){var t=this;this.$refs["detail"].validate((function(e){if(e){var i={contractTemplateCode:t.code,data:t.detail};l["a"].getTemplatePreview(i).then((function(e){var i=e.headers,a=(i["x-file-name"],new Blob([e.data],{type:i["content-type"]})),s=".";t.pdf=s+"/pdfjs/web/viewer.html?file="+window.URL.createObjectURL(a),t.viewDialogVisible=!0})).catch((function(t){console.log(t)}))}}))},generate:function(){var t=this;this.$refs["detail"].validate((function(e){if(e){var i={contractTemplateCode:t.code,data:t.detail};l["a"].generateTemplate(i).then((function(e){e&&200===e.code&&(t.$message.success({message:"操作成功！",duration:1500}),t.$emit("SET_CONTRACT",e.data),t.hideDialog())})).catch((function(t){console.log(t)}))}}))}}},o=n,r=(i("3d8b"),i("e2cd"),i("4ac2")),c=Object(r["a"])(o,a,s,!1,null,"5012abcb",null);e["default"]=c.exports},e2cd:function(t,e,i){"use strict";i("75bf")}}]);