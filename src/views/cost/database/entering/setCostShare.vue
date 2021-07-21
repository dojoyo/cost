<template>
    <el-dialog
        :visible.sync="visible"
        width="500px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="cost-dialog"
    >
        <div slot="title" class="header">
            <div class="title">费用分摊设置</div>
            <div class="options">
                <i class="iconfont icon-x1 pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <el-table :data="tableData" style="width: 100%"  :header-cell-style="{background:'#f5f9ff'}" border>
          <el-table-column  label="费用分摊部门" width="150" align="center" prop="name" ></el-table-column>
          <el-table-column label="数量" align="right">
            <template slot-scope="scope">
              <el-input v-model="scope.row.value"></el-input>
            </template>
          </el-table-column>
        </el-table>
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
            visible: false,
            tableData:[
              {name:'股权投资一部',value:'5%'},
              {name:'股权投资二部',value:'10%'},
              {name:'股权投资三部',value:'20%'},
              {name:'战略投资部',value:'30%'},
              {name:'教育投资部',value:''},
              {name:'证券投资部',value:''},
              {name:'VC投资部',value:''},
              {name:'同德投资组',value:''},
              {name:'财务组',value:''},
              {name:'人力组',value:''},
            ]
            
        };
    },
    mounted() {

    },
    methods: {
        // 打开弹窗
        open(query) {
            this.initForm();
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
                this.$refs.form.clearValidate();
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
          tbody {
            tr td:first-child{
              background: #f5f9ff;
            }
          }
        }
        
    }
</style>
