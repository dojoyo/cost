<template>
  <el-dialog
    :visible.sync="visible"
    width="400px"
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
    <div class="flex info-form">
      <div class="w100 txt-right">项目名称</div>
      <div :title="info.projectName">{{info.projectName}}</div>
    </div>
    <div class="flex info-form">
      <div class="w100 txt-right">投资轮次</div>
      <div :title="info.projectName">{{info.investRound}}</div>
    </div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="跟投比例" required prop="followRate">
        <el-input v-model="form.followRate" oninput="value=value.replace(/[^\d\.]/g, '').replace(/^\./g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')">
          <span slot="suffix" class="lh-28">%</span>
        </el-input>
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
  },
  data() {
    return {
      visible: false,
      title:'',
      info: {},
      loading:false,
      form:{
        followRate: '',
        id: ''
      },
      rules:{
        followRate:[
          { required: true, message: '请输入跟投比例', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods:{
    open(query){
      this.visible = true
      this.$nextTick(()=>{
        this.$refs.form.resetFields();
        this.title = query.manageIncomeId ? '编辑':'新增'
        if(query.manageIncomeId){
          this.form = {
            followRate:query.followRatio,
            id:query.manageIncomeId
          }
          this.info = {
            ...query
          }
        }
      })
      
    },
    submitForm(){
      this.$refs['form'].validate((valid) => {
          if (valid) {
            let params = {
              id: this.form.id,
              data: {
                followRate: parseFloat(this.form.followRate)
              }
            }
            api.setManageIncome(params).then(res => {
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
      .lh-28{line-height: 28px;}
      .w100{width: 100px;}
      .info-form {
        line-height: 36px;
        & > div:first-child {
          padding-right: 12px;
        }
        & > div:last-child {
          width: 220px;
          padding: 0 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
  }
</style>