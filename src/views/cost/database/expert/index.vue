<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-shujukufei"></i> 凯胜专家库使用情况
        </div>
        <div style="margin-left: auto">
          <el-button type="primary" size="small" icon="iconfont icon-xinzeng fs-12" @click="showAddAndEditDialog"> 新增</el-button>
        </div>
      </div>
    </el-header>
     <CommonSearch ref="commonSearch" @doSearch="doSearch" :feeMonth="enumType.FeeMonth" :deptTree="deptTree" />
      <div class="tag-operate-tool">
         <el-button type="text" icon="iconfont icon-xiazai3 fs-12" class="blue" @click="openImportDialog"> 导入</el-button>
        <el-button type="text" icon="iconfont icon-shangchuan2 fs-12" class="blue" @click="openExportDialog"> 导出</el-button>
        <el-button type="text" icon="iconfont icon-xiazai1 fs-12" class="blue"> 下载模板</el-button>
      </div>
    <el-main class="main">
      <el-table :data="list" style="width: 100%; margin-top:10px; " :fit="true" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="部门"  prop="contractName"></el-table-column>
        <el-table-column label="Date" prop="contractType.name"></el-table-column>
        <el-table-column label="User" prop="contractType.name"></el-table-column>
        <el-table-column label="Project" prop="contractType.name"></el-table-column>
        <el-table-column label="Expert's Company" prop="contractType.name" width="200"></el-table-column>
        <el-table-column label="Expert's Position" prop="contractType.name" width="200"></el-table-column>
        <el-table-column label="Type" prop="contractType.name"></el-table-column>
        <el-table-column label="Hours" prop="contractType.name"></el-table-column>
        <el-table-column label="Remarks" prop="contractType.name"></el-table-column>
        <el-table-column label="操作" fixed="right" header-align="center" align="center" >
          <template slot-scope="scope">
            <el-button type="text" @click="showAddAndEditDialog(scope.row.instanceId)">编辑</el-button>
            <el-button type="text" @click="downloadFile(scope.row.instanceId)">删除</el-button>
           
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
  import api from '@/api/cost';
  import CommonSearch from '../../components/commonSearch'
  import AddAndEditDialog from './addAndEdit'
  export default {
    name: '',
    components: {CommonSearch,AddAndEditDialog},
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
      // this.getEnum('ContractSignState', true)
      // this.getList();
    },
    methods: {
      // 获取枚举类
      getEnum(type, isAddAll) {
        api.getEnum(type).then(res => {
          if (res.code === 200) {
            if (isAddAll) {
              res.data.unshift({name: '全部', value: ''});
            }
            this.$set(this.enumType, type, res.data);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 获取企业列表
      getList() {
        let params = {
          filter: this.search.filter,
          pageNum: this.pageNum,
          pageSize: this.pageSize
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
      },
      showAddAndEditDialog(){
        this.$refs.addAndEdit.open();
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
