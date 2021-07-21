<template>
  <el-dialog :visible.sync="visible" width="260px" :show-close="false" :append-to-body="true" top="50px" class="target-wrap" :close-on-click-modal="false" :close-on-press-escape="false">
    <div class="select-member-panel">
      <div class="member-panel-header">
        <el-row>
          <el-col :span="12" style="border-right:solid 1px #ddd ">
            <div class="button" :class="{'active':type==='team'}" @click="setType('team')">团队</div>
          </el-col>
          <el-col :span="12">
            <div class="button" :class="{'active':type==='dept'}" @click="setType('dept')">部门</div>
          </el-col>
        </el-row>
        <i class="iconfont icon-guanbi" @click="close(xKey)" v-show="closeBtn"></i>
      </div>
      <div class="member-panel-body" >
        <el-input v-show="type==='team'" placeholder="搜索成员" prefix-icon="el-icon-search" size="mini" v-model="searchKey" @input="setType(type,true)"></el-input>
        <el-scrollbar class="scrollbar" :style="{height:type!=='team'?'424px':'392px'}">
          <el-tree :data="tree" :props="defaultProps" node-key="id" :default-expanded-keys="['topTree']" @node-click="handleNodeClick">
            <div class="custom-tree-node"  slot-scope="{node,data}">
              <div v-if="!data.noAvatar" class="short">
                <avatar :user="data" />

              </div>
              <div class="name" style="margin-right:auto;position: relative">{{node.label}} <span @click.stop v-show="data.deptId && canSelectDept" class="add"><i class="iconfont icon-tianjia2" @click="selectDept(data)"></i></span></div>
              <div v-show="data.checked" class="checked"><i class="iconfont icon-check"></i></div>
            </div>
          </el-tree>
        </el-scrollbar>
      </div>
    </div>
  </el-dialog>
  <!--
  <div class="select-member-panel" :style="{'left':left,'top':top}" v-show="visible">
    <div class="member-panel-header">
      <el-row>
        <el-col :span="12" style="border-right:solid 1px #ddd ">
          <div class="button" :class="{'active':type==='team'}" @click="setType('team')">团队</div>
        </el-col>
        <el-col :span="12">
          <div class="button" :class="{'active':type==='dept'}" @click="setType('dept')">部门</div>
        </el-col>
      </el-row>
      <i class="iconfont icon-guanbi" @click="close(xKey)" v-show="closeBtn"></i>
    </div>
    <div class="member-panel-body" >
      <el-input v-show="type==='team'" placeholder="搜索成员" prefix-icon="el-icon-search" size="mini" v-model="searchKey" @change="setType(type,true)"></el-input>
      <el-scrollbar class="scrollbar" :style="{height:type!=='team'?'424px':'392px'}">
        <el-tree :data="tree" :props="defaultProps" node-key="id" :default-expanded-keys="['topTree']" @node-click="handleNodeClick">
          <div class="custom-tree-node"  slot-scope="{node,data}">
            <div v-if="!data.noAvatar" class="short">
              <avatar :user="data" />

            </div>
            <div class="name" style="margin-right:auto;position: relative">{{node.label}} <span @click.stop v-show="data.deptId && canSelectDept" class="add"><i class="iconfont icon-tianjia2" @click="selectDept(data)"></i></span></div>
            <div v-show="data.checked" class="checked"><i class="iconfont icon-check"></i></div>
          </div>
        </el-tree>
      </el-scrollbar>
    </div>
  </div>
  -->
</template>

