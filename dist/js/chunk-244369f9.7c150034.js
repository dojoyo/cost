(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-244369f9"],{"0837":function(e,t,r){"use strict";var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{directives:[{name:"show",rawName:"v-show",value:!e.operation,expression:"!operation"}],staticClass:"frontend-dialog-wrap",class:{on:e.content},domProps:{innerHTML:e._s(e.content||e.tips)},on:{click:e.focusTextarea}}),r("div",{directives:[{name:"show",rawName:"v-show",value:e.operation,expression:"operation"}],staticClass:"operation-dialog-wrap"},[r("el-scrollbar",{staticClass:"scrollbar"},[r("textareaEdit",{ref:"textarea",staticClass:"textareaEdit",on:{change:e.showMsg},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}}),r("el-row",{staticStyle:{"margin-top":"5px"},attrs:{gutter:30}},e._l(e.attachments,(function(t,s){return r("el-col",{attrs:{span:12}},[e._v(e._s(t.fileName)),r("i",{staticClass:"iconfont icon-delete pointer fr mr-10",on:{click:function(t){return e.removeAttachment(s)}}})])})),1)],1),r("div",{staticClass:"btn-wrap"},[r("i",{staticClass:"iconfont icon-youxiang pointer fl mr-10 gray",on:{click:e.showMemberPanel}}),r("i",{staticClass:"iconfont icon-target pointer fl"}),r("member-panel",{attrs:{top:"-462px",left:"50px",xKey:"users",visible:e.panelVisible,member:e.users,multi:!0,canSelectDept:!0},on:{setMember:e.addNotice,selectDept:e.addNoticeDept,close:function(t){e.panelVisible=!1}}}),r("span",{staticClass:"fr pointer mr-10",on:{click:e.cancelOperation}},[e._v("取消")])],1)],1)])},o=[],n=r("40c4"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticStyle:{width:"100%"}},[r("div",{ref:"textarea",staticClass:"test-textarea",attrs:{id:"contenteditablediv",contenteditable:e.canEdit},domProps:{innerHTML:e._s(e.innerText)},on:{focus:function(t){e.isLocked=!0},blur:function(t){e.isLocked=!1},input:e.changeText}},[r("br")])])},i=[],c={name:"editDiv",props:{value:{type:String,default:""},canEdit:{type:Boolean,default:!0}},data:function(){return{innerText:this.value,isLocked:!1,firstInput:!0}},watch:{value:function(){this.isLocked&&this.innerText||(this.innerText=this.value)}},mounted:function(){},methods:{changeText:function(e){var t=this;this.$emit("input",this.$refs.textarea.innerHTML),this.$emit("change",this.$refs.textarea.innerHTML),1===this.$refs.textarea.innerHTML.length&&setTimeout((function(){t.keepLastIndex(e.target)}),5)},changeEmit:function(){this.$emit("change",this.$refs.textarea.innerHTML)},keepLastIndex:function(e){if(window.getSelection){e.focus();var t=window.getSelection();t.selectAllChildren(e),t.collapseToEnd()}else if(document.selection){t=document.selection.createRange();t.moveToElementText(e),t.collapse(!1),t.select()}},focusToLast:function(){var e=this.$refs.textarea;e.focus();var t=window.getSelection();t.selectAllChildren(e),t.collapseToEnd()},focusToPosition:function(e){var t=this.$refs.textarea;t.focus()}}},u=c,l=(r("18e0"),r("4ac2")),d=Object(l["a"])(u,a,i,!1,null,null,null),p=d.exports,m={name:"DialogPanel",components:{textareaEdit:p,memberPanel:n["a"]},props:{visible:{type:Boolean,default:function(){return!1}},comment:Object,tips:{type:String,default:function(){return"请输入内容"}}},data:function(){return{operation:!1,content:"",attachments:[],uploadURL:"https://dev-api.cgvcap.com/file",headers:{Authorization:"Bearer "+this.$store.state.user.user.token},panelVisible:!1,users:[]}},watch:{comment:function(e){console.log(e),this.content=e.content,this.attachments=e.attachments,this.operation=!e.hidden}},created:function(){},mounted:function(){var e=this;this.content=this.comment.content,this.content&&(this.operation=!0,setTimeout((function(){e.$refs.textarea.focusToLast()}),50))},methods:{onChangeFile:function(e){e.response&&200===e.response.code&&e.response.data&&(this.attachments.push(e.response.data[0]),this.$refs.upload.clearFiles(),this.$emit("setComment",{content:this.content,attachments:this.attachments}))},removeAttachment:function(e){this.attachments.splice(e,1),this.$emit("setComment",{content:this.content,attachments:this.attachments})},setOperation:function(){this.$emit("setComment",{content:this.content,attachments:this.attachments}),this.operation=!1},cancelOperation:function(){this.content="",this.attachments=[],this.operation=!1},showMsg:function(){this.$emit("setComment",{content:this.content,attachments:this.attachments})},showMemberPanel:function(){this.panelVisible=!0},addNotice:function(){var e=this;this.content=this.content||"",this.content+='<span class="success">@'+this.users[0].userName+'</span><span style="display: none">[@u|'+this.users[0].id+"|"+this.users[0].userName+"]</span> ",this.showMsg(),setTimeout((function(){e.$refs.textarea.focusToLast(),e.users=[]}),5)},addNoticeDept:function(e){var t=this;console.log(e),this.content+='<span class="warning">@'+e.userName+'</span><span style="display: none">[@d|'+e.deptId+"|"+e.userName+"]</span> ",this.showMsg(),setTimeout((function(){t.$refs.textarea.focusToLast()}),5)},focusTextarea:function(){var e=this;this.operation=!0,setTimeout((function(){e.$refs.textarea.focusToLast()}),50)},replyUser:function(e){var t=this;console.log(e),this.operation=!0,this.content="",setTimeout((function(){t.$refs.textarea.focusToPosition()}),10)},removeSpan:function(e){var t="",r=e.indexOf('<span style="display: none">['),s=e.indexOf("]</span>",r);return r>0?(t=e.substring(0,r)+e.substring(s+8,e.length),this.removeSpan(t)):e}}},h=m,f=(r("f426"),Object(l["a"])(h,s,o,!1,null,null,null));t["a"]=f.exports},"0ac1":function(e,t,r){},"18e0":function(e,t,r){"use strict";r("0ac1")},3729:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAB1dJREFUeAHtnFmIHEUYx3t2dmfvw9kzO7suexkRAoqYIAhi3gISRXwx6kMivigKHk9BnxQJaJSoiCDiW3wTFEEQEX3IS0QFA5KwR5i9lz3cmb3P8f/v3R5qent2+qju3Z6tgk5XV9fx1W/qq/rqq95omgqKgCKgCCgCioAioAj4SmBwcPCJ4eHhl2Q3UiK7wqNY38zMTC3k+nZnZ+dZ2fIdC4CpVOpdgGvG9Y5sgEVfH1S3b2BgYB3X13509jiMwKsAtx6NRi8rgA4J3L1790wmkzkfiUTe7+npmXZYXGUfHR1NQIXfA8SYFQ2kR6DaLw4NDV2yem8nLWInUzHmAbhHMTKvAeIj6N/1/v7+5930s9RNoTCXGRsb61hdXb0CeBcAb7ykpOQFqPd1t33yfQRCPfoh3EXYYKdwpz3md1gElFto5Jve3t4BsTHMiQ9ub2/fQBoXzw+rqqqutLe3r4h5nMZ9A8j5BfPPG/ilP4BQsbKysm2shL6PeADa2tzcjKLNDchwua+v7xPIkCGYkZGR9vX19dcgx5cYdUmmeQ2+AcQc8yaEu1pbW5tpamqKQGivstouD4ja7OxsZnFxkf17C/Pbx7YLO8zoC0CqLX79WzU1NbHW1lZf2rDTz+np6czS0tIGRuApszrbKW8nj1+G9EU0HuPIsyOEX3n22qcJQ3l8Cb7MSVwwYrFYIHPeQVQ4bXDu3djY4AKWDViJG7ES56TtvUxD3f/KZrQR8QUg2q0NYsGw0T9tT46c1R/wPkXZC1blMf3c50Td/QJoJduRSausrHwdEL+yECjtBB7LH0uAHR0dc+j7bwTgNfi1iHiVKzTlFUCPP5UCqAB6JOCxuBqBHgEGugrDoNW4TzUHeE+08vJyPVlWHqMNGNIaTJZh41n2PTCA2J1o8BBr2CNb9gGmhYbdi5Q8FRUV2TZaWlo07McvZRMkRwIDyFHW2dlZcATKyiOZU97qAgNICTjCCgVZeczt0D8Jh+qT0IQuqPWvXV1d/5rzuHk+FovI1NRUNfa4P2P+/QEgP4PD9R/4K191A8xcpugBcs6FT/AndPxsY2OjlkgkNLjy2e/PZUAsaoCENz4+znn3sXg8XgIHr1ZaWqrRT1hdXZ2Bo/VaMpl8wDyqnDwXLUDCm5iYoAnDlT+STqdzLICGhoYI0qNQ57NOgJnzFiVAEV5zczPNGG1tbU2bnJzMQuQzA6yDpBmKk+eiAyjCg6pqUFX9EiFiTtTm5+d3oMK/dHd3/+gEmDlvoGbM1taWRoPaHNARut71ZDt5zOWNZyt4xjuCJEQcNGlQW8K7gTnxadytLXujYIF7YAAJDhN2VoXMchk7kUJ5xF2GWMdB8MR8cPEb8M61tbUti+/cxAMDyJ0ITQirvTBHoAHGTh5zR+3AW15e1ubm5qTCoxyBAWRjBiTG8wU7ecSyTuChHNVWysgzZAj1InLY8AgxtADtwsMnHuyn9JHHShkCVeHdJr3/6wQejjC5+5CqtmIPQgfQKTx8vkZj2fNqK0IT46FSYTfwuML7GUID8CjC4w8TGoDcx9KWo0uKuwpz4DsuGJzzqLZ+jzyj/dAAJCCOQrNXhR05LHhsOxQAsXfVRxRcUPu8KoXg0XEAb7Tll1gE4DWEAiC+a9b7SYeo2atSSG33RuzLXkHlKx8KM4ZnxQz02HBu40hcWFjQmA73/IFzHtUel29LcagAiufKdE5wRMKjEtiCYTUKQwGQcyBXV369YFx2jj+tOiw7zS+AUlWGh+0eQwXUuALqv+vH91iZWNw1QAhUt7KychL3+3mhUl7884YE5qc4PctHIVAOjNoz+JuRVSwo84A4Drn4F0y3EdcvzKN3EE+7kdcWQECJ4nTrYXiVH0f8NBo6DYHuzdcgjw5pXtB5yi/lDyuwfaq/YHjHIX8c8uhf6COui4a+0L5MAuIfuG5ifv0dU8afiO//EsrUmbyqhsrLYUM9hfzPIH4O9zpT2byP/NVxaKMLzkn+sAK+SNB/SJwJ6+fBDuVIAyAP5L/DYvU94ru2lKmSfQABqx7g3sb9FeTlr+UqcATSiOVKyaPFIEciRx7+o4ls+8IIdNUXFKLqf4G+fIR7SqwkByA6/RDUlN+PdIiZ3MYJkRfq0204qrbfgaPf2LkQnAR4WZEBbwzqfR51/m0k5gDEPHAbL04aL2Xc2SEeYvNudaQpow2xDtqH/KF4tuLTD3anrq6OC6YefB8S7ATVuFhDzl4Y89RzHKbF2lmv/SIbMhLryVFhvpC1iIiNFEHc3iIidhQgXZsxYj0hjrszY6w6DJj7DGmk5TWkreo46mlQzxHIeBN3OYZ0oQ4DYN6tHMq6th8LtevxvfSt3L450KOAenHArYDpcgL2WAK/aDuuE0i7By/rca/Hc70Rx507nHKk8fOsMrynZVBmPCPOsIn0Td6Rzk228czdAVWNxm0KeVJGHPf/8DyJawJ+xHGYNZNIk+5MQLsqKAKKgCKgCCgCioAioAgoAoqAIhAwgf8BmYvWVeoAfXkAAAAASUVORK5CYII="},"40c4":function(e,t,r){"use strict";var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{staticClass:"target-wrap",attrs:{visible:e.visible,width:"260px","show-close":!1,"append-to-body":!0,top:"50px","close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.visible=t}}},[r("div",{staticClass:"select-member-panel"},[r("div",{staticClass:"member-panel-header"},[r("el-row",[r("el-col",{staticStyle:{"border-right":"solid 1px #ddd"},attrs:{span:12}},[r("div",{staticClass:"button",class:{active:"team"===e.type},on:{click:function(t){return e.setType("team")}}},[e._v("团队")])]),r("el-col",{attrs:{span:12}},[r("div",{staticClass:"button",class:{active:"dept"===e.type},on:{click:function(t){return e.setType("dept")}}},[e._v("部门")])])],1),r("i",{directives:[{name:"show",rawName:"v-show",value:e.closeBtn,expression:"closeBtn"}],staticClass:"iconfont icon-guanbi",on:{click:function(t){return e.close(e.xKey)}}})],1),r("div",{staticClass:"member-panel-body"},[r("el-input",{directives:[{name:"show",rawName:"v-show",value:"team"===e.type,expression:"type==='team'"}],attrs:{placeholder:"搜索成员","prefix-icon":"el-icon-search",size:"mini"},on:{input:function(t){return e.setType(e.type,!0)}},model:{value:e.searchKey,callback:function(t){e.searchKey=t},expression:"searchKey"}}),r("el-scrollbar",{staticClass:"scrollbar",style:{height:"team"!==e.type?"424px":"392px"}},[r("el-tree",{attrs:{data:e.tree,props:e.defaultProps,"node-key":"id","default-expanded-keys":["topTree"]},on:{"node-click":e.handleNodeClick},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.node,o=t.data;return r("div",{staticClass:"custom-tree-node"},[o.noAvatar?e._e():r("div",{staticClass:"short"},[r("avatar",{attrs:{user:o}})],1),r("div",{staticClass:"name",staticStyle:{"margin-right":"auto",position:"relative"}},[e._v(e._s(s.label)+" "),r("span",{directives:[{name:"show",rawName:"v-show",value:o.deptId&&e.canSelectDept,expression:"data.deptId && canSelectDept"}],staticClass:"add",on:{click:function(e){e.stopPropagation()}}},[r("i",{staticClass:"iconfont icon-tianjia2",on:{click:function(t){return e.selectDept(o)}}})])]),r("div",{directives:[{name:"show",rawName:"v-show",value:o.checked,expression:"data.checked"}],staticClass:"checked"},[r("i",{staticClass:"iconfont icon-check"})])])}}])})],1)],1)])])},o=[],n=r("7150"),a=r("26aa"),i={name:"MemberPanel",components:{avatar:n["a"]},props:{member:Array,xKey:String,top:String,left:String,visible:{type:Boolean,default:function(){return!1}},multi:{type:Boolean,default:function(){return!1}},closeBtn:{type:Boolean,default:function(){return!0}},disabled:{type:Boolean,default:function(){return!1}},canSelectDept:{type:Boolean,default:function(){return!1}}},computed:{userList:function(){return this.$store.getters.userList},userDeptList:function(){return this.$store.getters.userDeptList}},data:function(){return{searchKey:"",type:"team",tree:[],curMember:[],defaultProps:{children:"children",label:"userName"},color:["inverse-blue","inverse-indigo","inverse-purple","inverse-pink","inverse-red","inverse-orange","inverse-yellow","inverse-green","inverse-teal","inverse-cyan","inverse-gray","inverse-gray-dark"]}},watch:{member:function(e){this.curMember=e,this.tree[0]&&this.setTreeCheck()}},created:function(){this.setType("team")},methods:{setType:function(e,t){var r=this;if(this.type=e,"team"===e)if(this.userList&&!t){for(var s in this.tree=[{userName:"所有人员",id:"topTree",children:JSON.parse(this.userList),noAvatar:!0}],this.tree[0].children)this.$set(this.tree[0].children[s],"checked",!1);this.member[0]&&(this.curMember=this.member,this.setTreeCheck())}else{var o={filter:this.searchKey};a["a"].userSearch(o).then((function(e){if(200===e.code){for(var s in e.data.map((function(e){e.id=e.userId})),t||r.$store.dispatch("SetUserList",JSON.stringify(e.data)),r.defaultProps={children:"children",label:"userName"},r.tree=[{userName:"所有人员",id:"topTree",children:e.data,noAvatar:!0}],r.tree[0].children)r.$set(r.tree[0].children[s],"checked",!1);r.member[0]&&(r.curMember=r.member,r.setTreeCheck())}else r.$message.warning({message:e.msg,duration:1500})})).catch((function(e){r.$message.error({message:JSON.stringify(e),duration:1500})}))}else this.userDeptList&&!t?(this.tree=this.setDeptTree(JSON.parse(this.userDeptList)),console.log(this.tree)):a["a"].userDeptTree({}).then((function(e){200===e.code?(t||r.$store.dispatch("SetUserDeptList",JSON.stringify(e.data)),r.tree=r.setDeptTree(e.data),console.log(r.tree)):r.$message.warning({message:e.msg,duration:1500})})).catch((function(e){r.$message.error({message:JSON.stringify(e),duration:1500})}))},setDeptTree:function(e){var t=[];for(var r in e)if(e[r].subDepts&&e[r].subDepts.length>0&&(e[r].subDepts=this.setDeptTree(e[r].subDepts)),t.push({userName:e[r].deptName,noAvatar:!0,children:e[r].subDepts,deptId:e[r].deptId}),e[r].users&&e[r].users.length>0)for(var s in e[r].users)t[r].children.unshift(e[r].users[s]);return t},setTreeCheck:function(){this.curMember&&this.curMember.length>0?this.tree=this.setTree(this.tree,this.curMember):this.setType(this.type)},setTree:function(e,t){if(e[0]&&t[0]){for(var r in e)for(var s in t){if(e[r].children&&(e[r].children=this.setTree(e[r].children,t)),e[r].id&&(e[r].id===t[s].userId||e[r].id===t[s].id)){e[r].checked=!0;break}e[r].checked=!1}return e}},handleNodeClick:function(e){if(!e.noAvatar){var t=this.member;if(e.id=e.id||e.userId,!e.checked&&e.id)e.checked=!0,t.push(e),this.$emit("setMember",{data:t});else for(var r in t)if(t[r].id===e.id||t[r].userId===e.id){t.splice(r,1),this.$emit("setMember",{data:t});break}}},selectDept:function(e){this.$emit("selectDept",e)},close:function(e){this.$emit("close",e)}}},c=i,u=(r("ea7a"),r("4ac2")),l=Object(u["a"])(c,s,o,!1,null,null,null);t["a"]=l.exports},"4ca0":function(e,t,r){"use strict";var s=r("b775");t["a"]={getEnum:function(e){return Object(s["a"])({url:"/enum/"+e,method:"get"})},periodList:function(e){return Object(s["a"])({url:"/okr/period/list",method:"get",params:e})},periodCheck:function(e){return Object(s["a"])({url:"/okr/period/"+e+"/delete/check",method:"get"})},periodDelete:function(e){return Object(s["a"])({url:"/okr/period/"+e+"/delete",method:"post"})},periodDetail:function(e){return Object(s["a"])({url:"/okr/period/"+e,method:"post"})},periodAdd:function(e){return Object(s["a"])({url:"/okr/period/add",method:"post",data:e,headers:{"Content-Type":"application/json; charset=utf-8"}})},periodEdit:function(e,t){return Object(s["a"])({url:"/okr/period/"+t+"/edit",method:"post",data:e,headers:{"Content-Type":"application/json; charset=utf-8"}})},myMembers:function(e){return Object(s["a"])({url:"/okr/my/members",method:"get",params:e})},myTarget:function(e){return Object(s["a"])({url:"/okr/my/objs",method:"get",params:e})},myStat:function(e){return Object(s["a"])({url:"/okr/my/stat",method:"get",params:e})},objQuery:function(e){return Object(s["a"])({url:"/okr/obj/query",method:"get",params:e})},objQueryPage:function(e){return Object(s["a"])({url:"/okr/obj/query/page",method:"get",params:e})},objUsers:function(e){return Object(s["a"])({url:"/okr/report/operate/objUsers",method:"get",params:e})},objDetail:function(e){return Object(s["a"])({url:"/okr/obj/"+e,method:"get"})},objAdd:function(e){return Object(s["a"])({url:"/okr/obj/add",method:"post",data:e})},objEdit:function(e,t){return Object(s["a"])({url:"/okr/obj/"+t+"/edit",method:"post",data:e})},objDelete:function(e){return Object(s["a"])({url:"/okr/obj/"+e+"/delete",method:"post"})},objPublish:function(e){return Object(s["a"])({url:"/okr/obj/"+e+"/publish",method:"post"})},objAddDraft:function(e){return Object(s["a"])({url:"/okr/obj/addDraft",method:"post",data:e})},scoreRule:function(e){return Object(s["a"])({url:"/okr/keyResult/"+e+"/scoreRule",method:"get"})},scoreInfo:function(e){return Object(s["a"])({url:"/okr/obj/"+e+"/close/scoreInfo",method:"get"})},setScoreRule:function(e,t){return Object(s["a"])({url:"/okr/keyResult/"+t+"/setScoreRule",method:"post",data:e})},setScore:function(e,t){return Object(s["a"])({url:"/okr/obj/"+t+"/close/scoring",method:"post",data:e})},updateProgress:function(e,t){return Object(s["a"])({url:"/okr/obj/"+t+"/updateProgress",method:"post",data:e})},updateMembers:function(e,t){return Object(s["a"])({url:"/okr/obj/"+t+"/updateMembers",method:"post",data:e})},objDraft:function(e){return Object(s["a"])({url:"/okr/obj/drafts",method:"get",params:e})},keyResultStat:function(e){return Object(s["a"])({url:"/okr/report/operate/keyResultStat",method:"get",params:e})},objStat:function(e){return Object(s["a"])({url:"/okr/report/operate/objStat",method:"get",params:e})},userStat:function(e){return Object(s["a"])({url:"/okr/report/operate/userStat",method:"get",params:e})},progressUpdateTrend:function(e){return Object(s["a"])({url:"/okr/report/operate/progressUpdateTrend",method:"get",params:e})},progressUpdateUser:function(e){return Object(s["a"])({url:"/okr/report/operate/progressUpdateRank/user",method:"get",params:e})},progressUpdateObj:function(e){return Object(s["a"])({url:"/okr/report/operate/progressUpdateRank/obj",method:"get",params:e})},diffAnalysis:function(e){return Object(s["a"])({url:"/okr/report/operate/progress/diffAnalysis",method:"get",params:e})},objStatAll:function(e){return Object(s["a"])({url:"/okr/report/progress/objStatAll",method:"get",params:e})},objDist:function(e){return Object(s["a"])({url:"/okr/report/progress/objDist",method:"get",params:e})},objStatNoProgress:function(e){return Object(s["a"])({url:"/okr/report/progress/objStatNoProgress",method:"get",params:e})},objStatDept:function(e){return Object(s["a"])({url:"/okr/report/progress/objStatDept",method:"get",params:e})},objStatDeptDetail:function(e){return Object(s["a"])({url:"/okr/report/progress/objStatDept/details",method:"get",params:e})},objStatUser:function(e){return Object(s["a"])({url:"/okr/report/progress/objStatUser",method:"get",params:e})},objStatUserDetail:function(e){return Object(s["a"])({url:"/okr/report/progress/objStatUser/details",method:"get",params:e})},exportUser:function(e){return Object(s["a"])({url:"/okr/report/progress/objStatUser/export",method:"get",params:e,responseType:"arraybuffer"})},scoreObjStatAll:function(e){return Object(s["a"])({url:"/okr/report/score/objStatAll",method:"get",params:e})},scoreObjDist:function(e){return Object(s["a"])({url:"/okr/report/score/objDist",method:"get",params:e})},scoreObjStatUnclosed:function(e){return Object(s["a"])({url:"/okr/report/score/objStatUnclosed",method:"get",params:e})},scoreObjStatDept:function(e){return Object(s["a"])({url:"/okr/report/score/objStatDept",method:"get",params:e})},scoreObjStatUser:function(e){return Object(s["a"])({url:"/okr/report/score/objStatUser",method:"get",params:e})},scoreObjStatUserDetails:function(e){return Object(s["a"])({url:"/okr/report/score/objStatUser/details",method:"get",params:e})},treeEnt:function(e){return Object(s["a"])({url:"/okr/tree/ent",method:"get",params:e})},treeDept:function(e){return Object(s["a"])({url:"/okr/tree/dept",method:"get",params:e})},addComment:function(e,t){return Object(s["a"])({url:"/comment/"+t+"/add",method:"post",data:e})},deleteComment:function(e){return Object(s["a"])({url:"/comment/"+e+"/delete",method:"post"})},commentList:function(e,t){return Object(s["a"])({url:"/comment/"+t+"/page",method:"post",data:e})},addLike:function(e,t){return Object(s["a"])({url:"/like/"+t+"/add",method:"post",data:e})},removeLike:function(e,t){return Object(s["a"])({url:"/like/"+t+"/delete",method:"post",data:e})},likeList:function(e,t){return Object(s["a"])({url:"/like/"+t,method:"post",data:e})},hasLiked:function(e,t){return Object(s["a"])({url:"/like/"+t+"/hasLiked",method:"post",data:e})},hasFollow:function(e){return Object(s["a"])({url:"/okr/obj/"+e+"/hasFollowed",method:"get"})},followList:function(e){return Object(s["a"])({url:"/okr/obj/"+e+"/followers",method:"get"})},follow:function(e){return Object(s["a"])({url:"/okr/obj/"+e+"/follow",method:"post"})},unFollow:function(e){return Object(s["a"])({url:"/okr/obj/"+e+"/unfollow",method:"post"})},history:function(e){return Object(s["a"])({url:"/okr/obj/"+e+"/progresses",method:"get"})},activity:function(e,t){return Object(s["a"])({url:"/activity/"+t,method:"post",data:e})},communicate:function(e){return Object(s["a"])({url:"/okr/obj/"+e+"/communicate",method:"post"})},objChart:function(e){return Object(s["a"])({url:"/okr/tree/objChart",method:"get",params:e})}}},"599e":function(e,t,r){},"956b":function(e,t,r){"use strict";var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.template?e._e():r("div",{staticStyle:{display:"flex","align-items":"flex-start",padding:"15px"}},[r("div",{staticClass:"round-title",staticStyle:{"margin-right":"10px"}},[e.userInfo?r("avatar",{attrs:{user:e.userInfo}}):e._e()],1),r("dialog-panel",{ref:"dialog",staticStyle:{"margin-right":"auto",width:"85%","text-align":"left"},attrs:{comment:e.comment,tips:"沟通内容，文字上限2000。"},on:{setComment:e.setMsg}}),r("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary"},on:{click:e.sendMsg}},[e._v("发送")])],1),"1"===e.template?r("div",[r("el-input",{attrs:{type:"textarea",rows:3,placeholder:"评论一句，知音难觅～"},model:{value:e.msg,callback:function(t){e.msg=t},expression:"msg"}}),r("el-button",{directives:[{name:"show",rawName:"v-show",value:e.msg,expression:"msg"}],staticStyle:{"margin-top":"10px"},attrs:{type:"primary"},on:{click:e.sendMsg}},[e._v("发送")])],1):e._e()])},o=[],n=r("4ca0"),a=r("0837"),i=r("7150"),c={name:"targetDialog",props:{id:String,type:String,template:String},components:{avatar:i["a"],dialogPanel:a["a"]},data:function(){return{userInfo:"",msg:"",comment:{},isReply:!1,replyInfo:{}}},computed:{user:function(){return this.$store.getters.user}},watch:{},mounted:function(){var e=this;setTimeout((function(){e.userInfo={userAvatar:e.user.user.jwtClaims.ua,userId:e.user.user.jwtClaims.id,userName:e.user.user.jwtClaims.un,size:35}}),500)},methods:{setMsg:function(e){this.msg=e},sendMsg:function(){var e=this;if(""!==this.msg.content&&""!==this.msg){var t={bizType:this.type||"obj",content:this.msg.content||this.msg||""};if(this.isReply&&(t.messageType="CR",t.replyCommentId=this.replyInfo.commentId),this.msg.attachments&&this.msg.attachments.length>0)for(var r in this.msg.attachments)t["attachments["+r+"]"]="https://dev-oss.cgvcap.com/file/"+this.msg.attachments[r].fileId+"/"+this.msg.attachments[r].accessCode;console.log(t,this.replyInfo),n["a"].addComment(t,this.id).then((function(t){200===t.code&&(e.msg="",e.replyInfo={},e.isReply=!1,e.$message.success({message:"发表评论成功",duration:1500}),e.template||e.$refs.dialog.cancelOperation(),e.$emit("refreshOperation"))})).catch((function(e){console.log(e)}))}else this.$message.warning({message:"内容不能为空",duration:1500})},replyUser:function(e){this.isReply=!0,this.replyInfo=e,this.$refs.dialog.replyUser(e)},setDialog:function(e){this.$refs.dialog.setDialog(e)}}},u=c,l=r("4ac2"),d=Object(l["a"])(u,s,o,!1,null,"57345eeb",null);t["a"]=d.exports},e7a2:function(e,t,r){},ea7a:function(e,t,r){"use strict";r("599e")},f426:function(e,t,r){"use strict";r("e7a2")}}]);