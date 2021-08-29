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
                    <el-form-item label="姓名" :label-width="labelWidth" required class="w-100p" prop="userId">
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
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="开始计费时间" :label-width="labelWidth" prop="startBillingTime">
                        <el-date-picker v-model="form.startBillingTime" type="datetime"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用车城市" :label-width="labelWidth" prop="city">
                        <el-input v-model="form.city" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="入账月份" :label-width="labelWidth" required prop="belongMonth">
                        <el-date-picker v-model="form.belongMonth" type="month" value-format="yyyy-MM"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="实付金额" :label-width="labelWidth" required prop="paid">
                        <el-input v-model="form.paid" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="实际出发地" :label-width="labelWidth" prop="startPoint">
                        <el-input v-model="form.startPoint" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="实际目的地" :label-width="labelWidth" prop="destination">
                        <el-input v-model="form.destination" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="距离" :label-width="labelWidth" prop="distance">
                        <el-input v-model="form.distance" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="用车备注" :label-width="labelWidth" prop="remarks">
                        <el-input v-model="form.remarks" type="textarea" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="补充说明" :label-width="labelWidth" prop="supplement">
                        <el-input v-model="form.supplement" type="textarea" autocomplete="off"></el-input>
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
    name: 'travelDidiAddAndEdit',
    props: {
        deptTree: Array
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
                // startBillingTime: [
                //     {
                //         required: true, message: '请选择开始计费时间', trigger: ['change', 'blur']
                //     }
                // ],
                // city: [
                //     {
                //         required: true, message: '请输入用车城市', trigger: ['change', 'blur']
                //     }
                // ],
                paid: [
                    {
                        required: true, message: '请输入实付金额', trigger: ['change', 'blur']
                    }
                ],
                // startPoint: [
                //     {
                //         required: true, message: '请输入实际出发地', trigger: ['change', 'blur']
                //     }
                // ],
                // destination: [
                //     {
                //         required: true, message: '请输入实际目的地', trigger: ['change', 'blur']
                //     }
                // ],
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
                this.form.startBillingTime = filter.DateTimeSecondEn(this.form.startBillingTime)
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
                startBillingTime: '',
                city: '',
                paid: '',
                startPoint: '',
                destination: '',
                belongMonth: '',
                distance: '',
                remarks: '',
                supplement: ''
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
                    let method = 'addTravelDidi'
                    let params = {
                        ...this.form,
                        userName,
                        deptName: node[0].label
                    }
                    if (params.id) {
                        method = 'editTravelDidi'
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