<script>
  import avatar from '@/components/avatar'
  // import api from '@/api/system/members'
  export default {
    name: 'MemberPanel',
    components:{avatar},
    props: {
      member: Array,
      xKey: String,
      top: String,
      left: String,
      visible: {
        type: Boolean,
        default() {
          return false
        }
      },
      multi: {
        type: Boolean,
        default() {
          return false
        }
      },
      closeBtn: {
        type: Boolean,
        default() {
          return true
        }
      },
      disabled: {
        type: Boolean,
        default() {
          return false
        }
      },
      canSelectDept: {
        type: Boolean,
        default() {
          return false
        }
      },
    },
    computed: {
      userList(){
        return this.$store.getters.userList
      },
      userDeptList(){
        return this.$store.getters.userDeptList
      }
    },
    data() {
      return {
        searchKey: '',
        type: 'team',
        tree: [],
        curMember: [],
        defaultProps: {
          children: 'children',
          label: 'userName'
        },
        color:['inverse-blue','inverse-indigo','inverse-purple','inverse-pink','inverse-red','inverse-orange', 'inverse-yellow','inverse-green','inverse-teal','inverse-cyan','inverse-gray','inverse-gray-dark']
      }
    },
    watch:{
      member(val){
        this.curMember = val;
        if(this.tree[0]){
          this.setTreeCheck();
        }
      }
    },
    created() {
      this.setType('team');
    },
    methods: {
      //初始化人员数据
      setType(type,isSearch) {
        this.type = type;
        if (type === 'team') {
          if(this.userList && !isSearch){
            this.tree = [{
              userName: '所有人员',
              id:'topTree',
              children: JSON.parse(this.userList),
              noAvatar:true
            }]
            for(let i in this.tree[0].children){
              this.$set(this.tree[0].children[i],'checked',false);
            }
            if(this.member[0]){
              this.curMember = this.member;
              this.setTreeCheck();
            }
          }else {
            let params = {
              filter:this.searchKey
            }
            api.userSearch(params).then(res => {
              if (res.code === 200) {
                res.data.map(item=>{
                  item.id = item.userId
                })
                if(!isSearch){
                  this.$store.dispatch('SetUserList', JSON.stringify(res.data));
                }
                this.defaultProps={
                  children: 'children',
                  label: 'userName'
                }
                this.tree = [{
                  userName: '所有人员',
                  id:'topTree',
                  children: res.data,
                  noAvatar:true
                }]
                for(let i in this.tree[0].children){
                  this.$set(this.tree[0].children[i],'checked',false);
                }
                if(this.member[0]){
                  this.curMember = this.member;
                  this.setTreeCheck();
                }
              } else {
                this.$message.warning({ message:res.msg, duration: 1500 })
              }
            }).catch(err => {
              this.$message.error({ message:JSON.stringify(err), duration: 1500 })
            })
          }
        } else {
          if(this.userDeptList && !isSearch){
            this.tree = this.setDeptTree(JSON.parse(this.userDeptList));
            console.log(this.tree)
            //this.setTreeCheck();
          }else {
            api.userDeptTree({}).then(res => {
              if (res.code === 200) {
                if(!isSearch){
                  this.$store.dispatch('SetUserDeptList', JSON.stringify(res.data));
                }
                this.tree=this.setDeptTree(res.data);
                console.log(this.tree)
                //this.setTreeCheck();
              } else {
                this.$message.warning({ message:res.msg, duration: 1500 })
              }
            }).catch(err => {
              this.$message.error({ message:JSON.stringify(err), duration: 1500 })
            })
          }
          /*
          this.tree = [
            {label: '周总',short:'周总',color:'inverse-yellow',checked:false},
            {label: '牛总',short:'牛总',color:'inverse-green',checked:false},
            {label: '代总',short:'代总',color:'inverse-teal',checked:false},
            {
              label: '科技金融',
              children: [
                {label: '张文兵',short:'文兵',color:'inverse-blue',checked:false},
                {label: '林悦洁',short:'悦洁',color:'inverse-indigo',checked:false},
                {label: '黄振超',short:'振超',color:'inverse-purple',checked:false},
                {label: '姚凯戈',short:'凯戈',color:'inverse-pink',checked:false},
                {label: '蒋佶含',short:'佶含',color:'inverse-red',checked:false},
              ]
            },
            {
              label: '运营管理',
              children: [
                {label: '陈淑英',short:'淑英',color:'inverse-orange',checked:false},
              ]
            }
          ]
          */
        }
      },

      setDeptTree(arr){
        let temp = [];
        for(let i in arr){
          if(arr[i].subDepts && arr[i].subDepts.length>0){
            arr[i].subDepts = this.setDeptTree(arr[i].subDepts)
          }
          temp.push({
            userName:arr[i].deptName,
            noAvatar:true,
            children:arr[i].subDepts,
            deptId:arr[i].deptId
          })
          if(arr[i].users && arr[i].users.length>0){
            for(let j in arr[i].users){
              temp[i].children.unshift(arr[i].users[j])
            }
          }
        }
        return temp
      },
      //设置人员选中状态
      setTreeCheck(){
        if(this.curMember && this.curMember.length>0){//如果检查有选中人员，递归设置状态
          this.tree = this.setTree(this.tree, this.curMember);
        }else {//没有选中人员，初始化通讯录
          // todo 有bug，全部反选的时候，会刷新页面，不友好，需要解决
          this.setType(this.type);
        }
      },
      setTree(arr, target){
        if(arr[0] && target[0]){
          for(let j in arr){
            for(let i in target) {
              if (arr[j].children) {
                arr[j].children = this.setTree(arr[j].children, target);
              }
              if(arr[j].id && (arr[j].id === target[i].userId || arr[j].id === target[i].id)){
                arr[j].checked = true;
                break
              }else {
                arr[j].checked = false
              }
              /*
              arr[j].checked =  arr[j].id === target[i].userId;
              if(arr[j].checked){
                break
              }
              */
            }
          }
          return arr;
        }
      },
      //处理点击事件
      handleNodeClick(e) {
        if(!e.noAvatar){
          let arr = this.member;
          e.id = e.id || e.userId;
          if(!e.checked && e.id){
            e.checked  = true;
            arr.push(e);
            //this.$emit('setMember',{type:this.xKey,data:arr});
            this.$emit('setMember',{data:arr});
          }else {//反向选择，将选中设置为未选
            for(let i in arr){
              if(arr[i].id === e.id || arr[i].userId === e.id){
                arr.splice(i,1);
                //this.$emit('setMember',{type:this.xKey,data:arr});
                this.$emit('setMember',{data:arr});
                break
              }
            }
          }
        }
      },
      selectDept(e){
        this.$emit('selectDept',e);
      },
      //关闭组件
      close(key) {
        this.$emit('close',key);
      }
    }
  }
