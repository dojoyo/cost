(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67b6d4ee"],{1411:function(t,e,s){"use strict";s("8ac7")},"8ac7":function(t,e,s){},e989:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"show",rawName:"v-show",value:"/invest/list"===t.path||"/invest/project"===t.path||"/invest/user"===t.path||"/invest/rules"===t.path,expression:"\n    path==='/invest/list' ||\n    path==='/invest/project' ||\n    path==='/invest/user' ||\n    path==='/invest/rules'\n    "}],staticClass:"menu-wrap"},[s("div",{staticClass:"title"},[t._v("跟投")]),s("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":t.path}},t._l(t.sideMenu,(function(e){return s("el-menu-item",{directives:[{name:"show",rawName:"v-show",value:e.isRight,expression:"item.isRight"}],key:e.path,staticStyle:{"margin-top":"3px"},attrs:{index:e.path},on:{click:function(s){return t.$router.push({path:e.path})}}},[s("i",{staticClass:"iconfont",class:e.icon}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.name))]),e.divider?s("div",{staticClass:"item-divider"}):t._e()])})),1)],1)},n=[],a=s("ed08"),r={components:{},data:function(){return{sideMenu:[]}},computed:{path:function(){return this.$store.getters.path},menu:function(){return this.$store.getters.menu},user:function(){return this.$store.getters.user}},mounted:function(){var t=this.user?this.user.user.jwtClaims.ar:[];for(var e in this.menu)if(37===this.menu[e].code){for(var s in this.sideMenu=this.menu[e].sideMenu,this.sideMenu)this.sideMenu[s].isRight=!this.sideMenu[s].code||a["a"].hasRight(t,this.sideMenu[s].code);return}},methods:{}},u=r,o=(s("1411"),s("4ac2")),c=Object(o["a"])(u,i,n,!1,null,"2115757f",null);e["default"]=c.exports}}]);