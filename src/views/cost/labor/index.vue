<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-renlichengben"></i> 人工费
        </div>
        <div style="margin-left: auto">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddAndEditDialog()">新增</el-button>
        </div>
      </div>
    </el-header>
    <div class="search-area">
      <div class="w-100p flex space-between">
        <div>
          <el-date-picker v-model="search.year" type="year" placeholder="请选择年份" class="mr-10"></el-date-picker>
          <el-button @click="getList()" type="primary" size="small">查询</el-button>
        </div>
        <div class="operate-buttons">
          <el-button type="text" icon="iconfont icon-bianjix" class="blue"> 编辑</el-button>
          <el-button type="text" icon="iconfont icon-xiazai3" class="blue" @click="openImportDialog"> 导入</el-button>
          <el-button type="text" icon="iconfont icon-shangchuan2" class="blue" @click="openExportDialog"> 导出</el-button>
          <el-button type="text" icon="iconfont icon-xiazai1" class="blue"> 下载模板</el-button>
        </div>
      </div>
    </div>
    <el-main class="main">
      <el-table v-if="list && list.length>0" :data="list" style="width: 100%; margin-top:10px; " :header-cell-style="{background:'#f5f9ff'}" border :cell-style="firstCellStyle">
        <el-table-column label="部门" width="180" prop="contractName"></el-table-column>
        <el-table-column label="1月" width="120" align="right" prop=""></el-table-column>
        <el-table-column label="2月" width="120" align="right" prop=""></el-table-column>
        <el-table-column label="3月" width="120" align="right" prop=""></el-table-column>
        <el-table-column label="4月" width="120" align="right" prop=""></el-table-column>
        <el-table-column label="5月" width="120" align="right" prop=""></el-table-column>
        <el-table-column label="6月" width="120" align="right" prop=""></el-table-column>
        <el-table-column label="7月" width="120" align="right" prop=""></el-table-column>
        <el-table-column label="8月" width="120" align="right" prop=""></el-table-column>
        <el-table-column label="9月" width="120" align="right" prop=""></el-table-column>
        <el-table-column label="10月" width="120" align="right" prop=""></el-table-column>
        <el-table-column label="11月" width="120" align="right" prop=""></el-table-column>
        <el-table-column label="12月" width="120" align="right" prop=""></el-table-column>
        <el-table-column label="合计" width="120" align="right" prop=""></el-table-column>
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
      // 设置第一列蓝色背景
      firstCellStyle({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          return { backgroundColor: '#f5f9ff' };
        }
      },
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
      // 新增编辑弹窗打开
      showAddAndEditDialog(data) {
        this.$refs.addAndEdit.open(data);
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
<style lang="scss">
  .space-between{
    justify-content: space-between;
  }

  .search-area{
    margin: 15px 15px 0;
    padding: 20px;
    background-color: #fff;
  }
  .operate-buttons{
    font-size: 0;
    > button{
      &:not(:last-child){
        &::after{
          display: inline-block;
          width: 1px;
          height: 10px;
          border-left: 1px solid #ccc;
          content: '';
          margin-left: 12px;
        }
      }
    }
  }
  .blue-background{
    background-color: #f5f9ff;
  }
</style>
