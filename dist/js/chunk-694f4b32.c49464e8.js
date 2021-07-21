(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-694f4b32","chunk-2d22c102"],{1941:function(e,t,a){},"2c87":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-background":"rgba(0, 0, 0, 0.8)","element-loading-spinner":"el-icon-loading","element-loading-text":"文件上传中"}},[a("el-form-item",{attrs:{rules:{required:!0,message:"请输入标题"},label:"标题",prop:"approvalTitle"}},[a("el-input",{attrs:{placeholder:"请输入标题"},model:{value:e.form.approvalTitle,callback:function(t){e.$set(e.form,"approvalTitle",t)},expression:"form.approvalTitle"}})],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请选择流程类型"},label:"流程类型",prop:"bizForm.processType"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择流程类型",disabled:!!e.form.approvalId},on:{change:e.changeApprovalNodes},model:{value:e.form.bizForm.processType,callback:function(t){e.$set(e.form.bizForm,"processType",t)},expression:"form.bizForm.processType"}},e._l(e.enumType.ApprovalRankProcessType,(function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.value}})})),1)],1),a("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[a("el-form-item",{staticStyle:{width:"48%"},attrs:{rules:{required:!0,message:"请选择申请部门"},label:"申请部门",prop:"bizForm.deptId"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",placeholder:"请选择申请部门"},model:{value:e.form.bizForm.deptId,callback:function(t){e.$set(e.form.bizForm,"deptId",t)},expression:"form.bizForm.deptId"}},e._l(e.deptList,(function(t){return a("el-option",{key:t.deptId,attrs:{label:t.deptName,value:t.deptId}},[a("span",{style:{paddingLeft:10*t.level+"px"}},[e._v(e._s(t.deptName))])])})),1)],1),a("el-form-item",{staticStyle:{width:"48%"},attrs:{rules:{required:!0,message:"请选择签证类型"},label:"签证类型",prop:"bizForm.visaType"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择签证类型",disabled:!!e.form.approvalId},on:{change:e.changeApprovalNodes},model:{value:e.form.bizForm.visaType,callback:function(t){e.$set(e.form.bizForm,"visaType",t)},expression:"form.bizForm.visaType"}},e._l(e.enumType.ApprovalVisaType,(function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.value}})})),1)],1)],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请完善明细表"},label:"明细表",prop:"bizForm.visaDetail"}},[a("el-table",{attrs:{data:e.form.bizForm.visaDetail,border:"","header-cell-style":{background:"#fdfdfd"}}},[a("el-table-column",{attrs:{label:"申请人",prop:"userName",width:"120",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{label:"前往国家/地区",prop:"toCountry",width:"180",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{label:"办理方式",prop:"processingMethod",width:"120",align:"center","header-align":"center"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(e.enumType.VisaHandlingType,(function(i,s){return i.value===t.row.processingMethod?a("span",{key:s},[e._v("\n              "+e._s(i.name)+"\n            ")]):e._e()}))}}])}),a("el-table-column",{attrs:{label:"户籍",prop:"household",width:"80",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{label:"身份证号码",prop:"identityNumber",width:"180",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{label:"护照号",prop:"passportNumber",width:"160",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{label:"护照有效截止日期",prop:"effectiveDate",width:"140",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{label:"出境日期",prop:"departureDate",width:"140",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{label:"回国日期",prop:"returnDate",width:"140",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{label:"出国周期",prop:"departureCycle",width:"140",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{label:"期望出签日期",prop:"expectedDate",width:"140",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{label:"联系电话",prop:"contactNo",width:"120",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{label:"签证费用(元)",prop:"visaCost",width:"120",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{prop:"",label:"操作",width:"150","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"primary",attrs:{type:"text"},nativeOn:{click:function(a){return a.preventDefault(),e.showDetail(t.$index)}}},[e._v("编辑")]),a("el-button",{staticClass:"primary",attrs:{type:"text"},nativeOn:{click:function(a){return a.preventDefault(),e.deletePro(t.$index)}}},[e._v("删除")])]}}])})],1),a("div",{staticStyle:{display:"flex","justify-content":"space-between","margin-top":"10px"}},[a("div",[e._v("\n          总签证费用（元）："+e._s(e._f("formatMoney")(e.form.bizForm.visaCostTotal))+"\n        ")]),a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.showDetail()}}},[e._v("添加")])],1)],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请输入申请缘由"},label:"申请缘由",prop:"bizForm.applyReason"}},[a("el-input",{attrs:{placeholder:"请输入申请缘由",type:"textarea",autosize:{minRows:2,maxRows:4}},model:{value:e.form.bizForm.applyReason,callback:function(t){e.$set(e.form.bizForm,"applyReason",t)},expression:"form.bizForm.applyReason"}})],1),a("el-form-item",{attrs:{label:"附件",prop:"bizForm.attachments"}},[a("file-upload",{attrs:{files:e.form.bizForm.attachments,tag:"approval"},on:{UPLOAD_FILE:function(t){e.form.bizForm.attachments=t}}})],1),a("el-dialog",{attrs:{"append-to-body":!0,"close-on-click-modal":!1,"close-on-press-escape":!1,"destroy-on-close":!0,"show-close":!1,visible:e.detail.dialogVisible,top:"50px",width:"450px"},on:{"update:visible":function(t){return e.$set(e.detail,"dialogVisible",t)}}},[a("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[a("div",{staticClass:"title"},[a("i",{staticClass:"iconfont icon-shenpi_normal"}),e._v("\n          "+e._s(e.detail.form.procurementId?"编辑":"新增")+"申请\n        ")]),a("div",{staticClass:"options"},[a("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(t){e.detail.dialogVisible=!1}}})]),a("div",{staticClass:"clear"})]),a("el-form",{ref:"detail",attrs:{model:e.detail.form,"label-width":"140px"}},[a("el-form-item",{attrs:{rules:{required:!0,message:"请输入申请人"},label:"申请人",prop:"userName"}},[a("el-input",{attrs:{placeholder:"请输入申请人"},model:{value:e.detail.form.userName,callback:function(t){e.$set(e.detail.form,"userName",t)},expression:"detail.form.userName"}})],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请输入前往国家/地区"},label:"前往国家/地区",prop:"toCountry"}},[a("el-input",{attrs:{placeholder:"请输入前往国家/地区"},model:{value:e.detail.form.toCountry,callback:function(t){e.$set(e.detail.form,"toCountry",t)},expression:"detail.form.toCountry"}})],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请输入办理方式"},label:"办理方式",prop:"processingMethod"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择办理方式"},model:{value:e.detail.form.processingMethod,callback:function(t){e.$set(e.detail.form,"processingMethod",t)},expression:"detail.form.processingMethod"}},e._l(e.enumType.VisaHandlingType,(function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.value}})})),1)],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请输入户籍"},label:"户籍",prop:"household"}},[a("el-input",{attrs:{placeholder:"请输入户籍"},model:{value:e.detail.form.household,callback:function(t){e.$set(e.detail.form,"household",t)},expression:"detail.form.household"}})],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请输入身份证号码"},label:"身份证号码",prop:"identityNumber"}},[a("el-input",{attrs:{placeholder:"请输入身份证号码"},model:{value:e.detail.form.identityNumber,callback:function(t){e.$set(e.detail.form,"identityNumber",t)},expression:"detail.form.identityNumber"}})],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请输入护照号"},label:"护照号",prop:"passportNumber"}},[a("el-input",{attrs:{placeholder:"请输入护照号"},model:{value:e.detail.form.passportNumber,callback:function(t){e.$set(e.detail.form,"passportNumber",t)},expression:"detail.form.passportNumber"}})],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请输入护照有效截止日期"},label:"护照有效截止日期",prop:"effectiveDate"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请输入护照有效截止日期","value-format":"yyyy-MM-dd"},model:{value:e.detail.form.effectiveDate,callback:function(t){e.$set(e.detail.form,"effectiveDate",t)},expression:"detail.form.effectiveDate"}})],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请输入出境日期"},label:"出境日期",prop:"departureDate"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请选择出境日期","value-format":"yyyy-MM-dd"},model:{value:e.detail.form.departureDate,callback:function(t){e.$set(e.detail.form,"departureDate",t)},expression:"detail.form.departureDate"}})],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请输入回国日期"},label:"回国日期",prop:"returnDate"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请选择回国日期","value-format":"yyyy-MM-dd"},model:{value:e.detail.form.returnDate,callback:function(t){e.$set(e.detail.form,"returnDate",t)},expression:"detail.form.returnDate"}})],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请输入出国周期"},label:"出国周期",prop:"departureCycle"}},[a("el-input",{attrs:{placeholder:"请输入出国周期"},model:{value:e.detail.form.departureCycle,callback:function(t){e.$set(e.detail.form,"departureCycle",t)},expression:"detail.form.departureCycle"}})],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请选择期望出签日期"},label:"期望出签日期",prop:"expectedDate"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请选择期望出签日期","value-format":"yyyy-MM-dd"},model:{value:e.detail.form.expectedDate,callback:function(t){e.$set(e.detail.form,"expectedDate",t)},expression:"detail.form.expectedDate"}})],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请输入联系电话"},label:"联系电话",prop:"contactNo"}},[a("el-input",{attrs:{placeholder:"请输入联系电话"},model:{value:e.detail.form.contactNo,callback:function(t){e.$set(e.detail.form,"contactNo",t)},expression:"detail.form.contactNo"}})],1),a("el-form-item",{attrs:{rules:{required:!0,message:"请输入签证费用"},label:"签证费用",prop:"visaCost"}},[a("el-input",{attrs:{placeholder:"请输入签证费用"},model:{value:e.detail.form.visaCost,callback:function(t){e.$set(e.detail.form,"visaCost",t)},expression:"detail.form.visaCost"}},[a("template",{slot:"append"},[e._v("元")])],2)],1),a("el-form-item",[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.saveDetail()}}},[e._v("确定")]),a("el-button",{attrs:{size:"mini"},on:{click:function(t){e.detail.dialogVisible=!1}}},[e._v("取消")])],1)],1)],1)],1)},s=[],r=(a("e680"),a("ed08")),l=a("cd05"),o=a("7218"),n={components:{fileUpload:o["a"]},props:{form:Object},computed:{},data:function(){return{headers:{Authorization:"Bearer "+this.$store.state.user.user.token},uploadURL:"https://dev-api.cgvcap.com/file",uploadData:{category:"approve"},loading:!1,deptList:[],enumType:{ApprovalRankProcessType:[],ApprovalVisaType:[],VisaHandlingType:[]},detail:{dialogVisible:!1,form:{}}}},mounted:function(){this.getEnum("ApprovalRankProcessType"),this.getEnum("ApprovalVisaType"),this.getEnum("VisaHandlingType"),this.getDeptTree()},methods:{getEnum:function(e,t){var a=this;l["a"].getEnum(e).then((function(i){200===i.code&&(t&&i.data.unshift({name:"全部",value:""}),a.$set(a.enumType,e,i.data))})).catch((function(e){console.log(e)}))},onChangeFile:function(e){var t=this;if(this.loading=!0,e.response&&200===e.response.code&&e.response.data){var a=e.response.data[0],i=a.accessCode,s=a.fileId,r=a.fileName;this.form.bizForm.attachments.push({accessCode:i,fileId:s,fileName:r}),setTimeout((function(){t.$refs.uploadFiles.clearFiles(),t.loading=!1}),300)}else e.response&&200!==e.response.code&&(this.$message.error("上传失败！"),this.loading=!1)},removeFiles:function(e){this.form.bizForm.attachments.splice(e,1)},getDeptTree:function(){var e=this,t={withEntRoot:!0};l["a"].deptTree(t).then((function(t){if(200===t.code){var a=function e(t,a){for(var i in t)t[i].level=a,t[i].subDepts&&(t[i].subDepts=e(t[i].subDepts,a+1));return t},i=a(t.data,0);e.deptList=e.setSelectDept(Object.assign([],i),0)}})).catch((function(e){console.log(e)}))},setSelectDept:function(e,t){var a=[];for(var i in e)a.push({deptName:e[i].deptName,deptId:e[i].deptId,level:t}),e[i].subDepts&&(e[i].subDepts=this.setSelectDept(e[i].subDepts,t+1)),a=a.concat(e[i].subDepts);return a},showDetail:function(e){var t=this;this.detail={dialogVisible:!0,form:e>-1?r["a"].deepCopy(this.form.bizForm.visaDetail[e]):{},index:e},setTimeout((function(){t.$refs["detail"].clearValidate()}),300)},saveDetail:function(){var e=this;this.$refs["detail"].validate((function(t){t&&(e.detail.index>-1?e.$set(e.form.bizForm.visaDetail,e.detail.index,e.detail.form):e.form.bizForm.visaDetail.push(e.detail.form),e.detail.dialogVisible=!1,e.form.bizForm.visaCostTotal=0,e.form.bizForm.visaDetail.map((function(t){e.form.bizForm.visaCostTotal+=Number(t.visaCost)})))}))},deletePro:function(e){var t=this;this.$confirm("即将删除《"+this.form.bizForm.visaDetail[e].goodsName+"》，是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.form.bizForm.visaDetail.splice(e,1),t.form.bizForm.visaCostTotal=0,t.form.bizForm.visaDetail.map((function(e){t.form.bizForm.visaCostTotal+=Number(e.visaCost)})),t.$message.success({message:"操作成功",duration:1500})})).catch((function(e){console.log(e)}))},changeApprovalNodes:function(){var e={templateCode:"VI01",processType:this.form.bizForm.processType,visaType:this.form.bizForm.visaType};this.$emit("setApprovalNodes",e)}}},c=n,d=(a("4cdd"),a("4ac2")),p=Object(d["a"])(c,i,s,!1,null,"2959ab7f",null);t["default"]=p.exports},"4cdd":function(e,t,a){"use strict";a("51bc")},"51bc":function(e,t,a){},7218:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"上传中("+e.loadProgress.toFixed(0)+"%)","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[e.files&&e.files.length>0&&e.list?i("div",{staticClass:"files-wrap"},e._l(e.files,(function(t,a){return i("div",{key:a,staticClass:"item"},[i("span",{staticClass:"name"},[i("i",{staticClass:"iconfont icon-fujian fs-12"}),e._v(" "+e._s(t&&t.fileName))]),e.view?i("span",{staticClass:"tips"},[i("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(a){return e.preview(t)}}},[e._v("预览")])],1):e._e(),!e.edit&&e.view&&e.down?i("span",{staticClass:"tips"},[i("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(a){return e.download(t)}}},[e._v("下载")])],1):e._e(),e.edit?i("span",{staticClass:"tips"},[i("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(t){return e.remove(a)}}},[e._v("删除")])],1):e._e()])})),0):e._e(),e.files&&0===e.files.length&&e.emptyIcon&&(!e.edit||e.edit&&"none"===e.icon)?i("div",{staticStyle:{"text-align":"center"}},[i("img",{attrs:{src:a("f244")}}),i("br"),i("span",{staticStyle:{"font-size":"14px",color:"#666"}},[e._v("暂无数据")])]):e._e(),e.edit&&"none"!==e.icon?i("el-upload",{ref:"upload",attrs:{action:e.BASE_API+e.url,headers:e.headers,"show-file-list":!1,data:{category:e.tag},accept:e.accept,multiple:!0,"auto-upload":!0,"on-change":e.onChangeFile,"on-progress":e.uploadProcess}},["images"===e.icon?i("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:a("d1da")}}):e._e(),"icon"===e.icon?i("div",{staticStyle:{"padding-left":"20px"}},[i("i",{staticClass:"iconfont icon-shangchuan fs-14"}),i("span",{staticClass:"fs-14",staticStyle:{"margin-left":"10px"}},[e._v("上传附件")])]):e._e()]):e._e(),i("el-dialog",{staticClass:"preview",attrs:{visible:e.dialogVisible,"append-to-body":!0,"show-close":!1,fullscreen:!0,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[e._v("\n        "+e._s(e.fileTitle)+"\n      ")]),i("div",{staticClass:"options"},[i("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(t){e.dialogVisible=!1}}})]),i("div",{staticClass:"clear"})]),i("div",{staticStyle:{margin:"-15px"}},[i("div",{directives:[{name:"show",rawName:"v-show",value:"image"===e.previewType,expression:"previewType==='image'"}],staticStyle:{"text-align":"center"}},[i("img",{staticClass:"image",attrs:{src:e.image}})]),e.dialogVisible&&"file"===e.previewType?i("iframe",{staticClass:"iframe w-100p",staticStyle:{border:"0"},style:{height:e.dialogHeight-78+"px"},attrs:{allowfullscreen:"",id:"filePreviewDialogVisible",src:e.urlDialog}}):e._e()])])],1)},s=[],r=(a("4057"),a("b775"),a("ed08"),a("c24f"));var l={name:"",components:{},props:{files:{type:Array,default:function(){return[]}},url:{type:String,default:function(){return"/file"}},tag:{type:String,default:function(){return""}},accept:{type:String,default:function(){return""}},edit:{type:Boolean,default:function(){return!0}},down:{type:Boolean,default:function(){return!0}},icon:{type:String,default:function(){return"images"}},list:{type:Boolean,default:function(){return!0}},emptyIcon:{type:Boolean,default:function(){return!0}},view:{type:Boolean,default:function(){return!0}},single:{type:Boolean,default:function(){return!1}}},data:function(){return{BASE_API:"https://dev-api.cgvcap.com",headers:{Authorization:"Bearer "+this.$store.state.user.user.token},loading:!1,dialogVisible:!1,previewType:"",image:"",pdf:"",height:document.body.scrollHeight-90+"px",curUploadCount:0,urlDialog:"https://preview.imm.aliyuncs.com/index.html",fileTitle:"",dialogHeight:"",loadProgress:0}},methods:{onChangeFile:function(e,t){if(this.loadProgress=0,this.loading=!0,e.response&&200===e.response.code&&e.response.data){var a=this.single?e.response.data:this.files.concat(e.response.data);this.$emit("UPLOAD_FILE",a),this.curUploadCount++,this.curUploadCount===t.length&&(this.$refs.upload.clearFiles(),this.curUploadCount=0,this.loading=!1)}},uploadProcess:function(e,t,a){this.loadProgress=e.percent},preview:function(e){var t=this;this.dialogVisible=!1,this.dialogHeight=document.body.clientHeight,this.fileTitle=e.fileName,this.urlDialog="https://preview.imm.aliyuncs.com/index.html?r="+Date.parse(new Date);var a=this.$options.filters.getFileType(e.fileName);if("pdf"===a||"ppt"===a||"excel"===a||"word"===a){this.previewType="file";var i={fileId:e.fileId,accessCode:e.accessCode};r["a"].getPreview(i).then((function(e){200===e.code&&(t.dialogVisible=!0,setTimeout((function(){t.initIframe(e.data)}),0))})).catch((function(e){console.log(e)}))}else"image"===a?(this.previewType="image",this.dialogVisible=!0,this.image="https://dev-oss.cgvcap.com/file/"+e.fileId+"/"+e.accessCode):this.$message.warning({message:"该文档暂不支持在线预览！",duration:1500})},initIframe:function(e){var t=this,a=this.$store.state.user.user.jwtClaims.un,i=this.$store.state.user.user.jwtClaims.id.substring(this.$store.state.user.user.jwtClaims.id.length-11),s=(new Date).getTime(),r=this.$options.filters.DateTimeSecondEn(s/1e3),l=a+"  "+i+"  "+r;window.sendMessage=function(e,a){var i="filePreviewDialogVisible",s=document.getElementById(i);s.contentWindow.postMessage(t.json2str({action:e,data:a}),"*")};var o=function t(a){try{var i=JSON.parse(a.data)}catch(s){return}switch(i.action){case"preview.ready":window.sendMessage("preview.init",{url:e.url,region:e.region,bucket:e.bucket,accessKeyId:e.accessKeyId,accessKeySecret:e.accessKeySecret,stsToken:e.stsToken,wmType:1,wmValue:l,wmFont:"14px",wmWidth:300,wmHeight:150,wmColor:"rgba(192,192,192,0.3)",wmRotate:-Math.PI/6,copy:1}),window.sendMessage("setConfig",{writerCustomStyle:function(e){return e?{}:{paginationDisplay:!1,fullScreenButtonDisplay:!1,containerMarginTop:0,containerMarginBottom:0,containerBackground:"#ffffff"}}}),window.removeEventListener("message",t,!1);break}};window.addEventListener("message",o,!1)},download:function(e){var t=this,a={expireSecond:""};r["a"].getShareUrl(a,e.fileId,e.accessCode).then((function(e){if(200===e.code){var t=document.createElement("a");t.href=e.data.shareUrl,t.target="_new",t.click()}})).catch((function(e){t.$message.error({message:JSON.stringify(e),duration:1500})}))},remove:function(e){var t=Object.assign({},this.files[e]);this.files.splice(e,1),this.$emit("UPLOAD_FILE",this.files),this.$emit("REMOVE_FILE",t)},hideDialog:function(){this.dialogVisible=!1,this.previewType="",this.image="",this.pdf=""},json2str:function(e){return JSON.stringify(e,(function(e,t){return"function"===typeof t&&(t=t.toString()),t}))}}},o=l,n=(a("cd37"),a("4ac2")),c=Object(n["a"])(o,i,s,!1,null,"348e4616",null);t["a"]=c.exports},cd05:function(e,t,a){"use strict";var i=a("b775");t["a"]={getEnum:function(e){return Object(i["a"])({url:"/enum/"+e,method:"get"})},deptTree:function(e){return Object(i["a"])({url:"/contacts/deptUserTree",method:"get",params:e})},getStatFinanceList:function(e){return Object(i["a"])({url:"/schedule/stat/cb/finance/list",method:"post",data:e})},updateStatFinanceList:function(e,t){return Object(i["a"])({url:"/schedule/stat/cb/finance/"+t+"/update",method:"post",data:e,headers:{"Content-Type":"application/json; charset=utf-8"}})},exportExcelCatering:function(e){return Object(i["a"])({url:"/schedule/stat/cb/finance/export",method:"get",params:e,responseType:"arraybuffer"})}}},cd37:function(e,t,a){"use strict";a("1941")},d1da:function(e,t){e.exports="data:image/png;base64,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"},f244:function(e,t){e.exports="data:image/png;base64,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"}}]);