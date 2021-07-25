<template>
  <el-dialog
    :visible.sync="visible"
    width="800px"
    :show-close="false"
    :close-on-click-modal="false"
    custom-class="overage-dialog"
  >
    <div slot="title" class="header">
      <div class="title"> {{ title }} </div>
      <div class="options">
        <i class="iconfont icon-guanbi pointer fs-22" @click="visible = false"></i>
      </div>
      <div class="clear"></div>
    </div>
    <el-form :model="form"  :rules="rules" ref="form" label-width="90px">
          <el-form-item label="人员" required prop="userId">
             <el-select
                v-model="form.userId"
                ref="userSelect"
                filterable
                remote
                reserve-keyword
                placeholder="请输入人员名称"
                :remote-method="remoteMethod"
                :loading="loading">
                  <el-option
                  v-for="item in userOptions"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                  </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="提醒内容" required prop="reminder">
              <el-input type="textarea" v-model="form.reminder"></el-input>
           </el-form-item>

    </el-form>
     <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="visible = false">取 消</el-button>
     </div>
  </el-dialog>
</template>
<script>
import api from "@/api/cost";
import filters from '@/utils/filters'
export default {
  props:{
     enumType:Object,
     deptTree:Array
  },
  data() {
    return {
      visible: false,
      title:'',
      userOptions:[],
      loading:false,
      form:{
        userId:'',
        id:'',
        reminder:'',
      },
      rules:{
        reminder:[
           { required: true, message: '请输入提醒内容', trigger: 'blur' }
        ],
        userId:[
           { required: true, message: '请选择人员', trigger: 'change' }
        ]
      }
    }
  },
  methods:{
    open(query){
      this.userOptions = []
      this.$nextTick(()=>{
        this.$refs.form.resetFields();
      })
      this.visible = true
      this.title = query.id ? '编辑':'新增'
      if(query.id){
        this.form.userId = query.user.userId
        this.form.reminder = query.reminder
        this.userOptions = [{
            userName: query.user.userName,
            userId: query.user.userId
        }]
      }
    },
    submitForm(){
      this.$refs['form'].validate((valid) => {
          if (valid) {
            let method = 'addExcessRemind'
            if (this.form.id) {
                method = 'editExcessRemind'
            }
            api[method](this.form).then(res => {
              if (res.code === 200) {
                this.$message.success({ message: '操作成功' });
                  this.$parent.$parent.getList();
                  this.visible = false;
              }
            })
            .catch(err => {
              console.log(err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    remoteMethod(query) {
        if (query !== '') {
            this.loading = true
            api.getUser({filter: query}).then(res => {
                this.loading = false
                if (res.code === 200) {
                    this.userOptions = res.data
                } else {
                    this.userOptions = []
                }
            })
        }
    }
  },
  mounted(){
      
  }
};
</script>
<style lang="scss">
  .overage-dialog{
      .el-dialog__title{
          line-height: 48px;
          padding-left: 15px;
      }
      .el-input{width: 220px;}
      .dialog-footer{
          padding: 5px;
          text-align: left;
          padding-left: 115px;
      }
  }
</style>