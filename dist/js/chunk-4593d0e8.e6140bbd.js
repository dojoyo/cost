(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4593d0e8","chunk-06be487e","chunk-d81f416c","chunk-2d22c102"],{1941:function(e,t,i){},"328f":function(e,t,i){"use strict";var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"users-wrap"},[e._l(e.users,(function(t,s){return i("div",{key:s,staticClass:"avatar",class:{step:e.step,last:s===e.users.length-1}},[i("span",{staticClass:"close",on:{click:function(e){e.stopPropagation()}}},[i("i",{directives:[{name:"show",rawName:"v-show",value:e.edit,expression:"edit"}],staticClass:"iconfont icon-guanbi",on:{click:function(t){return e.removeUser(s)}}})]),i("el-tooltip",{attrs:{content:t.userName,effect:"dark",placement:"top"}},[i("avatar",{attrs:{user:t}})],1),e.tags?i("div",{staticStyle:{"line-height":"16px","padding-top":"8px"}},[e._v(e._s(t.userTag||t.userName))]):e._e(),i("div",{staticClass:"line"})],1)})),i("div",{directives:[{name:"show",rawName:"v-show",value:e.edit,expression:"edit"}]},[i("i",{staticClass:"iconfont icon-tianjia pointer fs-22",on:{click:function(t){return e.showMemberTransfer("transfer")}}})]),i("members-transfer",{ref:"transfer",attrs:{multi:e.multi,role:e.role,step:e.step,users:e.users,invest:e.invest},on:{SAVE_USERS:e.setUsers}})],2)},a=[],n=i("7150"),l=i("8995"),o={components:{avatar:n["a"],membersTransfer:l["a"]},model:{prop:"users",event:"change"},props:{users:Array,step:{type:Boolean,default:function(){return!1}},edit:{type:Boolean,default:function(){return!0}},multi:{type:Boolean,default:function(){return!0}},placement:{type:String,default:function(){return"top"}},role:{type:Boolean,default:function(){return!1}},tags:{type:Boolean,default:function(){return!1}},invest:{type:Boolean,default:function(){return!1}}},computed:{},data:function(){return{}},methods:{setUsers:function(e){this.$emit("change",e),this.$emit("SET_USERS",e)},showMemberTransfer:function(e){this.$refs[""+e].show()},removeUser:function(e){var t=this.users;t.splice(e,1)}}},r=o,c=(i("44df"),i("4ac2")),u=Object(c["a"])(r,s,a,!1,null,"45d72c07",null);t["a"]=u.exports},"44df":function(e,t,i){"use strict";i("bfe1")},7218:function(e,t,i){"use strict";var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{"element-loading-text":"上传中("+e.loadProgress.toFixed(0)+"%)","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[e.files&&e.files.length>0&&e.list?s("div",{staticClass:"files-wrap"},e._l(e.files,(function(t,i){return s("div",{key:i,staticClass:"item"},[s("span",{staticClass:"name"},[s("i",{staticClass:"iconfont icon-fujian fs-12"}),e._v(" "+e._s(t&&t.fileName))]),e.view?s("span",{staticClass:"tips"},[s("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(i){return e.preview(t)}}},[e._v("预览")])],1):e._e(),!e.edit&&e.view&&e.down?s("span",{staticClass:"tips"},[s("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(i){return e.download(t)}}},[e._v("下载")])],1):e._e(),e.edit?s("span",{staticClass:"tips"},[s("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(t){return e.remove(i)}}},[e._v("删除")])],1):e._e()])})),0):e._e(),e.files&&0===e.files.length&&e.emptyIcon&&(!e.edit||e.edit&&"none"===e.icon)?s("div",{staticStyle:{"text-align":"center"}},[s("img",{attrs:{src:i("f244")}}),s("br"),s("span",{staticStyle:{"font-size":"14px",color:"#666"}},[e._v("暂无数据")])]):e._e(),e.edit&&"none"!==e.icon?s("el-upload",{ref:"upload",attrs:{action:e.BASE_API+e.url,headers:e.headers,"show-file-list":!1,data:{category:e.tag},accept:e.accept,multiple:!0,"auto-upload":!0,"on-change":e.onChangeFile,"on-progress":e.uploadProcess}},["images"===e.icon?s("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:i("d1da")}}):e._e(),"icon"===e.icon?s("div",{staticStyle:{"padding-left":"20px"}},[s("i",{staticClass:"iconfont icon-shangchuan fs-14"}),s("span",{staticClass:"fs-14",staticStyle:{"margin-left":"10px"}},[e._v("上传附件")])]):e._e()]):e._e(),s("el-dialog",{staticClass:"preview",attrs:{visible:e.dialogVisible,"append-to-body":!0,"show-close":!1,fullscreen:!0,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[s("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[s("div",{staticClass:"title"},[e._v("\n        "+e._s(e.fileTitle)+"\n      ")]),s("div",{staticClass:"options"},[s("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(t){e.dialogVisible=!1}}})]),s("div",{staticClass:"clear"})]),s("div",{staticStyle:{margin:"-15px"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:"image"===e.previewType,expression:"previewType==='image'"}],staticStyle:{"text-align":"center"}},[s("img",{staticClass:"image",attrs:{src:e.image}})]),e.dialogVisible&&"file"===e.previewType?s("iframe",{staticClass:"iframe w-100p",staticStyle:{border:"0"},style:{height:e.dialogHeight-78+"px"},attrs:{allowfullscreen:"",id:"filePreviewDialogVisible",src:e.urlDialog}}):e._e()])])],1)},a=[],n=(i("4057"),i("b775"),i("ed08"),i("c24f"));var l={name:"",components:{},props:{files:{type:Array,default:function(){return[]}},url:{type:String,default:function(){return"/file"}},tag:{type:String,default:function(){return""}},accept:{type:String,default:function(){return""}},edit:{type:Boolean,default:function(){return!0}},down:{type:Boolean,default:function(){return!0}},icon:{type:String,default:function(){return"images"}},list:{type:Boolean,default:function(){return!0}},emptyIcon:{type:Boolean,default:function(){return!0}},view:{type:Boolean,default:function(){return!0}},single:{type:Boolean,default:function(){return!1}}},data:function(){return{BASE_API:"https://dev-api.cgvcap.com",headers:{Authorization:"Bearer "+this.$store.state.user.user.token},loading:!1,dialogVisible:!1,previewType:"",image:"",pdf:"",height:document.body.scrollHeight-90+"px",curUploadCount:0,urlDialog:"https://preview.imm.aliyuncs.com/index.html",fileTitle:"",dialogHeight:"",loadProgress:0}},methods:{onChangeFile:function(e,t){if(this.loadProgress=0,this.loading=!0,e.response&&200===e.response.code&&e.response.data){var i=this.single?e.response.data:this.files.concat(e.response.data);this.$emit("UPLOAD_FILE",i),this.curUploadCount++,this.curUploadCount===t.length&&(this.$refs.upload.clearFiles(),this.curUploadCount=0,this.loading=!1)}},uploadProcess:function(e,t,i){this.loadProgress=e.percent},preview:function(e){var t=this;this.dialogVisible=!1,this.dialogHeight=document.body.clientHeight,this.fileTitle=e.fileName,this.urlDialog="https://preview.imm.aliyuncs.com/index.html?r="+Date.parse(new Date);var i=this.$options.filters.getFileType(e.fileName);if("pdf"===i||"ppt"===i||"excel"===i||"word"===i){this.previewType="file";var s={fileId:e.fileId,accessCode:e.accessCode};n["a"].getPreview(s).then((function(e){200===e.code&&(t.dialogVisible=!0,setTimeout((function(){t.initIframe(e.data)}),0))})).catch((function(e){console.log(e)}))}else"image"===i?(this.previewType="image",this.dialogVisible=!0,this.image="https://dev-oss.cgvcap.com/file/"+e.fileId+"/"+e.accessCode):this.$message.warning({message:"该文档暂不支持在线预览！",duration:1500})},initIframe:function(e){var t=this,i=this.$store.state.user.user.jwtClaims.un,s=this.$store.state.user.user.jwtClaims.id.substring(this.$store.state.user.user.jwtClaims.id.length-11),a=(new Date).getTime(),n=this.$options.filters.DateTimeSecondEn(a/1e3),l=i+"  "+s+"  "+n;window.sendMessage=function(e,i){var s="filePreviewDialogVisible",a=document.getElementById(s);a.contentWindow.postMessage(t.json2str({action:e,data:i}),"*")};var o=function t(i){try{var s=JSON.parse(i.data)}catch(a){return}switch(s.action){case"preview.ready":window.sendMessage("preview.init",{url:e.url,region:e.region,bucket:e.bucket,accessKeyId:e.accessKeyId,accessKeySecret:e.accessKeySecret,stsToken:e.stsToken,wmType:1,wmValue:l,wmFont:"14px",wmWidth:300,wmHeight:150,wmColor:"rgba(192,192,192,0.3)",wmRotate:-Math.PI/6,copy:1}),window.sendMessage("setConfig",{writerCustomStyle:function(e){return e?{}:{paginationDisplay:!1,fullScreenButtonDisplay:!1,containerMarginTop:0,containerMarginBottom:0,containerBackground:"#ffffff"}}}),window.removeEventListener("message",t,!1);break}};window.addEventListener("message",o,!1)},download:function(e){var t=this,i={expireSecond:""};n["a"].getShareUrl(i,e.fileId,e.accessCode).then((function(e){if(200===e.code){var t=document.createElement("a");t.href=e.data.shareUrl,t.target="_new",t.click()}})).catch((function(e){t.$message.error({message:JSON.stringify(e),duration:1500})}))},remove:function(e){var t=Object.assign({},this.files[e]);this.files.splice(e,1),this.$emit("UPLOAD_FILE",this.files),this.$emit("REMOVE_FILE",t)},hideDialog:function(){this.dialogVisible=!1,this.previewType="",this.image="",this.pdf=""},json2str:function(e){return JSON.stringify(e,(function(e,t){return"function"===typeof t&&(t=t.toString()),t}))}}},o=l,r=(i("cd37"),i("4ac2")),c=Object(r["a"])(o,s,a,!1,null,"348e4616",null);t["a"]=c.exports},8115:function(e,t,i){},bfe1:function(e,t,i){},cd37:function(e,t,i){"use strict";i("1941")},d1da:function(e,t){e.exports="data:image/png;base64,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"},d7ca:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{attrs:{visible:e.dialogVisible,width:"450px","append-to-body":!0,"show-close":!1,top:"50px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[i("i",{staticClass:"iconfont icon-xiangmuguanli"}),e._v(" 添加"+e._s(e.title)+"\n    ")]),i("div",{staticClass:"options",staticStyle:{display:"flex","align-items":"center"}},[i("el-button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(t){return e.submit("save")}}},[e._v("确认")]),i("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(t){return e.hideDialog()}}})],1),i("div",{staticClass:"clear"})]),i("div",{staticClass:"main-wrap"},[i("el-scrollbar",{style:{height:e.height}},[i("div",{staticClass:"wrap"},[i("el-row",[i("el-col",{attrs:{span:5}},[i("div",{staticStyle:{display:"flex","align-items":"center",height:"32px"}},[e._v("\n              内部人员\n            ")])]),i("el-col",{attrs:{span:19}},[i("div",{staticStyle:{display:"flex","align-items":"center","min-height":"32px"}},[e.detail.users?i("user-select",{attrs:{users:e.detail.users},on:{SET_USERS:function(t){e.detail.users=t}}}):e._e()],1)])],1),i("el-divider"),i("el-row",{staticStyle:{"margin-top":"20px"}},[i("el-col",{attrs:{span:5}},[e._v("外部人员")]),i("el-col",{staticStyle:{"text-align":"right"},attrs:{span:19}},[i("el-button",{attrs:{type:"text"},on:{click:e.addOut}},[e._v("添加外部人员")])],1)],1),i("draggable",{staticStyle:{padding:"0",margin:"0"},attrs:{element:"ul"},model:{value:e.detail.outers,callback:function(t){e.$set(e.detail,"outers",t)},expression:"detail.outers"}},e._l(e.detail.outers,(function(t,s){return i("li",{key:s,staticClass:"drag-wrap"},[i("el-form",{staticStyle:{"margin-top":"20px"},attrs:{"label-width":"70px"}},[i("el-form-item",{staticStyle:{"margin-bottom":"10px"},attrs:{label:"姓名",rules:{required:!0,message:"请输入姓名"}}},[i("el-input",{model:{value:t.userName,callback:function(i){e.$set(t,"userName",i)},expression:"item.userName"}})],1),i("el-form-item",{attrs:{label:"邮箱"}},[i("el-input",{model:{value:t.userEmail,callback:function(i){e.$set(t,"userEmail",i)},expression:"item.userEmail"}})],1)],1),i("el-button",{staticClass:"close",attrs:{type:"text"},on:{click:function(t){return e.removeList(s)}}},[i("i",{staticClass:"iconfont icon-bohui"})])],1)})),0)],1)])],1)])},a=[],n=(i("b62b"),i("328f")),l=i("4468"),o=i("7218"),r=i("3335"),c=i.n(r),u=i("ed08"),d={name:"",components:{userSelect:n["a"],avatarUpload:l["a"],fileUpload:o["a"],draggable:c.a},props:{title:String},data:function(){return{dialogVisible:!1,detail:{users:[],outers:[]},height:""}},mounted:function(){this.height=document.body.clientHeight-200+"px"},methods:{show:function(e){this.detail=u["a"].deepCopy(e),this.dialogVisible=!0},hideDialog:function(){this.dialogVisible=!1},submit:function(e){console.log(this.detail),this.$emit("SET_USER_FORM",this.detail),this.hideDialog()},addOut:function(){this.detail.outers=this.detail.outers||[],this.detail.outers.push({name:"",email:""})},removeList:function(e){this.detail.outers.splice(e,1)}}},g=d,p=(i("e364"),i("4ac2")),f=Object(p["a"])(g,s,a,!1,null,"fc0e2320",null);t["default"]=f.exports},e364:function(e,t,i){"use strict";i("8115")},f244:function(e,t){e.exports="data:image/png;base64,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"}}]);