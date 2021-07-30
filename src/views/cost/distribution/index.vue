<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-shujufabu"></i> 数据发布
        </div>
      </div>
    </el-header>
    <div class="search-area">
        <el-date-picker v-model="search.year" type="year" format="yyyy年" value-format="yyyy" placeholder="请选择年份" class="mr-10 mb-10"></el-date-picker>
        <el-select v-model="search.month" class="mr-10 mb-10">
            <el-option
                v-for="item in enumType.FeeMonth"
                :key="item.value"
                :label="item.name"
                :value="item.value">
            </el-option>
        </el-select>
      <el-button @click="getList" type="primary" size="small" icon="iconfont icon-sousuo fs-12"> 查询</el-button>
    </div>
    <div class="tag-operate-tool">
      <span>最近发布时间：{{releaseTime || '-'}}</span>
       <el-button type="text" icon="iconfont icon-shujufabu fs-12" class="blue" @click="publishRelease"> 发布数据</el-button>
    </div>
    <el-main class="main">
      <el-table :data="dataList" :header-cell-style="{background:'#f5f9ff'}" border :cell-style="firstCellStyle">
        <el-table-column label="费用类别" prop="name" width="100" fixed="left"></el-table-column>
        <el-table-column v-for="(item,index) in dataList.length && dataList[0].cellData" :key="'cellData'+index" :label="item.deptName" width="120" align="right">
          <template slot-scope="scope">
            <div class="txt-right">
              {{scope.row.cellData[index].realtimeAmount | formatMoney}}
              <span class="red" v-if="!scope.row.cellData[index].isSame">({{scope.row.cellData[index].historyAmount | formatMoney}})</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="dataList && dataList.length===0" class="w-100p gray" style="text-align: center;">
        <img src="@/assets/no-list.png">
        <br><span style="font-size: 14px">暂无数据</span><br/><br/>
      </div>
    </el-main>
  </el-container>
</template>
<script>
  import api from '@/api/cost'
  import mixin from '../mixins'
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        enumType: {},
        search: {
          month: '',
          year: new Date().getFullYear() + ''
        },
        dataList:[],
        editIndex: '',
        releaseTime:''
      };
    },
    mixins:[mixin],
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        await this.getEnum('FeeMonth');
        const currentMonth = (new Date().getMonth() +1) + '';
        const haiCurrentMonth = this.enumType.FeeMonth.some(item => (item.value+'') === currentMonth);
        this.search.month = haiCurrentMonth ? currentMonth : (this.enumType.FeeMonth && this.enumType.FeeMonth[0].value);
        this.getList();
      },
      // 获取企业列表
      getList() {
        api.releaseList(this.search).then(res => {
          if (res.code === 200) {
            this.releaseTime = res.data.releaseTime
            let listData = res.data.releaseWithTypeVos;
            let combineData = [];
            let hasCombine = false;
            let cellData = [];
            // 组件列数据
            listData.forEach(item => {
              cellData.push({
                deptName: item.deptName,
                historyAmount: '',
                realtimeAmount: '',
                isSame: ''
              })
            })
            // 组建行数据
            for(let i=0;i<listData.length;i++){
              for(let j=0;j<listData[i].deptCostVos.length;j++){
                hasCombine = false
                for(let k=0;k<combineData.length;k++){
                  if (combineData[k].name === listData[i].deptCostVos[j].feeType.name && combineData[k].value === listData[i].deptCostVos[j].feeType.value) {
                    hasCombine = true
                    break;
                  }
                }
                // deepCopy
                if (!hasCombine) {
                  combineData.push({
                    name: listData[i].deptCostVos[j].feeType.name,
                    value: listData[i].deptCostVos[j].feeType.value,
                    cellData: JSON.parse(JSON.stringify(cellData)),
                  })
                }
              }
            }
            let hasCellData = false;
            combineData.forEach(item => {
              item.cellData.forEach(cellItem => {
                hasCellData = false;
                for(let o=0;o<listData.length;o++){
                  // 组建列数据
                  for(let p=0;p<listData[o].deptCostVos.length;p++){
                    if(cellItem.deptName === listData[o].deptName && item.value === listData[o].deptCostVos[p].feeType.value && item.name === listData[o].deptCostVos[p].feeType.name) {
                      cellItem.historyAmount = listData[o].deptCostVos[p].historyAmount
                      cellItem.realtimeAmount = listData[o].deptCostVos[p].realtimeAmount
                      cellItem.isSame = listData[o].deptCostVos[p].isSame
                      hasCellData = true
                      break;
                    }
                  }
                  if (hasCellData) {
                    break;
                  }
                }
              })
            })
            console.log(combineData)
            this.dataList = combineData;
          } else {
            this.dataList = []
          }
        }).catch(err => {
          this.dataList = []
          console.log(err);
        });
      },
      publishRelease() {
        api.publishRelease({...this.search}).then(res => {
          if(res.code === 200) {
            this.$message.success('操作成功')
            this.getList()
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
.search-area{
    margin: 15px 15px 0;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    .el-input{width: 220px;}
    > * {
        margin-bottom: 10px;
    }
}
.tag-operate-tool{
  margin: 15px auto 0;
  padding: 0 15px;
  width: calc(100% - 30px);
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  border-radius: 5px 5px 0 0 ;
  display:flex;
  align-items: center;
  justify-content: space-between;
}
.main{
  margin:0 15px!important;
}
.mb-10{margin-bottom: 10px;}
</style>
