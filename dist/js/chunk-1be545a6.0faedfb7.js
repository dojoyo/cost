(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1be545a6","chunk-0ef90e38","chunk-2d0e4a8c"],{"2cfc":function(e,t,a){"use strict";a("a932")},3087:function(e,t,a){"use strict";a("bca3")},3741:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.dialogVisible,width:"850px","append-to-body":!0,"show-close":!1,top:"50px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[a("div",{staticClass:"title"},[a("i",{staticClass:"iconfont icon-xiangmuguanli"}),e._v("  "+e._s(e.detail.bizForm&&e.detail.bizForm.itemName||"签订框架协议")+"\n    ")]),a("div",{staticClass:"options",staticStyle:{display:"flex","align-items":"center"}},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.approveDetail.approvalId,expression:"!approveDetail.approvalId"}],attrs:{type:"default",size:"small"},on:{click:function(t){return e.submit("TS")}}},[e._v("暂存")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.approveDetail.approvalId,expression:"!approveDetail.approvalId"}],staticStyle:{"margin-right":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(t){return e.submit("CA")}}},[e._v("提交")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.approveDetail.approvalId,expression:"approveDetail.approvalId"}],staticStyle:{"margin-right":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(t){e.submit(e.approveDetail.approvalState&&"DR"===e.approveDetail.approvalState.value?"CA":"RA")}}},[e._v("确认")]),a("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(t){return e.hideDialog()}}})],1),a("div",{staticClass:"clear"})]),e.detail.bizForm?a("div",{staticClass:"main-wrap"},[a("el-scrollbar",{style:{height:e.height}},[a("el-form",{ref:"detail",attrs:{model:e.detail,"label-width":"140px"}},[a("div",{staticClass:"wrap"},[a("div",{staticClass:"center-title",staticStyle:{display:"flex","align-items":"center",padding:"0 15px 15px"}},[a("div",{staticStyle:{"word-break":"keep-all"}},[e._v("标题：")]),a("el-input",{attrs:{placeholder:""},model:{value:e.detail.approvalTitle,callback:function(t){e.$set(e.detail,"approvalTitle",t)},expression:"detail.approvalTitle"}})],1),a("el-row",{staticClass:"msg-table",staticStyle:{"padding-top":"15px"}},[a("el-col",{staticClass:"label",attrs:{span:4}},[e._v("项目名称：")]),a("el-col",{staticClass:"content",attrs:{span:6}},[e._v("  "+e._s(e.detail.bizForm.projectName))]),a("el-col",{staticClass:"label",attrs:{span:6}},[e._v("项目类型：")]),a("el-col",{staticClass:"content",attrs:{span:8}},[e._v(" "+e._s(e.detail.bizForm.projectType&&e.detail.bizForm.projectType.name))])],1)],1),"MA"===e.type?a("div",{staticClass:"wrap"},[a("div",{staticClass:"tips-title"},[e._v("协议重要条款")]),a("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[a("el-form-item",{attrs:{label:"收购范围",prop:"bizForm.termMa.buyScope",rules:{required:!0,message:"请输入收购范围"}}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.termMa.buyScope,callback:function(t){e.$set(e.detail.bizForm.termMa,"buyScope",t)},expression:"detail.bizForm.termMa.buyScope"}})],1),a("el-form-item",{attrs:{label:"股权转让款的支付",prop:"bizForm.termMa.etPayment",rules:{required:!0,message:"请输入股权转让款的支付"}}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.termMa.etPayment,callback:function(t){e.$set(e.detail.bizForm.termMa,"etPayment",t)},expression:"detail.bizForm.termMa.etPayment"}})],1),a("el-form-item",{attrs:{label:"对赌安排",prop:"bizForm.termMa.gbArrangement",rules:{required:!0,message:"请输入对赌安排"}}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.termMa.gbArrangement,callback:function(t){e.$set(e.detail.bizForm.termMa,"gbArrangement",t)},expression:"detail.bizForm.termMa.gbArrangement"}})],1),a("el-form-item",{attrs:{label:"剩余股权安排",prop:"bizForm.termMa.reArrangement",rules:{required:!0,message:"请输入剩余股权安排"}}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.termMa.reArrangement,callback:function(t){e.$set(e.detail.bizForm.termMa,"reArrangement",t)},expression:"detail.bizForm.termMa.reArrangement"}})],1),a("el-form-item",{attrs:{label:"公司治理",prop:"bizForm.termMa.corGovern",rules:{required:!0,message:"请输入公司治理"}}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.termMa.corGovern,callback:function(t){e.$set(e.detail.bizForm.termMa,"corGovern",t)},expression:"detail.bizForm.termMa.corGovern"}})],1),a("el-form-item",{attrs:{label:"其他",prop:"bizForm.termMa.other"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.termMa.other,callback:function(t){e.$set(e.detail.bizForm.termMa,"other",t)},expression:"detail.bizForm.termMa.other"}})],1)],1)]):e._e(),a("div",{staticClass:"wrap"},[a("remark",{attrs:{data:e.detail.bizForm}})],1),a("div",{staticClass:"wrap"},[a("files",{attrs:{files:e.detail.bizForm.attaches},on:{UPLOAD_FILE:function(t){e.detail.bizForm.attaches=t}}}),a("div",{staticClass:"file-example-wrap"},[a("div",{staticClass:"title"},[e._v("参考模版")]),a("file-upload",{attrs:{edit:!1,files:e.formTemplates}})],1)],1),a("div",{staticClass:"wrap"},[a("approve",{attrs:{data:e.detail},on:{SET_NODE_USERS:function(t){e.detail.approvalNodes=t},SET_CC_USERS:function(t){e.detail.ccUsers=t}}})],1)])],1)],1):e._e(),e.showInnerDialog?a("recall-dialog",{attrs:{visible:e.showInnerDialog},on:{"update:visible":function(t){e.showInnerDialog=t},confirm:function(t){return e.submit("RA",t)}}}):e._e()],1)},o=[],r=a("b62b"),l=a("90ba"),s=a("7218"),n=a("69af"),p=a("ff5a"),c=a("0a92"),d=a("ed08"),m={name:"",components:{RecallDialog:l["default"],fileUpload:s["a"],remark:n["default"],files:p["default"],approve:c["default"]},props:{id:{type:String,default:function(){return""}},templateCode:{type:String,default:function(){return"DD01"}}},data:function(){return{enumType:{},itemId:"",dialogVisible:!1,detail:{},height:"",formTemplates:[],approveDetail:{},showInnerDialog:!1}},mounted:function(){this.height=document.body.clientHeight-200+"px",this.getEnum("InvestWay"),this.getEnum("ProjectFundSource"),this.getEnum("InvestCcy"),this.getEnum("ProjectFundSource")},methods:{getEnum:function(e,t){var a=this;r["a"].getEnum(e).then((function(i){200===i.code&&(t&&i.data.unshift({name:"全部",value:""}),a.$set(a.enumType,e,i.data))})).catch((function(e){console.log(e)}))},show:function(e){e.itemId?(this.itemId=e.itemId,e.completeStatus&&"DR"===e.completeStatus.value?this.initParamsByDraft(e):this.initParams(e)):(this.approveDetail=e,this.initParamsByBiz(e.bizForm.bizId))},initParams:function(e){var t=this;this.itemId=e.itemId;var a={itemId:e.itemId,projectId:this.id,templateCode:e.templateCode};r["a"].initProjectSignProtocol(a).then((function(e){if(200===e.code){var a=[];e.data.approvalNodes.map((function(e){e.nodeType&&"CN"!==e.nodeType.value&&a.push({userName:e.approvalUser&&e.approvalUser.userName||e.nodeName,nodeRefId:e.approvalUser&&e.approvalUser.userId,nodeId:e.nodeInstanceId,nodeType:e.nodeType&&e.nodeType.value,userId:e.nodeRefId||e.id,userTag:e.nodeName,nodeName:e.nodeName})})),e.data.approvalNodes=a,e.data.urgencyLvl=e.data.urgencyLvl.value,t.type=e.data.bizForm.projectInvestType.value,"MA"===t.type&&(e.data.bizForm.termMa=e.data.bizForm.termMa||{}),e.data.bizForm.baseInfo={},t.detail=e.data,t.dialogVisible=!0,t.getFormTemplates()}})).catch((function(e){console.log(e)}))},initParamsByDraft:function(e){var t=this;r["a"].initProjectSignProDraft(e.itemId).then((function(e){200===e.code&&t.formatData(e)})).catch((function(e){console.log(e)}))},initParamsByBiz:function(e){var t=this;r["a"].initProjectSignProBiz(e).then((function(e){if(200===e.code){var a={data:{approvalTitle:t.approveDetail.approvalTitle,approvalId:t.approveDetail.approvalId,approvalNodes:t.approveDetail.approvalNodes,ccUsers:t.approveDetail.ccUsers,templateCode:t.approveDetail.templateCode,urgencyLvl:t.approveDetail.urgencyLvl,approvalType:t.approveDetail.approvalType,bizForm:e.data}};t.formatData(a)}})).catch((function(e){console.log(e)}))},formatData:function(e){var t=[];e.data.approvalNodes.map((function(e){e.nodeType&&"CN"!==e.nodeType.value&&t.push({userName:e.approvalUser&&e.approvalUser.userName||e.nodeName,nodeRefId:e.approvalUser&&e.approvalUser.userId,nodeId:e.nodeInstanceId,nodeType:e.nodeType&&e.nodeType.value,userId:e.nodeRefId||e.id,userTag:e.nodeName,nodeName:e.nodeName})})),e.data.approvalNodes=t,e.data.urgencyLvl=e.data.urgencyLvl.value,this.type=e.data.bizForm.projectInvestType.value,this.detail=e.data,this.dialogVisible=!0},hideDialog:function(){this.$refs["detail"].clearValidate(),this.dialogVisible=!1},setApprovalNodes:function(e){for(var t in e)e[t].nodeRefId=e[t].nodeRefId||e[t].id||e[t].userId,e[t].nodeType=e[t].nodeType||"UN",e[t].userId=e[t].nodeRefId||e[t].id,e[t].userTag=e[t].userTag||"审批人",e[t].nodeName=e[t].userTag||"审批人";this.detail.approvalNodes=e},getFormTemplates:function(){var e=this,t={projectType:this.detail.bizForm.projectInvestType.value,templateCode:this.templateCode};r["a"].getFormTemplates(t).then((function(t){200===t.code&&(e.formTemplates=t.data)})).catch((function(e){console.log(e)}))},submit:function(e,t){var a=this;this.$refs["detail"].validate((function(i){if(i){var o=d["a"].deepCopy(a.detail),l={};l.submitType=e,l.templateCode=a.templateCode,l.urgencyLvl=o.urgencyLvl,o.approvalId&&(l.approvalId=o.approvalId),o.approvalTitle&&(l.approvalTitle=o.approvalTitle),o.approvalType&&"FX"!==o.approvalType.value&&(l.approvalNodes=o.approvalNodes,l.ccUserIds=function(){var e=[];return o.ccUsers.map((function(t){e.push(t.id||t.userId)})),e}()),o.bizForm.projectId=a.id||o.bizForm.projectId,o.bizForm.itemId=a.itemId||o.bizForm.itemId,"MA"!==a.type&&delete o.bizForm.termMa,l.bizForm=o.bizForm,"RA"!==e||"RJ"!==a.approveDetail.currentNode.nodeState.value||t?"RA"===e&&"RJ"===a.approveDetail.currentNode.nodeState.value&&t?(l.resubmitOpt={nodeInstanceId:a.approveDetail.currentNode.nodeInstanceId,opinion:t.opinion,strategy:t.strategy},r["a"].createProjectSignPro(l).then((function(e){200===e.code&&(a.$message.success({message:"重新提交成功！",duration:1500}),a.$emit("REFRESH"),a.hideDialog())})).catch((function(e){console.log(e)}))):r["a"].createProjectSignPro(l).then((function(e){200===e.code&&(a.$message.success({message:"提交成功！",duration:1500}),a.$emit("REFRESH"),a.hideDialog())})).catch((function(e){console.log(e)})):a.showInnerDialog=!0}}))}}},u=m,f=(a("2cfc"),a("b718"),a("4ac2")),v=Object(f["a"])(u,i,o,!1,null,"1c1682ff",null);t["default"]=v.exports},4264:function(e,t,a){},4721:function(e,t,a){},"69af":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"tips-title"},[e._v("\n    "+e._s(e.title)+"\n  ")]),a("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[a("el-form",{ref:"data",attrs:{model:e.data,"label-width":"0"}},[a("el-form-item",{attrs:{label:"",prop:"description"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.data.description,callback:function(t){e.$set(e.data,"description",t)},expression:"data.description"}})],1)],1)],1)])},o=[],r={name:"",components:{},props:{data:{type:Object,default:function(){return{}}},title:{type:String,default:function(){return"相关说明"}}},methods:{}},l=r,s=(a("3087"),a("4ac2")),n=Object(s["a"])(l,i,o,!1,null,"2f60d672",null);t["default"]=n.exports},"90ba":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{"append-to-body":!0,"close-on-click-modal":!1,"close-on-press-escape":!1,"show-close":!1,visible:e.dialogVisible,top:"50px",width:"500px"}},[a("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[a("div",{staticClass:"title"},[e._v("驳回流程走向")]),a("div",{staticClass:"options"},[a("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:e.close}})]),a("div",{staticClass:"clear"})]),a("el-form",{attrs:{model:e.form,"label-position":"left","label-width":"85px"}},[a("el-form-item",{attrs:{label:"","label-width":"0"}},[a("el-radio-group",{model:{value:e.form.strategy,callback:function(t){e.$set(e.form,"strategy",t)},expression:"form.strategy"}},e._l(e.recallWays,(function(t){return a("el-radio",{key:t.name,attrs:{label:t.label}},[e._v(e._s(t.name))])})),1)],1),a("el-form-item",{attrs:{label:"","label-width":"0"}},[a("el-input",{attrs:{autosize:{minRows:4,maxRows:6},placeholder:"请填写审批意见(非必填)",type:"textarea"},model:{value:e.form.opinion,callback:function(t){e.$set(e.form,"opinion",t)},expression:"form.opinion"}})],1)],1),a("div",{staticClass:"w-100p txt-right",staticStyle:{"margin-top":"20px"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.confirm}},[e._v("确定")])],1)],1)},o=[],r=(a("b429"),{name:"RecallDialog",props:{visible:{type:Boolean,default:!1},approvalId:{type:String,default:""},nodeInstanceId:{type:String,default:""}},computed:{dialogVisible:function(){return this.visible}},data:function(){return{recallWays:[{name:"回到原驳回人",label:"RN"},{name:"重新依次审批",label:"SN"}],form:{strategy:"RN",opinion:""}}},methods:{confirm:function(){this.$emit("confirm",this.form),this.close()},close:function(){this.$emit("update:visible",!1)}}}),l=r,s=a("4ac2"),n=Object(s["a"])(l,i,o,!1,null,null,null);t["default"]=n.exports},"9efb":function(e,t,a){"use strict";a("4721")},a932:function(e,t,a){},b718:function(e,t,a){"use strict";a("4264")},bca3:function(e,t,a){},ff5a:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"tips-title"},[e._v("\n    "+e._s(e.title)+"\n    "),a("div",{staticClass:"button"},[a("file-upload",{attrs:{icon:"icon",files:e.files,list:!1,tag:"invest"},on:{UPLOAD_FILE:function(t){return e.$emit("UPLOAD_FILE",t)}}})],1)]),a("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[a("file-upload",{attrs:{icon:"none",files:e.files}})],1)])},o=[],r=a("7218"),l={name:"",components:{fileUpload:r["a"]},props:{data:{type:Object,default:function(){return{}}},title:{type:String,default:function(){return"相关附件"}},files:{type:Array,default:function(){return[]}}}},s=l,n=(a("9efb"),a("4ac2")),p=Object(n["a"])(s,i,o,!1,null,"528bda6b",null);t["default"]=p.exports}}]);