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
      <el-table :data="dataList" :header-cell-style="{background:'#f5f9ff'}" border :cell-style="firstCellStyle">
        <el-table-column label="费用部门" prop="expenseDeptName" width="100" fixed="left"></el-table-column>
        <el-table-column label="创投部门" align="center">
          <el-table-column v-for="(item,index) in dataList.length && dataList[0].isCGVCDeptData" :key="'isCGVCDeptData'+index" :label="item.deptName" width="120" align="right">
            <template slot-scope="scope">
              <span v-show="scope.row.editIndex === editIndex">
                <el-input class="input-txt-right" v-model="scope.row.isCGVCDeptData[index].editRatio" size="mini" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" >
                  <span slot="suffix" class="lh-28">%</span>
                </el-input>
              </span>
              <div class="txt-right" v-show="scope.row.editIndex !== editIndex">{{ scope.row.isCGVCDeptData[index].ratio }}%</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="非创投部门" align="center">
          <el-table-column v-for="(item,index) in dataList.length && dataList[0].noCGVCDeptData" :key="'noCGVCDeptData'+index" :label="item.deptName" width="120" align="right">
            <template slot-scope="scope">
              <span v-show="scope.row.editIndex === editIndex">
                <el-input class="input-txt-right" v-model="scope.row.noCGVCDeptData[index].editRatio" size="mini" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')">
                  <span slot="suffix" class="lh-28">%</span>
                </el-input>
              </span>
              <div class="txt-right" v-show="scope.row.editIndex !== editIndex">{{ scope.row.noCGVCDeptData[index].ratio }}%</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="合计" prop="total" align="right">
          <template slot-scope="scope">
            <span>{{scope.row.total}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="126" align="center">
          <template slot-scope="scope">
            <div v-show="scope.row.editIndex !== editIndex">
              <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            </div>
            <div v-show="scope.row.editIndex === editIndex">
              <el-button type="text" class="blue" @click="saveEdit(scope.row)">保存</el-button>
              <span style="padding: 0 10px">|</span>
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
        dataList:[],
        editIndex: ''
      };
    },
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
        api.shareList(this.search).then(res => {
          if (res.code === 200) {
            let listData = res.data
            let editIndex = 0
            let combineData = [] // 组合的最终数据
            let hasCombine = false // 是否存在最终数据里
            // 组建列数据
            let isCGVCDeptData = []
            let noCGVCDeptData = []
            listData.forEach(item => {
              if (item.isCGVCDept) {
                isCGVCDeptData.push({
                  deptId: item.expenseShareDept.deptId,
                  deptName: item.expenseShareDept.deptName,
                  ratio: '',
                  isSetRatio: ''
                })
              } else {
                noCGVCDeptData.push({
                  deptId: item.expenseShareDept.deptId,
                  deptName: item.expenseShareDept.deptName,
                  ratio: '',
                  isSetRatio: ''
                })
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
                // deepCopy
                if (!hasCombine) {
                  combineData.push({
                    expenseDeptId: listData[i].expenseDeptList[j].expenseShareDept.deptId,
                    expenseDeptName: listData[i].expenseDeptList[j].expenseShareDept.deptName,
                    isCGVCDeptData: JSON.parse(JSON.stringify(isCGVCDeptData)),
                    noCGVCDeptData: JSON.parse(JSON.stringify(noCGVCDeptData)),
                    total: 0,
                    editIndex: editIndex
                  })
                  editIndex++
                }
              }
            }
            let isDepthasRowCell = false
            let noDeptHasRowCell = false
            // 往combinData塞数据
            for (let h=0;h<combineData.length;h++){
              for (let l=0;l<combineData[h].isCGVCDeptData.length;l++){
                isDepthasRowCell = false
                for(let o=0;o<listData.length;o++){
                  // 组建列数据
                  if (listData[o].isCGVCDept) { // 创投部
                    for(let p=0;p<listData[o].expenseDeptList.length;p++){
                      if(combineData[h].isCGVCDeptData[l].deptId === listData[o].expenseShareDept.deptId && combineData[h].expenseDeptId === listData[o].expenseDeptList[p].expenseShareDept.deptId) {
                        combineData[h].isCGVCDeptData[l].ratio = listData[o].expenseDeptList[p].ratio
                        combineData[h].isCGVCDeptData[l].editRatio = listData[o].expenseDeptList[p].ratio
                        combineData[h].isCGVCDeptData[l].isSetRatio = listData[o].expenseDeptList[p].isSetRatio
                        combineData[h].total += listData[o].expenseDeptList[p].ratio
                        isDepthasRowCell = true
                        break;
                      }
                    }
                  }
                  if (isDepthasRowCell) {
                    break;
                  }
                }
              }
              for (let m=0;m<combineData[h].noCGVCDeptData.length;m++){
                noDeptHasRowCell = false
                for(let q=0;q<listData.length;q++){
                  // 组建列数据
                  if (!(listData[q].isCGVCDept)) { // 创投部
                    for(let r=0;r<listData[q].expenseDeptList.length;r++){
                      if(combineData[h].noCGVCDeptData[m].deptId === listData[q].expenseShareDept.deptId && combineData[h].expenseDeptId === listData[q].expenseDeptList[r].expenseShareDept.deptId) {
                        combineData[h].noCGVCDeptData[m].ratio = listData[q].expenseDeptList[r].ratio
                        combineData[h].noCGVCDeptData[m].editRatio = listData[q].expenseDeptList[r].ratio
                        combineData[h].noCGVCDeptData[m].isSetRatio = listData[q].expenseDeptList[r].isSetRatio
                        combineData[h].total += listData[q].expenseDeptList[r].ratio
                        noDeptHasRowCell = true
                        break;
                      }
                    }
                  }
                  if (noDeptHasRowCell) {
                    break;
                  }
                }
              }
            }
            this.dataList = combineData;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      edit(data){
        this.editIndex = data.editIndex
      },
      cancelEdit(data) {
        data.noCGVCDeptData.forEach(item => {
          item.editRatio = item.ratio
        })
        data.isCGVCDeptData.forEach(item => {
          item.editRatio = item.ratio
        })
        this.editIndex = ''
      },
      saveEdit(data) {
        console.log(data)
        const isArray = data.isCGVCDeptData.map(item => {
          return {
            expenseShareDeptId: item.deptId,
            ratio: parseFloat(item.editRatio)
          }
        })
        const noArray = data.noCGVCDeptData.map(item => {
          return {
            expenseShareDeptId: item.deptId,
            ratio: parseFloat(item.editRatio)
          }
        })
        const params = {
          ...this.search,
          expenseDeptId: data.expenseDeptId,
          expenseShareDeptList: isArray.concat(noArray)
        }
        api.editShareList(params).then(res => {
          if(res.code === 200) {
            this.$message.success('操作成功');
            this.editIndex = ''
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
.main{
  border-radius: 5px 5px 0 0 ;
}
.lh-28{line-height: 28px;}
.input-txt-right{
  input{text-align: right!important;}
}
</style>
