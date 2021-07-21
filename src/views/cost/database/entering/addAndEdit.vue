<template>
    <el-dialog
        :visible.sync="visible"
        width="800px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="cost-dialog"
    >
        <div slot="title" class="header">
            <div class="title">
                {{title}}
            </div>
            <div class="options">
                <i class="iconfont icon-x1 pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <el-form :model="form" :rules="rules" ref="form">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="数据库类型" :label-width="labelWidth" required prop="month">
                        <el-select v-model="form.month" placeholder="请选择">
                            <el-option
                                v-for="item in monthOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="border-top">
              <div class="title">购买信息</div>
               <el-col :span="12">
                    <el-form-item label="账号单位" :label-width="labelWidth" required prop="unit">
                        <el-radio-group v-model="form.radio">
                          <el-radio :label="3">个</el-radio>
                          <el-radio :label="6">小时</el-radio>
                        </el-radio-group>
                    </el-form-item>
               </el-col>
               <el-col :span="12">
                    <el-form-item label="购买账号量" :label-width="labelWidth" required prop="buyCount">
                       <el-input v-model="form.radio" ></el-input>
                    </el-form-item>
               </el-col>
                <el-col :span="12">
                    <el-form-item label="总费用" :label-width="labelWidth" required prop="totalPrice">
                        <el-select v-model="form.department">
                            <el-option
                                v-for="item in monthOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12" class="price">
                    <el-form-item label="单价" :label-width="labelWidth" required>
                         <span style="display:inline-block;width:220px;height:36px">{{price}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="开始使用日期" :label-width="labelWidth" required prop="startDate">
                        <el-date-picker v-model="form.startDate" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="账号到期日期" :label-width="labelWidth" required prop="totalDate">
                        <el-date-picker v-model="form.startDate" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="付款日期" :label-width="labelWidth" required prop="payDate">
                        <el-date-picker v-model="form.startDate" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="border-top">
              <div class="title">对接人信息</div>
              <el-col :span="12" >
                  <el-form-item label="姓名" :label-width="labelWidth"  prop="name">
                      <el-input v-model="form.name" readonly></el-input>
                  </el-form-item>
              </el-col>
               <el-col :span="12" >
                  <el-form-item label="电话" :label-width="labelWidth"  prop="phone">
                      <el-input v-model="form.phone" readonly></el-input>
                  </el-form-item>
              </el-col>
               <el-col :span="12" >
                  <el-form-item label="合同链接" :label-width="labelWidth" prop="link">
                      <el-input v-model="form.link" readonly></el-input>
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
export default {
    name: 'laborAddAndEdit',
    data() {
        return {
            visible: false,
            labelWidth: '150px',
            title: '',
            price:'-',
            form: {
                year: '',
                month: '',
                department: '',
                cost: '',
                radio:3,
                startDate:'',
                name:'',
                link:'',
                phone:''
            },
            rules: {
                unit: [
                    {
                        required: true, message: '请选择账号单位', trigger: 'change'
                    }
                ],
                
                buyCount: [
                    {
                        required: true, message: '请输入购买账号量', trigger: 'blur'
                    }
                ],
                totalPrice: [
                    {
                        required: true, message: '请选择总费用', trigger: 'change'
                    }
                ],
                payDate:[
                  {
                        required: true, message: '请选择付款日期', trigger: 'change'
                    }
                ],
                startDate:[
                  {
                        required: true, message: '请选择开始日期', trigger: 'change'
                    }
                ],
                totalDate:[
                  {
                        required: true, message: '请选择账号到期日期', trigger: 'change'
                    }
                ]
            },
            monthOptions: [
                {
                    label: '1月',
                    value: 1
                },
                {
                    label: '2月',
                    value: 2
                },
                {
                    label: '3月',
                    value: 3
                },
                {
                    label: '4月',
                    value: 4
                },
                {
                    label: '5月',
                    value: 5
                },
                {
                    label: '6月',
                    value: 6
                },
                {
                    label: '7月',
                    value: 7
                },
                {
                    label: '8月',
                    value: 8
                },
                {
                    label: '9月',
                    value: 9
                },
                {
                    label: '10月',
                    value: 10
                },
                {
                    label: '11月',
                    value: 11
                },
                {
                    label: '12月',
                    value: 12
                }
            ]
        };
    },
    mounted() {

    },
    methods: {
        // 打开弹窗
        open(query) {
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
