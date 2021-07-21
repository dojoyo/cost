<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-shujukufei"></i> 数据库录账号分配</div>
        <div style="margin-left: auto">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddAndEditDialog()">新增</el-button>
        </div>
      </div>
    </el-header>
    <div class="search-area">
      <el-input v-model="search.userName" placeholder="请输入人员姓名" class="mr-10"></el-input>
      <el-select v-model="value" placeholder="请选择" class="mr-10">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择" class="mr-10">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="doSearch" type="primary" size="small" icon="iconfont icon-sousuo fs-12"> 查询</el-button>
    </div>
   <div class="tag-operate-tool">
        <el-button type="text" icon="iconfont icon-shangchuan2 fs-12" class="blue" @click="openExportDialog"> 导出</el-button>
    </div>
    <el-main class="main">
      <el-table  :data="list" style="width: 100%; margin-top:10px;" :span-method="objectSpanMethod"
       :fit="true" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="数据库" type="index" width="200"></el-table-column>
        <el-table-column label="部门" prop="contractName"></el-table-column>
        <el-table-column label="用户名" prop="contractType.name" ></el-table-column>
        <el-table-column label="账号" prop="signTime" ></el-table-column>
        <el-table-column label="使用频率" prop="approvalTitle" ></el-table-column>
        <el-table-column label="操作" fixed="right" >
          <template slot-scope="scope">
            <el-button type="text" @click="showAddAndEditDialog(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="goDelete(scope.row)">删除</el-button>
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
    <AddAndEditDialog ref="addAndEdit" />
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
        search: {},
        pageNum: 1,
        pageSize: 10,
        total: 0,
        filter:{}
      };
    },
    mixins: [mixin],
    mounted() {
      this.init()
    },
    methods: {
      async init() {
        await this.getEnum('FeeMonth');
        await this.getDeptTree();
        this.$refs.commonSearch.doSearch();
      },
      doSearch(data) {
        this.pageNum = 1;
        this.filter = { ...data };
      },
      getList(){},
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      showAddAndEditDialog(){
        this.$refs.addAndEdit.open();
      }
    }
  };
</script>

<style lang="scss" scoped>
.search-area{
    margin: 15px 15px 0;
    padding: 20px;
    background-color: #fff;
    .el-input{width: 220px;}
}
  .tag-operate-tool{
    margin: 15px 15px 0;
    padding: 0 15px;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    text-align: right;
    .el-menu{
      border-bottom: 0;
      .el-menu-item{
        height: 40px;
        padding: 0;
        margin: 0 20px;
        line-height: 40px;
      }
      .is-active{
        color: #007bff;
        background: #fff!important;
        border-color: #007bff;
      }
    }
  }
  .main{margin-top: 0!important;padding-top: 10px;}
</style>
