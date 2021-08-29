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
                    <el-form-item label="年份" :label-width="labelWidth" required class="w-100p" prop="year">
                        <el-date-picker v-model="form.year" type="year" format="yyyy年" value-format="yyyy" placeholder="请选择年份"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="月份" :label-width="labelWidth" required prop="month">
                        <el-select v-model="form.month" placeholder="请选择月份">
                            <el-option
                                v-for="item in monthOptions"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="部门" :label-width="labelWidth" required prop="department">
                        <el-cascader
                        ref="department"
                        v-model="form.department"
                        :options="deptTree"
                        :show-all-levels="false"
                        :props="{ checkStrictly: true, emitPath: false }"
                        clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="金额" :label-width="labelWidth" required prop="cost">
                        <el-input v-model="form.cost" autocomplete="off" placeholder="请输入金额"></el-input>
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
    name: 'officeAddAndEdit',
    data() {
        return {
            visible: false,
            labelWidth: '100px',
            title: '',
            deptTree: [],
            form: {
                year: '',
                month: '',
                department: '',
                cost: ''
            },
            rules: {
                year: [
                    {
                        required: true, message: '请选择年份', trigger: ['change','blur']
                    }
                ],
                month: [
                    {
                        required: true, message: '请选择月份', trigger: 'change'
                    }
                ],
                department: [
                    {
                        required: true, message: '请选择部门', trigger: 'change'
                    }
                ],
                cost: [
                    {
                        required: true, message: '请输入金额', trigger: ['change','blur']
                    }
                ]
            },
            monthOptions: []
        };
    },
    mounted() {

    },
    methods: {
        // 打开弹窗
        open(query, tree, month) {
            this.deptTree = tree;
            this.monthOptions = month;
            this.initForm();
            if (query) {
                this.title = '编辑';
                this.form = Object.assign({}, query);
            } else {
                this.title = '新增';
            }
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
        },
        // 新增、编辑
        submitForm() {
            const node = this.$refs.department.getCheckedNodes();
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let params = {
                        year: this.form.year,
                        month: this.form.month,
                        deptId: this.form.department,
                        deptName: node[0].label,
                        cost: this.form.cost
                    };
                    api.setFixed(params).then(res => {
                        if (res.code === 200) {
                            this.$message.success({ message: '操作成功' });
                            this.$parent.$parent.getList();
                            this.visible = false;
                        }
                    });
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
            .el-input{width: 220px;}
        }
        .dialog-footer{
            padding: 5px;
            text-align: left;
            padding-left: 115px;
        }
    }
</style>
