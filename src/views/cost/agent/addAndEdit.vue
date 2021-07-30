<template>
    <el-dialog
        :visible.sync="visible"
        width="720px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="cost-dialog"
    >
        <div slot="title" class="header">
            <div class="title">
                {{title}}
            </div>
            <div class="options">
                <i class="iconfont icon-guanbi pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <el-form :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="部门" :label-width="labelWidth" required prop="deptId">
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
                    <el-form-item label="项目" :label-width="labelWidth" prop="projectName">
                        <el-input v-model="form.projectName" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="费用类别" :label-width="labelWidth" prop="advisoryType">
                        <el-select v-model="form.advisoryType">
                            <el-option v-for="item in feeAdvisoryType" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="金额" :label-width="labelWidth" required prop="amount">
                        <el-input v-model="form.amount" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="费用发生日期" :label-width="labelWidth" required prop="expenseDate" class="lh-18">
                        <el-date-picker v-model="form.expenseDate" type="date"></el-date-picker>
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
import api from '@/api/cost';
import filter from '@/utils/filters'
export default {
    name: 'serveAddAndEdit',
    props: {
        deptTree: Array,
        feeAdvisoryType: Array
    },
    data() {
        return {
            visible: false,
            labelWidth: '100px',
            loading: false,
            title: '',
            form: {},
            rules: {
                deptId: [
                    {
                        required: true, message: '请选择部门', trigger: 'change'
                    }
                ],
                expenseDate: [
                    {
                        required: true, message: '请选择费用发生日期', trigger: ['change', 'blur']
                    }
                ],
                amount: [
                    {
                        required: true, message: '请输入金额', trigger: ['change', 'blur']
                    }
                ]
            }
        };
    },
    mounted() {

    },
    methods: {
        // 打开弹窗
        open(query) {
            this.initForm();
            if (query && query.id) {
                this.title = '编辑';
                this.form = Object.assign({}, query);
                if (this.form.advisoryType) {
                    this.form.advisoryType = this.form.advisoryType.value
                }
                this.form.expenseDate = filter.DateTimeEn(this.form.expenseDate)
            } else {
                this.title = '新增';
            }
            this.visible = true;
        },
        // 初始化表单
        initForm() {
            this.form = {
                deptId: '',
                amount: '',
                advisoryType: '',
                expenseDate: '',
                projectName: ''
            };
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
        },
        // 新增、编辑
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const node = this.$refs.department.getCheckedNodes();
                    let method = 'addAdvisory'
                    let params = {
                        ...this.form,
                        deptName: node[0].label
                    }
                    if (params.id) {
                        method = 'editAdvisory'
                    }
                    api[method](params).then(res => {
                        if (res.code === 200) {
                            this.$message.success('操作成功')
                            this.$parent.$parent.getList()
                            this.visible = false
                        }
                    })
                } else {
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
            .el-input{width: 220px;}
        }
        .dialog-footer{
            padding: 5px;
            text-align: left;
            padding-left: 115px;
        }
        .el-col-24 {
            .el-input{width: calc(100% - 25px);
                .el-input__inner{
                    width: 100%;
                }
            }
            .el-textarea{width: calc(100% - 25px)}
        }
        .lh-18{
            .el-form-item__label{line-height: 18px;}
        }
    }
</style>
