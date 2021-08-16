<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-shujukufei"></i> 数据库录账号分配</div>
        <div style="margin-left: auto">
          <!-- <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddAndEditDialog()">新增</el-button> -->
        </div>
      </div>
    </el-header>
    <div class="search-area">
      <el-input v-model="search.userName" placeholder="请输入人员姓名" class="mr-10 mb-10"></el-input>
       <el-cascader
        ref="department"
        class="mr-10 mb-10"
        placeholder="请选择部门"
        v-model="search.deptId"
        :options="deptTreeAll"
        :show-all-levels="false"
        :props="{ checkStrictly: true, emitPath: false }"
        clearable></el-cascader>
      <el-select v-model="search.databaseType" placeholder="请选择" class="mr-10 mb-10">
        <el-option
          v-for="item in enumType.FeeDatabaseTypeAll"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="getList" type="primary" size="small" icon="iconfont icon-sousuo fs-12"> 查询</el-button>
    </div>
   <div class="tag-operate-tool">
        <el-button type="text" icon="iconfont icon-shangchuan2 fs-12" class="blue" @click="exportFile"> 导出</el-button>
    </div>
    <el-main class="main allocation-table">
      <el-table v-if="list&&list.length>0" :data="list" :span-method="objectSpanMethod" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="数据库" prop="database" min-width="100"></el-table-column>
        <el-table-column label="部门" prop="dept.deptName" min-width="100"></el-table-column>
        <el-table-column label="用户名" prop="user.userName" min-width="100"></el-table-column>
        <el-table-column label="账号" prop="account" min-width="100"></el-table-column>
        <el-table-column label="使用频率" prop="frequency" min-width="100"></el-table-column>
        <el-table-column label="操作" fixed="right" width="126" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="showAddAndEditDialog(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="delte(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="txt-right">
        <el-pagination
          v-if="list && list.length>0"
          style="margin-top: 20px"
          :current-page="pageNum"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <div v-show="list && list.length===0" class="w-100p gray" style="text-align: center;">
        <img src="@/assets/no-list.png">
        <br><span style="font-size: 14px">暂无数据</span><br/><br/>
      </div>
    </el-main>
     <AddAndEditDialog ref="addAndEdit" :deptTree="deptTree" :enumType="enumType"/>
  </el-container>
</template>
<script>
  import AddAndEditDialog from './addAndEdit.vue';
  import api from '@/api/cost';
  import mixin from '../../mixins';
  export default {
    name: '',
    components: {AddAndEditDialog},
    props: {},
    data() {
      return {
        enumType: {},
        search: {
          deptId:'all',
          databaseType:'',
          userName:''
        },
        pageNum: 1,
        pageSize: 10,
        total: 0,
        filter:{},
        spanArr:[],
        position:0,
        deptTreeAll: []
      };
    },
    mixins: [mixin],
    mounted() {
      this.init()
    },
    methods: {
      async init() {
        await this.getEnum('FeeMonth');
        await this.getEnum('FeeDatabaseType');
        await this.getDeptTree();
        this.enumType.FeeMonthAll = [{ name: "全部月份", value: "" }].concat(this.enumType.FeeMonth);
        this.enumType.FeeDatabaseTypeAll = [{name: '全部数据库类型', value: ''}].concat(this.enumType.FeeDatabaseType);
        this.deptTreeAll = [{ label: '全部部门', value: 'all' }].concat(this.deptTree);
        this.getList()
      },
      getList(){
        let params = {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            ...this.search
        };
        if (params.deptId === 'all') {
          params.deptId = ''
        }
        api.accountDatabaseList(params).then(res => {
            if (res.code === 200) {
              this.list = res.data.list;
              this.total = res.data.total;
              this.rowspan()
            }
        })
        .catch(err => {
          console.log(err);
        });
      },
      rowspan() {
        this.list.forEach(v => {
          v.rowspan = 1
        })
        // 双层循环
          for (let i = 0; i < this.list.length; i++) {
            for (let j = i + 1; j < this.list.length; j++) {
              if (this.list[i].database === this.list[j].database) {
                this.list[i].rowspan++
                this.list[j].rowspan--
              }
            }
            // 这里跳过已经重复的数据
            i = i + this.list[i].rowspan - 1
          }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          return {
            rowspan: row.rowspan,
            colspan: 1
          }
        }
      },
      showAddAndEditDialog(data){
        this.$refs.addAndEdit.open(data);
      },
      openExportDialog(){
        this.$refs.exportDialog.open();
      },
      exportFile(){
          api.exportAccount().then(res=>{
              let headers = res.headers;
              let title = headers['x-file-name'];
              let blob = new Blob([res.data], {
                  type: headers['content-type']
              });
              let link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = decodeURIComponent(title);
              link.click();
              this.initForm()
          })
      },
      delte(id) {
        this.$confirm("即将删除数据，是否继续？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            api.delAccount(id).then(res => {
                if (res.code === 200) {
                  this.getList();
                  this.$message.success({ message: "删除成功!", duration: 1500 });
                }
              })
            .catch(err => {
                console.log(err);
            });
        }).catch(err => {});
      },
    }
  };
</script>

<style lang="scss" scoped>
.search-area {
  margin: 15px 15px 0;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  .el-input {
    width: 220px;
  }
}
.tag-operate-tool {
  text-align: right;
  margin: 15px auto 0;
  padding: 0 15px;
  width: calc(100% - 30px);
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  border-radius: 5px 5px 0 0;
}
.main {
  margin: 0 auto !important;
  padding: 15px;
  width: calc(100% - 30px);
}
.mb-10{
  margin-bottom: 10px;
}
.allocation-table{
  tbody{
    >.el-table__row td:first-child[rowspan="2"] {
      border-right:1px solid #ebeef5;
    }
  }
}
</style>
