(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3fd2203c","chunk-0ef90e38","chunk-2d0e4a8c"],{"0e50":function(e,t,a){"use strict";a("b761")},3087:function(e,t,a){"use strict";a("bca3")},4047:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("el-dialog",{attrs:{visible:e.dialogVisible,width:"850px","append-to-body":!0,"show-close":!1,top:"50px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[i("div",{staticClass:"title"},[i("i",{staticClass:"iconfont icon-xiangmuguanli"}),e._v(" "+e._s(e.detail.bizForm&&e.detail.bizForm.itemName||"投决会申请")+"\n      ")]),i("div",{staticClass:"options",staticStyle:{display:"flex","align-items":"center"}},[i("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.approveDetail.approvalId,expression:"!approveDetail.approvalId"}],attrs:{type:"default",size:"small"},on:{click:function(t){return e.submit("TS")}}},[e._v("暂存")]),i("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.approveDetail.approvalId,expression:"!approveDetail.approvalId"}],staticStyle:{"margin-right":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(t){return e.submit("CA")}}},[e._v("提交")]),i("el-button",{directives:[{name:"show",rawName:"v-show",value:e.approveDetail.approvalId,expression:"approveDetail.approvalId"}],staticStyle:{"margin-right":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(t){e.submit(e.approveDetail.approvalState&&"DR"===e.approveDetail.approvalState.value?"CA":"RA")}}},[e._v("确认")]),i("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(t){return e.hideDialog()}}})],1),i("div",{staticClass:"clear"})]),e.detail.bizForm?i("div",{staticClass:"main-wrap"},[i("el-scrollbar",{style:{height:e.height}},[i("el-form",{ref:"detail",attrs:{model:e.detail,"label-width":"140px"}},[i("div",{staticClass:"wrap"},[i("div",{staticClass:"center-title",staticStyle:{display:"flex","align-items":"center",padding:"0 15px 15px"}},[i("div",{staticStyle:{"word-break":"keep-all"}},[e._v("标题：")]),i("el-input",{attrs:{placeholder:""},model:{value:e.detail.approvalTitle,callback:function(t){e.$set(e.detail,"approvalTitle",t)},expression:"detail.approvalTitle"}})],1),i("div",{staticClass:"tips-title"},[e._v("\n            基本信息\n          ")]),i("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[i("div",{staticStyle:{float:"left",width:"49%"}},[i("el-form-item",{attrs:{label:"项目名称"}},[e._v("\n                  "+e._s(e.detail.bizForm.projectName)+"\n                ")]),i("el-form-item",{attrs:{label:"币种",prop:"bizForm.baseInfo.projectCcy",rules:{required:!0,message:"请选择币种"}}},[i("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.projectCcy,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"projectCcy",t)},expression:"detail.bizForm.baseInfo.projectCcy"}},e._l(e.enumType.InvestCcy,(function(e){return i("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),"MA"!==e.type?i("el-form-item",{attrs:{label:"投资轮次",prop:"bizForm.baseInfo.investRoundId",rules:{required:!0,message:"请选择投资轮次"}}},[i("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.investRoundId,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"investRoundId",t)},expression:"detail.bizForm.baseInfo.investRoundId"}},e._l(e.enumType.Round,(function(e){return i("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1):e._e(),"MA"!==e.type?i("el-form-item",{attrs:{label:"退出方式",prop:"bizForm.baseInfo.exitWay",rules:{required:!0,message:"请输入退出方式"}}},[i("el-input",{attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.exitWay,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"exitWay",t)},expression:"detail.bizForm.baseInfo.exitWay"}})],1):e._e(),"MA"!==e.type?i("el-form-item",{attrs:{label:"预计IRR",prop:"bizForm.baseInfo.expectedIrr",rules:{required:!0,message:"请输入预计IRR"}}},[i("el-input",{attrs:{placeholder:"",type:"number"},model:{value:e.detail.bizForm.baseInfo.expectedIrr,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"expectedIrr",t)},expression:"detail.bizForm.baseInfo.expectedIrr"}},[i("template",{slot:"append"},[e._v("%")])],2)],1):e._e(),i("el-form-item",{attrs:{label:"预计付款时间",prop:"bizForm.baseInfo.expectedPay",rules:{required:!0,message:"请输入预计付款时间"}}},[i("el-input",{attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.expectedPay,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"expectedPay",t)},expression:"detail.bizForm.baseInfo.expectedPay"}})],1)],1),i("div",{staticStyle:{float:"left",width:"49%","margin-left":"2%"}},[i("el-form-item",{attrs:{label:"项目类型"}},[e._v("\n                  "+e._s(e.detail.bizForm.projectType&&e.detail.bizForm.projectType.name)+"\n                ")]),i("el-form-item",{attrs:{label:"MA"===e.type?"收购比例(%)":"股权占比(%)",prop:"bizForm.baseInfo.shareRatio",rules:{required:!0,message:"请输入"+("MA"===e.type?"收购比例(%)":"股权占比(%)")}}},[i("el-input",{attrs:{placeholder:"",type:"number"},model:{value:e.detail.bizForm.baseInfo.shareRatio,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"shareRatio",t)},expression:"detail.bizForm.baseInfo.shareRatio"}},[i("template",{slot:"append"},[e._v("%")])],2)],1),"BI"===e.detail.bizForm.baseInfo.projectValuationType?i("el-form-item",{attrs:{label:"项目估值",prop:"bizForm.baseInfo.projectValuationBefore",rules:{required:!0,message:"请输入投前项目估值"}}},[i("div",{staticStyle:{display:"flex","align-items":"center"}},[i("el-select",{staticStyle:{width:"130px","margin-right":"10px"},attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.projectValuationType,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"projectValuationType",t)},expression:"detail.bizForm.baseInfo.projectValuationType"}},e._l(e.enumType.ProjectValuationType,(function(e){return i("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1),i("el-input",{attrs:{placeholder:"",type:"number"},model:{value:e.detail.bizForm.baseInfo.projectValuationBefore,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"projectValuationBefore",t)},expression:"detail.bizForm.baseInfo.projectValuationBefore"}},[i("template",{slot:"append"},[e._v("万"+e._s(e._f("formatMoneyUnit")(e.detail.bizForm.baseInfo.projectCcy)))])],2)],1)]):e._e(),"BI"!==e.detail.bizForm.baseInfo.projectValuationType?i("el-form-item",{attrs:{label:"项目估值",prop:"bizForm.baseInfo.projectValuationAfter",rules:{required:!0,message:"请输入投后项目估值"}}},[i("div",{staticStyle:{display:"flex","align-items":"center"}},[i("el-select",{staticStyle:{width:"130px","margin-right":"10px"},attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.projectValuationType,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"projectValuationType",t)},expression:"detail.bizForm.baseInfo.projectValuationType"}},e._l(e.enumType.ProjectValuationType,(function(e){return i("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1),i("el-input",{attrs:{placeholder:"",type:"number"},model:{value:e.detail.bizForm.baseInfo.projectValuationAfter,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"projectValuationAfter",t)},expression:"detail.bizForm.baseInfo.projectValuationAfter"}},[i("template",{slot:"append"},[e._v("万"+e._s(e._f("formatMoneyUnit")(e.detail.bizForm.baseInfo.projectCcy)))])],2)],1)]):e._e(),"PE"===e.type||"VC"===e.type?i("el-form-item",{attrs:{label:"投资方式",prop:"bizForm.baseInfo.investWay",rules:{required:!0,message:"请选择投资方式"}}},[i("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.investWay,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"investWay",t)},expression:"detail.bizForm.baseInfo.investWay"}},e._l(e.enumType.InvestWay,(function(e){return i("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1):e._e(),"MA"!==e.type?i("el-form-item",{attrs:{prop:"bizForm.baseInfo.expectedExitTime",label:"预计退出时间",rules:{required:!0,message:"请选择预计退出时间"}}},[i("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:e.detail.bizForm.baseInfo.expectedExitTime,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"expectedExitTime",t)},expression:"detail.bizForm.baseInfo.expectedExitTime"}})],1):e._e()],1),i("div",{staticClass:"clear"})])]),i("div",{staticClass:"wrap",staticStyle:{"margin-top":"15px"}},[i("div",{staticClass:"tips-title"},[e._v("\n              资金组成\n              "),i("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(t){return e.addFundCompositions()}}},[i("i",{staticClass:"iconfont icon-xinjian"}),e._v(" 新增")])],1),e._l(e.detail.bizForm.fundCompositions,(function(t,a){return i("div",{key:a,staticClass:"form-content",staticStyle:{"margin-top":"15px",background:"#f7f7f7",padding:"15px 15px 15px 0"}},[i("div",{staticStyle:{float:"left",width:"49%","margin-left":"2%"}},[i("el-form-item",{attrs:{label:"资金来源",prop:"bizForm.fundCompositions["+a+"].fundSource",rules:{required:!0,message:"请选择资金来源"}}},[i("el-select",{style:{width:"FU"===t.fundSource?"45%":"100%"},attrs:{placeholder:""},model:{value:t.fundSource,callback:function(a){e.$set(t,"fundSource",a)},expression:"item.fundSource"}},e._l(e.enumType.ProjectFundSource,(function(e){return i("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1),"FU"===t.fundSource?i("el-select",{staticStyle:{width:"45%","margin-left":"10%"},attrs:{placeholder:""},model:{value:t.fundId,callback:function(a){e.$set(t,"fundId",a)},expression:"item.fundId"}},e._l(e.funds,(function(e){return i("el-option",{key:e.fundId,attrs:{label:e.fundAbbr,value:e.fundId}})})),1):e._e()],1)],1),i("div",{staticStyle:{float:"left",width:"49%"}},[i("el-form-item",{attrs:{label:"投资金额",prop:"bizForm.fundCompositions["+a+"].investAmt",rules:{required:!0,message:"请输入投资金额"}}},[i("el-input",{attrs:{placeholder:"",type:"number"},model:{value:t.investAmt,callback:function(a){e.$set(t,"investAmt",a)},expression:"item.investAmt"}},[i("template",{slot:"append"},[e._v("万"+e._s(e._f("formatMoneyUnit")(e.detail.bizForm.baseInfo.projectCcy)))])],2)],1)],1),i("div",{staticClass:"clear"}),i("div",{staticStyle:{display:"flex"}},[i("el-button",{staticStyle:{"margin-left":"auto"},attrs:{type:"text"},on:{click:function(t){return e.removeFundCompositions(a)}}},[i("i",{staticClass:"iconfont icon-delete"}),e._v(" 删除")])],1)])}))],2),"MA"===e.type?i("div",{staticClass:"wrap"},[i("div",{staticClass:"tips-title"},[e._v("\n              协议重要条款\n            ")]),i("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[i("el-form-item",{attrs:{label:"收购范围",prop:"bizForm.termMa.buyScope",rules:{required:!0,message:"请输入收购范围"}}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.termMa.buyScope,callback:function(t){e.$set(e.detail.bizForm.termMa,"buyScope",t)},expression:"detail.bizForm.termMa.buyScope"}})],1),i("el-form-item",{attrs:{label:"股权转让款的支付",prop:"bizForm.termMa.etPayment",rules:{required:!0,message:"请输入股权转让款的支付"}}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.termMa.etPayment,callback:function(t){e.$set(e.detail.bizForm.termMa,"etPayment",t)},expression:"detail.bizForm.termMa.etPayment"}})],1),i("el-form-item",{attrs:{label:"对赌安排",prop:"bizForm.termMa.gbArrangement",rules:{required:!0,message:"请输入对赌安排"}}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.termMa.gbArrangement,callback:function(t){e.$set(e.detail.bizForm.termMa,"gbArrangement",t)},expression:"detail.bizForm.termMa.gbArrangement"}})],1),i("el-form-item",{attrs:{label:"剩余股权安排",prop:"bizForm.termMa.reArrangement",rules:{required:!0,message:"请输入剩余股权安排"}}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.termMa.reArrangement,callback:function(t){e.$set(e.detail.bizForm.termMa,"reArrangement",t)},expression:"detail.bizForm.termMa.reArrangement"}})],1),i("el-form-item",{attrs:{label:"公司治理",prop:"bizForm.termMa.corGovern",rules:{required:!0,message:"请输入公司治理"}}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.termMa.corGovern,callback:function(t){e.$set(e.detail.bizForm.termMa,"corGovern",t)},expression:"detail.bizForm.termMa.corGovern"}})],1),i("el-form-item",{attrs:{label:"其他",prop:"bizForm.termMa.other"}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.termMa.other,callback:function(t){e.$set(e.detail.bizForm.termMa,"other",t)},expression:"detail.bizForm.termMa.other"}})],1)],1)]):e._e(),"MA"!==e.type?i("div",{staticClass:"wrap"},[i("div",{staticClass:"tips-title"},[e._v("\n              协议重要条款\n              "),i("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(t){return e.addTermSh()}}},[i("i",{staticClass:"iconfont icon-xinjian"}),e._v(" 新增")])],1),e._l(e.detail.bizForm.termSh,(function(t,a){return i("div",{key:a,staticClass:"form-content",staticStyle:{"margin-top":"15px",background:"#f7f7f7",padding:"15px 15px 15px 0"}},[i("el-form-item",{attrs:{label:"条款类型",prop:"bizForm.termSh["+a+"].termType",rules:{required:!0,message:"请输入条款类型"}}},[i("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"",disabled:!e.canPick&&"OT"===t.termType},on:{change:e.setCanPick},model:{value:t.termType,callback:function(a){e.$set(t,"termType",a)},expression:"item.termType"}},e._l(e.curTermType,(function(e){return i("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),i("el-form-item",{attrs:{label:"具体内容概况",prop:"bizForm.termSh["+a+"].termContent",rules:{required:!0,message:"请输入具体内容概况"}}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:t.termContent,callback:function(a){e.$set(t,"termContent",a)},expression:"item.termContent"}})],1),i("div",{staticStyle:{display:"flex"}},[i("el-button",{staticStyle:{"margin-left":"auto"},attrs:{type:"text"},on:{click:function(t){return e.removeTermSh(a)}}},[i("i",{staticClass:"iconfont icon-delete"}),e._v(" 删除")])],1)],1)}))],2):e._e(),i("div",{staticClass:"wrap"},[i("div",{staticClass:"tips-title"},[e._v("\n            核心估值指标\n            "),i("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(t){return e.addValuation()}}},[i("i",{staticClass:"iconfont icon-xinjian"}),e._v(" 新增")])],1),e._l(e.detail.bizForm.valuation,(function(t,a){return i("div",{key:a,staticClass:"form-content",staticStyle:{"margin-top":"15px",background:"#f7f7f7",padding:"15px 15px 0 0"}},[i("div",{staticStyle:{float:"left",width:"49%"}},[i("el-form-item",{attrs:{label:"估值法",prop:"bizForm.valuation["+a+"].valuationMethod",rules:{required:!0,message:"请输入估值法"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.valuationMethod,callback:function(a){e.$set(t,"valuationMethod",a)},expression:"item.valuationMethod"}})],1),i("el-form-item",{attrs:{label:"估值指标说明",prop:"bizForm.valuation["+a+"].indicatorDesc",rules:{required:!0,message:"请输入估值指标说明"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.indicatorDesc,callback:function(a){e.$set(t,"indicatorDesc",a)},expression:"item.indicatorDesc"}})],1),i("el-form-item",{attrs:{label:"估值指标单位",prop:"bizForm.valuation["+a+"].indicatorUnit",rules:{required:!0,message:"请输入估值指标单位"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.indicatorUnit,callback:function(a){e.$set(t,"indicatorUnit",a)},expression:"item.indicatorUnit"}})],1),i("el-form-item",{attrs:{label:"估值结果",prop:"bizForm.valuation["+a+"].valuationResult",rules:{required:!0,message:"请输入估值结果"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.valuationResult,callback:function(a){e.$set(t,"valuationResult",a)},expression:"item.valuationResult"}})],1)],1),i("div",{staticStyle:{float:"left",width:"49%","margin-left":"2%"}},[i("el-form-item",{attrs:{label:"估值指标名称",prop:"bizForm.valuation["+a+"].indicatorName",rules:{required:!0,message:"请输入估值指标名称"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.indicatorName,callback:function(a){e.$set(t,"indicatorName",a)},expression:"item.indicatorName"}})],1),i("el-form-item",{attrs:{label:"估值指标数据时点",prop:"bizForm.valuation["+a+"].indicatorTime",rules:{required:!0,message:"请输入估值指标数据时点"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.indicatorTime,callback:function(a){e.$set(t,"indicatorTime",a)},expression:"item.indicatorTime"}})],1),i("el-form-item",{attrs:{label:"估值指标数值",prop:"bizForm.valuation["+a+"].indicatorValue",rules:{required:!0,message:"请输入估值指标数值"}}},[i("el-input",{attrs:{placeholder:""},model:{value:t.indicatorValue,callback:function(a){e.$set(t,"indicatorValue",a)},expression:"item.indicatorValue"}})],1),i("el-form-item",{staticStyle:{"text-align":"right"},attrs:{label:"",prop:"entCity"}},[i("el-button",{staticStyle:{"margin-left":"auto"},attrs:{type:"text"},on:{click:function(t){return e.removeValuation(a)}}},[i("i",{staticClass:"iconfont icon-delete"}),e._v(" 删除")])],1)],1),i("div",{staticClass:"clear"})])}))],2),i("div",{staticClass:"wrap detail-wrap",staticStyle:{"margin-top":"15px"}},[i("div",{staticClass:"tips-title"},[e._v("会议销项清单")]),i("div",{staticClass:"table-wrap"},[i("div",{staticClass:"header",staticStyle:{"text-align":"center"}},[i("div",{staticStyle:{width:"20%"}},[e._v("需销项事项")]),i("div",{staticStyle:{width:"15%"}},[e._v("完成目标")]),i("div",{staticStyle:{width:"15%"}},[e._v("要求完成时间")]),i("div",{staticStyle:{width:"15%"}},[e._v("责任人")]),i("div",{staticStyle:{width:"20%"}},[e._v("进度描述")]),i("div",{staticStyle:{width:"15%"}},[e._v("是否销项")])]),e._l(e.detail.bizForm.pinItems,(function(t,a){return i("div",{key:a,staticClass:"content"},[i("div",{staticStyle:{width:"20%","justify-content":"center"}},[e._v(e._s(t.pinItemName))]),i("div",{staticStyle:{width:"15%"}},[e._v(e._s(t.aim))]),i("div",{staticStyle:{width:"15%","justify-content":"center"}},[e._v(e._s(e._f("DateTimeEn")(t.reqCompleteTime)))]),i("div",{staticStyle:{width:"15%","justify-content":"center"}},[e._v(e._s(t.user.userName))]),i("div",{staticStyle:{width:"20%"}},[e._v(e._s(t.content))]),i("div",{staticStyle:{width:"15%","justify-content":"center"}},[e._v(e._s(t.pinItemState.name))])])})),e.detail.bizForm.pinItems&&0===e.detail.bizForm.pinItems.length?i("div",{staticClass:"content empty"},[i("div",{staticStyle:{width:"100%","text-align":"center",display:"block"}},[i("img",{attrs:{src:a("f244")}}),i("br"),i("span",{staticStyle:{"font-size":"14px",width:"100%"}},[e._v("暂无数据")])])]):e._e()],2)]),"MA"!==e.type?i("div",{staticClass:"wrap"},[i("div",{staticClass:"tips-title"},[e._v("盈利预测")]),i("el-form-item",{attrs:{label:"","label-width":"0"}},[i("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.profitPrediction,callback:function(t){e.$set(e.detail.bizForm,"profitPrediction",t)},expression:"detail.bizForm.profitPrediction"}})],1)],1):e._e(),i("div",{staticClass:"wrap"},[i("remark",{attrs:{data:e.detail.bizForm}})],1),i("div",{staticClass:"wrap"},[i("files",{attrs:{files:e.detail.bizForm.attaches},on:{UPLOAD_FILE:function(t){e.detail.bizForm.attaches=t}}}),i("div",{staticClass:"file-example-wrap"},[i("div",{staticClass:"title"},[e._v("参考模版")]),i("file-upload",{attrs:{edit:!1,files:e.formTemplates}})],1)],1),i("div",{staticClass:"wrap"},[i("approve",{attrs:{data:e.detail},on:{SET_NODE_USERS:function(t){e.detail.approvalNodes=t},SET_CC_USERS:function(t){e.detail.ccUsers=t}}})],1)])],1)],1):e._e(),e.showInnerDialog?i("recall-dialog",{attrs:{visible:e.showInnerDialog},on:{"update:visible":function(t){e.showInnerDialog=t},confirm:function(t){return e.submit("RA",t)}}}):e._e()],1)},o=[],l=a("b62b"),r=a("90ba"),n=a("7218"),s=a("69af"),d=a("ff5a"),c=a("0a92"),p=a("ed08"),m={name:"",components:{RecallDialog:r["default"],fileUpload:n["a"],remark:s["default"],files:d["default"],approve:c["default"]},props:{id:{type:String,default:function(){return""}},templateCode:{type:String,default:function(){return"DD06"}}},data:function(){return{enumType:{},itemId:"",dialogVisible:!1,detail:{},height:"",formTemplates:[],type:"",canPick:!0,approveDetail:{},showInnerDialog:!1,curTermType:[]}},mounted:function(){this.height=document.body.clientHeight-200+"px",this.getEnum("InvestWay"),this.getEnum("ProjectFundSource"),this.getEnum("InvestCcy"),this.getEnum("ProjectFundSource"),this.getEnum("ProjectValuationType"),this.getEnum("TermType")},methods:{getEnum:function(e,t){var a=this;l["a"].getEnum(e).then((function(i){200===i.code&&(t&&i.data.unshift({name:"全部",value:""}),a.$set(a.enumType,e,i.data),"TermType"===e&&(a.curTermType=i.data))})).catch((function(e){console.log(e)}))},show:function(e){e.itemId?(this.itemId=e.itemId,e.completeStatus&&"DR"===e.completeStatus.value?this.initParamsByDraft(e):this.initParams(e)):(this.approveDetail=e,this.initParamsByBiz(e.bizForm.bizId)),this.getFundList()},initParams:function(e){var t=this;this.itemId=e.itemId;var a={itemId:e.itemId,projectId:this.id,templateCode:e.templateCode};l["a"].initProjectApplyInit(a).then((function(e){if(200===e.code){var a=[];e.data.approvalNodes.map((function(e){e.nodeType&&"CN"!==e.nodeType.value&&a.push({userName:e.approvalUser&&e.approvalUser.userName||e.nodeName,nodeRefId:e.approvalUser&&e.approvalUser.userId,nodeId:e.nodeInstanceId,nodeType:e.nodeType&&e.nodeType.value,userId:e.nodeRefId||e.id,userTag:e.nodeName,nodeName:e.nodeName})})),e.data.approvalNodes=a,e.data.urgencyLvl=e.data.urgencyLvl.value,e.data.bizForm.baseInfo.fundSource=e.data.bizForm.baseInfo.fundSource?e.data.bizForm.baseInfo.fundSource.value:"",e.data.bizForm.baseInfo.projectCcy=e.data.bizForm.baseInfo.projectCcy?e.data.bizForm.baseInfo.projectCcy.value:"",e.data.bizForm.baseInfo.investWay=e.data.bizForm.baseInfo.investWay?e.data.bizForm.baseInfo.investWay.value:"",e.data.bizForm.baseInfo.projectValuationType=e.data.bizForm.baseInfo.projectValuationAfter?"AI":"BI",e.data.bizForm.baseInfo.expectedExitTime=e.data.bizForm.baseInfo.expectedExitTime?t.$options.filters.DateTimeEn(e.data.bizForm.baseInfo.projectCcy.expectedExitTime):"",t.type=e.data.bizForm.projectInvestType.value,"MA"===t.type?e.data.bizForm.termMa=e.data.bizForm.termMa||{}:(e.data.bizForm.termSh.map((function(e){e.termType=e.termType.value})),setTimeout((function(){t.setCanPick()}),500)),e.data.bizForm.fundCompositionDto.map((function(e){e.fundSource=e.fundSource.value})),e.data.bizForm.fundCompositions=e.data.bizForm.fundCompositionDto||[{fundSource:"",investAmt:"",fundId:""}],t.detail=e.data,"MA"!==t.type&&t.getRound(),t.dialogVisible=!0,t.getFormTemplates()}})).catch((function(e){console.log(e)}))},initParamsByDraft:function(e){var t=this,a={isEdit:!0};l["a"].initProjectApplyDraft(e.itemId,a).then((function(e){200===e.code&&t.formatData(e)})).catch((function(e){console.log(e)}))},initParamsByBiz:function(e){var t=this,a={isEdit:!0};l["a"].initProjectApplyBiz(e,a).then((function(e){if(200===e.code){var a={data:{approvalTitle:t.approveDetail.approvalTitle,approvalId:t.approveDetail.approvalId,approvalNodes:t.approveDetail.approvalNodes,ccUsers:t.approveDetail.ccUsers,templateCode:t.approveDetail.templateCode,urgencyLvl:t.approveDetail.urgencyLvl,approvalType:t.approveDetail.approvalType,bizForm:e.data}};t.formatData(a)}})).catch((function(e){console.log(e)}))},formatData:function(e){var t=[];e.data.approvalNodes.map((function(e){e.nodeType&&"CN"!==e.nodeType.value&&t.push({userName:e.approvalUser&&e.approvalUser.userName||e.nodeName,nodeRefId:e.approvalUser&&e.approvalUser.userId,nodeId:e.nodeInstanceId,nodeType:e.nodeType&&e.nodeType.value,userId:e.nodeRefId||e.id,userTag:e.nodeName,nodeName:e.nodeName})})),e.data.approvalNodes=t,e.data.urgencyLvl=e.data.urgencyLvl.value,e.data.bizForm.baseInfo.projectCcy=e.data.bizForm.baseInfo.projectCcy.value,e.data.bizForm.baseInfo.projectValuationType=e.data.bizForm.baseInfo.projectValuationBefore?"BI":"AI",this.type=e.data.bizForm.projectInvestType.value,"MA"!==this.type&&(e.data.bizForm.baseInfo.investWay=e.data.bizForm.baseInfo.investWay?e.data.bizForm.baseInfo.investWay.value:"",e.data.bizForm.baseInfo.expectedExitTime=this.$options.filters.DateTimeEn(e.data.bizForm.baseInfo.expectedExitTime),e.data.bizForm.termSh.map((function(e){e.termType=e.termType.value}))),e.data.bizForm.fundCompositionDto.map((function(e){e.fundSource=e.fundSource.value})),e.data.bizForm.fundCompositions=e.data.bizForm.fundCompositionDto,this.detail=e.data,this.dialogVisible=!0,"MA"!==this.type&&(this.getRound(),this.setCanPick())},hideDialog:function(){this.$refs["detail"].clearValidate(),this.dialogVisible=!1},setApprovalNodes:function(e){for(var t in e)e[t].nodeRefId=e[t].nodeRefId||e[t].id||e[t].userId,e[t].nodeType=e[t].nodeType||"UN",e[t].userId=e[t].nodeRefId||e[t].id,e[t].userTag=e[t].userTag||"审批人",e[t].nodeName=e[t].userTag||"审批人";this.detail.approvalNodes=e},getFormTemplates:function(){var e=this,t={projectType:this.detail.bizForm.projectInvestType.value,templateCode:this.templateCode};l["a"].getFormTemplates(t).then((function(t){200===t.code&&(e.formTemplates=t.data)})).catch((function(e){console.log(e)}))},submit:function(e,t){var a=this;this.$refs["detail"].validate((function(i){if(i){if(a.detail.bizForm.fundCompositions=a.detail.bizForm.fundCompositions||[],a.detail.bizForm.fundCompositions.length<1)return void a.$message.warning({message:"资金组成中至少有一个资金来源！",duration:1500});var o=p["a"].deepCopy(a.detail),r={};r.submitType=e,r.templateCode=a.templateCode,r.urgencyLvl=o.urgencyLvl,o.approvalId&&(r.approvalId=o.approvalId),o.approvalTitle&&(r.approvalTitle=o.approvalTitle),o.approvalType&&"FX"!==o.approvalType.value&&(r.approvalNodes=o.approvalNodes,r.ccUserIds=function(){var e=[];return o.ccUsers.map((function(t){e.push(t.id||t.userId)})),e}()),o.bizForm.projectId=a.id||o.bizForm.projectId,o.bizForm.itemId=a.itemId||o.bizForm.itemId,"MA"!==a.type&&delete o.bizForm.termMa,r.bizForm=o.bizForm,"RA"!==e||"RJ"!==a.approveDetail.currentNode.nodeState.value||t?"RA"===e&&"RJ"===a.approveDetail.currentNode.nodeState.value&&t?(r.resubmitOpt={nodeInstanceId:a.approveDetail.currentNode.nodeInstanceId,opinion:t.opinion,strategy:t.strategy},l["a"].createProjectApply(r).then((function(e){200===e.code&&(a.$message.success({message:"重新提交成功！",duration:1500}),a.$emit("REFRESH"),a.hideDialog())})).catch((function(e){console.log(e)}))):l["a"].createProjectApply(r).then((function(e){200===e.code&&(a.$message.success({message:"提交成功！",duration:1500}),a.$emit("REFRESH"),a.hideDialog())})).catch((function(e){console.log(e)})):a.showInnerDialog=!0}}))},addValuation:function(){this.detail.bizForm.valuation.push({indicatorDesc:"",indicatorName:"",indicatorTime:"",indicatorUnit:"",indicatorValue:"",valuationMethod:"",valuationResult:""})},removeValuation:function(e){this.detail.bizForm.valuation.splice(e,1)},addTermSh:function(){this.detail.bizForm.termSh.push({termContent:"",termType:""}),this.setCanPick()},removeTermSh:function(e){this.detail.bizForm.termSh.splice(e,1),this.setCanPick()},getRound:function(){var e=this,t={roundType:this.detail.bizForm.projectType.value};l["a"].getRound(t).then((function(t){200===t.code&&(t.data.map((function(e){e.value=e.roundId,e.name=e.roundName})),e.$set(e.enumType,"Round",t.data))})).catch((function(e){console.log(e)}))},setCanPick:function(){this.canPick=!0;var e=Object.assign([],this.enumType.TermType);if(this.detail.bizForm.termSh&&this.detail.bizForm.termSh.length>0)for(var t in this.detail.bizForm.termSh)for(var a in e)this.detail.bizForm.termSh[t].termType===e[a].value&&e.splice(a,1);this.curTermType=e},getFundList:function(){var e=this;l["a"].getFundList().then((function(t){200===t.code&&(e.funds=t.data)})).catch((function(e){console.log(e)}))},addFundCompositions:function(){console.log(1),this.detail.bizForm.fundCompositions||this.$set(this.detail.bizForm,"fundCompositions",[]),console.log(2),this.detail.bizForm.fundCompositions.push({fundSource:"",investAmt:"",fundId:""})},removeFundCompositions:function(e){this.detail.bizForm.fundCompositions.splice(e,1)}}},u=m,f=(a("0e50"),a("f8f3"),a("4ac2")),b=Object(f["a"])(u,i,o,!1,null,"42305aea",null);t["default"]=b.exports},4721:function(e,t,a){},"62f6":function(e,t,a){},"69af":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"tips-title"},[e._v("\n    "+e._s(e.title)+"\n  ")]),a("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[a("el-form",{ref:"data",attrs:{model:e.data,"label-width":"0"}},[a("el-form-item",{attrs:{label:"",prop:"description"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.data.description,callback:function(t){e.$set(e.data,"description",t)},expression:"data.description"}})],1)],1)],1)])},o=[],l={name:"",components:{},props:{data:{type:Object,default:function(){return{}}},title:{type:String,default:function(){return"相关说明"}}},methods:{}},r=l,n=(a("3087"),a("4ac2")),s=Object(n["a"])(r,i,o,!1,null,"2f60d672",null);t["default"]=s.exports},"90ba":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{"append-to-body":!0,"close-on-click-modal":!1,"close-on-press-escape":!1,"show-close":!1,visible:e.dialogVisible,top:"50px",width:"500px"}},[a("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[a("div",{staticClass:"title"},[e._v("驳回流程走向")]),a("div",{staticClass:"options"},[a("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:e.close}})]),a("div",{staticClass:"clear"})]),a("el-form",{attrs:{model:e.form,"label-position":"left","label-width":"85px"}},[a("el-form-item",{attrs:{label:"","label-width":"0"}},[a("el-radio-group",{model:{value:e.form.strategy,callback:function(t){e.$set(e.form,"strategy",t)},expression:"form.strategy"}},e._l(e.recallWays,(function(t){return a("el-radio",{key:t.name,attrs:{label:t.label}},[e._v(e._s(t.name))])})),1)],1),a("el-form-item",{attrs:{label:"","label-width":"0"}},[a("el-input",{attrs:{autosize:{minRows:4,maxRows:6},placeholder:"请填写审批意见(非必填)",type:"textarea"},model:{value:e.form.opinion,callback:function(t){e.$set(e.form,"opinion",t)},expression:"form.opinion"}})],1)],1),a("div",{staticClass:"w-100p txt-right",staticStyle:{"margin-top":"20px"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.confirm}},[e._v("确定")])],1)],1)},o=[],l=(a("b429"),{name:"RecallDialog",props:{visible:{type:Boolean,default:!1},approvalId:{type:String,default:""},nodeInstanceId:{type:String,default:""}},computed:{dialogVisible:function(){return this.visible}},data:function(){return{recallWays:[{name:"回到原驳回人",label:"RN"},{name:"重新依次审批",label:"SN"}],form:{strategy:"RN",opinion:""}}},methods:{confirm:function(){this.$emit("confirm",this.form),this.close()},close:function(){this.$emit("update:visible",!1)}}}),r=l,n=a("4ac2"),s=Object(n["a"])(r,i,o,!1,null,null,null);t["default"]=s.exports},"9efb":function(e,t,a){"use strict";a("4721")},b761:function(e,t,a){},bca3:function(e,t,a){},f8f3:function(e,t,a){"use strict";a("62f6")},ff5a:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"tips-title"},[e._v("\n    "+e._s(e.title)+"\n    "),a("div",{staticClass:"button"},[a("file-upload",{attrs:{icon:"icon",files:e.files,list:!1,tag:"invest"},on:{UPLOAD_FILE:function(t){return e.$emit("UPLOAD_FILE",t)}}})],1)]),a("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[a("file-upload",{attrs:{icon:"none",files:e.files}})],1)])},o=[],l=a("7218"),r={name:"",components:{fileUpload:l["a"]},props:{data:{type:Object,default:function(){return{}}},title:{type:String,default:function(){return"相关附件"}},files:{type:Array,default:function(){return[]}}}},n=r,s=(a("9efb"),a("4ac2")),d=Object(s["a"])(n,i,o,!1,null,"528bda6b",null);t["default"]=d.exports}}]);