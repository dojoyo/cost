(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-327fb4c6","chunk-0ef90e38","chunk-2d0e4a8c"],{"04d7":function(e,t,a){},"1ae8":function(e,t,a){"use strict";a("8f9b")},"300b":function(e,t,a){"use strict";a("04d7")},3087:function(e,t,a){"use strict";a("bca3")},4721:function(e,t,a){},"69af":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"tips-title"},[e._v("\n    "+e._s(e.title)+"\n  ")]),a("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[a("el-form",{ref:"data",attrs:{model:e.data,"label-width":"0"}},[a("el-form-item",{attrs:{label:"",prop:"description"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.data.description,callback:function(t){e.$set(e.data,"description",t)},expression:"data.description"}})],1)],1)],1)])},i=[],r={name:"",components:{},props:{data:{type:Object,default:function(){return{}}},title:{type:String,default:function(){return"相关说明"}}},methods:{}},s=r,n=(a("3087"),a("4ac2")),l=Object(n["a"])(s,o,i,!1,null,"2f60d672",null);t["default"]=l.exports},"8f9b":function(e,t,a){},"90ba":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{"append-to-body":!0,"close-on-click-modal":!1,"close-on-press-escape":!1,"show-close":!1,visible:e.dialogVisible,top:"50px",width:"500px"}},[a("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[a("div",{staticClass:"title"},[e._v("驳回流程走向")]),a("div",{staticClass:"options"},[a("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:e.close}})]),a("div",{staticClass:"clear"})]),a("el-form",{attrs:{model:e.form,"label-position":"left","label-width":"85px"}},[a("el-form-item",{attrs:{label:"","label-width":"0"}},[a("el-radio-group",{model:{value:e.form.strategy,callback:function(t){e.$set(e.form,"strategy",t)},expression:"form.strategy"}},e._l(e.recallWays,(function(t){return a("el-radio",{key:t.name,attrs:{label:t.label}},[e._v(e._s(t.name))])})),1)],1),a("el-form-item",{attrs:{label:"","label-width":"0"}},[a("el-input",{attrs:{autosize:{minRows:4,maxRows:6},placeholder:"请填写审批意见(非必填)",type:"textarea"},model:{value:e.form.opinion,callback:function(t){e.$set(e.form,"opinion",t)},expression:"form.opinion"}})],1)],1),a("div",{staticClass:"w-100p txt-right",staticStyle:{"margin-top":"20px"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.confirm}},[e._v("确定")])],1)],1)},i=[],r=(a("b429"),{name:"RecallDialog",props:{visible:{type:Boolean,default:!1},approvalId:{type:String,default:""},nodeInstanceId:{type:String,default:""}},computed:{dialogVisible:function(){return this.visible}},data:function(){return{recallWays:[{name:"回到原驳回人",label:"RN"},{name:"重新依次审批",label:"SN"}],form:{strategy:"RN",opinion:""}}},methods:{confirm:function(){this.$emit("confirm",this.form),this.close()},close:function(){this.$emit("update:visible",!1)}}}),s=r,n=a("4ac2"),l=Object(n["a"])(s,o,i,!1,null,null,null);t["default"]=l.exports},"9efb":function(e,t,a){"use strict";a("4721")},b3c1:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.dialogVisible,width:"850px","append-to-body":!0,"show-close":!1,top:"50px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[a("div",{staticClass:"title"},[a("i",{staticClass:"iconfont icon-xiangmuguanli"}),e._v(" "+e._s(e.detail.bizForm&&e.detail.bizForm.itemName||"立项")+"\n    ")]),a("div",{staticClass:"options",staticStyle:{display:"flex","align-items":"center"}},[a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.approveDetail.approvalId,expression:"!approveDetail.approvalId"}],attrs:{type:"default",size:"small"},on:{click:function(t){return e.submit("TS")}}},[e._v("暂存")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:!e.approveDetail.approvalId,expression:"!approveDetail.approvalId"}],staticStyle:{"margin-right":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(t){return e.submit("CA")}}},[e._v("提交")]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.approveDetail.approvalId,expression:"approveDetail.approvalId"}],staticStyle:{"margin-right":"20px"},attrs:{type:"primary",size:"small"},on:{click:function(t){e.submit(e.approveDetail.approvalState&&"DR"===e.approveDetail.approvalState.value?"CA":"RA")}}},[e._v("确认")]),a("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(t){return e.hideDialog()}}})],1),a("div",{staticClass:"clear"})]),e.detail.bizForm?a("div",{staticClass:"main-wrap"},[a("el-scrollbar",{style:{height:e.height}},[a("el-form",{ref:"detail",attrs:{model:e.detail,"label-width":"140px"}},[a("div",{staticClass:"wrap"},[a("div",{staticClass:"center-title",staticStyle:{display:"flex","align-items":"center",padding:"0 20px 15px"}},[a("div",{staticStyle:{"word-break":"keep-all"}},[e._v("标题：")]),a("el-input",{attrs:{placeholder:""},model:{value:e.detail.approvalTitle,callback:function(t){e.$set(e.detail,"approvalTitle",t)},expression:"detail.approvalTitle"}})],1),a("div",{staticClass:"tips-title"},[e._v("\n          基本信息\n        ")]),a("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[a("div",{staticStyle:{float:"left",width:"49%"}},[a("el-form-item",{attrs:{label:"项目名称",prop:"bizForm.baseInfo.projectName",rules:{required:!0,message:"请输入项目名称"}}},[a("el-input",{attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.projectName,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"projectName",t)},expression:"detail.bizForm.baseInfo.projectName"}})],1),e.detail.bizForm.investType&&"MA"===e.detail.bizForm.investType.value?a("el-form-item",{staticStyle:{position:"relative"},attrs:{label:"项目类型",prop:"bizForm.baseInfo.projectTypeMa",rules:{required:!0,message:"请选择项目类型"}}},[a("div",{staticStyle:{position:"absolute",right:"-30px",top:"-1px"}},[a("el-tooltip",{attrs:{content:"不同的项目类型会带出定制工作项和审批流，VC项目指估值≦10亿人民币或等值美元，且单笔投资额≦3000万人民币或500万美元的项目",placement:"top",effect:"dark"}},[a("el-button",{attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-shuomingtishi fs-14"})])],1)],1),a("el-select",{staticStyle:{width:"100%"},attrs:{disabled:e.project.reSubmit,placeholder:""},model:{value:e.detail.bizForm.baseInfo.projectTypeMa,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"projectTypeMa",t)},expression:"detail.bizForm.baseInfo.projectTypeMa"}},e._l(e.enumType.ProjectTypeMa,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1):e._e(),e.detail.bizForm.investType&&"MA"!==e.detail.bizForm.investType.value?a("el-form-item",{staticStyle:{position:"relative"},attrs:{label:"项目类型",prop:"bizForm.baseInfo.projectTypeSh",rules:{required:!0,message:"请选择项目类型"}}},[a("div",{staticStyle:{position:"absolute",right:"-30px",top:"-1px"}},[a("el-tooltip",{attrs:{content:"不同的项目类型会带出定制工作项和审批流，VC项目指估值≦10亿人民币或等值美元，且单笔投资额≦3000万人民币或500万美元的项目",placement:"top",effect:"dark"}},[a("el-button",{attrs:{type:"text"}},[a("i",{staticClass:"iconfont icon-shuomingtishi fs-14"})])],1)],1),a("el-select",{staticStyle:{width:"100%"},attrs:{disabled:e.project.reSubmit,placeholder:""},on:{change:e.getRound},model:{value:e.detail.bizForm.baseInfo.projectTypeSh,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"projectTypeSh",t)},expression:"detail.bizForm.baseInfo.projectTypeSh"}},e._l(e.enumType.ProjectType,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1),a("div",{staticStyle:{"font-size":"12px",color:"#999"}},[e._v("\n                  当前PE类企业："),a("span",{class:{red:e.deptEntStat.peEntStat&&e.deptEntStat.peEntStat.full}},[e._v(e._s(e.deptEntStat.peEntStat&&e.deptEntStat.peEntStat.current)+"/"+e._s(e.deptEntStat.peEntStat&&e.deptEntStat.peEntStat.limit))]),e._v("；\n                  VC类企业："),a("span",{class:{red:e.deptEntStat.vcEntStat&&e.deptEntStat.vcEntStat.full}},[e._v(e._s(e.deptEntStat.vcEntStat&&e.deptEntStat.vcEntStat.current)+"/"+e._s(e.deptEntStat.vcEntStat&&e.deptEntStat.vcEntStat.limit))])])],1):e._e(),"BI"===e.detail.bizForm.baseInfo.projectValuationType?a("el-form-item",{attrs:{label:"项目估值(万元)",prop:"bizForm.baseInfo.preProjectValuation",rules:{required:!0,message:"请输入投前项目估值"}}},[a("div",{staticStyle:{display:"flex","align-items":"center"}},[a("el-select",{staticStyle:{width:"130px","margin-right":"10px"},attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.projectValuationType,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"projectValuationType",t)},expression:"detail.bizForm.baseInfo.projectValuationType"}},e._l(e.enumType.ProjectValuationType,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1),a("el-input",{attrs:{placeholder:"",type:"number"},model:{value:e.detail.bizForm.baseInfo.preProjectValuation,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"preProjectValuation",t)},expression:"detail.bizForm.baseInfo.preProjectValuation"}})],1)]):e._e(),"BI"!==e.detail.bizForm.baseInfo.projectValuationType?a("el-form-item",{attrs:{label:"项目估值(万元)",prop:"bizForm.baseInfo.postProjectValuation",rules:{required:!0,message:"请输入投后项目估值"}}},[a("div",{staticStyle:{display:"flex","align-items":"center"}},[a("el-select",{staticStyle:{width:"130px","margin-right":"10px"},attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.projectValuationType,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"projectValuationType",t)},expression:"detail.bizForm.baseInfo.projectValuationType"}},e._l(e.enumType.ProjectValuationType,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1),a("el-input",{attrs:{placeholder:"",type:"number"},model:{value:e.detail.bizForm.baseInfo.postProjectValuation,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"postProjectValuation",t)},expression:"detail.bizForm.baseInfo.postProjectValuation"}})],1)]):e._e(),e.detail.bizForm.investType&&"MA"!==e.detail.bizForm.investType.value&&"SM"!==e.detail.bizForm.baseInfo.projectTypeSh&&"PM"!==e.detail.bizForm.baseInfo.projectTypeSh?a("el-form-item",{attrs:{label:"投资方式",prop:"bizForm.baseInfo.investWay",rules:{required:!0,message:"请选择投资方式"}}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.investWay,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"investWay",t)},expression:"detail.bizForm.baseInfo.investWay"}},e._l(e.enumType.InvestWay,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1):e._e(),e.detail.bizForm.investType&&"MA"!==e.detail.bizForm.investType.value?a("el-form-item",{attrs:{prop:"bizForm.baseInfo.financingEndTime",label:"本轮融资结束时间",rules:{required:!0,message:"请选择本轮融资结束时间"}}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:e.detail.bizForm.baseInfo.financingEndTime,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"financingEndTime",t)},expression:"detail.bizForm.baseInfo.financingEndTime"}})],1):e._e(),e.detail.bizForm.investType&&"MA"!==e.detail.bizForm.investType.value?a("el-form-item",{attrs:{prop:"bizForm.baseInfo.expectedExitTime",label:"预计退出时间",rules:{required:!0,message:"请选择预计退出时间"}}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:e.detail.bizForm.baseInfo.expectedExitTime,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"expectedExitTime",t)},expression:"detail.bizForm.baseInfo.expectedExitTime"}})],1):e._e()],1),a("div",{staticStyle:{float:"left",width:"49%","margin-left":"2%"}},[a("el-form-item",{attrs:{label:"项目负责人",prop:"bizForm.baseInfo.projectUser",rules:{required:!0,message:"请选择投项目负责人"}}},[a("div",{staticStyle:{"max-height":"32px"}},[a("user-select",{attrs:{users:e.detail.bizForm.baseInfo.projectUser,multi:!1},on:{SET_USERS:function(t){e.detail.bizForm.baseInfo.projectUser=t}}})],1)]),a("el-form-item",{attrs:{label:"币种",prop:"bizForm.baseInfo.projectCcy",rules:{required:!0,message:"请选择币种"}}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.projectCcy,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"projectCcy",t)},expression:"detail.bizForm.baseInfo.projectCcy"}},e._l(e.enumType.InvestCcy,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1),e.detail.bizForm.investType&&"MA"!==e.detail.bizForm.investType.value?a("div",[e._v(" ")]):e._e()],1),a("el-form-item",{attrs:{label:e.detail.bizForm.investType&&"MA"===e.detail.bizForm.investType.value?"收购比例(%)":"股权占比(%)",prop:"bizForm.baseInfo.shareRatio",rules:{required:!0,message:e.enterprise.investType&&"MA"===e.enterprise.investType.value?"请输入收购比例":"股权占比"}}},[a("el-input",{attrs:{placeholder:"",type:"number"},model:{value:e.detail.bizForm.baseInfo.shareRatio,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"shareRatio",t)},expression:"detail.bizForm.baseInfo.shareRatio"}},[a("template",{slot:"append"},[e._v("%")])],2)],1),e.detail.bizForm.investType&&"MA"!==e.detail.bizForm.investType.value?a("el-form-item",{attrs:{label:"投资轮次",prop:"bizForm.baseInfo.investRound",rules:{required:!0,message:"请选择投资轮次"}}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.investRound,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"investRound",t)},expression:"detail.bizForm.baseInfo.investRound"}},e._l(e.enumType.Round,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1):e._e(),e.detail.bizForm.investType&&"MA"!==e.detail.bizForm.investType.value?a("el-form-item",{attrs:{label:"退出方式",prop:"bizForm.baseInfo.existWay",rules:{required:!0,message:"请选择退出方式"}}},[a("el-input",{attrs:{placeholder:""},model:{value:e.detail.bizForm.baseInfo.existWay,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"existWay",t)},expression:"detail.bizForm.baseInfo.existWay"}})],1):e._e(),e.detail.bizForm.investType&&"MA"!==e.detail.bizForm.investType.value&&"SM"!==e.detail.bizForm.baseInfo.projectTypeSh&&"PM"!==e.detail.bizForm.baseInfo.projectTypeSh?a("el-form-item",{attrs:{label:"拟上市时间",prop:"bizForm.baseInfo.ipoTime",rules:{required:!0,message:"请选择拟上市时间"}}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:e.detail.bizForm.baseInfo.ipoTime,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"ipoTime",t)},expression:"detail.bizForm.baseInfo.ipoTime"}})],1):e._e(),e.detail.bizForm.investType&&"MA"!==e.detail.bizForm.investType.value?a("el-form-item",{attrs:{label:"预计IRR",prop:"bizForm.baseInfo.expectedIrr",rules:{required:!0,message:"请输入预计IRR"}}},[a("el-input",{attrs:{placeholder:"",type:"number"},model:{value:e.detail.bizForm.baseInfo.expectedIrr,callback:function(t){e.$set(e.detail.bizForm.baseInfo,"expectedIrr",t)},expression:"detail.bizForm.baseInfo.expectedIrr"}},[a("template",{slot:"append"},[e._v("%")])],2)],1):e._e()],1),a("div",{staticClass:"clear"})])]),a("div",{staticClass:"wrap",staticStyle:{"margin-top":"15px"}},[a("div",{staticClass:"tips-title"},[e._v("\n            资金组成\n            "),a("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(t){return e.addFundCompositions()}}},[a("i",{staticClass:"iconfont icon-xinjian"}),e._v(" 新增")])],1),e._l(e.detail.bizForm.fundCompositions,(function(t,o){return a("div",{key:o,staticClass:"form-content",staticStyle:{"margin-top":"15px",background:"#f7f7f7",padding:"15px 15px 15px 0"}},[a("div",{staticStyle:{float:"left",width:"49%","margin-left":"2%"}},[a("el-form-item",{attrs:{label:"资金来源",prop:"bizForm.fundCompositions["+o+"].fundSource",rules:{required:!0,message:"请选择资金来源"}}},[a("el-select",{style:{width:"FU"===t.fundSource?"45%":"100%"},attrs:{placeholder:""},model:{value:t.fundSource,callback:function(a){e.$set(t,"fundSource",a)},expression:"item.fundSource"}},e._l(e.enumType.ProjectFundSource,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1),"FU"===t.fundSource?a("el-select",{staticStyle:{width:"45%","margin-left":"10%"},attrs:{placeholder:""},model:{value:t.fundId,callback:function(a){e.$set(t,"fundId",a)},expression:"item.fundId"}},e._l(e.funds,(function(e){return a("el-option",{key:e.fundId,attrs:{label:e.fundAbbr,value:e.fundId}})})),1):e._e()],1)],1),a("div",{staticStyle:{float:"left",width:"49%"}},[a("el-form-item",{attrs:{label:"投资金额",prop:"bizForm.fundCompositions["+o+"].investAmt",rules:{required:!0,message:"请输入投资金额"}}},[a("el-input",{attrs:{placeholder:"",type:"number"},model:{value:t.investAmt,callback:function(a){e.$set(t,"investAmt",a)},expression:"item.investAmt"}},[a("template",{slot:"append"},[e._v("万"+e._s(e._f("formatMoneyUnit")(e.detail.bizForm.baseInfo.projectCcy)))])],2)],1)],1),a("div",{staticClass:"clear"}),a("div",{staticStyle:{display:"flex"}},[a("el-button",{staticStyle:{"margin-left":"auto"},attrs:{type:"text"},on:{click:function(t){return e.removeFundCompositions(o)}}},[a("i",{staticClass:"iconfont icon-delete"}),e._v(" 删除")])],1)])}))],2),a("div",{staticClass:"wrap"},[a("div",{staticClass:"tips-title"},[e._v("项目概况")]),a("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[a("el-form-item",{attrs:{label:"主营业务",prop:"bizForm.projectProfile.entBusiness",rules:{required:!0,message:"请输入主营业务"}}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.projectProfile.entBusiness,callback:function(t){e.$set(e.detail.bizForm.projectProfile,"entBusiness",t)},expression:"detail.bizForm.projectProfile.entBusiness"}})],1),a("el-form-item",{attrs:{label:"商业模式",prop:"bizForm.projectProfile.entBusinessModel",rules:{required:!0,message:"请输入商业模式"}}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.projectProfile.entBusinessModel,callback:function(t){e.$set(e.detail.bizForm.projectProfile,"entBusinessModel",t)},expression:"detail.bizForm.projectProfile.entBusinessModel"}})],1),a("el-form-item",{attrs:{label:"竞争性",prop:"bizForm.projectProfile.entCompetitive",rules:{required:!0,message:"请输入竞争性"}}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.projectProfile.entCompetitive,callback:function(t){e.$set(e.detail.bizForm.projectProfile,"entCompetitive",t)},expression:"detail.bizForm.projectProfile.entCompetitive"}})],1),a("el-form-item",{attrs:{label:"经营业绩",prop:"bizForm.projectProfile.entPerformance",rules:{required:!0,message:"请输入经营业绩"}}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.projectProfile.entPerformance,callback:function(t){e.$set(e.detail.bizForm.projectProfile,"entPerformance",t)},expression:"detail.bizForm.projectProfile.entPerformance"}})],1),a("el-form-item",{attrs:{label:"项目亮点",prop:"bizForm.projectProfile.projectHighlight",rules:{required:!0,message:"请输入项目亮点"}}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.projectProfile.projectHighlight,callback:function(t){e.$set(e.detail.bizForm.projectProfile,"projectHighlight",t)},expression:"detail.bizForm.projectProfile.projectHighlight"}})],1),a("el-form-item",{attrs:{label:"项目风险",prop:"bizForm.projectProfile.projectRisk",rules:{required:!0,message:"请输入项目风险"}}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:""},model:{value:e.detail.bizForm.projectProfile.projectRisk,callback:function(t){e.$set(e.detail.bizForm.projectProfile,"projectRisk",t)},expression:"detail.bizForm.projectProfile.projectRisk"}})],1)],1)]),a("div",{staticClass:"wrap"},[a("div",{staticClass:"tips-title"},[e._v("\n          项目来源\n        ")]),a("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[a("div",{staticStyle:{float:"left",width:"49%"}},[a("el-form-item",{attrs:{label:"项目来源",prop:"bizForm.projectSource.sourceType",rules:{required:!0,message:"请选择项目来源"}}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:""},model:{value:e.detail.bizForm.projectSource.sourceType,callback:function(t){e.$set(e.detail.bizForm.projectSource,"sourceType",t)},expression:"detail.bizForm.projectSource.sourceType"}},e._l(e.enumType.InvestSourceType,(function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),"RE"===e.detail.bizForm.projectSource.sourceType?a("el-form-item",{attrs:{label:"推荐人姓名",prop:"bizForm.projectSource.sourceReferrer",rules:{required:!0,message:"请输入推荐人姓名"}}},[a("el-input",{attrs:{placeholder:""},model:{value:e.detail.bizForm.projectSource.sourceReferrer,callback:function(t){e.$set(e.detail.bizForm.projectSource,"sourceReferrer",t)},expression:"detail.bizForm.projectSource.sourceReferrer"}})],1):e._e(),"RE"===e.detail.bizForm.projectSource.sourceType?a("el-form-item",{attrs:{label:"推荐人联系方式",prop:"bizForm.projectSource.sourceReferrerContact",rules:{required:!0,message:"请输入推荐人联系方式"}}},[a("el-input",{attrs:{placeholder:""},model:{value:e.detail.bizForm.projectSource.sourceReferrerContact,callback:function(t){e.$set(e.detail.bizForm.projectSource,"sourceReferrerContact",t)},expression:"detail.bizForm.projectSource.sourceReferrerContact"}})],1):e._e()],1),"RE"===e.detail.bizForm.projectSource.sourceType?a("div",{staticStyle:{float:"left",width:"49%","margin-left":"2%"}},[a("el-form-item",{attrs:{label:"推荐公司/机构名称",prop:"bizForm.projectSource.sourceEnt",rules:{required:!0,message:"请输入推荐公司/机构名称"}}},[a("el-input",{attrs:{placeholder:""},model:{value:e.detail.bizForm.projectSource.sourceEnt,callback:function(t){e.$set(e.detail.bizForm.projectSource,"sourceEnt",t)},expression:"detail.bizForm.projectSource.sourceEnt"}})],1),a("el-form-item",{attrs:{label:"推荐人职务",prop:"bizForm.projectSource.sourceReferrerPosition",rules:{required:!0,message:"请输入推荐人职务"}}},[a("el-input",{attrs:{placeholder:""},model:{value:e.detail.bizForm.projectSource.sourceReferrerPosition,callback:function(t){e.$set(e.detail.bizForm.projectSource,"sourceReferrerPosition",t)},expression:"detail.bizForm.projectSource.sourceReferrerPosition"}})],1)],1):e._e(),a("div",{staticClass:"clear"})])]),a("div",{staticClass:"wrap"},[a("remark",{attrs:{data:e.detail.bizForm}})],1),a("div",{staticClass:"wrap"},[a("files",{attrs:{files:e.detail.bizForm.projectAttachs},on:{UPLOAD_FILE:function(t){e.detail.bizForm.projectAttachs=t}}})],1),a("div",{staticClass:"wrap"},[a("approve",{attrs:{data:e.detail},on:{SET_CC_USERS:function(t){e.detail.ccUsers=t},SET_NODE_USERS:e.setApprovalNodes}})],1)])],1)],1):e._e(),e.showInnerDialog?a("recall-dialog",{attrs:{visible:e.showInnerDialog},on:{"update:visible":function(t){e.showInnerDialog=t},confirm:function(t){return e.submit("RA",t)}}}):e._e()],1)},i=[],r=a("b62b"),s=a("90ba"),n=a("328f"),l=a("69af"),p=a("ff5a"),c=a("0a92"),d=a("ed08"),u={name:"",components:{RecallDialog:s["default"],userSelect:n["a"],remark:l["default"],files:p["default"],approve:c["default"]},props:{id:{type:String,default:function(){return""}}},data:function(){return{templateCode:"PI01",enumType:{Round:[]},dialogVisible:!1,enterprise:{},project:{},approvalTitle:"",detail:{baseInfo:{projectUser:[]},projectProfile:{},projectSource:{},projectAttachs:[],ccUsers:[],urgencyLvl:"N",approvalNodes:[]},height:"",approveDetail:{},showInnerDialog:!1,deptEntStat:{}}},mounted:function(){this.height=document.body.clientHeight-200+"px",this.getEnum("ProjectFundSource"),this.getEnum("InvestWay"),this.getEnum("InvestCcy"),this.getEnum("ProjectTypeMa"),this.getEnum("ProjectType"),this.getEnum("ProjectValuationType"),this.getEnum("InvestSourceType"),this.getDeptEntStat()},methods:{getEnum:function(e,t){var a=this;r["a"].getEnum(e).then((function(o){200===o.code&&(t&&o.data.unshift({name:"全部",value:""}),a.$set(a.enumType,e,o.data))})).catch((function(e){console.log(e)}))},show:function(e){e.approvalId?(this.approveDetail=e,this.project={projectId:e.bizForm.bizId},this.getProjectDetail()):"create"===e.type?(this.enterprise=e.enterprise,this.initParams()):e.project&&e.project.itemId?(this.project=e.project,this.getProjectByItemDetail()):(this.project=e.project,this.getProjectDetail()),this.dialogVisible=!0,this.getFundList()},getDeptEntStat:function(){var e=this,t={statDeptId:this.$store.state.user.user.jwtClaims.di};r["a"].getDeptEntStat(t).then((function(t){200===t.code&&(e.deptEntStat=t.data)})).catch((function(e){console.log(e)}))},getRound:function(e){var t=this;e||this.$set(this.detail.bizForm.baseInfo,"investRound","");var a={roundType:this.detail.bizForm.baseInfo.projectTypeSh};r["a"].getRound(a).then((function(e){200===e.code&&(e.data.map((function(e){e.value=e.roundId,e.name=e.roundName})),t.$set(t.enumType,"Round",e.data))})).catch((function(e){console.log(e)}))},hideDialog:function(){this.dialogVisible=!1},hide:function(){this.dialogVisible=!1},initParams:function(){var e=this,t={enterpriseId:this.enterprise.enterpriseId,templateCode:this.templateCode};r["a"].initInvestProject(t).then((function(t){if(200===t.code){t.data.bizForm.baseInfo.projectUser=t.data.bizForm.baseInfo.projectUser?[t.data.bizForm.baseInfo.projectUser]:[],t.data.bizForm.baseInfo.projectValuationType="BI";var a=[];t.data.approvalNodes.map((function(e){a.push({userName:e.approvalUser&&e.approvalUser.userName||e.nodeName,nodeRefId:e.approvalUser&&e.approvalUser.userId,nodeId:e.nodeInstanceId,nodeType:e.nodeType&&e.nodeType.value,userId:e.nodeRefId||e.id,userTag:e.nodeName,nodeName:e.nodeName})})),t.data.approvalNodes=a,t.data.urgencyLvl=t.data.urgencyLvl.value,t.data.bizForm.baseInfo.projectUser=t.data.bizForm.baseInfo.projectUser||[],t.data.bizForm.fundCompositions=t.data.bizForm.fundCompositions||[{fundSource:"",investAmt:"",fundId:""}],e.detail=t.data}})).catch((function(e){console.log(e)}))},getProjectDetail:function(){var e=this;r["a"].getProjectDetail(this.project.projectId).then((function(t){if(200===t.code){e.enterprise={investType:t.data.bizForm.investType,enterpriseId:t.data.bizForm.enterpriseId},t.data.bizForm.baseInfo.projectCcy=t.data.bizForm.baseInfo.projectCcy?t.data.bizForm.baseInfo.projectCcy.value:"",t.data.bizForm.baseInfo.projectUser=[t.data.bizForm.baseInfo.projectUser],t.data.bizForm.projectSource.sourceType=t.data.bizForm.projectSource.sourceType?t.data.bizForm.projectSource.sourceType.value:"",t.data.bizForm.baseInfo.projectTypeMa=t.data.bizForm.baseInfo.projectTypeMa?t.data.bizForm.baseInfo.projectTypeMa.value:"",t.data.bizForm.baseInfo.projectValuationType=t.data.bizForm.baseInfo.projectValuationType||"BI","MA"!==t.data.bizForm.investType.value&&(t.data.bizForm.baseInfo.financingEndTime=e.$options.filters.DateTimeEn(t.data.bizForm.baseInfo.financingEndTime),t.data.bizForm.baseInfo.expectedExitTime=e.$options.filters.DateTimeEn(t.data.bizForm.baseInfo.expectedExitTime),t.data.bizForm.baseInfo.ipoTime=e.$options.filters.DateTimeEn(t.data.bizForm.baseInfo.ipoTime),t.data.bizForm.baseInfo.investWay=t.data.bizForm.baseInfo.investWay?t.data.bizForm.baseInfo.investWay.value:"",t.data.bizForm.baseInfo.projectType=t.data.bizForm.baseInfo.projectType?t.data.bizForm.baseInfo.projectType.value:"",t.data.bizForm.baseInfo.projectTypeSh=t.data.bizForm.baseInfo.projectTypeSh?t.data.bizForm.baseInfo.projectTypeSh.value:"");var a=[];t.data.approvalNodes.map((function(e){a.push({userName:e.approvalUser&&e.approvalUser.userName||e.nodeName,nodeRefId:e.approvalUser&&e.approvalUser.userId,nodeId:e.nodeInstanceId,nodeType:e.nodeType&&e.nodeType.value,userId:e.nodeRefId||e.id,userTag:e.nodeName,nodeName:e.nodeName})})),t.data.approvalNodes=a,t.data.urgencyLvl=t.data.urgencyLvl.value,e.project.reSubmit&&(t.data.approvalId="",t.data.bizForm.bizId="",t.data.bizForm.projectId=""),t.data.bizForm.fundCompositionDto.map((function(e){e.fundSource=e.fundSource.value})),t.data.bizForm.fundCompositions=t.data.bizForm.fundCompositionDto,e.detail=t.data,setTimeout((function(){e.$refs["detail"].clearValidate(),"MA"!==e.detail.bizForm.baseInfo.investType.value&&e.getRound(!0)}),50)}})).catch((function(e){console.log(e)}))},getProjectByItemDetail:function(){var e=this;r["a"].getProjectByItemDetail(this.project.projectId,this.project.itemId).then((function(t){if(200===t.code){e.enterprise={investType:t.data.bizForm.investType,enterpriseId:t.data.bizForm.enterpriseId},t.data.bizForm.baseInfo.projectCcy=t.data.bizForm.baseInfo.projectCcy?t.data.bizForm.baseInfo.projectCcy.value:"",t.data.bizForm.baseInfo.projectUser=[t.data.bizForm.baseInfo.projectUser],t.data.bizForm.projectSource.sourceType=t.data.bizForm.projectSource.sourceType?t.data.bizForm.projectSource.sourceType.value:"",t.data.bizForm.baseInfo.projectTypeMa=t.data.bizForm.baseInfo.projectTypeMa?t.data.bizForm.baseInfo.projectTypeMa.value:"",t.data.bizForm.baseInfo.projectValuationType=t.data.bizForm.baseInfo.projectValuationType||"BI","MA"!==t.data.bizForm.investType.value&&(t.data.bizForm.baseInfo.financingEndTime=e.$options.filters.DateTimeEn(t.data.bizForm.baseInfo.financingEndTime),t.data.bizForm.baseInfo.expectedExitTime=e.$options.filters.DateTimeEn(t.data.bizForm.baseInfo.expectedExitTime),t.data.bizForm.baseInfo.ipoTime=e.$options.filters.DateTimeEn(t.data.bizForm.baseInfo.ipoTime),t.data.bizForm.baseInfo.investWay=t.data.bizForm.baseInfo.investWay?t.data.bizForm.baseInfo.investWay.value:"",t.data.bizForm.baseInfo.projectType=t.data.bizForm.baseInfo.projectType?t.data.bizForm.baseInfo.projectType.value:"",t.data.bizForm.baseInfo.projectTypeSh=t.data.bizForm.baseInfo.projectTypeSh?t.data.bizForm.baseInfo.projectTypeSh.value:"");var a=[];t.data.approvalNodes.map((function(e){a.push({userName:e.approvalUser&&e.approvalUser.userName||e.nodeName,nodeRefId:e.approvalUser&&e.approvalUser.userId,nodeId:e.nodeInstanceId,nodeType:e.nodeType&&e.nodeType.value,userId:e.nodeRefId||e.id,userTag:e.nodeName,nodeName:e.nodeName})})),t.data.approvalNodes=a,t.data.urgencyLvl=t.data.urgencyLvl.value,e.project.reSubmit&&(t.data.approvalId="",t.data.bizForm.bizId="",t.data.bizForm.projectId=""),t.data.bizForm.fundCompositionDto.map((function(e){e.fundSource=e.fundSource?e.fundSource.value:""})),t.data.bizForm.fundCompositions=t.data.bizForm.fundCompositionDto,e.detail=t.data,setTimeout((function(){e.$refs["detail"].clearValidate(),"MA"!==e.detail.bizForm.baseInfo.investType.value&&e.getRound(!0)}),50)}})).catch((function(e){console.log(e)}))},setApprovalNodes:function(e){for(var t in e)e[t].nodeRefId=e[t].nodeRefId||e[t].id||e[t].userId,e[t].nodeType=e[t].nodeType||"UN",e[t].userId=e[t].nodeRefId||e[t].id,e[t].userTag=e[t].userTag||"审批人",e[t].nodeName=e[t].userTag||"审批人";this.detail.approvalNodes=e},submit:function(e,t){var a=this;this.$refs["detail"].validate((function(o){if(o){if(a.detail.bizForm.fundCompositions=a.detail.bizForm.fundCompositions||[],a.detail.bizForm.fundCompositions.length<1)return void a.$message.warning({message:"资金组成中至少有一个资金来源！",duration:1500});if("MA"!==a.detail.bizForm.investType.value&&(("PE"===a.detail.bizForm.baseInfo.projectTypeSh||"PM"===a.detail.bizForm.baseInfo.projectTypeSh)&&a.deptEntStat.peEntStat.full||"VC"===a.detail.bizForm.baseInfo.projectTypeSh&&a.deptEntStat.vcEntStat.full))return void a.$message.warning({message:"您所在部门的可创建的企业已满，无法创建，请释放再尝试！",duration:1500});var i=d["a"].deepCopy(a.detail),s={};s.submitType=e,s.templateCode=a.templateCode,s.urgencyLvl=i.urgencyLvl,i.approvalId&&(s.approvalId=i.approvalId),i.approvalTitle&&(s.approvalTitle=i.approvalTitle),i.approvalType&&"FX"!==i.approvalType.value&&(s.approvalNodes=i.approvalNodes,s.ccUserIds=function(){var e=[];return i.ccUsers.map((function(t){e.push(t.id||t.userId)})),e}()),i.bizForm.baseInfo.projectUserId=i.bizForm.baseInfo.projectUser[0].userId||i.bizForm.baseInfo.projectUser[0].id,i.bizForm.investType=i.bizForm.investType?i.bizForm.investType.value:"",i.bizForm.baseInfo.investType=i.bizForm.baseInfo.investType?i.bizForm.baseInfo.investType.value:"",i.bizForm.baseInfo.projectStage=i.bizForm.baseInfo.projectStage?i.bizForm.baseInfo.projectStage.value:"",i.bizForm.baseInfo.projectType=i.bizForm.baseInfo.projectType?i.bizForm.baseInfo.projectType.value:"","MA"===i.bizForm.investType?i.bizForm.baseInfo.projectTypeSh=i.bizForm.baseInfo.projectTypeSh?i.bizForm.baseInfo.projectTypeSh.value:"":i.bizForm.baseInfo.projectTypeMa=i.bizForm.baseInfo.projectTypeMa?i.bizForm.baseInfo.projectTypeMa.value:"","SE"===i.bizForm.projectSource.sourceType&&(delete i.bizForm.projectSource.sourceEnt,delete i.bizForm.projectSource.sourceReferrer,delete i.bizForm.projectSource.sourceReferrerContact,delete i.bizForm.projectSource.sourceReferrerPosition),s.bizForm=i.bizForm,"TS"===e&&s.bizForm.projectId?r["a"].editInvestProject(s,a.project.projectId).then((function(e){200===e.code&&(a.$message.success({message:"编辑成功！",duration:1500}),a.$emit("REFRESH_LIST"),a.$emit("REFRESH"),a.hideDialog())})).catch((function(e){console.log(e)})):"RA"!==e||"RJ"!==a.approveDetail.currentNode.nodeState.value||t?"RA"===e&&"RJ"===a.approveDetail.currentNode.nodeState.value&&t?(s.resubmitOpt={nodeInstanceId:a.approveDetail.currentNode.nodeInstanceId,opinion:t.opinion,strategy:t.strategy},r["a"].createInvestProject(s).then((function(e){200===e.code&&(a.$message.success({message:"创建成功！",duration:1500}),a.$emit("REFRESH_LIST"),a.$emit("REFRESH"),a.hideDialog())})).catch((function(e){console.log(e)}))):r["a"].createInvestProject(s).then((function(e){200===e.code&&(a.$message.success({message:"创建成功！",duration:1500}),a.$emit("REFRESH_LIST"),a.$emit("REFRESH"),a.hideDialog())})).catch((function(e){console.log(e)})):a.showInnerDialog=!0}}))},getFundList:function(){var e=this;r["a"].getFundList().then((function(t){200===t.code&&(e.funds=t.data)})).catch((function(e){console.log(e)}))},addFundCompositions:function(){console.log(1),this.detail.bizForm.fundCompositions||this.$set(this.detail.bizForm,"fundCompositions",[]),console.log(2),this.detail.bizForm.fundCompositions.push({fundSource:"",investAmt:"",fundId:""})},removeFundCompositions:function(e){this.detail.bizForm.fundCompositions.splice(e,1)}}},m=u,b=(a("1ae8"),a("300b"),a("4ac2")),f=Object(b["a"])(m,o,i,!1,null,"5014b7de",null);t["default"]=f.exports},bca3:function(e,t,a){},ff5a:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"tips-title"},[e._v("\n    "+e._s(e.title)+"\n    "),a("div",{staticClass:"button"},[a("file-upload",{attrs:{icon:"icon",files:e.files,list:!1,tag:"invest"},on:{UPLOAD_FILE:function(t){return e.$emit("UPLOAD_FILE",t)}}})],1)]),a("div",{staticClass:"form-content",staticStyle:{"margin-top":"15px"}},[a("file-upload",{attrs:{icon:"none",files:e.files}})],1)])},i=[],r=a("7218"),s={name:"",components:{fileUpload:r["a"]},props:{data:{type:Object,default:function(){return{}}},title:{type:String,default:function(){return"相关附件"}},files:{type:Array,default:function(){return[]}}}},n=s,l=(a("9efb"),a("4ac2")),p=Object(l["a"])(n,o,i,!1,null,"528bda6b",null);t["default"]=p.exports}}]);