<template>
  <el-dialog
    :visible.sync="visible"
    width="400px"
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
    <el-form :model="form" :inline="true"  :rules="rules" ref="form" label-width="90px">
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
        <el-form-item label="年份"  required class="w-100p" prop="year">
            <el-date-picker v-model="form.year" type="year" value-format="yyyy" format="yyyy" placeholder="请选择年份"></el-date-picker>
        </el-form-item>
        <el-form-item label="新增人数" required prop="number">
          <el-input v-model="form.number"></el-input>
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
export default {
  props:{
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
        number:'',
        year: '',
        id:''
      },
      rules:{
        deptId:[
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        year: [
          {
            required: true, message: '请选择年份', trigger: ['change','blur']
          }
        ],
        number:[
          { required: true, message: '请输入新增人数', trigger: ['change','blur'] }
        ]
      }
    }
  },
  methods:{
    open(query){
      this.userOptions = []
      this.visible = true
      this.$nextTick(()=>{
        this.$refs.form.resetFields();
        this.title = query.id ? '编辑':'新增'
        if(query.id){
          this.form = {
            id: query.id,
            number: query.number,
            year: query.year + '',
            deptId: query.dept.deptId
          }
        } else {
          this.form = {
            deptId:'',
            number:'',
            year: '',
            id:''
          }
        }
      })
    },
    submitForm(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const node = this.$refs.department.getCheckedNodes();
          this.form.deptName = node[0].label
          let method = 'addNewHunter'
          if (this.form.id) {
            method = 'editNewHunter'
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
          return false;
        }
      });
    }
  },
  mounted(){
      
  }
};
</script>
<style lang="scss" scoped>
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
  }
</style>