<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-qitafeiyong"></i> 其他费用
        </div>
        <div style="margin-left: auto">
          <el-button type="primary" size="small" icon="iconfont icon-xinzeng fs-12" @click="goAdd"> 新增</el-button>
        </div>
      </div>
    </el-header>
    <div class="search-area">
      <div class="w-100p flex space-between">
        <div>
          <el-date-picker v-model="search.year" type="year" format="yyyy年" value-format="yyyy" placeholder="请选择年份" class="mr-10"></el-date-picker>
          <el-button @click="getList()" type="primary" size="small" icon="iconfont icon-sousuo fs-12"> 查询</el-button>
        </div>
        <div class="operate-buttons">
          <el-button type="text" icon="iconfont icon-bianjix fs-12" class="blue-active" @click="goAdd"> 编辑</el-button>
          <el-button type="text" icon="iconfont icon-xiazai3 fs-12" class="blue-active" @click="openImportDialog"> 导入</el-button>
          <el-button type="text" icon="iconfont icon-shangchuan2 fs-12" class="blue-active" @click="openExportDialog"> 导出</el-button>
          <el-button type="text" icon="iconfont icon-xiazai1 fs-12" class="blue-active" @click="getTemp"> 下载模板</el-button>
        </div>
      </div>
    </div>
    <el-main class="main">
      <el-table v-if="list && list.length>0" :data="list" style="width: 100%; margin-top:10px; " :header-cell-style="{background:'#f5f9ff'}" border :cell-style="firstCellStyle" :row-style="lastRowStyle">
        <el-table-column label="部门" width="180" prop="deptName"></el-table-column>
        <el-table-column label="1月" width="120" align="right" prop="monthCost.janCost"></el-table-column>
        <el-table-column label="2月" width="120" align="right" prop="monthCost.febCost"></el-table-column>
        <el-table-column label="3月" width="120" align="right" prop="monthCost.marCost"></el-table-column>
        <el-table-column label="4月" width="120" align="right" prop="monthCost.aprCost"></el-table-column>
        <el-table-column label="5月" width="120" align="right" prop="monthCost.mayCost"></el-table-column>
        <el-table-column label="6月" width="120" align="right" prop="monthCost.junCost"></el-table-column>
        <el-table-column label="7月" width="120" align="right" prop="monthCost.julCost"></el-table-column>
        <el-table-column label="8月" width="120" align="right" prop="monthCost.augCost"></el-table-column>
        <el-table-column label="9月" width="120" align="right" prop="monthCost.septCost"></el-table-column>
        <el-table-column label="10月" width="120" align="right" prop="monthCost.octCost"></el-table-column>
        <el-table-column label="11月" width="120" align="right" prop="monthCost.novCost"></el-table-column>
        <el-table-column label="12月" width="120" align="right" prop="monthCost.decCost"></el-table-column>
        <el-table-column label="合计" width="120" align="right" prop="total" fixed="right"></el-table-column>
      </el-table>
      <div v-show="list && list.length > 0" class="black mt-15">
        合计：{{countTotal | formatMoney}}元
      </div>
      <div v-show="list && list.length===0" class="w-100p gray" style="text-align: center;">
        <img src="@/assets/no-list.png">
        <br><span style="font-size: 14px">暂无数据</span><br/><br/>
      </div>
    </el-main>
    <AddAndEditDialog ref="addAndEdit" />
    <ImportDialog ref="importDialog" method="otherImport" />
    <ExportDialog ref="exportDialog" method="otherExport" />
    <DownloadTemp ref="downloadTempFile" />
  </el-container>
</template>
<script>
  import api from '@/api/cost';
  import mixin from '../mixins';
  import AddAndEditDialog from './addAndEdit';
  import ImportDialog from '../components/importDialog';
  import ExportDialog from '../components/exportDialog';
  import DownloadTemp from '../components/downloadTemp'
  export default {
    name: '',
    components: { AddAndEditDialog, ImportDialog, ExportDialog, DownloadTemp },
    props: {},
    data() {
      return {
        enumType: {},
        search: {
          year: new Date().getFullYear() + ''
        },
        list: [],
        deptTree: [],
        countTotal: ''
      };
    },
    mixins: [mixin],
    mounted() {
      this.getEnum('FeeMonth');
      this.getList();
      this.getDeptTree();
    },
    methods: {
      // 设置第一列蓝色背景
      firstCellStyle({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          return { backgroundColor: '#f5f9ff' };
        } else if (columnIndex === 13) {
          return { color: 'black' };
        }
      },
      // 获取企业列表
      getList() {
        let params = {
          year: this.search.year
        };
        api.getOtherList(params).then(res => {
          if (res.code === 200) {
            let listData = res.data.deptCostList;
            let totalData = {
              deptName: '合计',
              monthCost: res.data.monthTotal,
              total: res.data.total
            };
            if (res.data.deptCostList && res.data.deptCostList.length > 0) {
              listData.push(totalData)
              this.list = listData
              this.countTotal = res.data.total
            } else {
              this.list = []
            }
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 新增编辑弹窗打开
      goAdd(data) {
        this.$refs.addAndEdit.open(data, this.deptTree, this.enumType.FeeMonth);
      },
      openImportDialog() {
        this.$refs.importDialog.open();
      },
      openExportDialog() {
        this.$refs.exportDialog.open();
      },
      getTemp() {
        // this.downLoadTempFile('getOtherTemp');
        this.$refs.downloadTempFile.open('getOtherTemp');
      },
      lastRowStyle({ row, rowIndex }) {
        console.log(row)
        if (row.deptName === '合计') {
          return { color: 'black' };
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
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
  .main{
    border-radius: 5px 5px 0 0 ;
  }
  .blue-background{
    background-color: #f5f9ff;
  }
  .blue-active{color: #3C6CBA;}
</style>
