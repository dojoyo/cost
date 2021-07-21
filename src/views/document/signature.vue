<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-dianziqianzhangmoban"></i> 模版管理-电子签章模版
        </div>
        <div style="margin-left: auto">
        </div>
      </div>
    </el-header>
    <el-main class="main">
      <div class="w-100p">
        <el-input
          size="medium"
          style="width: 250px; margin-right: 20px"
          placeholder="请输入模版名称"
          v-model="search.filter"
          @input="getList"
        />
        <el-select v-model="search.templateCategory" placeholder="请选择模块" style="margin-right: 20px">
          <el-option
            v-for="item in enumType.ContractCategory"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button @click="getList()" type="primary" size="small">查询</el-button>
      </div>
      <el-table v-if="list && list.length>0" :data="list" style="width: 100%; margin-top:10px; "
                :header-cell-style="{background:'#fdfdfd'}"
                :row-style="{cursor:'pointer'}"
                @cell-click="showDetail"
      >
        <el-table-column prop="templateApp.name" label="模块" width="80"></el-table-column>
        <el-table-column prop="pathName" label="系统路径" ></el-table-column>
        <el-table-column prop="templateCategory.name" label="分类" width="200"></el-table-column>
        <el-table-column prop="templateName" label="模版名称" width="300"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="120" header-align="center" align="center">
          <template slot-scope="scope">
            {{scope.row.updateTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right" header-align="center" align="center" >
          <template slot-scope="scope">
            <div style="display: flex; align-items: center; justify-content: center" @click="setCurrentClick(scope.row)">
              <el-upload
                :ref="'upload'+scope.row.templateId"
                :action="BASE_API+'/file'"
                :headers="headers"
                :limit="1"
                :show-file-list="false"
                :data="{category: 'template'}"
                :on-change="onChangeFile"
              >
                <el-button type="text">上传</el-button>
              </el-upload>
              <span style="padding: 0 10px">|</span>
              <el-button type="text" @click="download(scope.row)">下载</el-button>
            </div>
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
  import userSelect from '@/components/userSelect';
  import Watermark from '@/utils/watermark';

  export default {
    name: '',
    components: {userSelect},
    props: {},
    data() {
      return {
        enumType: {
        },
        search: {
          entName: '',
          principalUserName: '',
          investType: '',
          lvl2Industry:''
        },
        list: [],
        pageNum: 1,
        pageSize: 10,
        total: 10,
        BASE_API: process.env.BASE_API,
        headers: {
          Authorization: 'Bearer ' + this.$store.state.user.user.token
        },
        loading: false,
        current:{}
      };
    },
    mounted() {
      Watermark.set();
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
          templateCategory: this.search.templateCategory,
          filter: this.search.filter,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        api.getSignatureTemplateList(params).then(res => {
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
      // 显示详情
      showDetail(row, column) {
        if (column.label !== '操作') {
          console.log('SHOW DETAIL');
        }
      },
      onChangeFile(file) {
        this.loading = true;
        if (file.response && file.response.code === 200 && file.response.data) {
          this.$refs['upload'+this.current.templateId].clearFiles();
          this.loading = false;
          this.uploadFile(file.response.data)
        }
      },
      uploadFile(file){
        console.log(file)
        let params = {
          accessCode:file[0].accessCode,
          fileId:file[0].fileId
        };
        api.uploadContractFiles(params, this.current.templateId).then(res => {
          if (res.code === 200) {
            this.$message.success({message: '上传文件成功！', duration: 1500});
            this.getList();
            this.current = {};
          }
        }).catch(err => {
          console.log(err);
        });
      },
      download(item) {

        this.loading = true;
        api.downloadContractFiles(item.templateId,item.attachId).then(res => {
          console.log(res)
          this.loading = false;
          let headers = res.headers;
          let title = headers['x-file-name'];
          let blob = new Blob([res.data], {
            type: headers['content-type']
          });
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = decodeURIComponent(title);
          link.click();
        }).catch(err => {
          console.log(err);
        });
      },
      setCurrentClick(item){
        console.log(this.current)
        this.current = item
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
