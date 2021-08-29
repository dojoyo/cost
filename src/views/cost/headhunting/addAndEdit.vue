<template>
  <el-dialog
    :visible.sync="visible"
    width="800px"
    :show-close="false"
    :close-on-click-modal="false"
    custom-class="hunter-dialog"
  >
    <div slot="title" class="header">
      <div class="title"> {{ title }} </div>
      <div class="options">
        <i class="iconfont icon-guanbi pointer fs-22" @click="visible = false"></i>
      </div>
      <div class="clear"></div>
    </div>
    <el-form :model="form" :inline="true"  :rules="rules" ref="form" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="部门" required prop="deptId">
            <el-cascader
              ref="department"
              class="mr-10"
              v-model="form.deptId"
              :options="deptTree"
              :show-all-levels="false"
              :props="{ checkStrictly: true, emitPath: false }"
              clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入职人" required prop="userId">
             <el-select
                v-model="form.userId"
                ref="userSelect"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
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
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="费用" required prop="amount">
              <el-input v-model="form.amount" placeholder="请输入费用"></el-input>
           </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="费用发生月份" required prop="belongMonth" class="lh-18">
            <el-date-picker
              v-model="form.belongMonth"
              type="month"
              value-format="yyyy-MM"
              placeholder="请选择">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
     <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="visible = false">取 消</el-button>
     </div>
  </el-dialog>
</template>
<script>
import api from "@/api/cost";
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
        deptId:'',
        amount:'',
        belongMonth:'',
        userId:'',
        id:'',
        userName:'',
        deptName:''
      },
      rules:{
        deptId:[
           { required: true, message: '请选择部门', trigger: 'change' }
        ],
        belongMonth:[
           { required: true, message: '请选择费用日期', trigger: 'change' }
        ],
        amount:[
           { required: true, message: '请输入金额', trigger: 'blur' }
        ],
        userId:[
           { required: true, message: '请选择入职人', trigger: 'change' }
        ]
      }
    }
  },
  methods:{
    open(query){
      this.userOptions = []
      this.visible = true
      this.form = {
        deptId:'',
        amount:'',
        belongMonth:'',
        userId:'',
        id:'',
        userName:'',
        deptName:''
      }
      this.$nextTick(()=>{
        this.$refs.form.resetFields();
        this.title = query.id ? '编辑':'新增'
        if(query.id){
          this.form = Object.assign({}, query);
          this.userOptions = [{
              userName: this.form.userName,
              userId: this.form.userId
          }]
        }
      })
      
    },
    submitForm(){
      this.$refs['form'].validate((valid) => {
          if (valid) {
            const node = this.$refs.department.getCheckedNodes();
            this.form.userName = this.$refs.userSelect.selected.label
            this.form.deptName = node[0].label
            let method = 'addHunter'
            if (this.form.id) {
                method = 'editHunter'
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
  .hunter-dialog{
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
      .lh-18{
          .el-form-item__label{line-height: 18px;}
      }
  }
</style>