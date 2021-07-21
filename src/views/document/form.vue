<template>
  <!--首页列表-->
  <el-container>
    <el-header class="header">
      <div class="header-wrap" style="display: flex">
        <div class="title">
          <i class="iconfont icon-biaodanmoban"></i> 模版管理-表单模版
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
        <el-select v-model="search.appCode" placeholder="请选择模块" style="margin-right: 20px">
          <el-option
            v-for="item in enumType.ArchiveApp"
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
        <el-table-column prop="pathName" label="系统路径" width="300"></el-table-column>
        <el-table-column prop="templateDesc" label="场景描述" width="130"></el-table-column>
        <el-table-column prop="lvl2Industry" label="模版名称" width="550">
          <template slot-scope="scope">
            <div @click="setCurrentClick(scope.row)">
              <file-upload :files="scope.row.attachs"  icon="none" :emptyIcon="false" @REMOVE_FILE="setFiles" /><!--:edit="scope.row.canAdmin"-->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="lvl2Industry" label="最近上传时间" width="150">
          <template slot-scope="scope">
            {{scope.row.updateTime | DateTimeEn}}
          </template>
        </el-table-column>
        <el-table-column prop="updateUser.userName" label="上传人" width="120"></el-table-column>
        <el-table-column label="操作" width="150" fixed="right" header-align="center" align="center" >
          <template slot-scope="scope">
            <div  style="display: flex; align-items: center; justify-content: center" @click="setCurrentClick(scope.row)"><!--v-show="scope.row.canAdmin"-->
              <el-upload
                :ref="'upload'+scope.row.templateId"
                :action="BASE_API+'/file'"
                :headers="headers"
                :show-file-list="false"
                :data="{category: 'template'}"
                :on-change="onChangeFile"
              >
                <el-button type="text">上传</el-button>
              </el-upload>
              <span style="padding: 0 10px">|</span>
              <el-button type="text" @click="showRightEditor(scope.row)">授权</el-button>
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
    <!--授权-->
    <el-dialog :visible.sync="right.dialogVisible" width="650px" :append-to-body="true" :show-close="false" top="50px"
               :close-on-click-modal="false" :close-on-press-escape="false">
      <div slot="title" class="header">
        <div class="title">
          <i class="iconfont icon-biaodanmoban"></i> 授权
        </div>
        <div class="options">
          <i class="iconfont icon-guanbi pointer fs-22" @click="right.dialogVisible=false"></i>
        </div>
        <div class="clear"></div>
      </div>
      <el-form ref="right" :model="right" label-width="120px">
        <el-form-item label="可操作人员" prop="lpName">
          <user-select :users="right.grantedUsers" @SET_USERS="right.grantedUsers=$event"/>
        </el-form-item>
        <el-form-item label="">
          <div class="w-100p" style="text-align: left">
            <el-button type="primary" size="mini" @click="saveRight">确认</el-button>
            <el-button type="default" size="mini" @click="right.dialogVisible=false">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>
<script>
  import api from '@/api/document';
  import fileUpload from '@/components/fileUpload';
  import userSelect from '@/components/userSelect';
  import Watermark from '@/utils/watermark';

  export default {
    name: '',
    components: {userSelect,fileUpload},
    props: {},
    data() {
      return {
        enumType: {
        },
        search: {
          filter: '',
          appCode: '',
        },
        list: [],
        pageNum: 1,
        pageSize: 10,
        total: 10,
        right: {
          dialogVisible: false,
          grantedUsers: [],
          templateId:''
        },
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
      this.getEnum('ArchiveApp', true)
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
      // 获取列表
      getList() {
        let params = {
          appCode: this.search.appCode,
          filter: this.search.filter,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        api.getFormTemplateList(params).then(res => {
          if (res.code === 200) {
            res.data.list.map(item=>{
              item.attachs = item.attachs || [];
            })
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
      // 显示授权对话框
      showRightEditor(item) {
        api.getTemplateGrants(item.templateId).then(res => {
          if (res.code === 200) {
            this.right = {
              templateId: item.templateId,
              grantedUsers: res.data.grantedUsers || [],
              dialogVisible: true
            };
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 保存授权
      saveRight() {
        let params = {
          grantedUserIds: (()=>{
            let arr = [];
            this.right.grantedUsers.map(item=>{
              arr.push(item.userId || item.id)
            })
            return arr
          })(),
        };
        api.saveTemplateGrants(params, this.right.templateId).then(res => {
          if (res.code === 200) {
            this.$message.success({message: '授权成功！', duration: 1500});
            this.getList();
            this.right = {
              enterpriseId: '',
              dialogVisible: false,
              canEditUsers: [],
              canViewSourceUsers: [],
              canViewUsers: []
            };
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 显示详情
      showDetail(row, column) {
        if (column.label !== '操作' && column.label !== '模版名称') {
          console.log('SHOW DETAIL');
        }
      },
      onChangeFile(file) {
        console.log(1);
        this.loading = true;
        console.log(2);
        if (file.response && file.response.code === 200 && file.response.data) {
          console.log(3);
          this.$refs['upload' + this.current.templateId].clearFiles();
          console.log(4);
          this.loading = false;
          this.uploadFile(file.response.data)
          console.log(5);
        }
      },
      uploadFile(file){
        console.log(file)
        let params = {
          accessCode:file[0].accessCode,
          fileId:file[0].fileId
        };
        api.uploadTemplateFiles(params, this.current.templateId).then(res => {
          if (res.code === 200) {
            this.$message.success({message: '上传文件成功！', duration: 1500});
            this.getList();
            this.current = {};
          }
        }).catch(err => {
          console.log(err);
        });
      },
      setCurrentClick(item){
        this.current = item
      },
      setFiles(e){
        setTimeout(()=>{
          console.log(this.current)
          console.log(e);
          api.deleteContractFiles(this.current.templateId,e.attachId).then(res => {
            if (res.code === 200) {
              this.$message.success({message: '文档删除成功！', duration: 1500});
              this.getList();
              this.current = {};
            }
          }).catch(err => {
            console.log(err);
          });
        },50)

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
