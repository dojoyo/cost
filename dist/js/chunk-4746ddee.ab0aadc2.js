(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4746ddee","chunk-3433da6c"],{"1ca8":function(t,e,s){},"4c93":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"users-wrap"},[t._l(t.users,(function(e,i){return s("div",{key:i,staticClass:"avatar",class:{step:t.step,last:i===t.users.length-1}},[s("span",{staticClass:"close",on:{click:function(t){t.stopPropagation()}}},[s("i",{directives:[{name:"show",rawName:"v-show",value:t.edit,expression:"edit"}],staticClass:"iconfont icon-guanbi",on:{click:function(e){return t.removeUser(i)}}})]),s("el-tooltip",{attrs:{content:e.userName,effect:"dark",placement:"top"}},[s("avatar",{attrs:{user:e}})],1),s("div",{staticClass:"line"})],1)})),s("div",{directives:[{name:"show",rawName:"v-show",value:t.edit,expression:"edit"}]},[s("i",{staticClass:"iconfont icon-tianjia pointer fs-22",on:{click:function(e){return t.showMemberTransfer("transfer")}}})]),s("members-transfer",{ref:"transfer",attrs:{multi:t.multi,step:t.step,users:t.users},on:{SAVE_USERS:t.setUsers}})],2)},n=[],a=s("7150"),o=s("8995"),r={components:{avatar:a["a"],membersTransfer:o["a"]},props:{users:Array,step:{type:Boolean,default:function(){return!1}},edit:{type:Boolean,default:function(){return!0}},multi:{type:Boolean,default:function(){return!0}}},computed:{},data:function(){return{}},methods:{setUsers:function(t){this.$emit("SET_USERS",t)},showMemberTransfer:function(t){this.$refs[""+t].show()},removeUser:function(t){var e=this.users;e.splice(t,1)}}},c=r,l=(s("babb"),s("4ac2")),u=Object(l["a"])(c,i,n,!1,null,"29f2009d",null);e["default"]=u.exports},babb:function(t,e,s){"use strict";s("1ca8")},bfe8:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-dialog",{attrs:{"append-to-body":!0,"close-on-click-modal":!1,"close-on-press-escape":!1,"show-close":!1,visible:t.dialogVisible,top:"50px",width:"500px"}},[s("div",{staticClass:"header",attrs:{slot:"title"},slot:"title"},[s("div",{staticClass:"title"},[t._v("审批意见")]),s("div",{staticClass:"options"},[s("i",{staticClass:"iconfont icon-guanbi pointer fs-22",on:{click:t.close}})]),s("div",{staticClass:"clear"})]),s("el-form",{attrs:{model:t.form,"label-position":"left","label-width":"60px"}},[s("el-form-item",{attrs:{label:"沟通人",prop:"users"}},[s("user-select",{attrs:{users:t.form.users},on:{SET_USERS:t.setUsers}})],1),s("el-form-item",{attrs:{label:"","label-width":"0"}},[s("el-input",{attrs:{autosize:{minRows:4,maxRows:6},placeholder:"请填写审批意见(非必填)",type:"textarea"},model:{value:t.form.opinion,callback:function(e){t.$set(t.form,"opinion",e)},expression:"form.opinion"}})],1)],1),s("div",{staticClass:"w-100p txt-right",staticStyle:{"margin-top":"20px"}},[s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.confirm}},[t._v("确定")])],1)],1)},n=[],a=s("4c93"),o=s("b429"),r={name:"CommunicateDialog",props:{visible:{type:Boolean,default:!1},approvalId:{type:String,default:""},nodeInstanceId:{type:String,default:""}},components:{userSelect:a["default"]},computed:{dialogVisible:function(){return this.visible&&this.getUsers(),this.visible}},data:function(){return{form:{opinion:"",users:[]}}},methods:{getUsers:function(){var t=this;o["a"].getCommunicateUsers(this.approvalId,this.nodeInstanceId).then((function(e){e.success&&(t.form.users=e.data)}))},setUsers:function(t){this.form.users=t},confirm:function(){var t=this;o["a"].cancelCommunicate(this.approvalId,this.nodeInstanceId,this.form.opinion,this.form.users.map((function(t){return t.id||t.userId}))).then((function(e){e.success&&(t.$message.success({message:"操作成功！",duration:1500}),t.close())}))},close:function(){this.$emit("update:visible",!1)}}},c=r,l=s("4ac2"),u=Object(l["a"])(c,i,n,!1,null,null,null);e["default"]=u.exports}}]);