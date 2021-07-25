<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-qitashouru"></i> 其他收入
        </div>
        <div style="margin-left: auto">
          <el-button type="primary" size="small" icon="iconfont icon-xinzeng fs-12" @click="showAddAndEditDialog">
            新增</el-button>
        </div>
      </div>
    </el-header>
    <div class="search-area">
      <div>
        <el-date-picker  v-model="requestParams.year" type="year" format="yyyy年" value-format="yyyy" placeholder="选择年" class="mr-10 mb-10"></el-date-picker>
         <el-select v-model="requestParams.month" placeholder="全部月份" class="mr-10 mb-10">
            <el-option
              v-for="item in enumType.FeeMonth"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="requestParams.incomeType" placeholder="全部费用类型" class="mr-10 mb-10">
            <el-option
               v-for="item in enumType.FeeIncomeType"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
        </el-select>
        <el-button @click="getList()" type="primary" size="small" icon="iconfont icon-sousuo fs-12">查询</el-button>
      </div>
      <div class="tag-operate-tool">
        <el-button type="text" icon="iconfont icon-shangchuan2 fs-12" class="blue" 
        @click="openExportDialog">导出</el-button>
      </div>
    </div>
    <el-main class="main">
      <el-table v-if="list&&list.length>0" :data="list" style="width:100%" :fit="true" :header-cell-style="{'background':'#f5f9ff'}">
        <el-table-column prop="belongMonth" label="月份"></el-table-column>
        <el-table-column prop="incomeType.name" label="费用类型">
        </el-table-column>
        <el-table-column prop="amount" label="金额">
          <template slot-scope="scope">
            {{ scope.row.amount | formatMoney }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showAddAndEditDialog(scope.row)">编辑</el-button>
            <el-button type="text" @click="del(scope.row)">删除</el-button>
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
    </el-main>
    <AddAndEditDialog ref="addAndEdit"  :enumType="enumType"/>
    <ExportDialog ref="exportFile" method="exportIncomeFile"/>
  </el-container>
</template>
<script>
import api from "@/api/cost";
import AddAndEditDialog from './addAndEdit'
import ExportDialog from '../components/exportDialog'
import mixin from '../mixins'
export default {
  name: "",
  components: {AddAndEditDialog,ExportDialog},
  props: {},
  data() {
    return {
      search: {},
      list: [],
      requestParams:{
        year: new Date().getFullYear() + '',
        month:'',
        incomeType:''
      },
      total: 0,
      deptTree:[],
      enumType: {
        FeeMonth: [],
        FeeFlightType: []
      },
    };
  },
  mixins: [mixin],
  computed:{},
  mounted() {
    this.init()
  },
  methods: {
    // 获取企业列表
    getList() {
      let params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.requestParams
        };
      api.getIncomeList(params).then(res => {
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
      this.$refs.addAndEdit.open(data)
    },
    del(data){
      this.$confirm('即将删除数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delIncome(data.id).then(res => {
            if (res.code === 200) {
              this.getList();
              this.$message.success({message: '删除成功!', duration: 1500})
            }
          }).catch(err => {
            console.log(err);
          })

        }).catch(err => {});
    },
    openExportDialog(){
       this.$refs.exportFile.open()
    },
    async init(){
      await this.getEnum('FeeMonth')
      await this.getEnum('FeeIncomeType')
      this.getList()
    }
  }
};
</script>

<style lang="scss" scoped>
.search-area {
  margin: 15px 15px 0;
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  .el-input {
    width: 220px;
  }
}
.tag-operate-tool {
  text-align: right;
}
.main {
  border-radius: 5px;
}
.mb-10{margin-bottom: 10px}
</style>
