<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-chalvfei"></i> 差旅费
        </div>
        <div style="margin-left: auto">
        </div>
      </div>
    </el-header>
    <CommonSearch ref="commonSearch" @doSearch="doSearch" :feeMonth="enumType.FeeMonth" :deptTree="deptTree" />
    <div class="flex space-between tag-operate-tool">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelectTag">
        <el-menu-item index="1">机票</el-menu-item>
        <el-menu-item index="2">酒店</el-menu-item>
        <el-menu-item index="3">火车票</el-menu-item>
        <el-menu-item index="4">滴滴</el-menu-item>
        <el-menu-item index="5">其他</el-menu-item>
      </el-menu>
      <div class="operate-buttons">
        <el-button type="text" icon="iconfont icon-xinzeng fs-12" class="blue" @click="goAdd"> 新增</el-button>
        <el-button type="text" icon="iconfont icon-xiazai3 fs-12" class="blue" @click="openImportDialog"> 导入</el-button>
        <el-button type="text" icon="iconfont icon-shangchuan2 fs-12" class="blue" @click="openExportDialog"> 导出</el-button>
        <el-button type="text" icon="iconfont icon-xiazai1 fs-12" class="blue"> 下载模板</el-button>
      </div>
    </div>
    <el-main class="main travel-main">
      <el-table v-show="list && list.length>0 && activeIndex === '1'" :data="list" style="width: 100%; margin-top:10px;" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="部门" prop="contractName"></el-table-column>
        <el-table-column prop="contractType.name" label="乘机人" width="120"></el-table-column>

        <el-table-column prop="signTime" label="订票时间" width="100">
          <template slot-scope="scope">
            {{scope.row.createTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="signTime" label="起飞时间" width="100">
          <template slot-scope="scope">
            {{scope.row.signTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="approvalTitle" label="国际/国内" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="航程" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="航班" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="航等" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="折扣" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="成交净价" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="民航基金" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="保险费" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="改签费" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="配送服务费" width="120"></el-table-column>
        <el-table-column prop="signState.name" label="服务包金额" width="120"></el-table-column>
        <el-table-column prop="signState.name" label="实收/实付" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="入账月份" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="优惠券" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="备注" width="80"></el-table-column>
        <el-table-column label="操作" width="145" fixed="right" align="left" >
          <template slot-scope="scope">
            <el-button type="text" @click="goEdit(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="goDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="list && list.length>0 && activeIndex === '2'" :data="list" style="width: 100%; margin-top:10px;" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="部门" prop="contractName"></el-table-column>
        <el-table-column prop="contractType.name" label="入住人" width="120"></el-table-column>
        <el-table-column prop="signTime" label="订票日期" width="100">
          <template slot-scope="scope">
            {{scope.row.createTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="signTime" label="入住日期" width="100">
          <template slot-scope="scope">
            {{scope.row.signTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="signTime" label="离店日期" width="100">
          <template slot-scope="scope">
            {{scope.row.signTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="approvalTitle" label="酒店城市" width="120"></el-table-column>
        <el-table-column prop="signState.name" label="酒店名称" width="120"></el-table-column>
        <el-table-column prop="signState.name" label="房型" width="120"></el-table-column>
        <el-table-column prop="signState.name" label="房间数" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="星级" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="间夜" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="单价" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="金额" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="入账月份" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="备注" width="80"></el-table-column>
        <el-table-column label="操作" width="145" fixed="right" align="left" >
          <template slot-scope="scope">
            <el-button type="text" @click="goEdit(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="goDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="list && list.length>0 && activeIndex === '3'" :data="list" style="width: 100%; margin-top:10px;" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="部门" prop="contractName"></el-table-column>
        <el-table-column prop="contractType.name" label="出行人" width="120"></el-table-column>
        <el-table-column prop="signTime" label="订票日期" width="100">
          <template slot-scope="scope">
            {{scope.row.createTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="signTime" label="发车日期" width="100">
          <template slot-scope="scope">
            {{scope.row.signTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="signState.name" label="发车时间" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="到达时间" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="发车站" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="到达站" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="车次" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="坐等" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="费用类型" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="资金方向" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="订单金额" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="票价/价差" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="改签费" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="退票费" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="结算金额" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="服务费" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="合计" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="入账月份" width="80"></el-table-column>
        <el-table-column label="操作" width="145" fixed="right" align="left" >
          <template slot-scope="scope">
            <el-button type="text" @click="goEdit(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="goDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="list && list.length>0 && activeIndex === '4'" :data="list" style="width: 100%; margin-top:10px;" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="signState.name" label="账号" width="80"></el-table-column>
        <el-table-column label="部门" prop="contractName"></el-table-column>
        <el-table-column prop="contractType.name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="signTime" label="开始计费时间" width="200">
          <template slot-scope="scope">
            {{scope.row.createTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="signState.name" label="用车城市" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="实际出发地" width="150"></el-table-column>
        <el-table-column prop="signState.name" label="实际目的地" width="150"></el-table-column>
        <el-table-column prop="signState.name" label="距离" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="实付金额" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="入账月份" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="用车备注" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="补充说明" width="80"></el-table-column>
        <el-table-column label="操作" width="145" fixed="right" align="left" >
          <template slot-scope="scope">
            <el-button type="text" @click="goEdit(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="goDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="list && list.length>0 && activeIndex === '5'" :data="list" style="width: 100%; margin-top:10px;" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="面单号" prop="contractName"></el-table-column>
        <el-table-column prop="contractType.name" label="费用归属部门" width="120"></el-table-column>
        <el-table-column prop="signState.name" label="填报人" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="金额" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="会计编码" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="预算编码" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="预算科目" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="项目名称" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="入账月份" width="80"></el-table-column>
        <el-table-column prop="signState.name" label="摘要" width="150"></el-table-column>
        <el-table-column prop="signState.name" label="主体" width="150"></el-table-column>
        <el-table-column label="操作" width="145" fixed="right" align="left" >
          <template slot-scope="scope">
            <el-button type="text" @click="goEdit(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="goDelete(scope.row)">删除</el-button>
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
    <AddAndEditDialog ref="addAndEdit" />
    <ImportDialog ref="importDialog"/>
    <ExportDialog ref="exportDialog"/>
  </el-container>
</template>
<script>
  import api from '@/api/cost';
  import mixin from '../mixins';
  import CommonSearch from '../components/commonSearch.vue';
  import AddAndEditDialog from './addAndEdit';
  import ImportDialog from '../components/importDialog';
  import ExportDialog from '../components/exportDialog';
  export default {
    name: '',
    components: { AddAndEditDialog, ImportDialog, ExportDialog, CommonSearch },
    props: {},
    data() {
      return {
        enumType: {},
        filter: {},
        list: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        activeIndex: '1' // 默认机票tag
      };
    },
    mixins: [mixin],
    mounted() {
      this.init();
    },
    methods: {
      async init() {
        await this.getEnum('FeeMonth');
        await this.getDeptTree();
        this.$refs.commonSearch.doSearch();
      },
      doSearch(data) {
        this.pageNum = 1;
        this.filter = { ...data };
        this.getList();
      },
      // 获取企业列表
      getList() {
        let params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          ...this.filter
        };
        let method = ''
        switch (this.activeIndex) {
          case '1':
            method = 'getSignList';
          case '2':
            method = '123';
          case '3':
            method = '132';
          case '4':
            method = '123';
          case '5':
            method = '123';
          default:
            method = 'getSignList';
        }
        api[method](params).then(res => {
          if (res.code === 200) {
            this.list = res.data.list;
            this.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // tag切换
      handleSelectTag(key, keyPath) {
        console.log(key);
        console.log(keyPath);
        this.activeIndex = keyPath[0]
        this.$refs.commonSearch.doSearch();
      },
      // 编辑
      goEdit(data) {
        this.$refs.addAndEdit.open(data);
      },
      // 新增
      goAdd() {
        this.$refs.addAndEdit.open();
      },
      openImportDialog() {
        this.$refs.importDialog.open();
      },
      openExportDialog() {
        this.$refs.exportDialog.open();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .tag-operate-tool{
    margin: 15px 15px 0;
    padding: 0 15px;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    .el-menu{
      border-bottom: 0;
      .el-menu-item{
        height: 40px;
        padding: 0;
        margin: 0 20px;
        line-height: 40px;
      }
      .is-active{
        color: #007bff;
        background: #fff!important;
        border-color: #007bff;
      }
    }
  }
  .space-between{
    justify-content: space-between;
  }
  .travel-main{margin-top: 0!important;padding-top: 10px;}
</style>
