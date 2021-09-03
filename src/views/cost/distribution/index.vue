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
      <div class="operate-buttons">
        <el-button type="text" icon="iconfont icon-chayuejilu fs-12" class="blue-active" @click="viewRecordOpen"> 查阅记录</el-button>
        <el-button type="text" icon="iconfont icon-xiaoxituisong fs-12" class="blue-active" @click="pushMessageOpen"> 消息推送</el-button>
        <el-button type="text" icon="iconfont icon-shujufabu fs-12" class="blue-active" @click="publishRelease"> 发布数据</el-button>
      </div>
      
    </div>
    <el-main class="main">
      <el-table :data="dataList" :header-cell-style="{background:'#f5f9ff'}" border :cell-style="firstCellStyle">
        <el-table-column label="费用类别" prop="name" width="100" fixed="left"></el-table-column>
        <el-table-column v-for="(item,index) in dataList.length && dataList[0].cellData" :key="'cellData'+index" :label="item.deptName" width="120" align="right">
          <template slot-scope="scope">
            <div class="txt-right">
              <div>{{scope.row.cellData[index].realtimeAmount | formatMoney}}</div>
              <div class="red">{{scope.row.cellData[index].shareAmount | formatMoney}}</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="red fs-12 pb-10 mt-15" v-show="dataList && dataList.length !== 0">注：红色字体表示分摊后数据，黑色字体表示分摊前数据</div>
      <div v-show="dataList && dataList.length===0" class="w-100p gray" style="text-align: center;">
        <img src="@/assets/no-list.png">
        <br><span style="font-size: 14px">暂无数据</span><br/><br/>
      </div>
    </el-main>
    <ViewRecord ref="viewRecord" :month="search.month" :year="search.year" />
    <PushMessage ref="pushMessage" :month="search.month" :year="search.year" :messageUsers="messageUsers" />
  </el-container>
</template>
<script>
  import api from '@/api/cost'
  import mixin from '../mixins'
  import ViewRecord from './viewRecord'
  import PushMessage from './pushMessage'
  export default {
    name: 'distributionPage',
    components: { ViewRecord, PushMessage },
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
        releaseTime:'',
        messageUsers: []
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
        this.getMessageUser();
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
                shareAmount: '',
                realtimeAmount: ''
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
            combineData.push({
              name: '总计',
              value: '总计',
              cellData: JSON.parse(JSON.stringify(cellData)),
            })
            let hasCellData = false;
            combineData.forEach(item => {
              item.cellData.forEach(cellItem => {
                hasCellData = false;
                for(let o=0;o<listData.length;o++){
                  // 组建列数据
                  for(let p=0;p<listData[o].deptCostVos.length;p++){
                    if(cellItem.deptName === listData[o].deptName && item.value === listData[o].deptCostVos[p].feeType.value && item.name === listData[o].deptCostVos[p].feeType.name) {
                      cellItem.shareAmount = listData[o].deptCostVos[p].shareAmount
                      cellItem.realtimeAmount = listData[o].deptCostVos[p].realtimeAmount
                      hasCellData = true
                      break;
                    } else if (cellItem.deptName === listData[o].deptName && item.name === '总计') {
                      cellItem.realtimeAmount = listData[o].totalCost
                      cellItem.shareAmount = listData[o].totalShareCost
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
      getMessageUser() {
        api.messageUser().then(res => {
          if(res && res.code === 200) {
            this.messageUsers = res.data
          }
        })
      },
      publishRelease() {
        api.publishRelease({...this.search}).then(res => {
          if(res && res.code === 200) {
            this.$message.success('操作成功')
            this.getList()
          }
        })
      },
      viewRecordOpen() {
        this.$refs.viewRecord.open()
      },
      pushMessageOpen() {
        this.$refs.pushMessage.open()
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
  height: 42px;
  line-height: 42px;
  margin: 15px auto 0;
  padding: 0 15px;
  width: calc(100% - 30px);
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
  border-radius: 5px 5px 0 0 ;
  display:flex;
  align-items: center;
  justify-content: space-between;
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
}
.main{
  margin:0 15px!important;
}
.mb-10{margin-bottom: 10px;}
.blue-active{color: #3C6CBA;}
</style>