</script>

<style lang="scss">
  .select-member-panel {
    margin:-15px;
    /*position: absolute;*/
    /*z-index: 10;*/
    /*background: #fff;*/
    /*border: solid 1px #eee;*/
    /*width: 260px;*/
    .member-panel-header {
      position: relative;
      text-align: center;
      padding-top: 10px;
      .button {
        font-size: 18px;
        color: #777;
        cursor: pointer;
      }
      .button.active {
        color: #333;
      }
      .iconfont {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 10;
        color: #333;
        cursor: pointer;
        font-size: 16px;
      }
      .iconfont:hover {
        color: #32d6bb;
      }
    }
    .member-panel-body {
      position: relative;
      padding: 20px 10px;
      height: 450px;
      overflow: hidden;
    }
    .member-panel-body:after {
      content: '';
      position: absolute;
      width: 220px;
      height: 15px;
      background: #fff;
      left: 20px;
      bottom: 0;
      z-index: 11;
    }
    .scrollbar{
      height:392px; margin-top: 10px
    }
    .custom-tree-node{
      width: 190px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      display: flex;
      .short{
        margin-right: 10px;
        margin-top: 5px;
      }
      .name{
        font-size: 14px;
        .add{
          opacity: 0.01;
        }
      }
      .name:hover{
        .add{
          opacity: 1;
        }
      }
      .checked{
        font-size: 14px;
        float: right;
      }
    }
    .el-tree-node__content{
      height: auto!important;
      /*padding-left: 0!important;*/
    }
  }

</style>
