<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-chalvfei"></i> 差旅费
        </div>
        <div style="margin-left: auto">
        </div>
      </div>
    </el-header>
    <div class="search-area">
      <el-input v-model="search.name" placeholder="请输入人员姓名" class="mr-10"></el-input>
      <el-date-picker v-model="search.year" type="year" placeholder="请选择年份" class="mr-10"></el-date-picker>
      <el-select v-model="search.month" class="mr-10">
        <el-option
            v-for="item in months"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.department" class="mr-10">
        <el-option
            v-for="item in departments"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="getList()" type="primary" size="small" icon="iconfont icon-sousuo fs-12"> 查询</el-button>
      <!--  -->
    </div>
    <div class="flex space-between tag-operate-tool">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelectTag">
        <el-menu-item index="1">机票</el-menu-item>
        <el-menu-item index="2">酒店</el-menu-item>
        <el-menu-item index="3">火车票</el-menu-item>
        <el-menu-item index="4">滴滴</el-menu-item>
        <el-menu-item index="5">其他</el-menu-item>
      </el-menu>
      <div class="operate-buttons">
        <el-button type="text" icon="iconfont icon-xinzeng fs-12" class="blue" @click="goAdd"> 新增</el-button>
        <el-button type="text" icon="iconfont icon-xiazai3 fs-12" class="blue" @click="openImportDialog"> 导入</el-button>
        <el-button type="text" icon="iconfont icon-shangchuan2 fs-12" class="blue" @click="openExportDialog"> 导出</el-button>
        <el-button type="text" icon="iconfont icon-xiazai1 fs-12" class="blue"> 下载模板</el-button>
      </div>
    </div>
    <el-main class="main travel-main">
      <el-table v-if="list && list.length>0" :data="list" style="width: 100%; margin-top:10px; " :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="部门" prop="contractName"></el-table-column>
        <el-table-column prop="contractType.name" label="乘机人" width="120"></el-table-column>

        <el-table-column prop="signTime" label="订票时间" width="150">
          <template slot-scope="scope">
            {{scope.row.createTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="signTime" label="起飞时间" width="150">
          <template slot-scope="scope">
            {{scope.row.signTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="approvalTitle" label="国际/国内" width="400"></el-table-column>
        <el-table-column prop="signState.name" label="航程" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="航班" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="航等" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="折扣" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="成交净价" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="民航基金" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="保险费" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="改签费" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="配送服务费" width="120"></el-table-column>
        <el-table-column prop="signState.name" label="服务包金额" width="120"></el-table-column>
        <el-table-column prop="signState.name" label="实收/实付" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="入账月份" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="优惠券" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="备注" width="80"></el-table-column>
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
    <AddAndEditDialog ref="addAndEdit" />
    <ImportDialog ref="importDialog"/>
    <ExportDialog ref="exportDialog"/>
  </el-container>
</template>
<script>
  import api from '@/api/cost';
  import AddAndEditDialog from './addAndEdit';
  import ImportDialog from '../components/importDialog';
  import ExportDialog from '../components/exportDialog';
  export default {
    name: '',
    components: { AddAndEditDialog, ImportDialog, ExportDialog },
    props: {},
    data() {
      return {
        enumType: {},
        search: {
          name: '',
          year: '',
          month: 'all',
          department: 'all'
        },
        list: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        months: [
          {
            label: '全部月份',
            value: 'all'
          },
          { label: '1月', value: 1 },
          { label: '2月', value: 2 },
          { label: '3月', value: 3 },
          { label: '4月', value: 4 },
          { label: '5月', value: 5 },
          { label: '6月', value: 6 },
          { label: '7月', value: 7 },
          { label: '8月', value: 8 },
          { label: '9月', value: 9 },
          { label: '10月', value: 10 },
          { label: '11月', value: 11 },
          { label: '12月', value: 12 }
        ],
        departments: [
          {
            label: '全部部门',
            value: 'all'
          }
        ],
        activeIndex: '1' // 默认机票tag
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
              res.data.unshift({ name: '全部', value: '' });
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
      // tag切换
      handleSelectTag(key, keyPath) {
        console.log(key);
        console.log(keyPath);
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
  .space-between{
    justify-content: space-between;
  }
  .travel-main{margin-top: 0!important;padding-top: 10px;}
</style>
