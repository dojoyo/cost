<template>
  <el-dialog
    :visible.sync="visible"
    width="400px"
    :show-close="false"
    :close-on-click-modal="false"
    custom-class="income-dialog"
  >
    <div slot="title" class="header">
      <div class="title"> {{ title }} </div>
      <div class="options">
        <i class="iconfont icon-guanbi pointer fs-22" @click="visible = false"></i>
      </div>
      <div class="clear"></div>
    </div>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
         <el-form-item label="年份" required >
            <el-date-picker
              v-model="form.year"
              type="year"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="月份" required>
            <el-date-picker
              v-model="form.month"
              type="month"
              placeholder="选择月份">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="部门" required>
            <el-cascader
              ref="department"
              v-model="form.incomeTypeId"
              :options="depTree"
              :show-all-levels="false"
              :props="{ checkStrictly: true, emitPath: false }"
              clearable></el-cascader>
          </el-form-item>
          <el-form-item label="金额" required >
            <el-input v-model="form.amount" autocomplete="off"></el-input>
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
    depTree:Array,
    FeeIncomeType: Array
  },
  data() {
    return {
      visible: false,
      title:'',
      form:{
        year:'',
        month:'',
        amount:'',
        incomeTypeId:''
      },
      rules:{
        year:[
           { required: true, message: '请选择年份', trigger: 'change' }
        ],
        month:[
           { required: true, message: '请选择月份', trigger: 'change' }
        ],
        amount:[
           { required: true, message: '请输入金额', trigger: 'blur' }
        ],
        incomeTypeId:[
           { required: true, message: '请选择部门', trigger: 'change' }
        ]
      }
    }
  },
 
  methods:{
    open(query){
      this.visible = true
      this.title = query ? '编辑':'新增'
    },
    
    submitForm(){

    }
  },
  mounted(){
  }
};
</script>
<style lang="scss">
  .income-dialog{
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