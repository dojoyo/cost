(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6948539b","chunk-d81f416c"],{"260b":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-dialog",{attrs:{visible:t.dialogVisible,width:"850px","append-to-body":!0,"show-close":!1,top:"50px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[s("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[s("div",{staticClass:"title"},[s("i",{staticClass:"iconfont icon-shenpi_normal"}),t._v(" 拜访记录\n    ")]),s("div",{staticClass:"options"},[s("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:function(e){t.dialogVisible=!1}}})]),s("div",{staticClass:"clear"})]),s("div",{staticClass:"detail-wrap"},[s("div",{staticClass:"box"},[s("el-form",{attrs:{"label-width":"130px"}},[s("div",{staticStyle:{width:"49%",float:"left"}},[s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"关联企业："}},[t._v("\n            贝壳找房\n          ")]),s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"地点："}},[t._v("\n            北京\n          ")]),s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"拜访类型："}},[t._v("\n            投前拜访\n          ")])],1),s("div",{staticStyle:{width:"49%",float:"left","margin-left":"2%"}},[s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"拜访日期："}},[t._v("\n            2020-04-01 18:00-19:00\n          ")]),s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"拜访形式："}},[t._v("\n            实地拜访\n          ")]),s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"拜访级别："}},[t._v("\n            三级\n          ")])],1),s("div",{staticStyle:{width:"100%",float:"left"}},[s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"具体行程安排："}},[t._v("\n            广东省佛山市-广东省广州市-广东省深圳市-上海市-山东省青岛市-北京市\n          ")]),s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"我方出席人员："}},[s("user-select",{attrs:{edit:!1,users:[{userName:"张三"},{userName:"里斯"}]}})],1)],1),s("div",{staticClass:"clear"})])],1),s("div",{staticClass:"box"},[s("div",{ref:"stockholder",staticClass:"tips-title",attrs:{id:"stockholder"}},[t._v("\n        对方出席人员及简介\n      ")]),s("div",{staticClass:"table-wrap"},[s("div",{staticClass:"header"},[s("div",{staticStyle:{width:"20%"}},[t._v("姓名")]),s("div",{staticStyle:{width:"25%"}},[t._v("职位")]),s("div",{staticStyle:{width:"55%"}},[t._v("简介")])]),s("div",{staticClass:"content"},[s("div",{staticStyle:{width:"20%"}},[t._v("姓名")]),s("div",{staticStyle:{width:"25%"}},[t._v("职位")]),s("div",{staticStyle:{width:"55%"}},[t._v("简介")])])])]),s("div",{staticClass:"box"},[s("div",{ref:"stockholder",staticClass:"tips-title",attrs:{id:"stockholder"}},[t._v("\n        第三方出席人员及简介\n      ")]),s("div",{staticClass:"table-wrap"},[s("div",{staticClass:"header"},[s("div",{staticStyle:{width:"20%"}},[t._v("姓名")]),s("div",{staticStyle:{width:"25%"}},[t._v("职位")]),s("div",{staticStyle:{width:"55%"}},[t._v("简介")])]),s("div",{staticClass:"content"},[s("div",{staticStyle:{width:"20%"}},[t._v("姓名")]),s("div",{staticStyle:{width:"25%"}},[t._v("职位")]),s("div",{staticStyle:{width:"55%"}},[t._v("简介")])])])]),s("div",{staticClass:"box"},[s("div",{ref:"stockholder",staticClass:"tips-title",attrs:{id:"stockholder"}},[t._v("\n        拜访说明\n      ")]),s("el-form",[s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"拜访期望达成目的："}},[t._v("\n          沟通老股收购\n        ")]),s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"拜访材料："}},[t._v("\n          202004091100.pdf\n        ")]),s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"其他说明："}},[t._v("\n          提前研究贝壳找房未来三年内营收能力\n        ")])],1)],1),s("div",{staticClass:"box"},[s("div",{ref:"stockholder",staticClass:"tips-title",attrs:{id:"stockholder"}},[t._v("\n        拜访纪要及附件\n      ")]),s("el-form",{attrs:{"label-width":"90px"}},[s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"拜访纪要："}},[t._v("\n          张一鸣，今日头条创始人、CEO。毕业于南开大学软件工程专业，曾参与创建酷讯、九九房等多家互联网公司，历任酷讯技术委员会主席、九九房创始人兼CEO。 2012年，张一鸣创办字节跳动。 2013年，他先后入选《福布斯》“中国30位30岁以下的创业者”和《财富》“中国40位40岁以下的商业精英”…更多\n        ")]),s("el-form-item",{staticStyle:{margin:"0"},attrs:{label:"附件："}},[t._v("\n          202004091100.pdf\n        ")])],1)],1)])])},a=[],l=s("328f"),n={name:"",components:{userSelect:l["a"]},props:{},data:function(){return{dialogVisible:!1}},methods:{show:function(){this.dialogVisible=!0}}},r=n,o=(s("83a2"),s("4ac2")),c=Object(o["a"])(r,i,a,!1,null,"040d5f76",null);e["default"]=c.exports},"328f":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"users-wrap"},[t._l(t.users,(function(e,i){return s("div",{key:i,staticClass:"avatar",class:{step:t.step,last:i===t.users.length-1}},[s("span",{staticClass:"close",on:{click:function(t){t.stopPropagation()}}},[s("i",{directives:[{name:"show",rawName:"v-show",value:t.edit,expression:"edit"}],staticClass:"iconfont icon-guanbi",on:{click:function(e){return t.removeUser(i)}}})]),s("el-tooltip",{attrs:{content:e.userName,effect:"dark",placement:"top"}},[s("avatar",{attrs:{user:e}})],1),t.tags?s("div",{staticStyle:{"line-height":"16px","padding-top":"8px"}},[t._v(t._s(e.userTag||e.userName))]):t._e(),s("div",{staticClass:"line"})],1)})),s("div",{directives:[{name:"show",rawName:"v-show",value:t.edit,expression:"edit"}]},[s("i",{staticClass:"iconfont icon-tianjia pointer fs-22",on:{click:function(e){return t.showMemberTransfer("transfer")}}})]),s("members-transfer",{ref:"transfer",attrs:{multi:t.multi,role:t.role,step:t.step,users:t.users,invest:t.invest},on:{SAVE_USERS:t.setUsers}})],2)},a=[],l=s("7150"),n=s("8995"),r={components:{avatar:l["a"],membersTransfer:n["a"]},model:{prop:"users",event:"change"},props:{users:Array,step:{type:Boolean,default:function(){return!1}},edit:{type:Boolean,default:function(){return!0}},multi:{type:Boolean,default:function(){return!0}},placement:{type:String,default:function(){return"top"}},role:{type:Boolean,default:function(){return!1}},tags:{type:Boolean,default:function(){return!1}},invest:{type:Boolean,default:function(){return!1}}},computed:{},data:function(){return{}},methods:{setUsers:function(t){this.$emit("change",t),this.$emit("SET_USERS",t)},showMemberTransfer:function(t){this.$refs[""+t].show()},removeUser:function(t){var e=this.users;e.splice(t,1)}}},o=r,c=(s("44df"),s("4ac2")),d=Object(c["a"])(o,i,a,!1,null,"45d72c07",null);e["a"]=d.exports},"44df":function(t,e,s){"use strict";s("bfe1")},"83a2":function(t,e,s){"use strict";s("f544")},bfe1:function(t,e,s){},f544:function(t,e,s){}}]);