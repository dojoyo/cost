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
        <el-select v-model="search.month" class="mr-10" placeholder="全部月份">
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
      <el-table  :data="list">
        <el-table-column label="费用部门" prop="expenseDeptList">
          <template slot-scope="scope">
            {{scope.row.expenseShareDept.deptPathName}}
          </template>
        </el-table-column>
        <el-table-column label="创投费用" prop="expenseShareDept"></el-table-column>
        <el-table-column label="非创投费用" prop="expenseShareDept"></el-table-column>
        <el-table-column label="合计" prop="expenseShareDept"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
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
  </el-container>
</template>
<script>
  import api from '@/api/cost';
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        enumType: {},
        search: {
          year: new Date().getFullYear() + '',
          month:''
        },
        list: [],
      };
    },
    mounted() {
      // this.getEnum('ContractSignState', true)
      this.getList();
    },
    methods: {
      // 获取企业列表
      getList() {
        api.shareList(this.search).then(res => {
          if (res.code === 200) {
            this.list = res.data;
          }
          console.log(this.list)
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
      setLabel(h, { column, $index }){
        let obj = renderHeaderList.find(item => item.key == column.property);
	      return [
	        h("p", {}, ['嘻嘻哈哈']),
	        h("p", { style: "font-size:10px" }, [`danwei`])
	      ];
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
