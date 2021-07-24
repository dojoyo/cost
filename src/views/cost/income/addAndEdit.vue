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
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
         <el-form-item label="年份" required prop="year">
            <el-date-picker
              v-model="form.year"
              type="year"
              value-format="yyyy"
              format="yyyy"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="月份" required prop="month">
             <el-select v-model="form.month" placeholder="请选择">
                <el-option
                  v-for="item in enumType.FeeMonth"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
           <el-form-item label="费用类型" required prop="incomeType">
              <el-select v-model="form.incomeType" placeholder="请选择">
                <el-option
                  v-for="item in enumType.FeeIncomeType"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
           </el-form-item>
          <el-form-item label="金额" required prop="amount">
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
     enumType:Object
  },
  data() {
    return {
      visible: false,
      title:'',
      form:{
        year:'',
        month:'',
        amount:'',
        incomeType:''
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
        incomeType:[
           { required: true, message: '请选择费用类型', trigger: 'change' }
        ]
      }
    }
  },
  methods:{
    open(query){
      console.log(query)
      const _this = this
      this.$nextTick(()=>{
        this.$refs.form.resetFields();
      })
      this.visible = true
      this.title = query.id ? '编辑':'新增'
      if(query.id){
        this.getData(query.id)
      }
    },
    getData(id){
      api.getIncomeDetail(id).then(res => {
          if (res.code === 200) {
            this.form = {
              year:(res.data.year).toString(),
              month:(res.data.month.value).toString(),
              amount:res.data.amount,
              incomeType:res.data.incomeType.value
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm(){
      this.$refs['form'].validate((valid) => {
          if (valid) {
            const methods = this.form.id ?'editIncomeDetail':'addIncome'
             api[methods](this.form).then(res => {
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