<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-chaoetixing"></i> 跟投比例设置
        </div>
        <div style="margin-left: auto">
        </div>
      </div>
    </el-header>
    <div class="search-area">
      <div class="w-100p flex space-between">
        <div>
          <el-input
            size="medium"
            placeholder="请输入项目名称"
            v-model="search.projectName"
            class="mr-10 mb-10"
          />
          <el-select v-model="search.year" class="mr-10 mb-10">
            <el-option
                v-for="item in yearData"
                :key="item.value"
                :label="item.name"
                :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="search.investType" class="mr-10 mb-10">
            <el-option
                v-for="item in enumType.FeeInvestTypeAll"
                :key="item.value"
                :label="item.name"
                :value="item.value">
            </el-option>
          </el-select>
          <el-button @click="getList()" type="primary" size="small" icon="iconfont icon-sousuo fs-12"> 查询</el-button>
        </div>
        <div class="operate-buttons">
          <el-button type="text" icon="iconfont icon-gengxinshuju fs-12" class="blue-active" @click="goUpdate"> 更新数据</el-button>
          <el-button type="text" icon="iconfont icon-shangchuan2 fs-12" class="blue-active" @click="openExportDialog"> 导出</el-button>
        </div>
      </div>
    </div>
    <el-main class="main">
      <el-table
        v-if="list && list.length > 0"
        :data="list"
        style="width: 100%; "
        :header-cell-style="{ background: '#f5f9ff' }"
      >
        <el-table-column prop="projectName" label="项目名称">
          <template slot-scope="scope">
            <span :class="!scope.row.isTotal?'':'dark fb'">{{scope.row.projectName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="investRound" label="投资轮次"></el-table-column>
        <el-table-column prop="investType" label="项目类型"></el-table-column>
        <el-table-column prop="fundSource" label="资金来源" min-width="150"></el-table-column>
        <el-table-column prop="incomePeVc" label="管理费收入(非保碧)" min-width="150">
          <template slot-scope="scope">
            <span :class="!scope.row.isTotal?'':'dark fb'">{{scope.row.incomePeVc}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="incomeBaoBi" label="管理费收入(保碧)" min-width="150">
          <template slot-scope="scope">
            <span :class="!scope.row.isTotal?'':'dark fb'">{{scope.row.incomeBaoBi}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="incomeMa" label="管理费收入(并购)" min-width="150">
          <template slot-scope="scope">
            <span :class="!scope.row.isTotal?'':'dark fb'">{{scope.row.incomeMa}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="followRatio" label="跟投比例">
          <template slot-scope="scope">
            <span v-if="!scope.row.isTotal">{{ scope.row.followRatio | formatMoney(1) }}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="projectCreateTime" label="创建日期" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.projectCreateTime | DateTimeEn }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="126"
          fixed="right"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isTotal" type="text" @click="showAddAndEditDialog(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <ExportDialog ref="exportDialog" method="exportManageIncome" :yearData="yearData" :FeeInvestTypeAll="enumType.FeeInvestTypeAll" />
  </el-container>
</template>
<script>
import api from "@/api/cost";
import CommonSearch from "../components/commonSearch";
import mixin from "../mixins";
import AddAndEditDialog from "./addAndEdit";
import ExportDialog from './exportDialog';
export default {
  name: "manageIncome",
  components: { CommonSearch, AddAndEditDialog, ExportDialog },
  props: {},
  data() {
    return {
      enumType: {
        FeeInvestType: [],
        FeeInvestTypeAll: []
      },
      search: {
        projectName: '',
        year: '',
        investType: ''
      },
      yearData: [],
      list: [],
    };
  },
  mounted() {
    this.init();
  },
  mixins: [mixin],
  methods: {
    async init() {
      let yearDataArray = [{ name: '全部年份', value: 'all' }]
      const thisYear = new Date().getFullYear()
      for(let i = thisYear; i > 2018; i--) {
        yearDataArray.push({
          name: i,
          value: i
        })
      }
      this.yearData = yearDataArray
      this.search.year = this.yearData[0].value
      await this.getEnum("FeeInvestType")
      this.enumType.FeeInvestTypeAll = [{ name: '全部项目类型', value: 'all' }].concat(this.enumType.FeeInvestType)
      this.search.investType = this.enumType.FeeInvestTypeAll[0].value
      this.getList()
    },
    getList() {
      let params = {
        ...this.search
      };
      if (this.search.year === 'all') {
        params.year = ''
      }
      if (this.search.investType === 'all') {
        params.investType = ''
      }
      api.manageIncomeList(params).then(res => {
        if (res.code === 200) {
          let allData = res.data.list;
          let totalRow = {
            projectName: '合计',
            isTotal: true,
            incomeBaoBi: 0,
            incomeMa: 0,
            incomePeVc: 0
          }
          allData.forEach(item => {
            totalRow.incomeBaoBi += item.incomeBaoBi
            totalRow.incomeMa += item.incomeMa
            totalRow.incomePeVc += item.incomePeVc
          });
          if (allData && allData.length) {
            allData.push(totalRow)
          }
          this.list = allData
        }
      }).catch(err => {
          console.log(err);
      });
    },
    showAddAndEditDialog(data) {
      this.$refs.addAndEditDialog.open(data);
    },
    openExportDialog() {
      this.$refs.exportDialog.open();
    },
    goUpdate() {
      api.updateManageIncome().then(res => {
        if (res.code === 200) {
          this.$message.success('操作成功')
          this.getList()
        }
      })
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
  border-radius: 5px;
  .el-input{width: 220px;}
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
.mb-10{margin-bottom: 10px}
.main{
  border-radius: 5px 5px 0 0 ;
  .fb{
    font-weight: 600;
  }
}
.blue-active{color: #3C6CBA;}
</style>
