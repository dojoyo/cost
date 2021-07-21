<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-shujukufei"></i> 数据库录账号分配
        </div>
        <div style="margin-left: auto">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="showAddAndEditDialog()">新增</el-button>
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <div class="w-100p">
        <el-input size="medium" style="width: 200px; margin-right: 20px" placeholder="请输入合同名称或签署人" v-model="search.filter"/>
        <el-date-picker
          style="margin-right: 20px"
          v-model="search.time"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-select v-model="search.contractType" placeholder="请选择分类" style="margin-right: 20px">
          <el-option
            v-for="item in enumType.ContractCategory"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="search.signState" placeholder="请选择合同状态" style="margin-right: 20px">
          <el-option
            v-for="item in enumType.ContractSignState"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="getList()" type="primary" size="small">查询</el-button>
      </div>
      <div class="operate-buttons">
          <el-button type="text" icon="iconfont icon-shangchuan2" class="blue" @click="openExportDialog"> 导出</el-button>
      </div>
      <el-table  :data="list" style="width: 100%; margin-top:10px; " border :fit="true" :span-method="objectSpanMethod"
        :header-cell-style="{background:'#fdfdfd'}">
        <el-table-column label="数据库" prop="id" align="center"></el-table-column>
        <el-table-column prop="name" label="部门"  align="center"></el-table-column>
        <el-table-column prop="amount1" label="用户名"  align="center"></el-table-column>
        <el-table-column prop="amount2" label="账号"  align="center"></el-table-column>
        <el-table-column prop="amount3" label="使用频率"  align="center"></el-table-column>
        <el-table-column label="操作" align="center" >
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
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
        search: {},
        // list: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        list: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }]
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
              res.data.unshift({name: '全部', value: ''});
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
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
.operate-buttons{
  text-align:right;
  border-bottom: 1px solid #fdfdfd;
  padding-bottom: 10px;
}
</style>
