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
                    <el-form-item label="面单号" :label-width="labelWidth" prop="number">
                        <el-input v-model="form.number" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="填报人" :label-width="labelWidth" required class="w-100p" prop="userId">
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
                    <el-form-item label="费用归属部门" :label-width="labelWidth" required prop="deptId" class="lh-18">
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
                    <el-form-item label="金额" :label-width="labelWidth" required prop="amount">
                        <el-input v-model="form.amount" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="会计编码" :label-width="labelWidth" prop="accountCode">
                        <el-input v-model="form.accountCode" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="预算编码" :label-width="labelWidth" prop="budgetCode">
                        <el-input v-model="form.budgetCode" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="预算科目" :label-width="labelWidth" required prop="budgetAccount">
                        <el-select v-model="form.budgetAccount">
                            <el-option v-for="item in feeBudgetAccount" :key="item.value" :label="item.name" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="项目名称" :label-width="labelWidth" prop="projectName">
                        <el-input v-model="form.projectName" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="入账月份" :label-width="labelWidth" required prop="belongMonth">
                        <el-date-picker v-model="form.belongMonth" type="month" value-format="yyyy-MM"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="摘要" :label-width="labelWidth" prop="summary">
                        <el-input v-model="form.summary" type="textarea" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="主体" :label-width="labelWidth" prop="mainBody">
                        <el-input v-model="form.mainBody" autocomplete="off"></el-input>
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
export default {
    name: 'travelOtherAddAndEdit',
    props: {
        deptTree: Array,
        feeBudgetAccount: Array
    },
    data() {
        return {
            visible: false,
            labelWidth: '100px',
            loading: false,
            title: '',
            tree: [],
            userOptions: [], // 查询
            form: {},
            rules: {
                userId: [
                    {
                        required: true, message: '请选择姓名', trigger: 'change'
                    }
                ],
                deptId: [
                    {
                        required: true, message: '请选择部门', trigger: 'change'
                    }
                ],
                number: [
                    {
                        required: true, message: '请输入面单号', trigger: ['change', 'blur']
                    }
                ],
                amount: [
                    {
                        required: true, message: '请输入金额', trigger: ['change', 'blur']
                    }
                ],
                budgetAccount: [
                    {
                        required: true, message: '请选择预算科目', trigger: ['change', 'blur']
                    }
                ],
                belongMonth: [
                    {
                        required: true, message: '请选择入账月份', trigger: ['change', 'blur']
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
                if (this.form.budgetAccount) {
                    this.form.budgetAccount = this.form.budgetAccount.value
                }
                this.userOptions = [{
                    userName: this.form.userName,
                    userId: this.form.userId
                }]
            } else {
                this.title = '新增';
            }
            this.visible = true;
        },
        // 初始化表单
        initForm() {
            this.form = {
                deptId: '',
                userName: '',
                userId: '',
                belongMonth: '',
                amount: '',
                accountCode: '',
                budgetAccount: '',
                projectName: '',
                summary: '',
                mainBody: ''
            };
            this.userOptions = []
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
        },
        // 新增、编辑
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const node = this.$refs.department.getCheckedNodes();
                    const userName = this.$refs.userSelect.selected.label
                    let method = 'addTravelOther'
                    let params = {
                        ...this.form,
                        userName,
                        deptName: node[0].label
                    }
                    if (params.id) {
                        method = 'editTravelOther'
                    }
                    api[method](params).then(res => {
                        if (res.code === 200) {
                            this.$message.success('操作成功')
                            this.$parent.$parent.getList()
                            this.visible = false
                        } else {
                            this.$message.error('操作失败')
                        }
                    })
                } else {
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
