<template>
  <el-dialog :visible.sync="dialogVisible" width="400px" :show-close="false" :append-to-body="true" top="50px"
             class="members-wrap" :close-on-click-modal="false" :close-on-press-escape="false">
    <div slot="title" class="header">
      <div class="title">
        <i class="iconfont icon-chengyuanjianbao1 primary"></i> 选择部门
      </div>
      <div class="options">
        <i class="iconfont icon-guanbi pointer fs-22" @click="dialogVisible=false"></i>
      </div>
      <div class="clear"></div>
    </div>
    <div class="members-body">
      <div class="from">
        <div class="content">
          <div style="width: 100%; height: 15px;"></div>
          <el-tree v-if="showTree" ref="dept" :data="list" :props="defaultDeptProps" node-key="id" :default-expand-all="true"
                   @node-click="pickDept">
            <div class="custom-tree-node" slot-scope="{node,data}">
              <div class="name">
                <span style="margin-right: auto">{{node.label}}</span>
                <!--
                <span @click.stop v-show="data.deptId && multi" class="add">
                  <i class="iconfont icon-tianjia2"></i>
                </span>
                -->
                <i v-show="data.checked" class="iconfont icon-check"></i>
<!--                <div v-show="data.checked"></div>-->
              </div>

            </div>
          </el-tree>
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
    name: 'DeptPanelTransfer',
    components: {avatar},
    props: {
      depts: Array,
      multi: {
        type: Boolean,
        default() {
          return true;
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
      userDeptList() {
        return this.$store.getters.userDeptList;
      }
    },
    data() {
      return {
        defaultDeptProps: {
          children: 'children',
          label: 'userName'
        },
        list:[],
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
        // 部门数据
        if (!this.userDeptList) {
          api.userDeptTree({}).then(res => {
            if (res.code === 200) {
              this.$store.dispatch('SetUserDeptList', JSON.stringify(res.data));
              this.list = this.setDeptTree(res.data);
            } else {
              this.$message.warning({message: res.msg, duration: 1500});
            }
          }).catch(err => {
            this.$message.error({message: JSON.stringify(err), duration: 1500});
          });
        } else {
          this.list = this.setDeptTree(JSON.parse(this.userDeptList));
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
        }
        return temp;
      },
      pickDept(e){
        this.showTree = false;
        for (let i in this.result) {
          if (this.result[i].deptId === e.deptId) {
            e.checked = false;
            this.result.splice(i, 1);
            this.$nextTick(()=>{
              this.showTree = true;
            });
            return;
          }
        }
        e.checked = true;
        this.result.push(e);
        this.$nextTick(()=>{
          this.showTree = true;
        });
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
      show() {
        this.result = $index.deepCopy(this.users) || [];
        this.init();
        this.dialogVisible = true;
      },
      save() {
        this.dialogVisible = false;
        this.$emit('SAVE_DEPTS', this.result);
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
