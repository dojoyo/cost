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
    <CommonSearch ref="commonSearch" @doSearch="doSearch" :feeMonth="enumType.FeeMonth" :deptTree="deptTree" />
    <div class="flex space-between tag-operate-tool">
      <div></div>
      <div class="operate-buttons">
        <el-button type="text" icon="iconfont icon-xiazai3 fs-12" class="blue" @click="openImportDialog"> 导入</el-button>
        <el-button type="text" icon="iconfont icon-shangchuan2 fs-12" class="blue" @click="openExportDialog"> 导出</el-button>
        <el-button type="text" icon="iconfont icon-xiazai1 fs-12" class="blue" @click="getTemp"> 下载模板</el-button>
      </div>
    </div>
    <el-main class="main travel-main">
      <el-table v-if="list && list.length>0" :data="list" style="width: 100%; margin-top:10px; " :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="部门" prop="deptName" width="120"></el-table-column>
        <el-table-column prop="userName" label="报销人员" width="80"></el-table-column>
        <el-table-column prop="invoiceDate" label="发票日期" width="100">
          <template slot-scope="scope">
            {{scope.row.invoiceDate | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="180"></el-table-column>
        <el-table-column prop="entertainType" label="招待类别" width="120"></el-table-column>
        <el-table-column prop="ourLeader" label="我方最高领导" width="120"></el-table-column>
        <el-table-column prop="ourPeople" label="我方人数" width="120"></el-table-column>
        <el-table-column prop="opposingLeader" label="对方最高领导（title）" width="160"></el-table-column>
        <el-table-column prop="opposingPeople" label="对方人数" width="120"></el-table-column>
        <el-table-column prop="totalNumber" label="人数合计" width="120"></el-table-column>
        <el-table-column prop="amount" label="金额" width="120"></el-table-column>
        <el-table-column prop="average" label="人均" width="120"></el-table-column>
        <el-table-column prop="number" label="单据号" width="120"></el-table-column>
        <el-table-column prop="belongMonth" label="入账月份" width="120"></el-table-column>
        <el-table-column prop="remark" label="备注" width="120"></el-table-column>
        <el-table-column label="操作" width="145" fixed="right" align="left" >
          <template slot-scope="scope">
            <el-button type="text" @click="goEdit(scope.row)">编辑</el-button>
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
    <AddAndEditDialog ref="addAndEdit" :deptTree="deptTree" />
    <ImportDialog ref="importDialog" method="serveImport" />
    <ExportDialog ref="exportDialog" method="serveExport" />
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
        api.getServeList(params).then(res => {
          if (res.code === 200) {
            this.list = res.data.list;
            this.total = res.data.total;
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
        this.downLoadTempFile('getServeTemp');
      },
      goDelete(data) {
        this.$confirm('即将删除数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.serveDelete(data.id).then(res => {
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
    margin: 15px 15px 0;
    padding: 0 15px;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
  }
  .space-between{
    justify-content: space-between;
  }
  .travel-main{margin-top: 0!important;padding-top: 10px;}
</style>
