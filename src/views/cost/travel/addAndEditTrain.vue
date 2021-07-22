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
                    <el-form-item label="出行人" :label-width="labelWidth" required class="w-100p" prop="userId">
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
                    <el-form-item label="订票日期" :label-width="labelWidth" required prop="bookingTime">
                        <el-date-picker v-model="form.bookingTime" type="date"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="发车日期" :label-width="labelWidth" required prop="departureDate">
                        <el-date-picker v-model="form.departureDate" type="date"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="发车时间" :label-width="labelWidth" required prop="departureTime">
                        <el-time-picker v-model="form.departureTime"></el-time-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="到达时间" :label-width="labelWidth" required prop="arrivalTime">
                        <el-time-picker v-model="form.arrivalTime"></el-time-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="发车站" :label-width="labelWidth" required prop="departureStation">
                        <el-input v-model="form.departureStation" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="到达站" :label-width="labelWidth" required prop="arrivalStation">
                        <el-input v-model="form.arrivalStation" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="车次" :label-width="labelWidth" prop="trainNumber">
                        <el-input v-model="form.trainNumber" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="坐等" :label-width="labelWidth" prop="seat">
                        <el-input v-model="form.seat" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="费用类型" :label-width="labelWidth" required prop="feeType">
                        <el-input v-model="form.feeType" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="资金方向" :label-width="labelWidth" required prop="fundingDirection">
                        <el-input v-model="form.fundingDirection" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="订单金额" :label-width="labelWidth" prop="orderAmount">
                        <el-input v-model="form.orderAmount" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="票价/价差" :label-width="labelWidth" required prop="fareOrSpread">
                        <el-input v-model="form.fareOrSpread" autocomplete="off"></el-input>
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
                    <el-form-item label="退票费" :label-width="labelWidth" prop="refundFee">
                        <el-input v-model="form.refundFee" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="结算金额" :label-width="labelWidth" required prop="settlementAmount">
                        <el-input v-model="form.settlementAmount" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="服务费" :label-width="labelWidth" prop="serviceCharge">
                        <el-input v-model="form.serviceCharge" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="合计" :label-width="labelWidth" prop="total">
                        <el-input v-model="form.total" type="textarea" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="入账月份" :label-width="labelWidth" required prop="belongMonth">
                        <el-date-picker v-model="form.belongMonth" type="month" value-format="yyyy-MM"></el-date-picker>
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
    name: 'travelTrainAddAndEdit',
    props: {
        deptTree: Array,
        feeFundingDirection: Array
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
                        required: true, message: '请选择出行人', trigger: 'change'
                    }
                ],
                deptId: [
                    {
                        required: true, message: '请选择部门', trigger: 'change'
                    }
                ],
                bookingTime: [
                    {
                        required: true, message: '请选择订票日期', trigger: 'change'
                    }
                ],
                checkInDate: [
                    {
                        required: true, message: '请选择发车日期', trigger: 'change'
                    }
                ],
                checkOutDate: [
                    {
                        required: true, message: '请选择离店日期', trigger: 'change'
                    }
                ],
                hotelCity: [
                    {
                        required: true, message: '请输入酒店城市', trigger: 'blur'
                    },
                    {
                        required: true, message: '请输入酒店城市', trigger: 'change'
                    }
                ],
                hotelName: [
                    {
                        required: true, message: '请输入酒店名称', trigger: 'blur'
                    },
                    {
                        required: true, message: '请输入酒店名称', trigger: 'change'
                    }
                ],
                unitPrice: [
                    {
                        required: true, message: '请输入单价', trigger: 'blur'
                    },
                    {
                        required: true, message: '请输入单价', trigger: 'change'
                    }
                ],
                amount: [
                    {
                        required: true, message: '请输入金额', trigger: 'blur'
                    },
                    {
                        required: true, message: '请输入金额', trigger: 'change'
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
                this.form.bookingTime = filter.DateTimeEn(this.form.bookingTime)
                this.form.checkInDate = filter.DateTimeEn(this.form.checkInDate)
                this.form.checkOutDate = filter.DateTimeEn(this.form.checkOutDate)
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
                checkInDate: '',
                checkOutDate: '',
                belongMonth: '',
                hotelCity: '',
                hotelName: '',
                unitPrice: '',
                amount: '',
                roomType: '',
                numberOfRoom: '',
                starLevel: '',
                stayDays: '',
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
                    let method = 'addTravelTrain'
                    let params = {
                        ...this.form,
                        userName,
                        deptName: node[0].label
                    }
                    if (params.id) {
                        method = 'editTravelTrain'
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
