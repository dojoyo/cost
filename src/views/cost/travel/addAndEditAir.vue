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
                    <el-form-item label="乘机人" :label-width="labelWidth" required class="w-100p" prop="userId">
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
                    <el-form-item label="订票时间" :label-width="labelWidth" required prop="bookingTime">
                        <el-date-picker v-model="form.bookingTime" type="date"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="起飞时间" :label-width="labelWidth" required prop="departureTime">
                        <el-date-picker v-model="form.departureTime" type="date"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="入账月份" :label-width="labelWidth" required prop="belongMonth">
                        <el-date-picker v-model="form.belongMonth" type="month"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="国际/国内" :label-width="labelWidth" required prop="flightType">
                        <el-radio-group v-model="form.flightType">
                            <el-radio v-for="(type, index) in flightType" :key="'flight'+index" :label="type.value">{{type.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="航程" :label-width="labelWidth" required prop="voyage">
                        <el-input v-model="form.voyage" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="航班" :label-width="labelWidth" required prop="flight">
                        <el-input v-model="form.flight" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="航等" :label-width="labelWidth" required prop="cabin">
                        <el-input v-model="form.cabin" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="实收/实付" :label-width="labelWidth" required prop="receivedOrPaid">
                        <el-input v-model="form.receivedOrPaid" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="折扣" :label-width="labelWidth" prop="discount">
                        <el-input v-model="form.discount" autocomplete="off">
                            <span slot="suffix">%</span>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="成交净价" :label-width="labelWidth" prop="netPrice">
                        <el-input v-model="form.netPrice" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="民航基金" :label-width="labelWidth" prop="civilAviationFund">
                        <el-input v-model="form.civilAviationFund" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="保险费" :label-width="labelWidth" prop="insurance">
                        <el-input v-model="form.insurance" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="改签费" :label-width="labelWidth" prop="changeFee">
                        <el-input v-model="form.changeFee" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="配送服务费" :label-width="labelWidth" prop="deliveryServiceFee">
                        <el-input v-model="form.deliveryServiceFee" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="服务包金额" :label-width="labelWidth" prop="servicePackageAmount">
                        <el-input v-model="form.servicePackageAmount" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="优惠券" :label-width="labelWidth" prop="coupon">
                        <el-input v-model="form.coupon" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" :label-width="labelWidth" prop="remarks">
                        <el-input v-model="form.remarks" type="textarea" autocomplete="off"></el-input>
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
    name: 'travelAirAddAndEdit',
    props: {
        deptTree: Array,
        flightType: Array
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
                        required: true, message: '请选择乘机人', trigger: 'change'
                    }
                ],
                deptId: [
                    {
                        required: true, message: '请选择部门', trigger: 'change'
                    }
                ],
                bookingTime: [
                    {
                        required: true, message: '请选择订票时间', trigger: 'change'
                    }
                ],
                departureTime: [
                    {
                        required: true, message: '请选择起飞时间', trigger: 'change'
                    }
                ],
                belongMonth: [
                    {
                        required: true, message: '请选择入账月份', trigger: 'change'
                    }
                ],
                flightType: [
                    {
                        required: true, message: '请选择国际/国内', trigger: 'change'
                    }
                ],
                voyage: [
                    {
                        required: true, message: '请输入航程', trigger: 'blur'
                    },
                    {
                        required: true, message: '请输入航程', trigger: 'change'
                    }
                ],
                flight: [
                    {
                        required: true, message: '请输入航班', trigger: 'blur'
                    },
                    {
                        required: true, message: '请输入航班', trigger: 'change'
                    }
                ],
                cabin: [
                    {
                        required: true, message: '请输入航等', trigger: 'blur'
                    },
                    {
                        required: true, message: '请输入航等', trigger: 'change'
                    }
                ],
                receivedOrPaid: [
                    {
                        required: true, message: '请输入实收/实付', trigger: 'blur'
                    },
                    {
                        required: true, message: '请输入实收/实付', trigger: 'change'
                    }
                ],
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
                if (this.form.flightType) {
                    this.form.flightType = this.form.flightType.value
                }
                this.form.bookingTime = filter.DateTimeEn(this.form.bookingTime)
                this.form.departureTime = filter.DateTimeEn(this.form.departureTime)
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
                bookingTime: '',
                departureTime: '',
                belongMonth: '',
                flightType: '',
                voyage: '',
                flight: '',
                cabin: '',
                receivedOrPaid: '',
                discount: '',
                netPrice: '',
                civilAviationFund: '',
                insurance: '',
                changeFee: '',
                deliveryServiceFee: '',
                servicePackageAmount: '',
                coupon: '',
                remarks: ''
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
                    let method = 'addTravelAir'
                    let params = {
                        ...this.form,
                        userName,
                        deptName: node[0].label
                    }
                    if (params.id) {
                        method = 'editTravelAir'
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
    }
</style>
