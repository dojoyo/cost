<template>
    <el-dialog
        :visible.sync="visible"
        width="450px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="cost-dialog"
    >
        <div slot="title" class="header">
            <div class="title">{{title}}</div>
            <div class="options">
                <i class="iconfont icon-x1 pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <el-form :model="form" ref="form"  label-width="110px">
          <el-form-item label="数据库类型"  required >
           <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" required >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门" required >
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号" required >
             <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="使用频率" >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="visible = false">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'laborAddAndEdit',
    data() {
        return {
            title:'新增',
            formLabelWidth:200,
            form:{
                name:'',
                region:'区域一'
            },
            visible:false
        };
    },
    mounted() {

    },
    methods: {
        // 打开弹窗
        open(query) {
                this.title=query?'编辑':'新增'
            this.visible = true;
        },
        // 初始化表单
        initForm() {
            this.form = {
                year: '',
                month: '',
                department: '',
                cost: ''
            };
            this.$nextTick(() => {
                // this.$refs.form.clearValidate();
            });
            // this.$refs['form'].resetFields();
        },
        // 新增、编辑
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    console.log('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="scss">
    .cost-dialog{
        .el-dialog__title{
            line-height: 48px;
            padding-left: 15px;
        }
        .el-form-item{
            .el-input__inner{width: 220px;}
        }
        .dialog-footer{
            padding: 5px;
            text-align: left;
            padding-left: 115px;
        }
        .el-dialog__body{
          .title{
            font-size: 14px;
            font-weight: bold;
            padding-left: 8px;
            position: relative;
            margin-top: 10px;
            margin-bottom: 20px;
            &::before{
              content:'';
              position: absolute;
              left: 0;
              top: 50%;
              width: 3px;
              height: 70%;
              border-left: 3px solid #015cb9;
              transform: translateY(-50%);

            }
          }
          .price .el-input__inner{
            border:none;
          }
        }
        .border-top{
          border-top: 1px solid #f1f2f4;
        }
    }
</style>
