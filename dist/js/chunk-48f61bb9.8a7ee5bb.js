(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48f61bb9","chunk-12a52a9e","chunk-129901a8","chunk-2d2082c4","chunk-2d22c102"],{"0883":function(t,e,i){},1941:function(t,e,i){},"1bb9":function(t,e,i){"use strict";i("0883")},"2c5e":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(e){return t.downloadAll()}}},[i("i",{staticClass:"iconfont icon-fujian fs-12"}),t._v(" 全部下载 "),i("i",{staticClass:"iconfont icon-xiajiang fs-12"})])},a=[],n=(i("fc02"),i("a450"),i("b62b")),o={name:"",components:{},props:{id:String,itemId:String,bizId:String,attaches:Array},methods:{downloadAll:function(){var t=this,e=!1;if(this.attaches.map((function(t){t.signState&&"COMPLETE"===t.signState.value&&(e=!0)})),e){var i={bizId:this.bizId,bizType:this.itemId};n["a"].downloadAllContract(i).then((function(e){var i=e.headers,s=decodeURIComponent(i["x-file-name"]);if(t.name){var a=s.split(".");s=t.name+"_协议文件."+a[a.length-1]}var n=new Blob([e.data],{type:i["content-type"]}),o=document.createElement("a");o.href=window.URL.createObjectURL(n),o.download=s,o.click()})).catch((function(t){console.log(t)}))}else this.$message.warning({message:"暂无协议文件签署成功，无法下载数据！",duration:1500})}}},r=o,l=(i("c8ff"),i("4ac2")),c=Object(l["a"])(r,s,a,!1,null,"3fe27f43",null);e["default"]=c.exports},5563:function(t,e,i){},7218:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{"element-loading-text":"上传中("+t.loadProgress.toFixed(0)+"%)","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[t.files&&t.files.length>0&&t.list?s("div",{staticClass:"files-wrap"},t._l(t.files,(function(e,i){return s("div",{key:i,staticClass:"item"},[s("span",{staticClass:"name"},[s("i",{staticClass:"iconfont icon-fujian fs-12"}),t._v(" "+t._s(e&&e.fileName))]),t.view?s("span",{staticClass:"tips"},[s("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(i){return t.preview(e)}}},[t._v("预览")])],1):t._e(),!t.edit&&t.view&&t.down?s("span",{staticClass:"tips"},[s("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(i){return t.download(e)}}},[t._v("下载")])],1):t._e(),t.edit?s("span",{staticClass:"tips"},[s("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(e){return t.remove(i)}}},[t._v("删除")])],1):t._e()])})),0):t._e(),t.files&&0===t.files.length&&t.emptyIcon&&(!t.edit||t.edit&&"none"===t.icon)?s("div",{staticStyle:{"text-align":"center"}},[s("img",{attrs:{src:i("f244")}}),s("br"),s("span",{staticStyle:{"font-size":"14px",color:"#666"}},[t._v("暂无数据")])]):t._e(),t.edit&&"none"!==t.icon?s("el-upload",{ref:"upload",attrs:{action:t.BASE_API+t.url,headers:t.headers,"show-file-list":!1,data:{category:t.tag},accept:t.accept,multiple:!0,"auto-upload":!0,"on-change":t.onChangeFile,"on-progress":t.uploadProcess}},["images"===t.icon?s("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:i("d1da")}}):t._e(),"icon"===t.icon?s("div",{staticStyle:{"padding-left":"20px"}},[s("i",{staticClass:"iconfont icon-shangchuan fs-14"}),s("span",{staticClass:"fs-14",staticStyle:{"margin-left":"10px"}},[t._v("上传附件")])]):t._e()]):t._e(),s("el-dialog",{staticClass:"preview",attrs:{visible:t.dialogVisible,"append-to-body":!0,"show-close":!1,fullscreen:!0,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[s("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[s("div",{staticClass:"title"},[t._v("\n        "+t._s(t.fileTitle)+"\n      ")]),s("div",{staticClass:"options"},[s("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(e){t.dialogVisible=!1}}})]),s("div",{staticClass:"clear"})]),s("div",{staticStyle:{margin:"-15px"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:"image"===t.previewType,expression:"previewType==='image'"}],staticStyle:{"text-align":"center"}},[s("img",{staticClass:"image",attrs:{src:t.image}})]),t.dialogVisible&&"file"===t.previewType?s("iframe",{staticClass:"iframe w-100p",staticStyle:{border:"0"},style:{height:t.dialogHeight-78+"px"},attrs:{allowfullscreen:"",id:"filePreviewDialogVisible",src:t.urlDialog}}):t._e()])])],1)},a=[],n=(i("4057"),i("b775"),i("ed08"),i("c24f"));var o={name:"",components:{},props:{files:{type:Array,default:function(){return[]}},url:{type:String,default:function(){return"/file"}},tag:{type:String,default:function(){return""}},accept:{type:String,default:function(){return""}},edit:{type:Boolean,default:function(){return!0}},down:{type:Boolean,default:function(){return!0}},icon:{type:String,default:function(){return"images"}},list:{type:Boolean,default:function(){return!0}},emptyIcon:{type:Boolean,default:function(){return!0}},view:{type:Boolean,default:function(){return!0}},single:{type:Boolean,default:function(){return!1}}},data:function(){return{BASE_API:"https://dev-api.cgvcap.com",headers:{Authorization:"Bearer "+this.$store.state.user.user.token},loading:!1,dialogVisible:!1,previewType:"",image:"",pdf:"",height:document.body.scrollHeight-90+"px",curUploadCount:0,urlDialog:"https://preview.imm.aliyuncs.com/index.html",fileTitle:"",dialogHeight:"",loadProgress:0}},methods:{onChangeFile:function(t,e){if(this.loadProgress=0,this.loading=!0,t.response&&200===t.response.code&&t.response.data){var i=this.single?t.response.data:this.files.concat(t.response.data);this.$emit("UPLOAD_FILE",i),this.curUploadCount++,this.curUploadCount===e.length&&(this.$refs.upload.clearFiles(),this.curUploadCount=0,this.loading=!1)}},uploadProcess:function(t,e,i){this.loadProgress=t.percent},preview:function(t){var e=this;this.dialogVisible=!1,this.dialogHeight=document.body.clientHeight,this.fileTitle=t.fileName,this.urlDialog="https://preview.imm.aliyuncs.com/index.html?r="+Date.parse(new Date);var i=this.$options.filters.getFileType(t.fileName);if("pdf"===i||"ppt"===i||"excel"===i||"word"===i){this.previewType="file";var s={fileId:t.fileId,accessCode:t.accessCode};n["a"].getPreview(s).then((function(t){200===t.code&&(e.dialogVisible=!0,setTimeout((function(){e.initIframe(t.data)}),0))})).catch((function(t){console.log(t)}))}else"image"===i?(this.previewType="image",this.dialogVisible=!0,this.image="https://dev-oss.cgvcap.com/file/"+t.fileId+"/"+t.accessCode):this.$message.warning({message:"该文档暂不支持在线预览！",duration:1500})},initIframe:function(t){var e=this,i=this.$store.state.user.user.jwtClaims.un,s=this.$store.state.user.user.jwtClaims.id.substring(this.$store.state.user.user.jwtClaims.id.length-11),a=(new Date).getTime(),n=this.$options.filters.DateTimeSecondEn(a/1e3),o=i+"  "+s+"  "+n;window.sendMessage=function(t,i){var s="filePreviewDialogVisible",a=document.getElementById(s);a.contentWindow.postMessage(e.json2str({action:t,data:i}),"*")};var r=function e(i){try{var s=JSON.parse(i.data)}catch(a){return}switch(s.action){case"preview.ready":window.sendMessage("preview.init",{url:t.url,region:t.region,bucket:t.bucket,accessKeyId:t.accessKeyId,accessKeySecret:t.accessKeySecret,stsToken:t.stsToken,wmType:1,wmValue:o,wmFont:"14px",wmWidth:300,wmHeight:150,wmColor:"rgba(192,192,192,0.3)",wmRotate:-Math.PI/6,copy:1}),window.sendMessage("setConfig",{writerCustomStyle:function(t){return t?{}:{paginationDisplay:!1,fullScreenButtonDisplay:!1,containerMarginTop:0,containerMarginBottom:0,containerBackground:"#ffffff"}}}),window.removeEventListener("message",e,!1);break}};window.addEventListener("message",r,!1)},download:function(t){var e=this,i={expireSecond:""};n["a"].getShareUrl(i,t.fileId,t.accessCode).then((function(t){if(200===t.code){var e=document.createElement("a");e.href=t.data.shareUrl,e.target="_new",e.click()}})).catch((function(t){e.$message.error({message:JSON.stringify(t),duration:1500})}))},remove:function(t){var e=Object.assign({},this.files[t]);this.files.splice(t,1),this.$emit("UPLOAD_FILE",this.files),this.$emit("REMOVE_FILE",e)},hideDialog:function(){this.dialogVisible=!1,this.previewType="",this.image="",this.pdf=""},json2str:function(t){return JSON.stringify(t,(function(t,e){return"function"===typeof e&&(e=e.toString()),e}))}}},r=o,l=(i("cd37"),i("4ac2")),c=Object(l["a"])(r,s,a,!1,null,"348e4616",null);e["a"]=c.exports},"902d":function(t,e,i){},a450:function(t,e,i){var s=i("bb8b").f,a=Function.prototype,n=/^\s*function ([^ (]*)/,o="name";o in a||i("26df")&&s(a,o,{configurable:!0,get:function(){try{return(""+this).match(n)[1]}catch(t){return""}}})},c688:function(t,e,i){"use strict";i("902d")},c8ff:function(t,e,i){"use strict";i("5563")},cd37:function(t,e,i){"use strict";i("1941")},d1da:function(t,e){t.exports="data:image/png;base64,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"},d243:function(t,e,i){},e595:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrap"},[s("div",{staticClass:"tips-title"},[t._v("\n    风险提示\n  ")]),s("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[t._l(t.list,(function(e,i){return s("div",{key:i},[s("div",[t._v(t._s(e.riskDesc))]),s("div",{staticStyle:{display:"flex"}},[t._v("\n        【"+t._s(e.riskLvl.name)+"】"+t._s(e.riskSubject)+"   "+t._s(t._f("DateTimeEn")(e.createTime))+" 来自于"+t._s(e.user.userName)+"\n        "),s("span",{staticStyle:{"margin-left":"auto"}},[s("el-button",{directives:[{name:"show",rawName:"v-show",value:e.canEdit,expression:"item.canEdit"}],staticStyle:{color:"#3a8ee6"},attrs:{type:"text"},on:{click:function(i){return t.editRisk(e)}}},[t._v("修改")]),s("el-button",{directives:[{name:"show",rawName:"v-show",value:e.canDelete,expression:"item.canDelete"}],staticStyle:{color:"#3a8ee6"},attrs:{type:"text"},on:{click:function(i){return t.removeRisk(e)}}},[t._v("删除")])],1)])])})),t.list&&0===t.list.length?s("div",{staticStyle:{width:"100%","text-align":"center"}},[s("img",{attrs:{src:i("f244")}}),s("br"),s("span",{staticStyle:{"font-size":"14px",width:"100%"}},[t._v("暂无数据")])]):t._e()],2),s("div",{directives:[{name:"show",rawName:"v-show",value:t.canCreate&&t.add,expression:"canCreate && add"}]},[s("el-button",{staticStyle:{color:"#3a8ee6"},attrs:{type:"text"},on:{click:t.showRisk}},[t._v("新增风险提示")])],1),s("el-dialog",{attrs:{visible:t.risk.dialogVisible,width:"450px","append-to-body":!0,"show-close":!1,top:"50px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){return t.$set(t.risk,"dialogVisible",e)}}},[s("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[s("div",{staticClass:"title"},[s("i",{staticClass:"iconfont icon-fengxiantishi"}),t._v(" 新增风险提示\n      ")]),s("div",{staticClass:"options",staticStyle:{display:"flex","align-items":"center"}},[s("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(e){t.risk.dialogVisible=!1}}})]),s("div",{staticClass:"clear"})]),s("div",{staticClass:"main-wrap"},[s("el-form",{ref:"riskForm",attrs:{model:t.risk.form,"label-width":"80px"}},[s("el-form-item",{attrs:{label:"风险分类",prop:"riskType",rules:{required:!0,message:"请选择风险分类"}}},[s("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:""},model:{value:t.risk.form.riskType,callback:function(e){t.$set(t.risk.form,"riskType",e)},expression:"risk.form.riskType"}},t._l(t.enumType.ProjectRiskType,(function(t){return s("el-option",{key:t.value,attrs:{label:t.name,value:t.value}})})),1)],1),s("el-form-item",{attrs:{label:"风险程度",prop:"riskLvl",rules:{required:!0,message:"请选择风险程度"}}},t._l(t.enumType.ProjectRiskLvl,(function(e){return s("el-radio",{attrs:{label:e.value},model:{value:t.risk.form.riskLvl,callback:function(e){t.$set(t.risk.form,"riskLvl",e)},expression:"risk.form.riskLvl"}},[t._v(t._s(e.name))])})),1),s("el-form-item",{attrs:{label:"风险描述",prop:"bizForm.termMa.buyScope",rules:{required:!0,message:"请输入风险描述"}}},[s("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:t.risk.form.riskDesc,callback:function(e){t.$set(t.risk.form,"riskDesc",e)},expression:"risk.form.riskDesc"}})],1),s("el-form-item",{attrs:{label:""}},[s("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("确认")])],1)],1)],1)])],1)},a=[],n=i("b62b"),o={name:"",components:{},props:{detail:{type:Object,default:function(){return{}}},id:String,add:{type:Boolean,default:function(){return!0}}},watch:{detail:{handler:function(t){this.getRiskList(t)},immediate:!0}},data:function(){return{enumType:{},risk:{dialogVisible:!1,form:{}},list:[],canCreate:!1}},mounted:function(){this.getEnum("ProjectRiskLvl"),this.getEnum("ProjectRiskType")},methods:{getEnum:function(t,e){var i=this;n["a"].getEnum(t).then((function(s){200===s.code&&(e&&s.data.unshift({name:"全部",value:""}),i.$set(i.enumType,t,s.data))})).catch((function(t){console.log(t)}))},getRiskList:function(){var t=this,e="";for(var i in this.detail.approvalNodes)if("HI"===this.detail.approvalNodes[i].handleState.value){e=this.detail.approvalNodes[i].nodeInstanceId;break}var s={bizId:this.detail.bizForm.bizId,nodeInstanceId:e};n["a"].getQueryItemRisk(s).then((function(e){200===e.code&&(t.canCreate=e.data.canCreate,t.list=e.data.listVos)})).catch((function(t){console.log(t)}))},showRisk:function(){this.risk.dialogVisible=!0,this.risk.form={}},submit:function(){var t=this,e={bizId:this.detail.bizForm.bizId,itemId:this.id,riskDesc:this.risk.form.riskDesc,riskLvl:this.risk.form.riskLvl,riskType:this.risk.form.riskType};this.risk.form.id?n["a"].editRisk(e,this.risk.form.id).then((function(e){200===e.code&&(t.risk={dialogVisible:!1,form:{}},t.$message.success({message:"修改成功！",duration:1500}),t.getRiskList())})).catch((function(t){console.log(t)})):n["a"].createRisk(e).then((function(e){200===e.code&&(t.risk={dialogVisible:!1,form:{}},t.$message.success({message:"提交成功！",duration:1500}),t.getRiskList())})).catch((function(t){console.log(t)}))},editRisk:function(t){var e=this;n["a"].getRiskDetail(t.riskId).then((function(t){200===t.code&&(e.risk={dialogVisible:!0,form:{id:t.data.riskId,riskDesc:t.data.riskDesc,riskLvl:t.data.riskLvl.value,riskType:t.data.riskType.value}})})).catch((function(t){console.log(t)}))},removeRisk:function(t){var e=this;this.$confirm("即将删除风险提示，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){n["a"].deleteRisk(t.riskId).then((function(t){200===t.code&&(e.$message.success({message:"风险提示删除成功",duration:1500}),e.getRiskList())})).catch((function(t){console.log(t)}))})).catch((function(t){console.log(t)}))}}},r=o,l=(i("f8be"),i("4ac2")),c=Object(l["a"])(r,s,a,!1,null,"27d421e3",null);e["default"]=c.exports},f244:function(t,e){t.exports="data:image/png;base64,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"},f349:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.dialogVisible&&t.detail.bizForm?s("div",[s("div",{staticClass:"wrap"},[s("div",{directives:[{name:"show",rawName:"v-show",value:"project"===t.type,expression:"type==='project'"}],staticClass:"center-title"},[t._v(t._s(t.detail.approvalTitle))]),s("div",{staticClass:"form-content"},[s("h2",[t._v(t._s(t.detail.bizForm.projectName))]),t._v(t._s(t.detail.bizForm.projectType&&t.detail.bizForm.projectType.name))]),s("el-row",{staticClass:"msg-table gray",staticStyle:{"padding-top":"15px"}},[s("el-col",{staticClass:"label",attrs:{span:4}},[t._v("关联企业：")]),s("el-col",{staticClass:"content",attrs:{span:20}},[t._v(t._s(t.detail.bizForm.entName))])],1),s("el-row",{staticClass:"msg-table gray"},[s("el-col",{staticClass:"label",attrs:{span:4}},[t._v("相关说明：")]),s("el-col",{staticClass:"content",attrs:{span:20}},[s("div",{domProps:{innerHTML:t._s(t.detail.bizForm.desc.replace(/\r\n/g,"<br/>").replace(/\n/g,"<br/>").replace(/\s/g,"&nbsp; "))}})])],1)],1),s("div",{staticClass:"wrap",staticStyle:{"margin-top":"15px"}},[s("div",{staticClass:"tips-title"},[t._v("协议文件")]),s("div",{staticClass:"table-wrap"},[t._m(0),t._l(t.contract,(function(e,i){return s("div",{key:i,staticClass:"content",staticStyle:{display:"flex"}},[s("div",{staticClass:"file-item",staticStyle:{width:"50%"}},[t._v("\n            "+t._s(e.templateName)+"\n            "),s("span",{directives:[{name:"show",rawName:"v-show",value:"DRAFT"!==e.signState.value,expression:"item.signState.value!=='DRAFT'"}],staticClass:"tags",class:{blue:"DRAFT"===e.signState.value,orange:"SIGNING"===e.signState.value,green:"COMPLETE"===e.signState.value}},[t._v("\n              "+t._s(e.signState.name)+"\n            ")])]),s("div",{staticStyle:{width:"18%",display:"block","text-align":"center"}},[t._v("\n            "+t._s(e.signType&&e.signType.name)+"\n          ")]),s("div",{staticStyle:{width:"17%",display:"block","text-align":"center"}},[t._l(e.signers,(function(i,a){return s("span",{key:a},[t._v("\n                    "+t._s(i.signerName)),s("b",{directives:[{name:"show",rawName:"v-show",value:a!==e.signers.length-1,expression:"sIndex!==(item.signers.length-1)"}]},[t._v("&")])])})),t._v("\n             \n          ")],2),s("div",{staticStyle:{width:"15%",display:"block","text-align":"center"}},[s("el-button",{attrs:{type:"text"},on:{click:function(i){return t.downLoad(e)}}},[t._v("下载")])],1)])})),t.contract&&0===t.contract.length?s("div",{staticClass:"content empty"},[s("img",{attrs:{src:i("f244")}}),s("span",{staticStyle:{"font-size":"14px",width:"100%"}},[t._v("暂无数据")])]):t._e()],2),t.contract&&t.contract.length>1?s("contract",{attrs:{id:t.detail.bizForm.projectId,itemId:t.detail.bizForm.bizType,bizId:t.detail.bizForm.bizId,attaches:t.contract,name:t.detail.approvalTitle}}):t._e()],1)]):t._e()},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"header",staticStyle:{display:"flex"}},[i("div",{staticStyle:{width:"50%"}},[t._v("附件名称")]),i("div",{staticStyle:{width:"18%","text-align":"center"}},[t._v("签署方式")]),i("div",{staticStyle:{width:"17%","text-align":"center"}},[t._v("签署方")]),i("div",{staticStyle:{width:"15%","text-align":"center"}},[t._v("操作")])])}],n=i("b62b"),o=i("7218"),r=i("e595"),l=i("2c5e"),c={name:"",components:{fileUpload:o["a"],risk:r["default"],contract:l["default"]},props:{},data:function(){return{enumType:{},dialogVisible:!1,detail:{},height:"",approval:{id:"",visible:!1},type:"",contract:[],risk:{visible:!1,detail:{},itemId:""}}},mounted:function(){this.height=document.body.clientHeight-200+"px"},methods:{show:function(t,e,i){console.log(t,e),this.contract=[],this.type=t,"project"===t?this.initParamsByDraft(e):this.initParamsByBiz(e,i)},hideDialog:function(){this.dialogVisible=!1,this.$emit("SET_APPROVAL","")},initParamsByDraft:function(t){var e=this;n["a"].getNdaLatest(t).then((function(t){if(200===t.code){var i=[];t.data.approvalNodes.map((function(t){i.push({userName:t.approvalUser&&t.approvalUser.userName||t.nodeName,nodeRefId:t.approvalUser&&t.approvalUser.userId,nodeId:t.nodeInstanceId,nodeType:t.nodeType&&t.nodeType.value,userId:t.nodeRefId||t.id,userTag:t.nodeName,nodeName:t.nodeName})})),t.data.approvalNodes=i,t.data.urgencyLvl=t.data.urgencyLvl.value,e.detail=t.data,e.$emit("SET_APPROVAL",t.data.approvalId),e.dialogVisible=!0,e.getContractList()}})).catch((function(t){console.log(t)}))},initParamsByBiz:function(t,e){var i=this;n["a"].getNdaInfo(t).then((function(t){200===t.code&&(i.detail={bizForm:t.data},i.dialogVisible=!0,i.getContractList(),t.data.needRisk&&(i.risk={visible:!0,detail:e,itemId:t.data.itemId}))})).catch((function(t){console.log(t)}))},getContractList:function(){var t=this,e={bizId:this.detail.bizForm.bizId,bizType:"IE02"};n["a"].getContractList(e).then((function(e){200===e.code&&(t.contract=e.data)})).catch((function(t){console.log(t)}))},downLoad:function(t){console.log(t);var e=t.signState&&"COMPLETE"===t.signState.value&&t.signType&&"PS"!==t.signType.value?"downloadSigned":"downloadTemplate";n["a"].downloadAgreementTemplate(t.agreementId,e).then((function(e){var i=e.headers,s=t.templateName,a=new Blob([e.data],{type:i["content-type"]}),n=document.createElement("a");n.href=window.URL.createObjectURL(a),n.download=s,n.click()})).catch((function(t){console.log(t)}))}}},d=c,u=(i("c688"),i("1bb9"),i("4ac2")),g=Object(u["a"])(d,s,a,!1,null,"288b58e0",null);e["default"]=g.exports},f8be:function(t,e,i){"use strict";i("d243")}}]);