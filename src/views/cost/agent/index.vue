<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-waibuzixunzhongjiefei"></i> 咨询/中介费
        </div>
        <div style="margin-left: auto">
          <el-button type="primary" size="small" icon="iconfont icon-xinzeng fs-12" @click="goAdd"> 新增</el-button>
        </div>
      </div>
    </el-header>
    <CommonSearch ref="commonSearch" @doSearch="doSearch" :feeMonth="enumType.FeeMonth" :deptTree="deptTree" :showUserName="false" />
    <div class="flex space-between tag-operate-tool">
      <div></div>
      <div class="operate-buttons">
        <el-button type="text" icon="iconfont icon-xiazai3 fs-12" class="blue-active" @click="openImportDialog"> 导入</el-button>
        <el-button type="text" icon="iconfont icon-shangchuan2 fs-12" class="blue-active" @click="openExportDialog"> 导出</el-button>
        <el-button type="text" icon="iconfont icon-xiazai1 fs-12" class="blue-active" @click="getTemp"> 下载模板</el-button>
      </div>
    </div>
    <el-main class="main travel-main">
      <el-table v-if="list && list.length>0" :data="list" style="width: 100%; margin-top:10px; " :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="部门" prop="deptName" width="120"></el-table-column>
        <el-table-column prop="projectName" label="项目"></el-table-column>
        <el-table-column prop="advisoryType.name" label="费率类别"></el-table-column>
        <el-table-column prop="amount" label="金额"></el-table-column>
        <el-table-column prop="belongMonth" label="费用发生月份"></el-table-column>
        <el-table-column label="操作" width="126" fixed="right" align="center" >
          <template slot-scope="scope">
            <el-button type="text" @click="goEdit(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="goDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-show-total" v-if="list && list.length>0">
        <div>
          合计：{{countTotal | formatMoney}}元
        </div>
        <el-pagination
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
    <AddAndEditDialog ref="addAndEdit" :deptTree="deptTree" :feeAdvisoryType="enumType.FeeAdvisoryType" />
    <ImportDialog ref="importDialog" method="advisoryImport" />
    <ExportDialog ref="exportDialog" method="advisoryExport" />
  </el-container>
</template>
<script>
  import api from '@/api/cost';
  import mixin from '../mixins';
  import CommonSearch from '../components/commonSearch.vue';
  import AddAndEditDialog from './addAndEdit';
  import ImportDialog from '../components/importDialog';
  import ExportDialog from '../components/exportDialog';
  export default {
    name: '',
    components: { AddAndEditDialog, ImportDialog, ExportDialog, CommonSearch },
    props: {},
    data() {
      return {
        enumType: {},
        filter: {},
        list: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        activeIndex: '1' // 默认机票tag
      };
    },
    mixins: [mixin],
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        await this.getEnum('FeeMonth');
        await this.getDeptTree();
        this.$refs.commonSearch.doSearch();
        this.getEnum('FeeAdvisoryType');
      },
      doSearch(data) {
        this.pageNum = 1;
        this.filter = { ...data };
        this.getList();
      },
      // 获取企业列表
      getList() {
        let params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.filter
        };
        api.getAdvisoryList(params).then(res => {
          if (res.code === 200) {
            this.list = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
        api.getAdvisoryTotal(params).then(res => {
          if (res.code === 200) {
            this.countTotal = res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 编辑
      goEdit(data) {
        this.$refs.addAndEdit.open(data);
      },
      // 新增
      goAdd() {
        this.$refs.addAndEdit.open();
      },
      openImportDialog() {
        this.$refs.importDialog.open();
      },
      openExportDialog() {
        this.$refs.exportDialog.open();
      },
      getTemp() {
        this.downLoadTempFile('getAdvisoryTemp');
      },
      goDelete(data) {
        this.$confirm('即将删除数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.advisoryDelete(data.id).then(res => {
            if (res.code === 200) {
              this.getList();
              this.$message.success({message: '删除成功!', duration: 1500})
            }
          }).catch(err => {
            console.log(err);
          })

        }).catch(err => {});
      }
    }
  };
</script>

<style lang="scss" scoped>
  .tag-operate-tool{
    height: 42px;
    line-height: 42px;
    margin: 15px 15px 0;
    padding: 0 15px;
    background-color: #fff;
    border-bottom: 1px solid #f2f2f2;
    border-radius: 5px 5px 0 0 ;
  }
  .space-between{
    justify-content: space-between;
  }
  .travel-main{margin-top: 0!important;padding-top: 10px;}
  .blue-active{color: #3C6CBA;}
  .pagination-show-total{
    text-align: right;
    div:first-child{
      float: left;
      padding: 1px 20px 1px 0;
      height:28px;
      line-height: 28px;
    }
  }
</style>
