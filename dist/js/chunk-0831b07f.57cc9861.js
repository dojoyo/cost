(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0831b07f","chunk-2d22c102"],{"303c":function(e,t,s){},"5a2c":function(e,t,s){"use strict";s("afe8")},"5b86":function(e,t,s){"use strict";s("303c")},"886e":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",[n("el-header",{staticClass:"header"},[n("div",{staticClass:"header-wrap"},[n("div",{staticClass:"title"},[n("i",{staticClass:"iconfont icon-guanwang_normal"}),e._v(" 官网管理\n      ")]),n("div",{staticClass:"fr relative"},[n("el-button",{staticClass:"mr-10",attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.getDetail()}}},[e._v("+新建文章")])],1)])]),n("el-main",{staticClass:"main",staticStyle:{"overflow-x":"hidden"}},[n("el-row",[n("el-col",{staticClass:"table-tab-header",attrs:{span:24}},[n("div",{staticClass:"tab-button",class:{on:"N"===e.newsType},staticStyle:{"margin-left":"20px"},on:{click:function(t){return e.getList("N")}}},[e._v("公司新闻")]),n("div",{staticClass:"tab-button",class:{on:"R"===e.newsType},staticStyle:{"margin-left":"48px"},on:{click:function(t){return e.getList("R")}}},[e._v("行业研究")]),n("div",{staticClass:"tab-button",class:{on:"Z"===e.newsType},staticStyle:{"margin-right":"auto","margin-left":"48px"},on:{click:function(t){return e.getList("Z")}}},[e._v("工作机会")]),n("div",{staticClass:"switch-button-left",class:{on:"PB"===e.newsState},staticStyle:{"margin-left":"20px"},on:{click:function(t){return e.getList("","PB")}}},[e._v("已发布")]),n("div",{directives:[{name:"show",rawName:"v-show",value:"PB"===e.newsState||"RV"===e.newsState,expression:"newsState==='PB' || newsState==='RV'"}],staticStyle:{width:"1px",height:"36px",background:"#3C6CBA"}}),n("div",{directives:[{name:"show",rawName:"v-show",value:"DR"===e.newsState||"DL"===e.newsState,expression:"newsState==='DR' || newsState==='DL'"}],staticStyle:{width:"1px",height:"36px",background:"#8C8C8C"}}),n("div",{staticClass:"switch-button",class:{on:"RV"===e.newsState},on:{click:function(t){return e.getList("","RV")}}},[e._v("已撤回")]),n("div",{directives:[{name:"show",rawName:"v-show",value:"RV"===e.newsState||"DR"===e.newsState,expression:"newsState==='RV' || newsState==='DR'"}],staticStyle:{width:"1px",height:"36px",background:"#3C6CBA"}}),n("div",{directives:[{name:"show",rawName:"v-show",value:"PB"===e.newsState||"DL"===e.newsState,expression:"newsState==='PB' || newsState==='DL'"}],staticStyle:{width:"1px",height:"36px",background:"#8C8C8C"}}),n("div",{staticClass:"switch-button",class:{on:"DR"===e.newsState},on:{click:function(t){return e.getList("","DR")}}},[e._v("草稿")]),n("div",{directives:[{name:"show",rawName:"v-show",value:"DR"===e.newsState||"DL"===e.newsState,expression:"newsState==='DR' || newsState==='DL'"}],staticStyle:{width:"1px",height:"36px",background:"#3C6CBA"}}),n("div",{directives:[{name:"show",rawName:"v-show",value:"PB"===e.newsState||"RV"===e.newsState,expression:"newsState==='PB' || newsState==='RV'"}],staticStyle:{width:"1px",height:"36px",background:"#8C8C8C"}}),n("div",{staticClass:"switch-button-right",class:{on:"DL"===e.newsState},staticStyle:{"margin-right":"20px"},on:{click:function(t){return e.getList("","DL")}}},[e._v("已删除")])]),n("el-col",{attrs:{span:24}},[e.list&&e.list.length>0?n("el-table",{staticStyle:{width:"100%","margin-top":"10px","margin-bottom":"15px"},attrs:{data:e.list,"cell-style":{cursor:"pointer"},"header-cell-style":{background:"#fdfdfd"}}},[n("el-table-column",{attrs:{prop:"title",label:"标题"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{staticStyle:{width:"100%",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[e._v("\n                "+e._s(t.row.title)+"\n              ")])]}}],null,!1,2917525090)}),n("el-table-column",{attrs:{prop:"author",label:"来源",width:"250"}}),n("el-table-column",{attrs:{prop:"publishDate",label:"发表时间",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("div",{staticStyle:{width:"100%",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[e._v("\n                "+e._s(t.row.time.substring(0,10))+"\n              ")])]}}],null,!1,2814721396)}),n("el-table-column",{attrs:{prop:"",label:"操作",width:"150","header-align":"center",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{staticClass:"primary",attrs:{type:"text"},nativeOn:{click:function(s){return s.preventDefault(),e.getDetail(t.row.newsId)}}},[e._v("编辑")]),n("el-button",{directives:[{name:"show",rawName:"v-show",value:"RV"===e.newsState||"DR"===e.newsState,expression:"newsState==='RV' || newsState==='DR'"}],staticClass:"primary",attrs:{type:"text"},nativeOn:{click:function(s){return s.preventDefault(),e.publishNews(t.row)}}},[e._v("发布")]),n("el-button",{directives:[{name:"show",rawName:"v-show",value:"PB"===e.newsState,expression:"newsState==='PB'"}],staticClass:"primary",attrs:{type:"text"},nativeOn:{click:function(s){return s.preventDefault(),e.revokeNews(t.row)}}},[e._v("撤销")]),n("el-button",{directives:[{name:"show",rawName:"v-show",value:"DL"!==e.newsState,expression:"newsState!=='DL'"}],staticClass:"primary",attrs:{type:"text"},nativeOn:{click:function(s){return s.preventDefault(),e.deleteNews(t.row)}}},[e._v("删除")]),n("el-button",{directives:[{name:"show",rawName:"v-show",value:"DL"===e.newsState,expression:"newsState==='DL'"}],staticClass:"primary",attrs:{type:"text"},nativeOn:{click:function(s){return s.preventDefault(),e.physicalDelete(t.row)}}},[e._v("移除")])]}}],null,!1,3183524583)})],1):e._e(),n("div",{staticClass:"txt-right"},[e.list&&e.list.length>0?n("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":e.pageNum,"page-sizes":[5,10,20],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e()],1),n("div",{directives:[{name:"show",rawName:"v-show",value:e.list&&0===e.list.length,expression:"list && list.length===0"}],staticClass:"w-100p gray",staticStyle:{"text-align":"center"}},[n("img",{attrs:{src:s("f244")}}),n("br"),n("span",{staticStyle:{"font-size":"14px"}},[e._v("暂无"),n("span",{directives:[{name:"show",rawName:"v-show",value:"N"===e.newsType,expression:"newsType==='N'"}]},[e._v("数据")]),n("span",{directives:[{name:"show",rawName:"v-show",value:"R"===e.newsType,expression:"newsType==='R'"}]},[e._v("研究")]),n("span",{directives:[{name:"show",rawName:"v-show",value:"Z"===e.newsType,expression:"newsType==='Z'"}]},[e._v("工作")])]),n("br"),n("br")])],1)],1)],1),n("el-dialog",{staticClass:"target-wrap table-wrap",attrs:{visible:e.dialogVisible,width:"850px","show-close":!1,top:"50px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[n("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[n("div",{staticClass:"title"},[n("i",{staticClass:"iconfont icon-guanwang_normal primary"}),e._v(" "+e._s(e.news.newsId?"编辑文章":"新建文章")+"\n      ")]),n("div",{staticClass:"options"},[n("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(t){e.dialogVisible=!1}}})]),n("div",{staticClass:"clear"})]),n("el-row",{directives:[{name:"loading",rawName:"v-loading",value:e.uillUpdateImg,expression:"uillUpdateImg"}]},[n("el-col",{attrs:{span:24}},[n("el-form",{ref:"form",staticStyle:{"margin-top":"20px"},attrs:{model:e.news,"label-width":"80px"}},[n("el-form-item",{attrs:{label:"标题",prop:"title",rules:{required:!0,message:"请输入标题"}}},[n("el-input",{attrs:{placeholder:"请输入标题"},model:{value:e.news.title,callback:function(t){e.$set(e.news,"title",t)},expression:"news.title"}})],1),n("el-form-item",{staticStyle:{float:"left",width:"30%"},attrs:{label:"作者",prop:"author",rules:{required:!0,message:"请输入作者"}}},[n("el-input",{attrs:{placeholder:"请输入作者"},model:{value:e.news.author,callback:function(t){e.$set(e.news,"author",t)},expression:"news.author"}})],1),n("el-form-item",{staticStyle:{float:"left",width:"30%","margin-left":"5%"},attrs:{label:"类型",prop:"newsType",rules:{required:!0,message:"请选择类型"}}},[n("el-select",{staticClass:"w-100p",attrs:{placeholder:"请选择类型"},model:{value:e.news.newsType,callback:function(t){e.$set(e.news,"newsType",t)},expression:"news.newsType"}},e._l(e.newsTypeList,(function(e){return n("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),n("el-form-item",{staticStyle:{float:"left",width:"30%","margin-left":"5%"},attrs:{label:"时间"}},[n("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"请输入发布时间"},model:{value:e.news.publishDate,callback:function(t){e.$set(e.news,"publishDate",t)},expression:"news.publishDate"}})],1),n("div",{staticClass:"clear"}),n("el-form-item",{attrs:{label:"摘要"}},[n("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入摘要"},model:{value:e.news.summary,callback:function(t){e.$set(e.news,"summary",t)},expression:"news.summary"}})],1),n("el-form-item",{attrs:{label:"封面图",prop:"coverImg",rules:{required:!0,message:"请上传封面图片"}}},[e.news.coverImg?n("img",{staticClass:"cover",attrs:{src:e.news.coverImg}}):e._e(),n("el-upload",{ref:"upload",attrs:{action:e.uploadURL,headers:e.headers,limit:1,"show-file-list":!1,"on-change":e.onChangeFile}},[n("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])],1)],1),n("el-form-item",{attrs:{label:"内容",prop:"content",rules:{required:!0,message:"请填写内容！"}}},[n("quill-editor",{ref:"myQuillEditor",attrs:{options:e.editorOption},model:{value:e.news.content,callback:function(t){e.$set(e.news,"content",t)},expression:"news.content"}})],1),n("el-form-item",{attrs:{label:""}},[n("div",{staticClass:"w-100p",staticStyle:{"text-align":"right"}},[n("el-button",{attrs:{type:"text"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")]),n("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.news.newsId,expression:"!news.newsId"}],attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.save()}}},[e._v("保存为草稿")]),n("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.news.newsId,expression:"!news.newsId"}],attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.save(!0)}}},[e._v("保存并发布")]),n("el-button",{directives:[{name:"show",rawName:"v-show",value:e.news.newsId,expression:"news.newsId"}],attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.edit()}}},[e._v("保存")])],1)])],1)],1)],1)],1),n("el-upload",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],ref:"uploadImg",attrs:{id:"quill-upload",action:e.uploadURL,headers:e.headers,limit:1,"show-file-list":!1,"before-upload":e.beforeUpload,"on-error":e.uploadError,"on-success":e.handleExceed}})],1)},i=[],a=s("caaf"),l=s.n(a),o=s("b775"),r={getList:function(e){return Object(o["a"])({url:"/website/news/page",method:"post",data:e})},getDetail:function(e){return Object(o["a"])({url:"/website/news/"+e,method:"post"})},deleteNews:function(e){return Object(o["a"])({url:"/website/news/"+e+"/delete",method:"post"})},physicalDelete:function(e){return Object(o["a"])({url:"/website/news/"+e+"/physicalDelete",method:"post"})},publishNews:function(e,t){return Object(o["a"])({url:"/website/news/"+t+"/publish",method:"post"})},revokeNews:function(e){return Object(o["a"])({url:"/website/news/"+e+"/revoke",method:"post"})},addNews:function(e){return Object(o["a"])({url:"/website/news/add",method:"post",data:e})},editNews:function(e,t){return Object(o["a"])({url:"/website/news/"+t+"/edit",method:"post",data:e})}},c=(s("121a"),s("7e41"),s("96be"),s("b881")),u={components:{quillEditor:c["quillEditor"]},computed:{editor:function(){return this.$refs.myQuillEditor.quill}},data:function(){return{list:[],pageSize:10,pageNum:1,total:0,newsType:"N",newsTypeList:[{name:"公司新闻",value:"N"},{name:"行业研究",value:"R"},{name:"工作机会",value:"Z"}],newsState:"PB",entCode:"cgvc",uillUpdateImg:!1,editorOption:{placeholder:"",theme:"snow",modules:{toolbar:{container:[["bold"],["italic"],["underline"],["strike"],["blockquote"],["code-block"],["link"],["image"],[{list:"ordered"},{list:"bullet"}],[{align:[]}],["clean"]],handlers:{image:function(e){e?document.querySelector("#quill-upload input").click():this.quill.format("image",!1)}}}}},news:{content:""},baseAPI:"https://dev-api.cgvcap.com",uploadURL:"https://dev-api.cgvcap.com/website/news/img/upload",headers:{Authorization:"Bearer "+this.$store.state.user.user.token},dialogVisible:!1}},mounted:function(){this.getList()},methods:{getList:function(e,t,s){var n=this;this.newsType=e||this.newsType,this.newsState=t||this.newsState,s||(this.pageNum=1,this.pageSize=10);var i={entCode:this.entCode,newsState:this.newsState,newsType:this.newsType,pageNum:this.pageNum,pageSize:this.pageSize};r.getList(i).then((function(e){if(200===e.code){for(var t in e.data.list)e.data.list[t].time=n.$options.filters["DateTimeSecondEn"](e.data.list[t].publishDate);n.list=e.data.list,n.total=e.data.total}})).catch((function(e){console.log(e)}))},handleCurrentChange:function(e){this.pageNum=e,this.getList("","",!0)},handleSizeChange:function(e){this.pageSize=e,this.pageNum=1,this.getList("","",!0)},getDetail:function(e){var t=this;e?r.getDetail(e).then((function(e){200===e.code&&(e.data.newsType=e.data.newsType.value,e.data.publishDate=l()(1e3*e.data.publishDate).format("YYYY-MM-DD"),t.news=e.data,t.dialogVisible=!0)})).catch((function(e){console.log(e)})):(this.news={content:""},this.dialogVisible=!0)},deleteNews:function(e){var t=this;this.$confirm("即将删除《"+e.title+"》，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){r.deleteNews(e.newsId).then((function(e){200===e.code&&(t.$message.success({message:"文章删除成功！",duration:1500}),t.getList())})).catch((function(e){console.log(e)}))})).catch((function(e){}))},physicalDelete:function(e){var t=this;this.$confirm("即将移除《"+e.title+"》，移除属于物理删除，无法恢复，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){r.physicalDelete(e.newsId).then((function(e){200===e.code&&(t.$message.success({message:"文章移除成功！",duration:1500}),t.getList())})).catch((function(e){console.log(e)}))})).catch((function(e){}))},publishNews:function(e){var t=this;this.$confirm("即将发布《"+e.title+"》，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var s={publishDate:t.news.publishDate||l()().format("YYYY-MM-DD")};r.publishNews(s,e.newsId).then((function(e){200===e.code&&(t.$message.success({message:"文章发布成功！",duration:1500}),t.getList())})).catch((function(e){console.log(e)}))})).catch((function(e){}))},revokeNews:function(e){var t=this;this.$confirm("即将撤销《"+e.title+"》，是否继续？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){r.revokeNews(e.newsId).then((function(e){200===e.code&&(t.$message.success({message:"文章撤销成功！",duration:1500}),t.getList())})).catch((function(e){console.log(e)}))})).catch((function(e){}))},preview:function(e){var t="http://localhost:63342/CGVC/preview.html&id="+e+"token="+this.$store.state.user.user.token;window.open(t,"_blank")},save:function(e){var t=this;if(this.news.author&&this.news.content&&this.news.coverImg&&this.news.newsType&&this.news.title){var s={author:this.news.author,content:this.news.content,coverImg:this.news.coverImg,newsType:this.news.newsType,summary:this.news.summary,title:this.news.title,publishDate:this.news.publishDate||l()().format("YYYY-MM-DD")};r.addNews(s).then((function(s){if(200===s.code)if(e){var n={publishDate:t.news.publishDate||l()().format("YYYY-MM-DD")};r.publishNews(n,s.data).then((function(e){200===e.code&&(t.$message.success({message:"文章保存并发布成功！",duration:1500}),t.getList(),t.dialogVisible=!1)})).catch((function(e){console.log(e)}))}else t.$message.success({message:"文章保存为草稿！",duration:1500}),t.getList(),t.dialogVisible=!1})).catch((function(e){console.log(e)}))}else this.$message.warning({message:"请输入文章必填项目！",duration:1500})},beforeUpload:function(){this.uillUpdateImg=!0},uploadError:function(){this.uillUpdateImg=!1,this.$message.error("图片插入失败")},handleExceed:function(e,t,s){var n=this.$refs.myQuillEditor.quill;if(200===e.code){var i=n.getSelection().index;n.insertEmbed(i,"image",e.data),n.setSelection(i+1)}else this.$message.error("图片插入失败");this.uillUpdateImg=!1,this.$refs.uploadImg.clearFiles()},onChangeFile:function(e){var t=this;console.log(e),e.response&&200===e.response.code&&e.response.data&&(this.$set(this.news,"coverImg",""),setTimeout((function(){t.$set(t.news,"coverImg",e.response.data),t.$refs.upload.clearFiles()}),300))},edit:function(){var e=this;if(this.news.author&&this.news.content&&this.news.coverImg&&this.news.newsType&&this.news.title){var t={author:this.news.author,content:this.news.content,coverImg:this.news.coverImg,newsType:this.news.newsType,summary:this.news.summary,title:this.news.title,publishDate:this.news.publishDate||l()().format("YYYY-MM-DD")};r.editNews(t,this.news.newsId).then((function(t){200===t.code&&(e.$message.success({message:"文章编辑成功！",duration:1500}),e.getList(),e.dialogVisible=!1)})).catch((function(e){console.log(e)}))}else this.$message.warning({message:"请输入文章必填项目！",duration:1500})}}},w=u,d=(s("5a2c"),s("5b86"),s("4ac2")),h=Object(d["a"])(w,n,i,!1,null,"2fc6e6ba",null);t["default"]=h.exports},afe8:function(e,t,s){},f244:function(e,t){e.exports="data:image/png;base64,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"}}]);