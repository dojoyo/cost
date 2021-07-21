(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3bc5acb8","chunk-2d22c102"],{"14a5":function(t,e,n){"use strict";n("c0d6"),n("1619");var a={};a.remove=function(){},a.set=function(t){},e["a"]=a},"1a67":function(t,e,n){},"424e":function(t,e,n){"use strict";var a=n("b775");e["a"]={getEnum:function(t){return Object(a["a"])({url:"/enum/"+t,method:"get"})},getSignList:function(t){return Object(a["a"])({url:"/contract/sign/list",method:"post",data:t})},getFormTemplateList:function(t){return Object(a["a"])({url:"/archive/template/form/list",method:"post",data:t})},getSignatureTemplateList:function(t){return Object(a["a"])({url:"/archive/template/contract/list",method:"post",data:t})},getTemplateGrants:function(t){return Object(a["a"])({url:"/archive/template/form/"+t+"/grants",method:"get"})},saveTemplateGrants:function(t,e){return Object(a["a"])({url:"/archive/template/form/"+e+"/grants/save",method:"post",data:t})},uploadTemplateFiles:function(t,e){return Object(a["a"])({url:"/archive/template/form/"+e+"/upload",method:"post",data:t})},uploadContractFiles:function(t,e){return Object(a["a"])({url:"/archive/template/contract/"+e+"/upload",method:"post",data:t})},downloadContractFiles:function(t,e){return Object(a["a"])({url:"/archive/template/contract/"+t+"/attach/"+e,method:"get",responseType:"arraybuffer"})},deleteContractFiles:function(t,e){return Object(a["a"])({url:"/archive/template/form/"+t+"/attach/"+e,method:"delete"})},downloadContractSignFile:function(t){return Object(a["a"])({url:"/contract/sign/"+t,method:"get",responseType:"arraybuffer"})},showFile:function(t){return Object(a["a"])({url:"/contract/sign/"+t+"/report",method:"get",responseType:"arraybuffer"})},cancelSign:function(t){return Object(a["a"])({url:"/contract/sign/"+t+"/cancelled",method:"put"})},recoverSign:function(t){return Object(a["a"])({url:"/contract/sign/"+t+"/recover",method:"put"})},sendMsg:function(t){return Object(a["a"])({url:"/contract/sign/"+t+"/sms",method:"put"})},resyncSign:function(t){return Object(a["a"])({url:"/public/contract/resync/sign",method:"post",data:t})},retry:function(t){return Object(a["a"])({url:"/contract/sign/"+t+"/launch/retry",method:"post"})}}},"5ca8":function(t,e,n){"use strict";n("1a67")},"5d86":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-container",[a("el-header",{staticClass:"header"},[a("div",{staticClass:"header-wrap",staticStyle:{display:"flex"}},[a("div",{staticClass:"title"},[a("i",{staticClass:"iconfont icon-dianziqianyue1"}),t._v(" 电子签约\n        ")]),a("div",{staticStyle:{"margin-left":"auto"}})])]),a("el-main",{staticClass:"main"},[a("div",{staticClass:"w-100p"},[a("el-input",{staticStyle:{width:"200px","margin-right":"20px"},attrs:{size:"medium",placeholder:"请输入合同名称或签署人"},model:{value:t.search.filter,callback:function(e){t.$set(t.search,"filter",e)},expression:"search.filter"}}),a("el-date-picker",{staticStyle:{"margin-right":"20px"},attrs:{type:"daterange","value-format":"yyyy-MM-dd","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.search.time,callback:function(e){t.$set(t.search,"time",e)},expression:"search.time"}}),a("el-select",{staticStyle:{"margin-right":"20px"},attrs:{placeholder:"请选择分类"},model:{value:t.search.contractType,callback:function(e){t.$set(t.search,"contractType",e)},expression:"search.contractType"}},t._l(t.enumType.ContractCategory,(function(t){return a("el-option",{key:t.value,attrs:{label:t.name,value:t.value}})})),1),a("el-select",{staticStyle:{"margin-right":"20px"},attrs:{placeholder:"请选择合同状态"},model:{value:t.search.signState,callback:function(e){t.$set(t.search,"signState",e)},expression:"search.signState"}},t._l(t.enumType.ContractSignState,(function(t){return a("el-option",{key:t.value,attrs:{label:t.name,value:t.value}})})),1),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.getList()}}},[t._v("查询")])],1),t.list&&t.list.length>0?a("el-table",{staticStyle:{width:"100%","margin-top":"10px"},attrs:{data:t.list,"header-cell-style":{background:"#fdfdfd"}}},[a("el-table-column",{attrs:{label:"合同名称",width:"300",prop:"contractName"}}),a("el-table-column",{attrs:{prop:"contractType.name",label:"分类",width:"120"}}),a("el-table-column",{attrs:{prop:"approvalTitle",label:"审批流程",width:"400"}}),a("el-table-column",{attrs:{prop:"signTime",label:"创建时间",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(t._f("DateTimeEn")(e.row.createTime))+"\n          ")]}}],null,!1,1201358399)}),a("el-table-column",{attrs:{prop:"signTime",label:"签订时间",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n            "+t._s(t._f("DateTimeEn")(e.row.signTime))+"\n          ")]}}],null,!1,674250376)}),a("el-table-column",{attrs:{prop:"signState.name",label:"状态",width:"80"}}),a("el-table-column",{attrs:{prop:"promoter.userName",label:"发起人",width:"120"}}),a("el-table-column",{attrs:{prop:"signer",label:"签署方",width:"120"}}),a("el-table-column",{attrs:{label:"操作",width:"145",fixed:"right","header-align":"center",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",disabled:e.row.permission&&e.row.signState&&(!e.row.permission.canDownload||"COMPLETE"!==e.row.signState.value)},on:{click:function(n){return t.downloadFile(e.row.instanceId)}}},[t._v("下载")]),a("span",{staticStyle:{padding:"0 10px"}},[t._v("|")]),a("el-dropdown",{attrs:{trigger:"click"}},[a("span",{staticClass:"el-dropdown-link",staticStyle:{cursor:"pointer"}},[t._v("\n              更多"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e.row.permission&&e.row.permission.canCancel?a("el-dropdown-item",{nativeOn:{click:function(n){return t.cancelSign(e.row.instanceId)}}},[t._v("取消签署")]):t._e(),e.row.permission&&e.row.permission.canViewReport?a("el-dropdown-item",{nativeOn:{click:function(n){return t.showFile(e.row.instanceId)}}},[t._v("存证报告")]):t._e(),e.row.permission&&e.row.permission.canNotify?a("el-dropdown-item",{nativeOn:{click:function(n){return t.sendMsg(e.row.instanceId)}}},[t._v("短信通知")]):t._e(),e.row.permission&&e.row.permission.canRecover?a("el-dropdown-item",{nativeOn:{click:function(n){return t.recoverSign(e.row.instanceId)}}},[t._v("恢复签署")]):t._e(),a("el-dropdown-item",{attrs:{disabled:!e.row.contractId},nativeOn:{click:function(n){return t.resyncSign(e.row.contractId)}}},[t._v("签署状态同步")]),e.row.contractId?t._e():a("el-dropdown-item",{nativeOn:{click:function(n){return t.retry(e.row.instanceId)}}},[t._v("发起重试")])],1)],1)]}}],null,!1,1545017007)})],1):t._e(),a("div",{staticClass:"txt-right"},[t.list&&t.list.length>0?a("el-pagination",{staticStyle:{"margin-top":"20px"},attrs:{"current-page":t.pageNum,"page-sizes":[5,10,20],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}}):t._e()],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.list&&0===t.list.length,expression:"list && list.length===0"}],staticClass:"w-100p gray",staticStyle:{"text-align":"center"}},[a("img",{attrs:{src:n("f244")}}),a("br"),a("span",{staticStyle:{"font-size":"14px"}},[t._v("暂无数据")]),a("br"),a("br")])],1)],1)},r=[],i=(n("d91d"),n("424e")),c=n("14a5"),o={name:"",components:{},props:{},data:function(){return{enumType:{},search:{time:[],contractType:"",signState:"",filter:""},list:[{}],pageNum:1,pageSize:10,total:0}},mounted:function(){c["a"].set(),this.getEnum("ContractSignState",!0),this.getEnum("ContractCategory",!0),this.getList()},destroyed:function(){c["a"].remove()},methods:{getEnum:function(t,e){var n=this;i["a"].getEnum(t).then((function(a){200===a.code&&(e&&a.data.unshift({name:"全部",value:""}),n.$set(n.enumType,t,a.data))})).catch((function(t){console.log(t)}))},getList:function(){var t=this,e={contractType:this.search.contractType,filter:this.search.filter,signState:this.search.signState,startTime:this.search.time[0],endTime:this.search.time[1],pageNum:this.pageNum,pageSize:this.pageSize};i["a"].getSignList(e).then((function(e){200===e.code&&(t.list=e.data.list,t.total=e.data.total)})).catch((function(t){console.log(t)}))},handleSizeChange:function(t){this.pageSize=t,this.pageNum=1,this.getList()},handleCurrentChange:function(t){this.pageNum=t,this.getList()},downloadFile:function(t){i["a"].downloadContractSignFile(t).then((function(t){var e=t.headers,n=decodeURIComponent(e["x-file-name"]),a=new Blob([t.data],{type:e["content-type"]}),r=document.createElement("a");r.href=window.URL.createObjectURL(a),r.download=n,r.click()})).catch((function(t){console.log(t)}))},showFile:function(t){i["a"].showFile(t).then((function(t){var e=t.headers,n=decodeURIComponent(e["x-file-name"]),a=new Blob([t.data],{type:e["content-type"]}),r=document.createElement("a");r.href=window.URL.createObjectURL(a),r.download=n,r.click()})).catch((function(t){console.log(t)}))},cancelSign:function(t){var e=this;i["a"].cancelSign(t).then((function(t){t&&200===t.code&&(e.getList(),e.$message.success({message:"取消签署操作成功！",duration:1500}))})).catch((function(t){console.log(t)}))},recoverSign:function(t){var e=this;i["a"].recoverSign(t).then((function(t){t&&200===t.code&&(e.getList(),e.$message.success({message:"恢复签署操作成功！",duration:1500}))})).catch((function(t){console.log(t)}))},sendMsg:function(t){var e=this;i["a"].sendMsg(t).then((function(t){t&&200===t.code&&e.$message.success({message:"短信发送成功！",duration:1500})})).catch((function(t){console.log(t)}))},resyncSign:function(t){var e=this,n={contractId:t};i["a"].resyncSign(n).then((function(t){t&&200===t.code&&(e.getList(),e.$message.success({message:"同步签署操作成功！",duration:1500}))})).catch((function(t){console.log(t)}))},retry:function(t){var e=this;i["a"].retry(t).then((function(t){t&&200===t.code&&(e.$message.success({message:"发起重试操作成功！",duration:1500}),e.getList())})).catch((function(t){console.log(t)}))}}},s=o,l=(n("5ca8"),n("4ac2")),u=Object(l["a"])(s,a,r,!1,null,"49323bc8",null);e["default"]=u.exports},"69b0":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},d91d:function(t,e,n){"use strict";var a=n("a86f"),r=n("69b0"),i=n("f417");n("c46f")("search",1,(function(t,e,n,c){return[function(n){var a=t(this),r=void 0==n?void 0:n[e];return void 0!==r?r.call(n,a):new RegExp(n)[e](String(a))},function(t){var e=c(n,t,this);if(e.done)return e.value;var o=a(t),s=String(this),l=o.lastIndex;r(l,0)||(o.lastIndex=0);var u=i(o,s);return r(o.lastIndex,l)||(o.lastIndex=l),null===u?-1:u.index}]}))},f244:function(t,e){t.exports="data:image/png;base64,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"}}]);