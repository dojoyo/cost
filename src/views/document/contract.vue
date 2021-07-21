<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-dianziqianyue1"></i> 电子签约
        </div>
        <div style="margin-left: auto">
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <div class="w-100p">
        <el-input
          size="medium"
          style="width: 200px; margin-right: 20px"
          placeholder="请输入合同名称或签署人"
          v-model="search.filter"
        />
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
<!--        <el-button @click="getList()" type="primary" size="small">签署状态同步</el-button>-->
      </div>
      <el-table v-if="list && list.length>0" :data="list" style="width: 100%; margin-top:10px; "
                :header-cell-style="{background:'#fdfdfd'}"
      >
        <el-table-column label="合同名称" width="300"  prop="contractName">
        </el-table-column>
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
                <el-dropdown-item @click.native="cancelSign(scope.row.instanceId)" v-if="scope.row.permission && scope.row.permission.canCancel">取消签署</el-dropdown-item>
                <el-dropdown-item @click.native="showFile(scope.row.instanceId)" v-if="scope.row.permission && scope.row.permission.canViewReport">存证报告</el-dropdown-item>
                <el-dropdown-item @click.native="sendMsg(scope.row.instanceId)" v-if="scope.row.permission && scope.row.permission.canNotify">短信通知</el-dropdown-item>
                <el-dropdown-item @click.native="recoverSign(scope.row.instanceId)" v-if="scope.row.permission && scope.row.permission.canRecover">恢复签署</el-dropdown-item>
                <el-dropdown-item @click.native="resyncSign(scope.row.contractId)" :disabled="!scope.row.contractId">签署状态同步</el-dropdown-item>
                <el-dropdown-item @click.native="retry(scope.row.instanceId)" v-if="!scope.row.contractId">发起重试</el-dropdown-item>
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
  import api from '@/api/document';
  import Watermark from '@/utils/watermark';
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {
        enumType: {
        },
        search: {
         time:[],
          contractType:'',
          signState:'',
          filter:''
        },
        list: [{}],
        pageNum: 1,
        pageSize: 10,
        total: 0
      };
    },
    mounted() {
      Watermark.set();
      this.getEnum('ContractSignState', true)
      this.getEnum('ContractCategory', true)
      this.getList();
    },
    destroyed: function () {
      Watermark.remove();
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
          contractType: this.search.contractType,
          filter: this.search.filter,
          signState: this.search.signState,
          startTime:this.search.time[0],
          endTime:this.search.time[1],
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
      downloadFile(id){
        api.downloadContractSignFile(id).then(res => {
          let headers = res.headers;
          let title = decodeURIComponent(headers['x-file-name']);
          let blob = new Blob([res.data], {
            type: headers['content-type']
          });
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = title;
          link.click();
        }).catch(err => {
          console.log(err);
        });
      },
      showFile(id){
        api.showFile(id).then(res => {
          let headers = res.headers;
          let title = decodeURIComponent(headers['x-file-name']);
          let blob = new Blob([res.data], {
            type: headers['content-type']
          });
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = title;
          link.click();
        }).catch(err => {
          console.log(err);
        });
      },
      cancelSign(id){
        api.cancelSign(id).then(res => {
          if(res && res.code===200){
            this.getList();
            this.$message.success({ message: '取消签署操作成功！', duration: 1500 });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      recoverSign(id){
        api.recoverSign(id).then(res => {
          if(res && res.code===200){
            this.getList();
            this.$message.success({ message: '恢复签署操作成功！', duration: 1500 });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      sendMsg(id){
        api.sendMsg(id).then(res => {
          if(res && res.code===200){
            this.$message.success({ message: '短信发送成功！', duration: 1500 });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      resyncSign(id){
        let params = {
          contractId:id
        }
        api.resyncSign(params).then(res => {
          if(res && res.code===200){
            this.getList();
            this.$message.success({ message: '同步签署操作成功！', duration: 1500 });
          }
        }).catch(err => {
          console.log(err);
        });
      },
      retry(id){
        api.retry(id).then(res => {
          if(res && res.code===200){
            this.$message.success({ message: '发起重试操作成功！', duration: 1500 });
            this.getList();
          }
        }).catch(err => {
          console.log(err);
        });
      }

    }
  };
</script>

<style lang="scss" scoped>
  .tags{
    padding: 5px 10px;
    font-size: 12px;
  }
  .tags.blue{
    background: #f0faff;
    color: #1ea0de;
  }
  .tags.orange{
    background: #fff6e4;
    color: #fa7631;
  }
</style>
