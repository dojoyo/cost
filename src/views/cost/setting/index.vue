<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-feiyongfentanbilishezhi"></i> 费用分摊比例设置
        </div>
      </div>
    </el-header>
     <div class="search-area">
        <el-date-picker v-model="search.year" type="year" format="yyyy年" value-format="yyyy" placeholder="请选择年份" class="mr-10"></el-date-picker>
        <el-select v-model="search.month" class="mr-10">
            <el-option
                v-for="item in enumType.FeeMonth"
                :key="item.value"
                :label="item.name"
                :value="item.value">
            </el-option>
        </el-select>
      <el-button @click="getList" type="primary" size="small" icon="iconfont icon-sousuo fs-12"> 查询</el-button>
    </div>
    <el-main class="main">
      <el-table :data="dataList">
        <el-table-column label="费用部门" prop="expenseDeptName"></el-table-column>
        <el-table-column label="创投部门" align="center">
          <el-table-column v-for="(item,index) in dataList.length && dataList[0].isCGVCDeptData" :key="'isCGVCDeptData'+index" :label="item.deptName" width="120">
            <template slot-scope="scope">
              <span v-show="scope.row.showEdit">
                <el-input v-model="scope.row.isCGVCDeptData[index].ratio" size="mini" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" />
              </span>
              <span v-show="!scope.row.showEdit">{{ scope.row.isCGVCDeptData[index].ratio }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="非创投部门" align="center">
          <el-table-column v-for="(item,index) in dataList.length && dataList[0].noCGVCDeptData" :key="'noCGVCDeptData'+index" :label="item.deptName" width="120">
            <template slot-scope="scope">
              <span v-show="scope.row.showEdit">
                <el-input v-model="scope.row.noCGVCDeptData[index].ratio" size="mini" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" />
              </span>
              <span v-show="!scope.row.showEdit">{{ scope.row.noCGVCDeptData[index].ratio }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="合计" prop="total"></el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <div v-show="!scope.row.showEdit">
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            </div>
            <div v-show="scope.row.showEdit">
              <el-button type="text" class="blue" @click="edit(scope.row)">保存</el-button>
              <el-button type="text" class="blue" @click="cancelEdit(scope.row)">取消</el-button>
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
  import api from '@/api/cost';
  import mixin from '../mixins';
  export default {
    name: '',
    components: {},
    props: {},
    mixins: [mixin],
    data() {
      return {
        enumType: {},
        search: {
          year: new Date().getFullYear() + '',
          month:''
        },
        list: [],
        ventureDep:[],
        dataList:[]
      };
    },
    mounted() {
      // this.getEnum('ContractSignState', true)
      this.init();
    },
    methods: {
      async init() {
        await this.getEnum('FeeMonth');
        this.search.month = this.enumType.FeeMonth && this.enumType.FeeMonth[0].value
        this.getList();
      },
      // 获取企业列表
      getList() {
        api.shareList(this.search).then(res => {
          if (res.code === 200) {
            // this.list = res.data;
            // res.data[0].expenseDeptList.forEach(item => {
            //   this.dataList.push({
            //     dep:{
            //      depId:item.expenseShareDept.deptId,
            //      deptName: item.expenseShareDept.deptName
            //     },
            //     ventureDep:[],
            //     isSetRatio:item.isSetRatio,
            //     ratio:item.ratio
            //   })
            //   console.log(this.dataList)
            //   res.data.forEach(item=>{
            //     const sameIndex = this.ventureDep.findIndex(venItem=>{
            //       return venItem.depId === item.expenseShareDept.deptId
            //     })
            //     if(!item.isCGVCDept && sameIndex === -1){
            //       this.ventureDep.push({
            //         depId:item.expenseShareDept.deptId,
            //         deptName: item.expenseShareDept.deptName
            //       })
            //     }
            //   })
            //   console.log(this.ventureDep)
            // });
            const listData = res.data
            let combineData = [] // 组合的最终数据
            let hasCombine = false // 是否存在最终数据里
            // 组建列数据
            let isCGVCDeptData = listData.filter(item => {
              return item.isCGVCDept
            })
            let noCGVCDeptData = listData.filter(item => {
              return !item.isCGVCDept
            })
            let colIsCGVCDeptData = isCGVCDeptData.map(item => {
              return {
                deptId: item.expenseShareDept.deptId,
                deptName: item.expenseShareDept.deptName,
                ratio: '',
                isSetRatio: ''
              }
            })
            let colNoCGVCDeptData = noCGVCDeptData.map(item => {
              return {
                deptId: item.expenseShareDept.deptId,
                deptName: item.expenseShareDept.deptName,
                ratio: '',
                isSetRatio: ''
              }
            })
            // 组建行数据
            for(let i=0;i<listData.length;i++){
              for(let j=0;j<listData[i].expenseDeptList.length;j++){
                hasCombine = false
                for(let k=0;k<combineData.length;k++){
                  if (combineData[k].expenseDeptId === listData[i].expenseDeptList[j].expenseShareDept.deptId) {
                    hasCombine = true
                    break;
                  }
                }
                if (!hasCombine) {
                  combineData.push({
                    expenseDeptId: listData[i].expenseDeptList[j].expenseShareDept.deptId,
                    expenseDeptName: listData[i].expenseDeptList[j].expenseShareDept.deptName,
                    isCGVCDeptData: colIsCGVCDeptData,
                    noCGVCDeptData: colNoCGVCDeptData,
                    total: 0,
                    showEdit: false
                  })
                }
              }
            }
            // 往combinData塞数据
            for (let k=0;k<combineData.length;k++){
              for (let l=0;l<combineData[k].isCGVCDeptData.length;l++){
                for(let i=0;i<listData.length;i++){
                  // 组建列数据
                  if (listData[i].isCGVCDept) { // 创投部
                    for(let j=0;j<listData[i].expenseDeptList.length;j++){
                      if(combineData[k].isCGVCDeptData[l].deptId === listData[i].expenseShareDept.deptId && combineData[k].expenseDeptId === listData[i].expenseDeptList[j].expenseShareDept.deptId) {
                        combineData[k].isCGVCDeptData[l].ratio = listData[i].expenseDeptList[j].ratio
                        combineData[k].isCGVCDeptData[l].isSetRatio = listData[i].expenseDeptList[j].isSetRatio
                        combineData[k].total += listData[i].expenseDeptList[j].ratio
                      }
                      break;
                    }
                  }
                }
              }
              for (let m=0;m<combineData[k].noCGVCDeptData.length;m++){
                for(let i=0;i<listData.length;i++){
                  // 组建列数据
                  if (!listData[i].isCGVCDept) { // 创投部
                    for(let j=0;j<listData[i].expenseDeptList.length;j++){
                      if(combineData[k].noCGVCDeptData[m].deptId === listData[i].expenseShareDept.deptId && combineData[k].expenseDeptId === listData[i].expenseDeptList[j].expenseShareDept.deptId) {
                        combineData[k].noCGVCDeptData[m].ratio = listData[i].expenseDeptList[j].ratio
                        combineData[k].noCGVCDeptData[m].isSetRatio = listData[i].expenseDeptList[j].isSetRatio
                        combineData[k].total += listData[i].expenseDeptList[j].ratio
                      }
                      break;
                    }
                  }
                }
              }
            }
            console.log(combineData)
            this.dataList = combineData;
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
      edit(data){
        console.log(data)
        data.showEdit = true
      },
      cancelEdit(data) {
        data.showEdit = false
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
.main{
  border-radius: 5px 5px 0 0 ;
}
</style>
