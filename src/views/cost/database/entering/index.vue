<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-shujukufei"></i> 数据库录入费
        </div>
        <div style="margin-left: auto">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="showAddAndEditDialog()"
            >新增</el-button
          >
        </div>
      </div>
    </el-header>
    <div class="search-area">
      <el-input
        size="medium"
        placeholder="请输入人员姓名"
        v-model="search.userName"
        class="mr-10 mb-10"
      />
      <el-date-picker
        v-model="search.year"
        class="mr-10 mb-10"
        type="year"
        format="yyyy"
        value-format="yyyy"
        placeholder="请选择年份"
      >
      </el-date-picker>
      <el-select v-model="search.month" class="mr-10 mb-10">
          <el-option
              v-for="item in enumType.FeeMonthAll"
              :key="item.value"
              :label="item.name"
              :value="item.value">
          </el-option>
      </el-select>
      <el-select
        v-model="search.databaseType"
        class="mr-10 mb-10"
        placeholder="请选择数据库类型"
      >
        <el-option
          v-for="item in enumType.FeeDatabaseType"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button @click="getList" type="primary" size="small">查询</el-button>
    </div>
    <el-main class="main">
      <el-table
        v-if="list && list.length > 0"
        :data="list"
        style="width: 100%; margin-top:10px; "
      >
        <el-table-column
          prop="databaseType.name"
          label="数据库"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column label="购买信息" align="center">
          <el-table-column
            prop="buyNumber"
            label="购买账号量(个/h)"
            align="center"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="amount"
            label="总费用"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="price"
            label="单价"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column prop="startUseDate" label="开始使用日期" align="center" min-width="150" >
              <template slot-scope="scope">
                {{scope.row.startUseDate | DateTimeEn}}
              </template>
          </el-table-column>
          <el-table-column prop="expirationDate" label="账号到期日期" align="center" width="150">
            <template slot-scope="scope">
              {{scope.row.expirationDate | DateTimeEn}}
            </template>
          </el-table-column>
          <el-table-column prop="paymentDate"  label="付款日期" align="center" min-width="150" >
            <template slot-scope="scope">
              {{scope.row.paymentDate | DateTimeEn}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="对接人信息" align="center">
          <el-table-column
            prop="dockingName"
            label="姓名"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="dockingPhone"
            label="电话"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="contractLink"
            label="合同链接"
            align="center"
            width="200"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作"
          align="center"
          fixed="right"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click.native="showAddAndEditDialog(scope.row)"
              >编辑</el-button
            >
            <el-dropdown trigger="click">
              <span class="el-dropdown-link" style="cursor: pointer">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="setCostShare(scope.row.id)"
                  >费用分摊设置</el-dropdown-item
                >
                <el-dropdown-item @click.native="delte(scope.row.id)"
                  >删除</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="txt-right">
        <el-pagination
          v-if="list && list.length > 0"
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
      <div
        v-show="list && list.length === 0"
        class="w-100p gray"
        style="text-align: center;"
      >
        <img src="@/assets/no-list.png" />
        <br /><span style="font-size: 14px">暂无数据</span><br /><br />
      </div>
    </el-main>
    <AddAndEditDialog ref="addAndEdit" :enumType="enumType"/>
    <SetCostShareDialog ref="setCostShare" />
  </el-container>
</template>
<script>
import api from "@/api/cost";
import AddAndEditDialog from "./addAndEdit";
import SetCostShareDialog from "./setCostShare";
import mixin from "../../mixins";
export default {
  name: "",
  components: { AddAndEditDialog, SetCostShareDialog },
  props: {},
  data() {
    return {
      enumType: {},
      search: {
        month:'',
        databaseType:'',
        year: new Date().getFullYear() + '',
        userName:''
      },
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      filter:{}
    };
  },
  mounted() {
    this.init();
  },
  mixins: [mixin],
  methods: {
    async init() {
        await this.getEnum('FeeMonth');
        await this.getEnum('FeeDatabaseType');
        this.enumType.FeeMonthAll = [{ name: "全部月份", value: "" }].concat(
          this.enumType.FeeMonth
        );
        this.enumType.FeeDatabaseType = [{name: '全部数据库类型', value: ''}].concat(this.enumType.FeeDatabaseType)
        this.getList()
    },
    getList() {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...this.search
      };
      api.reocrdDatabaseList(params).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.list = res.data.list;
            this.total = res.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 编辑新增编辑弹窗打开
    showAddAndEditDialog(data) {
      this.$refs.addAndEdit.open(data);
    },
    //费用分摊设置
    setCostShare(id) {
      console.log(id)
      this.$refs.setCostShare.open(id);
    },
    delte(id){
      this.$confirm("即将删除数据，是否继续？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              api.delReocrdData(id).then(res => {
                  if (res.code === 200) {
                    this.getList();
                    this.$message.success({ message: "删除成功!", duration: 1500 });
                  }
                })
              .catch(err => {
                  console.log(err);
              });
          }).catch(err => {});
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
</style>
