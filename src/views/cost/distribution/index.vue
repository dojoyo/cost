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
    <div class="tag-operate-tool">
      <span>最近发布时间：2021-07-12 10:00:00</span>
       <el-button type="text" icon="iconfont icon-shujufabu fs-12" class="blue" @click="publishRelease">发布数据</el-button>
    </div>
    <el-main class="main">
      <el-table v-if="list && list.length>0" :data="list" style="width: 100%;" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="合同名称" width="300"  prop="contractName"></el-table-column>
        <el-table-column prop="contractType.name" label="分类" width="120"></el-table-column>
        <el-table-column prop="approvalTitle" label="审批流程" width="400"></el-table-column>
        <el-table-column prop="signTime" label="创建时间" width="150">
          <template slot-scope="scope">
            {{scope.row.createTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="signTime" label="签订时间" width="150">
          <template slot-scope="scope">
            {{scope.row.signTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="signState.name" label="状态" width="80"></el-table-column>
        <el-table-column prop="promoter.userName" label="发起人" width="120"></el-table-column>
        <el-table-column prop="signer" label="签署方" width="120"></el-table-column>

        <el-table-column label="操作" width="145" fixed="right" header-align="center" align="center" >
          <template slot-scope="scope">
            <el-button type="text" :disabled="scope.row.permission && scope.row.signState && (!scope.row.permission.canDownload || scope.row.signState.value!=='COMPLETE')" @click="downloadFile(scope.row.instanceId)">下载</el-button>
            <span style="padding: 0 10px">|</span>
            <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="cursor: pointer">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="cancelSign(scope.row.instanceId)">取消签署</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
          year: new Date().getFullYear() + '',
          feeType:'OF'
        },
        list: [],
        total: 0,
        releaseTime:''
      };
    },
    mixins:[mixin],
    mounted() {
      this.getEnum('FeeMonth', true)
      this.getList();
      this.releaseTime =  "2021-07-12 10:00:00",
      this.list = [
        {
          "deptCostVos": [
            {
              "feeType": "LC-人工费用",
              "historyAmount": 2000,
              "isSame": true,
              "realtimeAmount": 2000
            }
          ],
          "deptName": "股权投资一部"
        }
      ]
    },
    methods: {
      // 获取企业列表
      getList() {
        api.releaseList(this.search).then(res => {
          if (res.code === 200) {
            this.list = res.data.list;
            this.total = res.data.total;
          } else {
            this.list = []
          }
        }).catch(err => {
          this.list = []
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
</style>
