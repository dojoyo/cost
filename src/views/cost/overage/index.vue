<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-chaoetixing"></i> 超额提醒
        </div>
        <div style="margin-left: auto">
           <el-button type="primary" size="small" icon="iconfont icon-xinzeng fs-12" @click="showAddAndEditDialog">
            新增</el-button>
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
      <el-table v-if="list && list.length>0" :data="list" style="width: 100%; margin-top:10px; " :header-cell-style="{background:'#fdfdfd'}">
        <el-table-column label="合同名称" width="300"  prop="contractName"></el-table-column>
        <el-table-column prop="contractType.name" label="分类" width="120"></el-table-column>
        <el-table-column prop="approvalTitle" label="审批流程" width="400"></el-table-column>
        <el-table-column prop="signTime" label="创建时间" width="150">
          <template slot-scope="scope">
            {{scope.row.createTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="signTime" label="签订时间" width="150">
          <template slot-scope="scope">
            {{scope.row.signTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="signState.name" label="状态" width="80"></el-table-column>
        <el-table-column prop="promoter.userName" label="发起人" width="120"></el-table-column>
        <el-table-column prop="signer" label="签署方" width="120"></el-table-column>

        <el-table-column label="操作" width="145" fixed="right" header-align="center" align="center" >
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.permission && scope.row.signState && (!scope.row.permission.canDownload || scope.row.signState.value!=='COMPLETE')" @click="downloadFile(scope.row.instanceId)">下载</el-button>
            <span style="padding: 0 10px">|</span>
            <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="cursor: pointer">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="cancelSign(scope.row.instanceId)">取消签署</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
  </el-container>
</template>
<script>
  import api from '@/api/cost';
  import CommonSearch from "../components/commonSearch";
  export default {
    name: '',
    components: {CommonSearch},
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
        this.getList();
      },
      // 获取企业列表
      getList() {
        let params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.filter
        };

        api.getSignList(params).then(res => {
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
      }
    }
  };
</script>

<style lang="scss" scoped>
</style>
