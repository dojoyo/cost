<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-shujukufei"></i> 凯胜专家库使用情况
        </div>
        <div style="margin-left: auto">
          <el-button
            type="primary"
            size="small"
            icon="iconfont icon-xinzeng fs-12"
            @click="showAddAndEditDialog"
          >
            新增</el-button
          >
        </div>
      </div>
    </el-header>
    <CommonSearch
      ref="commonSearch"
      @doSearch="doSearch"
      :feeMonth="enumType.FeeMonth"
      :deptTree="deptTree"
    />
    <div class="tag-operate-tool">
      <el-button
        type="text"
        icon="iconfont icon-xiazai3 fs-12"
        class="blue"
        @click="openImportDialog"
      >
        导入</el-button
      >
      <el-button
        type="text"
        icon="iconfont icon-shangchuan2 fs-12"
        class="blue"
        @click="openExportDialog"
      >
        导出</el-button
      >
      <el-button
        type="text"
        icon="iconfont icon-xiazai1 fs-12"
        class="blue"
        @click="getTemp"
      >
        下载模板</el-button
      >
    </div>
    <el-main class="main">
      <el-table
        :data="list"
        style="width: 100%; margin-top:10px; "
        :fit="true"
        :header-cell-style="{ background: '#f5f9ff' }"
      >
        <el-table-column label="部门" prop="dept.deptName"></el-table-column>
        <el-table-column label="Date" prop="useDate">
          <template slot-scope="scope">
            {{ scope.row.useDate | DateTimeEn }}
          </template>
        </el-table-column>
        <el-table-column label="User" prop="user.userName"></el-table-column>
        <el-table-column label="Project" prop="project"></el-table-column>
        <el-table-column
          label="Expert's Company"
          prop="expertCompany"
          width="200"
        ></el-table-column>
        <el-table-column
          label="Expert's Position"
          prop="expertPosition"
          width="200"
        ></el-table-column>
        <el-table-column label="Type" prop="type"></el-table-column>
        <el-table-column label="Hours" prop="hours"></el-table-column>
        <el-table-column label="Remarks" prop="remark"></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="showAddAndEditDialog(scope.row.instanceId)"
              >编辑</el-button
            >
            <el-button type="text" @click="downloadFile(scope.row.instanceId)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="txt-right">
        <el-pagination
          v-if="list && list.length > 0"
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
      <div
        v-show="list && list.length === 0"
        class="w-100p gray"
        style="text-align: center;"
      >
        <img src="@/assets/no-list.png" />
        <br /><span style="font-size: 14px">暂无数据</span><br /><br />
      </div>
    </el-main>
    <AddAndEditDialog ref="addAndEdit" :deptTree="deptTree"/>
    <ExportDialog ref="exportDialog" method="exportDatabaseList"/>
    <ImportDialog ref="importDialog" method="importDatabaseList"/>
  </el-container>
</template>
<script>
import api from "@/api/cost";
import CommonSearch from "../../components/commonSearch";
import AddAndEditDialog from "./addAndEdit";
import ExportDialog from "../../components/exportDialog";
import ImportDialog from "../../components/importDialog";
import mixin from "../../mixins";
export default {
  name: "",
  components: { CommonSearch,AddAndEditDialog,ExportDialog,ImportDialog},
  props: {},
  data() {
    return {
      enumType: {},
      search: {},
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  mounted() {
    this.init();
  },
  mixins: [mixin],
  methods: {
    async init() {
      await this.getEnum("FeeMonth");
      await this.getDeptTree();
      this.enumType.FeeMonthAll = [{ name: "全部月份", value: "" }].concat(
        this.enumType.FeeMonth
      );
      this.$refs.commonSearch.doSearch();
    },
    doSearch(data) {
      this.pageNum = 1;
      this.filter = { ...data };
      this.getList();
    },
    getList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.filter
      };
      api
        .databaseUseList(params)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.list = res.data.list;
            this.total = res.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 编辑新增编辑弹窗打开
    showAddAndEditDialog(data) {
      this.$refs.addAndEdit.open(data);
    },
    //费用分摊设置
    setCostShare() {
      this.$refs.setCostShare.open();
    },
    delte(id) {
       this.$confirm("即将删除数据，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          api.delExcessRemind(id).then(res => {
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
    getTemp() {
      this.downLoadTempFile("downDatabaseList");
    },
    openExportDialog() {
      this.$refs.exportDialog.open();
    },
    openImportDialog() {
      this.$refs.importDialog.open();
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
