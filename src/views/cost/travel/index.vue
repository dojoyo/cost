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
        <el-button type="text" icon="iconfont icon-xinzeng fs-12" class="blue" @click="goAddAndEdit"> 新增</el-button>
        <el-button type="text" icon="iconfont icon-xiazai3 fs-12" class="blue" @click="openImportDialog"> 导入</el-button>
        <el-button type="text" icon="iconfont icon-shangchuan2 fs-12" class="blue" @click="openExportDialog"> 导出</el-button>
        <el-button type="text" icon="iconfont icon-xiazai1 fs-12" class="blue" @click="getTemp"> 下载模板</el-button>
      </div>
    </div>
    <el-main class="main travel-main">
      <el-table v-show="list && list.length>0 && activeIndex === '1'" :data="list" style="width: 100%; margin-top:10px;" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="部门" prop="deptName" width="120"></el-table-column>
        <el-table-column prop="userName" label="乘机人" width="80"></el-table-column>
        <el-table-column prop="bookingTime" label="订票时间" width="100">
          <template slot-scope="scope">
            {{scope.row.bookingTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="departureTime" label="起飞时间" width="100">
          <template slot-scope="scope">
            {{scope.row.departureTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="flightType.name" label="国际/国内" width="80"></el-table-column>
        <el-table-column prop="voyage" label="航程" width="120"></el-table-column>
        <el-table-column prop="flight" label="航班" width="80"></el-table-column>
        <el-table-column prop="cabin" label="航等" width="80"></el-table-column>
        <el-table-column prop="discount" label="折扣" width="80"></el-table-column>
        <el-table-column prop="netPrice" label="成交净价" width="80"></el-table-column>
        <el-table-column prop="civilAviationFund" label="民航基金" width="80"></el-table-column>
        <el-table-column prop="insurance" label="保险费" width="80"></el-table-column>
        <el-table-column prop="changeFee" label="改签费" width="80"></el-table-column>
        <el-table-column prop="deliveryServiceFee" label="配送服务费" width="120"></el-table-column>
        <el-table-column prop="servicePackageAmount" label="服务包金额" width="120"></el-table-column>
        <el-table-column prop="receivedOrPaid" label="实收/实付" width="80"></el-table-column>
        <el-table-column prop="belongMonth" label="入账月份" width="80"></el-table-column>
        <el-table-column prop="coupon" label="优惠券" width="80"></el-table-column>
        <el-table-column prop="remarks" label="备注" width="120"></el-table-column>
        <el-table-column label="操作" width="145" fixed="right" align="left" >
          <template slot-scope="scope">
            <el-button type="text" @click="goAddAndEdit(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="goDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="list && list.length>0 && activeIndex === '2'" :data="list" style="width: 100%; margin-top:10px;" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="部门" prop="deptName" width="120"></el-table-column>
        <el-table-column prop="userName" label="入住人" width="80"></el-table-column>
        <el-table-column prop="bookingTime" label="订票日期" width="100">
          <template slot-scope="scope">
            {{scope.row.bookingTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="checkInDate" label="入住日期" width="100">
          <template slot-scope="scope">
            {{scope.row.checkInDate | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="checkOutDate" label="离店日期" width="100">
          <template slot-scope="scope">
            {{scope.row.checkOutDate | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="hotelCity" label="酒店城市" width="120"></el-table-column>
        <el-table-column prop="hotelName" label="酒店名称" width="120"></el-table-column>
        <el-table-column prop="roomType" label="房型" width="120"></el-table-column>
        <el-table-column prop="numberOfRoom" label="房间数" width="80"></el-table-column>
        <el-table-column prop="starLevel" label="星级" width="80"></el-table-column>
        <el-table-column prop="stayDays" label="间夜" width="80"></el-table-column>
        <el-table-column prop="unitPrice" label="单价" width="80"></el-table-column>
        <el-table-column prop="amount" label="金额" width="80"></el-table-column>
        <el-table-column prop="belongMonth" label="入账月份" width="80"></el-table-column>
        <el-table-column prop="remarks" label="备注" width="120"></el-table-column>
        <el-table-column label="操作" width="145" fixed="right" align="left" >
          <template slot-scope="scope">
            <el-button type="text" @click="goAddAndEdit(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="goDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="list && list.length>0 && activeIndex === '3'" :data="list" style="width: 100%; margin-top:10px;" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="部门" prop="deptName" width="120"></el-table-column>
        <el-table-column prop="userName" label="出行人" width="80"></el-table-column>
        <el-table-column prop="bookingTime" label="订票日期" width="100">
          <template slot-scope="scope">
            {{scope.row.bookingTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="departureDate" label="发车日期" width="100">
          <template slot-scope="scope">
            {{scope.row.departureDate | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="departureTime" label="发车时间" width="80">
          <template slot-scope="scope">
            {{scope.row.departureTime | HourMinSecond}}
          </template>
        </el-table-column>
        <el-table-column prop="arrivalTime" label="到达时间" width="80">
          <template slot-scope="scope">
            {{scope.row.arrivalTime | HourMinSecond}}
          </template>
        </el-table-column>
        <el-table-column prop="departureStation" label="发车站" width="80"></el-table-column>
        <el-table-column prop="arrivalStation" label="到达站" width="80"></el-table-column>
        <el-table-column prop="trainNumber" label="车次" width="80"></el-table-column>
        <el-table-column prop="seat" label="坐等" width="80"></el-table-column>
        <el-table-column prop="feeType" label="费用类型" width="80"></el-table-column>
        <el-table-column prop="fundingDirection.name" label="资金方向" width="80"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="80"></el-table-column>
        <el-table-column prop="fareOrSpread" label="票价/价差" width="80"></el-table-column>
        <el-table-column prop="changeFee" label="改签费" width="80"></el-table-column>
        <el-table-column prop="refundFee" label="退票费" width="80"></el-table-column>
        <el-table-column prop="settlementAmount" label="结算金额" width="80"></el-table-column>
        <el-table-column prop="serviceCharge" label="服务费" width="80"></el-table-column>
        <el-table-column prop="total" label="合计" width="80"></el-table-column>
        <el-table-column prop="belongMonth" label="入账月份" width="80"></el-table-column>
        <el-table-column label="操作" width="145" fixed="right" align="left" >
          <template slot-scope="scope">
            <el-button type="text" @click="goAddAndEdit(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="goDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="list && list.length>0 && activeIndex === '4'" :data="list" style="width: 100%; margin-top:10px;" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <!-- <el-table-column prop="account" label="账号" width="80"></el-table-column> -->
        <el-table-column label="部门" prop="deptName" width="120"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="80"></el-table-column>
        <el-table-column prop="startBillingTime" label="开始计费时间" width="180">
          <template slot-scope="scope">
            {{scope.row.startBillingTime | DateTimeSecondEn}}
          </template>
        </el-table-column>
        <el-table-column prop="city" label="用车城市" width="80"></el-table-column>
        <el-table-column prop="startPoint" label="实际出发地" width="150"></el-table-column>
        <el-table-column prop="destination" label="实际目的地" width="150"></el-table-column>
        <el-table-column prop="distance" label="距离" width="80"></el-table-column>
        <el-table-column prop="paid" label="实付金额" width="80"></el-table-column>
        <el-table-column prop="belongMonth" label="入账月份" width="80"></el-table-column>
        <el-table-column prop="remarks" label="用车备注" width="120"></el-table-column>
        <el-table-column prop="supplement" label="补充说明" width="120"></el-table-column>
        <el-table-column label="操作" width="145" fixed="right" align="left" >
          <template slot-scope="scope">
            <el-button type="text" @click="goAddAndEdit(scope.row)">编辑</el-button>
            <span style="padding: 0 10px">|</span>
            <el-button type="text" @click="goDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-show="list && list.length>0 && activeIndex === '5'" :data="list" style="width: 100%; margin-top:10px;" :header-cell-style="{background:'#f5f9ff'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="面单号" prop="number" width="120"></el-table-column>
        <el-table-column prop="deptName" label="费用归属部门" width="120"></el-table-column>
        <el-table-column prop="userName" label="填报人" width="80"></el-table-column>
        <el-table-column prop="amount" label="金额" width="80"></el-table-column>
        <el-table-column prop="accountCode" label="会计编码" width="80"></el-table-column>
        <el-table-column prop="budgetCode" label="预算编码" width="80"></el-table-column>
        <el-table-column prop="budgetAccount.name" label="预算科目" width="80"></el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="80"></el-table-column>
        <el-table-column prop="belongMonth" label="入账月份" width="80"></el-table-column>
        <el-table-column prop="summary" label="摘要" width="150"></el-table-column>
        <el-table-column prop="mainBody" label="主体" width="150"></el-table-column>
        <el-table-column label="操作" width="145" fixed="right" align="left" >
          <template slot-scope="scope">
            <el-button type="text" @click="goAddAndEdit(scope.row)">编辑</el-button>
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
    <AddAndEditDialogAir ref="addAndEditAir" :deptTree="deptTree" :flightType="enumType.FeeFlightType" />
    <AddAndEditDialogTrain ref="addAndEditTrain" :deptTree="deptTree" :feeFundingDirection="enumType.FeeFundingDirection" />
    <AddAndEditDialogHotel ref="addAndEditHotel" :deptTree="deptTree" />
    <AddAndEditDialogDidi ref="addAndEditDidi" :deptTree="deptTree" />
    <AddAndEditDialogOther ref="addAndEditOther" :deptTree="deptTree" :feeBudgetAccount="enumType.FeeBudgetAccount" />
    <ImportDialog ref="importDialog" :method="`travel${importExportMethod[parseInt(activeIndex)-1]}Import`" />
    <ExportDialog ref="exportDialog" :method="`travel${importExportMethod[parseInt(activeIndex)-1]}Export`" />
  </el-container>
</template>
<script>
  import api from '@/api/cost';
  import mixin from '../mixins';
  import CommonSearch from '../components/commonSearch.vue';
  import AddAndEditDialogAir from './addAndEditAir';
  import AddAndEditDialogTrain from './addAndEditTrain';
  import AddAndEditDialogHotel from './addAndEditHotel';
  import AddAndEditDialogDidi from './addAndEditDidi';
  import AddAndEditDialogOther from './addAndEditOther';
  import ImportDialog from '../components/importDialog';
  import ExportDialog from '../components/exportDialog';
  export default {
    name: '',
    components: {
      ImportDialog,
      ExportDialog,
      CommonSearch,
      AddAndEditDialogAir,
      AddAndEditDialogTrain,
      AddAndEditDialogHotel,
      AddAndEditDialogDidi,
      AddAndEditDialogOther
    },
    props: {},
    data() {
      return {
        enumType: {
          FeeMonth: [],
          FeeFlightType: []
        },
        filter: {},
        list: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        activeIndex: '1', // 默认机票tag
        importExportMethod: ['Air','Hotel','Train','Didi','Other'],
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
        this.getEnum('FeeFlightType')
        this.getEnum('FeeFundingDirection')
        this.getEnum('FeeBudgetAccount')
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
            method = 'getTravelAirList';
            break
          case '2':
            method = 'getTravelHotelList';
            break
          case '3':
            method = 'getTravelTrainList';
            break
          case '4':
            method = 'getTravelDidiList';
            break
          case '5':
            method = 'getTravelOtherList';
            break
          default:
            method = 'getTravelAirList';
            break
        }
        api[method](params).then(res => {
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
      // tag切换
      handleSelectTag(key, keyPath) {
        console.log(key);
        console.log(keyPath);
        this.activeIndex = keyPath[0]
        this.$refs.commonSearch.doSearch();
      },
      // 编辑
      goAddAndEdit(data) {
        let refs = ''
        switch (this.activeIndex) {
          case '1':
            refs = 'Air';
            break
          case '2':
            refs = 'Hotel';
            break
          case '3':
            refs = 'Train';
            break
          case '4':
            refs = 'Didi';
            break
          case '5':
            refs = 'Other';
            break
          default:
            refs = 'Air';
            break
        }
        this.$refs['addAndEdit'+refs].open(data);
      },
      openImportDialog() {
        this.$refs.importDialog.open();
      },
      openExportDialog() {
        this.$refs.exportDialog.open();
      },
      getTemp() {
        let method = ''
        switch (this.activeIndex) {
          case '1':
            method = 'getTravelAirTemp';
            break
          case '2':
            method = 'getTravelHotelTemp';
            break
          case '3':
            method = 'getTravelTrainTemp';
            break
          case '4':
            method = 'getTravelDidiTemp';
            break
          case '5':
            method = 'getTravelOtherTemp';
            break
          default:
            method = 'getTravelAirTemp';
            break
        }
        this.downLoadTempFile(method);
      },
      goDelete(data) {
        this.$confirm('即将删除数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let method = ''
          switch (this.activeIndex) {
            case '1':
              method = 'travelAirDelete';
              break
            case '2':
              method = 'travelHotelDelete';
              break
            case '3':
              method = 'travelTrainDelete';
              break
            case '4':
              method = 'travelDidiDelete';
              break
            case '5':
              method = 'travelOtherDelete';
              break
            default:
              method = 'travelAirDelete';
              break
          }
          api[method](data.id).then(res => {
            if (res.code === 200) {
              this.getList();
              this.$message.success({message: '删除成功!', duration: 1500})
            }
          }).catch(err => {
            console.log(err);
          })

        }).catch(err => {});
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
