<template>
  <el-dialog :visible.sync="dialogVisible" width="600px" :show-close="false" :append-to-body="true" top="50px"
             class="members-wrap" :close-on-click-modal="false" :close-on-press-escape="false">
    <div slot="title" class="header">
      <div class="title">
        <i class="iconfont icon-chengyuanjianbao1 primary"></i> 选择成员
      </div>
      <div class="options">
        <i class="iconfont icon-guanbi pointer fs-22" @click="dialogVisible=false"></i>
      </div>
      <div class="clear"></div>
    </div>

    <div class="members-body">
      <div class="from">
        <div class="tab">
          <div class="title" :class="{'on':item.code===curTab.code}" v-for="(item,index) in tabs" :key="index"
               @click="setTab(index)" v-if="item.visible">{{item.name}}
          </div>
        </div>
        <!--团队类型-->
        <div class="content" v-show="curTab.code==='team'">
          <div class="search">
            <el-input placeholder="搜索成员" prefix-icon="el-icon-search" size="mini" v-model="searchKey"
                      @input="resetUserList"></el-input>
          </div>
          <div style="width: 100%; height: 50px;"></div>
          <div class="item" v-for="(item,index) in tabs[0].data" :key="index" @click="pickUser(item,index)">
            <avatar :user="item"/>
            <span class="name">{{item.userName}}</span>
            <i class="iconfont icon-wanchengx" v-show="item.checked"></i>
          </div>
        </div>
        <!--部门类型-->
        <div class="content" v-show="curTab.code==='dept'">
          <div style="width: 100%; height: 15px;"></div>
          <el-tree ref="dept" v-if="curTab.showTree" :data="tabs[1].data" :props="defaultDeptProps" node-key="id"
                   @node-click="pickUserDept">
            <div class="custom-tree-node" slot-scope="{node,data}">
              <div v-if="!data.noAvatar" class="short">
                <avatar :user="data"/>
              </div>
              <div class="name">
                <span style="margin-right: auto">{{node.label}}</span>
                <span @click.stop v-show="data.deptId && multi" class="add">
                  <i class="iconfont icon-tianjia2" @click="selectDept(data)"></i>
                </span>
              </div>
              <div v-show="data.checked"><i class="iconfont icon-check"></i></div>
            </div>
          </el-tree>
        </div>
        <!--角色类型-->
        <div class="content" v-show="curTab.code==='role'">
          <div style="width: 100%; height: 15px;"></div>
          <el-tree ref="role" v-if="curTab.showTree" :data="tabs[2].data" :props="defaultRoleProps" node-key="id"
                   @node-click="pickUserRole">
            <div class="custom-tree-node" slot-scope="{node,data}">
              <span>{{node.label}}</span>
              <div v-show="data.checked" style="margin-left: auto"><i class="iconfont icon-check"></i></div>
            </div>
          </el-tree>
        </div>
      </div>
      <div class="result" :class="{'step':step}">
        <div class="tab">已选择成员</div>
        <div class="content">
          <div style="width: 100%; height: 15px;"></div>
          <div class="item" v-for="(item,index) in result" :key="index" :class="{'last': index===result.length-1}">
            <avatar :user="item"/>
            <span class="name">{{item.userName}}</span>
            <i class="iconfont icon-x1 pointer" @click="removeResult(index)"></i>
            <div class="line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="members-footer">
      <el-button type="primary" size="mini" @click="save">确认</el-button>
      <el-button type="default" size="mini" @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import avatar from '@/components/avatar';
  // import api from '@/api/system/members';
  // import apiRole from '@/api/system/role'
  import $index from '@/utils/index'

  export default {
    name: 'MemberPanelTransfer',
    components: {avatar},
    props: {
      users: Array,
      multi: {
        type: Boolean,
        default() {
          return true;
        }
      },
      step: {
        type: Boolean,
        default() {
          return false;
        }
      },
      role: { // 是否显示角色选项
        type: Boolean,
        default() {
          return false;
        }
      },
      invest: { // 是否跟投人员
        type: Boolean,
        default() {
          return false;
        }
      },
      filter: { // 需要过滤的用户
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      userList() {
        return this.$store.getters.userList;
      },
      userDeptList() {
        return this.$store.getters.userDeptList;
      },
      userRoleList() {
        return this.$store.getters.userRoleList;
      }
    },
    data() {
      return {
        searchKey: '',
        defaultDeptProps: {
          children: 'children',
          label: 'userName'
        },
        defaultRoleProps: {
          children: 'roles',
          label: 'groupName'
        },
        tabs: [
          {name: '团队', type: 'list', code: 'team', visible: true, data: []},
          {name: '部门', type: 'tree', code: 'dept', visible: true, showTree: true},
          {name: '角色', type: 'tree', code: 'role', visible: false, showTree: true}
        ],
        curTab: {},
        result: [],
        showTree: true,
        dialogVisible: false
      };
    },

    mounted() {
      this.init();
    },
    methods: {
      // 初始化数据，如果vuex没有数据，就请求，请求一次之后存在vuex
      init() {
        // 团队数据
        if (this.invest) { // 跟投类型
          this.tabs = [
            {name: '团队', type: 'list', code: 'team', visible: false, data: []},
            {name: '部门', type: 'tree', code: 'dept', visible: true, showTree: true},
            {name: '角色', type: 'tree', code: 'role', visible: false, showTree: true}
          ]

          /*
          let params = {
            pageSize: 500,
            pageNum: 1,
            filter: ''
          };
          api.getInvestUser(params).then(res => {
            if (res.code === 200) {
              res.data.list.map(item => {
                item.userId = item.id;
              })
              this.tabs[0].data = res.data.list;
              this.setTab(0);
            } else {
              this.$message.warning({message: res.msg, duration: 1500});
            }
          }).catch(err => {
            this.$message.error({message: JSON.stringify(err), duration: 1500});
          });
          */
          let getInvestDeptUrl='/ivf/common/userTree';
          if(this.filter && this.filter.length>0){
            getInvestDeptUrl+='?'
            this.filter.map(item=>{
              getInvestDeptUrl+='filterUserIds='+item+'&'
            })
          }
          api.getInvestDept(getInvestDeptUrl).then(res => {
            if (res.code === 200) {
              this.tabs[1].data = this.setDeptTree(res.data);
              this.setTab(1);
            } else {
              this.$message.warning({message: res.msg, duration: 1500});
            }
          }).catch(err => {
            this.$message.error({message: JSON.stringify(err), duration: 1500});
          });

        } else { // 正常类型
          if (!this.userList) {
            let params = {
              filter: ''
            };
            api.userSearch(params).then(res => {
              if (res.code === 200) {
                res.data.map(item => {
                  item.id = item.userId;
                })
                this.$store.dispatch('SetUserList', JSON.stringify(res.data));
                this.tabs[0].data = res.data;
                this.setTab(0);
              } else {
                this.$message.warning({message: res.msg, duration: 1500});
              }
            }).catch(err => {
              this.$message.error({message: JSON.stringify(err), duration: 1500});
            });
          } else {
            this.tabs[0].data = JSON.parse(this.userList);
            this.setTab(0);
          }
          // 部门数据
          if (!this.userDeptList) {
            api.userDeptTree({}).then(res => {
              if (res.code === 200) {
                this.$store.dispatch('SetUserDeptList', JSON.stringify(res.data));
                this.tabs[1].data = this.setDeptTree(res.data);
              } else {
                this.$message.warning({message: res.msg, duration: 1500});
              }
            }).catch(err => {
              this.$message.error({message: JSON.stringify(err), duration: 1500});
            });
          } else {
            this.tabs[1].data = this.setDeptTree(JSON.parse(this.userDeptList));
          }

          if (this.role) {
            this.tabs[2].visible = true;
            // 角色数据
            if (!this.userRoleList) {
              apiRole.roleTree({groupType: 'AP'}).then(res => {
                if (res.code === 200) {
                  this.$store.dispatch('SetUserRoleList', JSON.stringify(res.data));
                  this.tabs[2].data = this.setRoleTree(res.data);
                } else {
                  this.$message.warning({message: res.msg, duration: 1500});
                }
              }).catch(err => {
                this.$message.error({message: JSON.stringify(err), duration: 1500});
              });
            } else {
              this.tabs[2].data = this.setRoleTree(JSON.parse(this.userRoleList));
            }
          }
        }


      },
      setDeptTree(arr) {
        let temp = [];
        for (let i in arr) {
          if (arr[i].subDepts && arr[i].subDepts.length > 0) {
            arr[i].subDepts = this.setDeptTree(arr[i].subDepts);
          }
          temp.push({
            userName: arr[i].deptName,
            noAvatar: true,
            children: arr[i].subDepts,
            deptId: arr[i].deptId
          });
          if (arr[i].users && arr[i].users.length > 0) {
            for (let j in arr[i].users) {
              arr[i].users.checked = false;
              temp[i].children.unshift(arr[i].users[j]);
            }
          }
        }
        return temp;
      },
      setRoleTree(arr) {
        for (let i in arr) {
          arr[i].groupName = arr[i].groupName || arr[i].roleName;
          arr[i].id = arr[i].id || arr[i].groupId;
          if (arr[i].roles && arr[i].roles.length > 0) {
            this.setRoleTree(arr[i].roles);
          }
        }
        return arr;
      },
      setTab(index) {
        this.curTab = this.tabs[index];
        this.setTags();
      },
      // 搜索团队列表
      resetUserList() {
        let params = {
          filter: this.searchKey
        };
        if (this.invest) {
          params = {
            pageSize: 500,
            pageNum: 1,
            search: this.searchKey
          };
          api.getInvestUser(params).then(res => {
            if (res.code === 200) {
              res.data.list.map(item => {
                item.userId = item.id
              })
              this.tabs[0].data = res.data.list;
              this.setTab(0);
            } else {
              this.$message.warning({message: res.msg, duration: 1500});
            }
          }).catch(err => {
            this.$message.error({message: JSON.stringify(err), duration: 1500});
          });
        } else {
          api.userSearch(params).then(res => {
            if (res.code === 200) {
              res.data.map(item => {
                item.id = item.userId
              })
              this.tabs[0].data = res.data;
              this.setTags();
            } else {
              this.$message.warning({message: res.msg, duration: 1500});
            }
          }).catch(err => {
            this.$message.error({message: JSON.stringify(err), duration: 1500});
          });
        }
      },
      // 设置左侧选中的标签
      setTags() {
        switch (this.curTab.code) {
          case 'team':
            this.resetTeamTags();
            break;
          case 'dept':
            this.resetDeptTags();
            break;
          case 'role':
            this.resetRoleTags();
            break;
        }
      },
      // 设置团队选中的标签
      resetTeamTags() {
        this.tabs[0].data.map(item => {
          item.checked = false;
        });
        for (let j in this.result) {
          for (let i in this.tabs[0].data) {
            if (!this.tabs[0].data[i].checked) {
              this.tabs[0].data[i].checked = (this.tabs[0].data[i].id === this.result[j].id || this.tabs[0].data[i].id === this.result[j].userId);
            }
          }
        }
      },
      // 设置部门选中的标签
      resetDeptTags() {
        this.tabs[1].data = this.setTreeChecked(this.tabs[1].data, true);
        this.tabs[1].data = this.setTreeChecked(this.tabs[1].data, false);
      },
      // 递归计算部门选中标签状态
      setTreeChecked(arr, reset) {
        let temp = arr;
        for (let i in temp) {
          if (temp[i].noAvatar && temp[i].children && temp[i].children.length > 0) {
            this.setTreeChecked(temp[i].children, reset);
          } else {
            if (reset) {
              temp[i].checked = false;
            } else {
              for (let j in this.result) {
                if (!temp[i].checked && (
                  temp[i].userId === this.result[j].id ||
                  temp[i].userId === this.result[j].userId
                )) {
                  temp[i].checked = true;
                }
              }
            }
          }
        }
        return temp;
      },
      // 设置角色选中的标签
      resetRoleTags() {
        this.tabs[2].data = this.setRoleTreeChecked(this.tabs[2].data, true);
        this.tabs[2].data = this.setRoleTreeChecked(this.tabs[2].data, false);
      },
      // 递归计算部门选中标签状态
      setRoleTreeChecked(arr, reset) {
        let temp = arr;
        for (let i in temp) {
          if (temp[i].groupId && temp[i].roles && temp[i].roles.length > 0) {
            this.setRoleTreeChecked(temp[i].roles, reset);
          } else {
            if (reset) {
              temp[i].checked = false;
            } else {
              for (let j in this.result) {
                if (!temp[i].checked && (temp[i].id === this.result[j].id || temp[i].id === this.result[j].userId)) {
                  temp[i].checked = true;
                }
              }
            }
          }
        }
        return temp;
      },
      // 团队点击选中
      pickUser(user, index) {
        if (!this.multi) {
          if (this.result[0] && (this.result[0].userId === user.id || this.result[0].id === user.id)) {
            this.result = [];
          } else {
            this.result = [];
            this.result.push(user);
          }
          this.setTags();
        } else {
          for (let i in this.result) {
            if (this.result[i].id === user.id || this.result[i].userId === user.id) {
              this.result.splice(i, 1);
              this.tabs[0].data[index].checked = false;
              return;
            }
          }
          this.result.push(user);
          this.tabs[0].data[index].checked = true;
        }
      },
      // 部门点击选中
      pickUserDept(e) {
        if (!e.noAvatar) {
          this.curTab.showTree = false;
          if (!this.multi) {
            if (this.result[0] && (this.result[0].userId === e.userId || this.result[0].id === e.userId)) {
              this.result = [];
            } else {
              this.result = [];
              this.result.push(e);
            }
            this.setTags();
          } else {
            for (let i in this.result) {
              if (this.result[i].id === e.userId || this.result[i].userId === e.userId) {
                e.checked = false;
                this.result.splice(i, 1);
                this.$set(this.curTab, 'showTree', true);
                return;
              }
            }
            e.checked = true;
            this.result.push(e);
          }
          this.$set(this.curTab, 'showTree', true);
        }
      },
      pickUserRole(e) {
        if (!e.groupId) {
          for (let i in this.result) {
            if (this.result[i].id === e.id || this.result[i].userId === e.id) {
              e.checked = false;
              this.result.splice(i, 1);
              return;
            }
          }
          e.checked = true;
          e.userName = e.roleName;
          this.result.push(e);
        }
      },
      // 右侧移除选中
      removeResult(index) {
        this.result.splice(index, 1);
        this.setTags();
      },
      // 选中部门下面成员
      selectDept(data) {
        data = this.setDeptChildrenChecked(data);
        this.setTags();
      },
      // 递归计算选中部门所有人
      setDeptChildrenChecked(obj) {
        if (obj.children && obj.children.length > 0) {
          for (let i in obj.children) {
            if (obj.children[i].noAvatar) {
              this.setDeptChildrenChecked(obj.children[i]);
            } else {
              obj.children[i].checked = true;
              let can = true;
              for (let k in this.result) {
                if (this.result[k].id === obj.children[i].userId || this.result[k].userId === obj.children[i].userId) {
                  can = false;
                }
              }
              if (can) {
                this.result.push(obj.children[i]);
              }
            }
          }
        }
        return obj;
      },
      show() {
        this.result = $index.deepCopy(this.users) || [];
        this.init();
        this.dialogVisible = true;
      },
      save() {
        this.dialogVisible = false;
        this.$emit('SAVE_USERS', this.result);
      },
      cancel() {
        this.dialogVisible = false;
      }
    }
  };
</script>

<style lang="scss">
  .members-wrap {
    .members-body {
      width: 100%;
      display: flex;

      .from {
        width: 350px;
      }

      .result {
        margin-left: 30px;
        width: 200px;
      }

      .tab {
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: nowrap;

        .title {
          font-size: 16px;
          width: 100%;
          border-right: solid 1px #aaa;
          text-align: center;
          cursor: pointer;
        }

        .title.on {
          font-weight: bold;
          color: #3C6CBA;
        }

        .title:last-child {
          border: none
        }
      }

      .content {
        margin: 10px 0;
        height: 400px;
        position: relative;
        border: solid 1px #eee;
        border-radius: 5px;
        padding: 0 15px 15px;
        overflow: auto;

        .search {
          position: fixed;
          z-index: 1;
          width: 300px;
          height: 35px;
          padding-top: 15px;
          background: #fff;
        }

        .item {
          display: flex;
          padding: 5px 0;
          align-items: center;

          .name {
            margin-left: 5px;
            margin-right: auto;
            cursor: pointer;
          }
        }

        .custom-tree-node {
          width: 100%;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          display: flex;

          .short {
            margin-right: 10px;
            margin-top: 5px;
          }

          .name {
            font-size: 14px;
            display: flex;
            align-items: center;
            width: 100%;

            .add {
              display: none;
            }
          }

          .name:hover {
            .add {
              display: block;
            }
          }

          .checked {
            font-size: 14px;
            margin-left: auto;
          }
        }

        .el-tree-node__content {
          height: auto !important;
        }
      }

      .result.step {
        .item {
          margin-bottom: 25px;
          position: relative;
        }

        .item {
          .line:before {
            content: '';
            width: 1px;
            height: 15px;
            border-left: dotted 1px #c4c4c4;
            position: absolute;
            top: 40px;
            left: 15px;
          }

          .line:after {
            content: '';
            width: 8px;
            height: 8px;
            position: absolute;
            top: 55px;
            left: 10px;
            border: solid 2px #aaa;
            background: #ddd;
            border-radius: 50%;
          }
        }

        .item.last {
          .line {
            display: none;
          }
        }
      }
    }

    .members-footer {
      width: 100%;
      display: flex;
      align-items: center;
    }
  }
</style>
