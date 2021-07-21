<template>
  <el-dialog :visible.sync="dialogVisible" width="850px" :show-close="false"  :append-to-body="append" top="50px" class="target-wrap table-wrap" :close-on-click-modal="false" :close-on-press-escape="false">
    <div slot="title" class="header">
      <div class="title">
        <i class="iconfont icon-mubiao_normal primary"></i> 设置打分规则
      </div>
      <div class="options">
        <i class="iconfont icon-guanbi pointer fs-22" @click="dialogVisible=false"></i>
      </div>
      <div class="clear"></div>
    </div>
    <el-row style="border-top:solid 1px #ddd;">
      <el-col :span="4" class="gray-block">目标名称</el-col>
      <el-col :span="10">{{target.objName}}</el-col>
      <el-col :span="4" class="gray-block">目标负责人</el-col>
      <el-col :span="6" style="padding: 7px; display: flex; align-items: center">
            <span class="round-title">
              <avatar :user="target.objUser" />
            </span>
        <span class="fs-14 gray pl-10">{{target.objUser && target.objUser.userName}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="gray-block">关键结果</el-col>
      <el-col :span="20">{{scoreRule.keyResult.keyResult}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="gray-block">起始数值</el-col>
      <el-col :span="8">{{scoreRule.keyResult.startVal}}{{scoreRule.keyResult.unit}}</el-col>
      <el-col :span="4" class="gray-block">目标数值</el-col>
      <el-col :span="8">{{scoreRule.keyResult.endVal}}{{scoreRule.keyResult.unit}}</el-col>
    </el-row>
    <el-form ref="form" :model="scoreRule.form" label-width="80px" style="margin-top: 20px">
      <el-form-item label="30分标准" >
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scoreRule.form.criterion30"></el-input>
      </el-form-item>

      <el-form-item label="70分标准" >
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scoreRule.form.criterion70"></el-input>
      </el-form-item>

      <el-form-item label="100分标准" >
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="scoreRule.form.criterion100"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="mini" @click="saveScoreRule">保存</el-button>
        <el-button size="mini" @click="dialogVisible=false">取消</el-button>
        <el-button type='text' @click="clearScoreRule">清空</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<style lang="scss" scoped>
  .table-wrap{
    .el-row{
      border-bottom:solid 1px #ddd;
      border-left:solid 1px #ddd;
    }
    .el-col{
      padding: 15px 10px;
      border-right:solid 1px #ddd;
    }
    .gray-block{
      background: #f3f3f3;
    }
  }
</style>
<script>
  import api from '@/api/okr'
  import avatar from '@/components/avatar'
  export default {
    name: 'targetClose',
    props: {
      target: Object,
      visible: {
        type: Boolean,
        default() {
          return false
        }
      },
      append: {
        type: Boolean,
        default() {
          return false
        }
      },
      index:Number,
    },
    components:{avatar},
    data() {
      return {
        dialogVisible:false,
        scoreRule:{
          form:{},
          keyResult:{}
        }
      }
    },
    watch:{
      index(val){
        if(val!==undefined){
         this.getScoreRule(val);
         this.dialogVisible = true;
        }
      }
    },
    created() {},
    methods: {
      //显示评分规则
      getScoreRule(index){
        api.scoreRule(this.target.keyResults[index].keyResultId).then(res => {
          if (res.code === 200) {
            this.scoreRule = {
              form:res.data,
              keyResult:this.target.keyResults[index]
            }
          }
        }).catch(err => {
          console.log(err);
        })
        this.scoreRule.dialogVisible = true;
      },
      //保存目标评分规则
      saveScoreRule(){
        api.setScoreRule(this.scoreRule.form,this.scoreRule.keyResult.keyResultId).then(res => {
          if (res.code === 200) {
            this.$message.success({message: '打分规则设置成功!', duration: 1500})
            this.scoreRule = {
              form:{},
              keyResult:{}
            }
            this.$emit('modifyScore');
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //清除目标评分规则
      clearScoreRule(){
        for(let key in this.scoreRule.form){
          this.scoreRule.form[key] = '';
        }
      },
      //关闭评分面板
      closePanel(){
        this.$emit('closeScorePanel');
      }
    }
  }
</script>


