<template>
    <el-dialog
        :visible.sync="visible"
        width="800px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="expert-dialog"
    >
        <div slot="title" class="header">
            <div class="title">{{title}}</div>
            <div class="options">
                <i class="iconfont icon-x1 pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <el-form :inline="true"  :model="form" ref="form"  label-width="80px">
          <el-form-item label="部门"  required >
           <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Date" required >
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="用户名" required >
             <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Project"  required>
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Expert's Company" required class="expert">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Expert's Position" required class="expert">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Type" required>
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Hours" required>
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Remarks" required class="remarks">
            <el-input type="textarea" v-model="form.name" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4}"/>
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
    .expert-dialog{
.el-dialog__title{
            line-height: 48px;
            padding-left: 15px;
        }
        .el-form-item{
            .el-input__inner{width: 250px;}
        }
        .dialog-footer{
            padding: 5px;
            text-align: left;
            padding-left: 115px;
        }
        .remarks{
          display: block;
          .el-form-item__content{
            width: calc(100% - 80px)!important;
          }
        }
        .expert{
          .el-form-item__label{
            line-height:18px;
          }
        }
    }
    
</style>
