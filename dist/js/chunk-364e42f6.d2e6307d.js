(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-364e42f6","chunk-3aa25aaa","chunk-2d2082c4","chunk-2d22c102"],{"08b5":function(t,e,i){"use strict";i("fca1")},1941:function(t,e,i){},"4f52":function(t,e,i){},7218:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{"element-loading-text":"上传中("+t.loadProgress.toFixed(0)+"%)","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[t.files&&t.files.length>0&&t.list?n("div",{staticClass:"files-wrap"},t._l(t.files,(function(e,i){return n("div",{key:i,staticClass:"item"},[n("span",{staticClass:"name"},[n("i",{staticClass:"iconfont icon-fujian fs-12"}),t._v(" "+t._s(e&&e.fileName))]),t.view?n("span",{staticClass:"tips"},[n("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(i){return t.preview(e)}}},[t._v("预览")])],1):t._e(),!t.edit&&t.view&&t.down?n("span",{staticClass:"tips"},[n("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(i){return t.download(e)}}},[t._v("下载")])],1):t._e(),t.edit?n("span",{staticClass:"tips"},[n("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(e){return t.remove(i)}}},[t._v("删除")])],1):t._e()])})),0):t._e(),t.files&&0===t.files.length&&t.emptyIcon&&(!t.edit||t.edit&&"none"===t.icon)?n("div",{staticStyle:{"text-align":"center"}},[n("img",{attrs:{src:i("f244")}}),n("br"),n("span",{staticStyle:{"font-size":"14px",color:"#666"}},[t._v("暂无数据")])]):t._e(),t.edit&&"none"!==t.icon?n("el-upload",{ref:"upload",attrs:{action:t.BASE_API+t.url,headers:t.headers,"show-file-list":!1,data:{category:t.tag},accept:t.accept,multiple:!0,"auto-upload":!0,"on-change":t.onChangeFile,"on-progress":t.uploadProcess}},["images"===t.icon?n("img",{staticStyle:{width:"50px",height:"50px"},attrs:{src:i("d1da")}}):t._e(),"icon"===t.icon?n("div",{staticStyle:{"padding-left":"20px"}},[n("i",{staticClass:"iconfont icon-shangchuan fs-14"}),n("span",{staticClass:"fs-14",staticStyle:{"margin-left":"10px"}},[t._v("上传附件")])]):t._e()]):t._e(),n("el-dialog",{staticClass:"preview",attrs:{visible:t.dialogVisible,"append-to-body":!0,"show-close":!1,fullscreen:!0,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[n("div",{staticClass:"title"},[t._v("\n        "+t._s(t.fileTitle)+"\n      ")]),n("div",{staticClass:"options"},[n("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(e){t.dialogVisible=!1}}})]),n("div",{staticClass:"clear"})]),n("div",{staticStyle:{margin:"-15px"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:"image"===t.previewType,expression:"previewType==='image'"}],staticStyle:{"text-align":"center"}},[n("img",{staticClass:"image",attrs:{src:t.image}})]),t.dialogVisible&&"file"===t.previewType?n("iframe",{staticClass:"iframe w-100p",staticStyle:{border:"0"},style:{height:t.dialogHeight-78+"px"},attrs:{allowfullscreen:"",id:"filePreviewDialogVisible",src:t.urlDialog}}):t._e()])])],1)},a=[],s=(i("4057"),i("b775"),i("ed08"),i("c24f"));var o={name:"",components:{},props:{files:{type:Array,default:function(){return[]}},url:{type:String,default:function(){return"/file"}},tag:{type:String,default:function(){return""}},accept:{type:String,default:function(){return""}},edit:{type:Boolean,default:function(){return!0}},down:{type:Boolean,default:function(){return!0}},icon:{type:String,default:function(){return"images"}},list:{type:Boolean,default:function(){return!0}},emptyIcon:{type:Boolean,default:function(){return!0}},view:{type:Boolean,default:function(){return!0}},single:{type:Boolean,default:function(){return!1}}},data:function(){return{BASE_API:"https://dev-api.cgvcap.com",headers:{Authorization:"Bearer "+this.$store.state.user.user.token},loading:!1,dialogVisible:!1,previewType:"",image:"",pdf:"",height:document.body.scrollHeight-90+"px",curUploadCount:0,urlDialog:"https://preview.imm.aliyuncs.com/index.html",fileTitle:"",dialogHeight:"",loadProgress:0}},methods:{onChangeFile:function(t,e){if(this.loadProgress=0,this.loading=!0,t.response&&200===t.response.code&&t.response.data){var i=this.single?t.response.data:this.files.concat(t.response.data);this.$emit("UPLOAD_FILE",i),this.curUploadCount++,this.curUploadCount===e.length&&(this.$refs.upload.clearFiles(),this.curUploadCount=0,this.loading=!1)}},uploadProcess:function(t,e,i){this.loadProgress=t.percent},preview:function(t){var e=this;this.dialogVisible=!1,this.dialogHeight=document.body.clientHeight,this.fileTitle=t.fileName,this.urlDialog="https://preview.imm.aliyuncs.com/index.html?r="+Date.parse(new Date);var i=this.$options.filters.getFileType(t.fileName);if("pdf"===i||"ppt"===i||"excel"===i||"word"===i){this.previewType="file";var n={fileId:t.fileId,accessCode:t.accessCode};s["a"].getPreview(n).then((function(t){200===t.code&&(e.dialogVisible=!0,setTimeout((function(){e.initIframe(t.data)}),0))})).catch((function(t){console.log(t)}))}else"image"===i?(this.previewType="image",this.dialogVisible=!0,this.image="https://dev-oss.cgvcap.com/file/"+t.fileId+"/"+t.accessCode):this.$message.warning({message:"该文档暂不支持在线预览！",duration:1500})},initIframe:function(t){var e=this,i=this.$store.state.user.user.jwtClaims.un,n=this.$store.state.user.user.jwtClaims.id.substring(this.$store.state.user.user.jwtClaims.id.length-11),a=(new Date).getTime(),s=this.$options.filters.DateTimeSecondEn(a/1e3),o=i+"  "+n+"  "+s;window.sendMessage=function(t,i){var n="filePreviewDialogVisible",a=document.getElementById(n);a.contentWindow.postMessage(e.json2str({action:t,data:i}),"*")};var c=function e(i){try{var n=JSON.parse(i.data)}catch(a){return}switch(n.action){case"preview.ready":window.sendMessage("preview.init",{url:t.url,region:t.region,bucket:t.bucket,accessKeyId:t.accessKeyId,accessKeySecret:t.accessKeySecret,stsToken:t.stsToken,wmType:1,wmValue:o,wmFont:"14px",wmWidth:300,wmHeight:150,wmColor:"rgba(192,192,192,0.3)",wmRotate:-Math.PI/6,copy:1}),window.sendMessage("setConfig",{writerCustomStyle:function(t){return t?{}:{paginationDisplay:!1,fullScreenButtonDisplay:!1,containerMarginTop:0,containerMarginBottom:0,containerBackground:"#ffffff"}}}),window.removeEventListener("message",e,!1);break}};window.addEventListener("message",c,!1)},download:function(t){var e=this,i={expireSecond:""};s["a"].getShareUrl(i,t.fileId,t.accessCode).then((function(t){if(200===t.code){var e=document.createElement("a");e.href=t.data.shareUrl,e.target="_new",e.click()}})).catch((function(t){e.$message.error({message:JSON.stringify(t),duration:1500})}))},remove:function(t){var e=Object.assign({},this.files[t]);this.files.splice(t,1),this.$emit("UPLOAD_FILE",this.files),this.$emit("REMOVE_FILE",e)},hideDialog:function(){this.dialogVisible=!1,this.previewType="",this.image="",this.pdf=""},json2str:function(t){return JSON.stringify(t,(function(t,e){return"function"===typeof e&&(e=e.toString()),e}))}}},c=o,l=(i("cd37"),i("4ac2")),r=Object(l["a"])(c,n,a,!1,null,"348e4616",null);e["a"]=r.exports},8152:function(t,e,i){},"995a":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(e){return t.download()}}},[t._v("\n    全部下载 "),i("i",{staticClass:"iconfont icon-xiajiang fs-12"})])},a=[],s=(i("fc02"),i("a450"),i("b62b")),o={name:"",components:{},props:{id:String,itemId:String,bizId:String,name:String,attaches:Array},methods:{download:function(){this.attaches&&this.attaches.length>0?this.downloadAllByIds():this.downloadAll()},downloadAll:function(){var t={bizId:this.bizId};s["a"].downloadAll(t,this.id,this.itemId).then((function(t){var e=t.headers,i=decodeURIComponent(e["x-file-name"]),n=new Blob([t.data],{type:e["content-type"]}),a=document.createElement("a");a.href=window.URL.createObjectURL(n),a.download=i,a.click()})).catch((function(t){console.log(t)}))},downloadAllByIds:function(){var t=this,e=[];this.attaches.map((function(t){e.push({accessCode:t.accessCode,fileId:t.fileId})}));var i=e;s["a"].downloadAllByIds(i).then((function(e){var i=e.headers,n=decodeURIComponent(i["x-file-name"]);if(t.name){var a=n.split(".");n=t.name+"_附件."+a[a.length-1]}var s=new Blob([e.data],{type:i["content-type"]}),o=document.createElement("a");o.href=window.URL.createObjectURL(s),o.download=n,o.click()})).catch((function(t){console.log(t)}))}}},c=o,l=(i("db24"),i("4ac2")),r=Object(l["a"])(c,n,a,!1,null,"28033b7a",null);e["default"]=r.exports},a450:function(t,e,i){var n=i("bb8b").f,a=Function.prototype,s=/^\s*function ([^ (]*)/,o="name";o in a||i("26df")&&n(a,o,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(t){return""}}})},a8e4:function(t,e,i){"use strict";i("4f52")},cd37:function(t,e,i){"use strict";i("1941")},d1da:function(t,e){t.exports="data:image/png;base64,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"},db24:function(t,e,i){"use strict";i("8152")},f185:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.dialogVisible?n("div",[n("div",{staticClass:"wrap"},[n("div",{staticClass:"tips-title"},[t._v("基本信息")]),n("el-row",{staticClass:"msg-table"},[n("el-col",{staticClass:"label",attrs:{span:3}},[t._v("相关说明：")]),n("el-col",{staticClass:"content",attrs:{span:21}},[n("div",{domProps:{innerHTML:t._s(t.detail.description.replace(/\r\n/g,"<br/>").replace(/\n/g,"<br/>").replace(/\s/g,"&nbsp; "))}})])],1)],1),n("div",{staticClass:"main-wrap",staticStyle:{margin:"0"}},[n("div",{staticClass:"wrap",staticStyle:{"margin-top":"15px"}},[n("div",{staticClass:"tips-title"},[t._v("\n        协议文件\n      ")]),n("div",{staticClass:"table-wrap"},[t._m(0),t._l(t.contract,(function(e,i){return n("div",{key:i,staticClass:"content"},[n("div",{staticClass:"file-item",staticStyle:{width:"50%"}},[t._v("\n            "+t._s(e.templateName)+"\n            "),n("span",{directives:[{name:"show",rawName:"v-show",value:"DRAFT"!==e.signState.value,expression:"item.signState.value!=='DRAFT'"}],staticClass:"tags",class:{blue:"DRAFT"===e.signState.value,orange:"SIGNING"===e.signState.value,green:"COMPLETE"===e.signState.value}},[t._v("\n            "+t._s(e.signState.name)+"\n          ")])]),n("div",{staticStyle:{width:"18%","justify-content":"center"}},[t._v(t._s(e.signType&&e.signType.name))]),n("div",{staticStyle:{width:"17%",display:"block"}},t._l(e.signers,(function(i,a){return n("span",{key:a},[t._v("\n                  "+t._s(i.signerName)),n("b",{directives:[{name:"show",rawName:"v-show",value:a!==e.signers.length-1,expression:"sIndex!==(item.signers.length-1)"}]},[t._v("&")])])})),0),n("div",{staticStyle:{width:"15%","justify-content":"center"}},[n("el-button",{attrs:{type:"text"},on:{click:function(i){return t.downLoad(e)}}},[t._v("下载")])],1)])})),t.contract&&0===t.contract.length?n("div",{staticClass:"content empty"},[n("img",{attrs:{src:i("f244")}}),n("span",{staticStyle:{"font-size":"14px",width:"100%"}},[t._v("暂无数据")])]):t._e()],2)])])]):t._e()},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"header"},[i("div",{staticStyle:{width:"50%"}},[t._v("附件名称")]),i("div",{staticStyle:{width:"18%","text-align":"center"}},[t._v("签署方式")]),i("div",{staticStyle:{width:"17%","text-align":"center"}},[t._v("签署方")]),i("div",{staticStyle:{width:"15%","text-align":"center"}},[t._v("操作")])])}],s=i("b429"),o=i("b62b"),c=i("7218"),l=i("995a"),r={name:"",components:{fileUpload:c["a"],download:l["default"]},props:{title:String},data:function(){return{enumType:{},dialogVisible:!1,detail:{},height:"",approval:{id:"",visible:!1},type:"",contract:[]}},mounted:function(){this.height=document.body.clientHeight-200+"px"},methods:{show:function(t,e){this.type=t,this.initParamsByBiz(e)},hideDialog:function(){this.dialogVisible=!1},initParamsByBiz:function(t){var e=this;s["a"].getFormDetail("form/electronic",t).then((function(i){200===i.code&&(e.detail=i.data,e.getContractList(t),e.dialogVisible=!0)})).catch((function(t){console.log(t)}))},getContractList:function(t){var e=this;this.contract=[];var i={bizId:t,bizType:"EL01"};o["a"].getContractList(i).then((function(t){200===t.code&&(e.contract=t.data)})).catch((function(t){console.log(t)}))},downLoad:function(t){var e=t.signState&&"COMPLETE"===t.signState.value&&t.signType&&"PS"!==t.signType.value?"downloadSigned":"downloadTemplate";s["a"].downloadAgreementTemplate(t.agreementId,e).then((function(e){var i=e.headers,n=t.templateName,a=new Blob([e.data],{type:i["content-type"]}),s=document.createElement("a");s.href=window.URL.createObjectURL(a),s.download=n,s.click()})).catch((function(t){console.log(t)}))}}},d=r,g=(i("a8e4"),i("08b5"),i("4ac2")),u=Object(g["a"])(d,n,a,!1,null,"6c134e78",null);e["default"]=u.exports},f244:function(t,e){t.exports="data:image/png;base64,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"},fca1:function(t,e,i){}}]);