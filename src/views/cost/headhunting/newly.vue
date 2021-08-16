<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title"><i class="iconfont icon-lietoufei"></i> 新增人数</div>
        <div style="margin-left: auto">
          <el-button
            type="primary"
            size="small"
            icon="iconfont icon-xinzeng fs-12"
            @click="showAddAndEditDialog">
            新增</el-button>
        </div>
      </div>
    </el-header>
    <CommonSearch
      ref="commonSearch"
      @doSearch="doSearch"
      :deptTree="deptTree"
      :showMonth="false"
      :showUserName="false"
    ></CommonSearch>
    <!-- <div class="tag-operate-tool">
      <el-button
        type="text"
        icon="iconfont icon-shangchuan2 fs-12"
        class="blue"
        @click="openExportDialog">
        导出</el-button>
      <el-button
        type="text"
        icon="iconfont icon-xiazai1 fs-12"
        class="blue"
        @click="getTemp">
        下载模板</el-button>
    </div> -->
    <el-main class="main none-operate">
      <el-table
        v-if="list && list.length > 0"
        :data="list"
        style="width: 100%;"
        :header-cell-style="{ background: '#f5f9ff' }">
       <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column label="部门" prop="dept.deptName"></el-table-column>
        <el-table-column label="年份" prop="year"></el-table-column>
        <el-table-column label="新增人数" prop="number"></el-table-column>
        <el-table-column label="操作" width="126" fixed="right" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="showAddAndEditDialog(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="del(scope.row)">删除</el-button>
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
      <div v-show="list && list.length === 0" class="w-100p gray" style="text-align: center;" >
        <img src="@/assets/no-list.png" />
        <br /><span style="font-size: 14px">暂无数据</span><br /><br />
      </div>
    </el-main>
    <AddAndEditDialog ref="addAndEditDialog" :deptTree="deptTree"/>
    <ExportDialog ref="exportDialog" method="exportNewHunter"/>
  </el-container>
</template>
<script>
import api from "@/api/cost";
import CommonSearch from "../components/commonSearch";
import AddAndEditDialog from "./addAndEditNewly";
import ExportDialog from "../components/exportDialog";
import mixin from '../mixins'
export default {
  name: "",
  components: { CommonSearch,AddAndEditDialog,ExportDialog},
  data() {
    return {
      enumType: {
      },
      search: {},
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  mixins:[mixin],
  mounted() {
    this.init()
  },
  methods: {
    async init() {
        await this.getEnum('FeeType');
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
      api.newHunterList(params).then(res => {
          if (res.code === 200) {
            this.list = res.data.list;
            this.total = res.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showAddAndEditDialog(data){
      this.$refs.addAndEditDialog.open(data)
    },
    // getTemp(){
    //   this.downLoadTempFile('downLoadHunter')
    // // },
    // openExportDialog(){
    //   this.$refs.exportDialog.open()
    // },
    del(data){
      this.$confirm('即将删除数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delNewHunter(data.id).then(res => {
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
// .tag-operate-tool {
//   text-align: right;
//   margin: 15px auto 0;
//   padding: 0 15px;
//   width: calc(100% - 30px);
//   background-color: #fff;
//   border-bottom: 1px solid #e6e6e6;
//   border-radius: 5px 5px 0 0 ;
// }
.main.none-operate{
  margin: 15px 0 0 15px!important;
  padding:15px;
  width: calc(100% - 30px);
  border-radius: 5px 5px 0 0;
}
</style>
