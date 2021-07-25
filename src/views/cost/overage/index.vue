<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-chaoetixing"></i> 超额提醒
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
    ></CommonSearch>
    <el-main class="main">
      <el-table
        v-if="list && list.length > 0"
        :data="list"
        style="width: 100%; "
        :header-cell-style="{ background: '#f5f9ff' }"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="contractType.name" label="部门" min-width="120">
          <template slot-scope="scope">
            {{ (scope.row.dept && scope.row.dept.deptName) || "" }}
          </template>
        </el-table-column>
        <el-table-column prop="user" label="人员" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.user.userName }}
          </template>
        </el-table-column>
        <el-table-column prop="pushTime" label="推送时间" width="150">
          <template slot-scope="scope">
            {{ DateTimeEn(scope.row.pushTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="reminder"
          label="提醒内容"
          width="150"
        ></el-table-column>
        <el-table-column
          label="操作"
          width="145"
          fixed="right"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" @click="push(scope.row.id)">推送</el-button>
            <span style="padding: 0 10px">|</span>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link" style="cursor: pointer">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="showAddAndEditDialog(scope.row)"
                  >编辑</el-dropdown-item
                >
                <el-dropdown-item @click.native="del(scope.row.id)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
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
    <AddAndEditDialog ref="addAndEditDialog" />
  </el-container>
</template>
<script>
import api from "@/api/cost";
import CommonSearch from "../components/commonSearch";
import mixin from "../mixins";
import filters from "@/utils/filters";
import AddAndEditDialog from "./addAndEdit";
export default {
  name: "",
  components: { CommonSearch, AddAndEditDialog },
  props: {},
  data() {
    return {
      enumType: {
        FeeMonth: []
      },
      filter: {},
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  computed: {
    DateTimeEn() {
      return function(time) {
        return filters.DateTimeEn(time);
      };
    }
  },
  mounted() {
    this.init();
  },
  mixins: [mixin],
  methods: {
    async init() {
      await this.getEnum("FeeMonth");
      await this.getDeptTree();
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

      api.excessRemindList(params).then(res => {
          if (res.code === 200) {
            this.list = res.data.list;
            this.total = res.data.total;
          }
      }).catch(err => {
          console.log(err);
      });
    },
    // 分页更改
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getList();
    },
    // 换页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    showAddAndEditDialog(data) {
      this.$refs.addAndEditDialog.open(data);
    },
    push(id) {
      this.$confirm("即将推送数据，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          api.pushExcessRemind(id).then(res => {
              if (res.code === 200) {
                this.getList();
                this.$message.success({ message: "推送成功!", duration: 1500 });
              }
            })
            .catch(err => {
              console.log(err);
            });
      }).catch(err => {});
    },
    del(id) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
