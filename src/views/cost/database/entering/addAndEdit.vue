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
        <el-form :model="form" :rules="rules" ref="form" label-width="120px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="数据库类型"  required prop="databaseType">
                        <el-select v-model="form.databaseType" placeholder="请选择">
                            <el-option
                                v-for="item in enumType.FeeDatabaseType"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="border-top">
              <div class="title">购买信息</div>
               <el-row>
                    <el-col :span="12">
                        <el-form-item label="账号单位"  required prop="accountUnit">
                            <el-radio-group v-model="form.accountUnit">
                            <el-radio label="NU">个</el-radio>
                            <el-radio label="HO">小时</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="购买账号量" required prop="accountNumber">
                        <el-input v-model="form.accountNumber" ></el-input>
                        </el-form-item>
                    </el-col>
               </el-row>
               <el-row>
                    <el-col :span="12">
                        <el-form-item label="总费用"  required prop="amount">
                            <el-input type="text" v-model="form.amount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="单价" prop="price" required>
                            <el-input type="text" v-model="form.price"></el-input>
                        </el-form-item>
                    </el-col>
               </el-row>
               <el-row>
                    <el-col :span="12">
                        <el-form-item label="开始使用日期"  required prop="startUseDate">
                            <el-date-picker v-model="form.startUseDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账号到期日期"  required prop="expirationDate">
                            <el-date-picker v-model="form.expirationDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
               </el-row>
               <el-row>
                    <el-col :span="12">
                        <el-form-item label="付款日期"  required prop="paymentDate">
                            <el-date-picker v-model="form.paymentDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
               </el-row>
               
            </div>
            <div class="border-top" style="height:150px">
              <div class="title">对接人信息</div>
              <el-col :span="12" >
                  <el-form-item label="姓名"  prop="dockingName">
                      <el-input v-model="form.dockingName"></el-input>
                  </el-form-item>
              </el-col>
               <el-col :span="12" >
                  <el-form-item label="电话"  prop="dockingPhone">
                      <el-input v-model="form.dockingPhone" type="tel"></el-input>
                  </el-form-item>
              </el-col>
               <el-col :span="12" >
                  <el-form-item label="合同链接"  prop="contractLink">
                      <el-input v-model="form.contractLink"></el-input>
                  </el-form-item>
              </el-col>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="visible = false">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import api from "@/api/cost";
import filter from '@/utils/filters'
export default {
    name: 'laborAddAndEdit',
    props:{
        enumType:Object
    },
    data() {
        return {
            visible: false,
            labelWidth: '100px',
            title: '新增',
            form: {
                accountNumber: '',
                accountUnit: '',
                amount: '',
                contractLink: '',
                databaseType:'',
                dockingPhone:'',
                dockingName:'',
                expirationDate:'',
                paymentDate:'',
                price:'',
                startUseDate:''
            },
            rules: {
                accountUnit: [
                    {
                        required: true, message: '请选择账号单位', trigger: 'change'
                    }
                ],
                
                accountNumber: [
                    {
                        required: true, message: '请输入购买账号量', trigger: ['change','blur']
                    }
                ],
                amount: [
                    {
                        required: true, message: '请输入总费用', trigger: ['change','blur']
                    }
                ],
                paymentDate:[
                  {
                        required: true, message: '请选择付款日期', trigger: 'change'
                    }
                ],
                startUseDate:[
                  {
                        required: true, message: '请选择开始日期', trigger: 'change'
                    }
                ],
                expirationDate:[
                  {
                        required: true, message: '请选择账号到期日期', trigger: 'change'
                    }
                ],
                price:[
                  {
                        required: true, message: '请输入单价', trigger: ['change','blur']
                    }
                ],
                 databaseType:[
                  {
                        required: true, message: '请选择数据库类型', trigger: 'change'
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
          this.visible = true
          this.$nextTick(()=>{
            this.$refs.form.resetFields();
            this.title = query.id ? '编辑':'新增'
            if(query.id){
                this.getData(query.id)
            }
          })
              
        },
        getData(id){
            api.recordDatabaseDetail(id).then(res=>{
                console.log(res)
                if(res.code === 200){
                    this.form = res.data
                    this.form.accountUnit = res.data.accountUnit.value
                    this.form.databaseType = res.data.databaseType.value
                    this.form.startUseDate = filter.DateTimeEn(res.data.startUseDate)
                    this.form.expirationDate = filter.DateTimeEn(res.data.expirationDate)
                    this.form.paymentDate = filter.DateTimeEn(res.data.paymentDate)
                }
            })
        },
        // 新增、编辑
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                
                    let method = 'addReocrdDatabase'
            
                    if (this.form.id) {
                        method = 'editReocrdDatabase'
                    }
                    api[method](this.form).then(res => {
                        if (res.code === 200) {
                            this.$message.success('操作成功')
                            this.$parent.$parent.getList()
                            this.visible = false
                        }
                    })
                } else {
                    console.log('error submit!!');
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
         
        }
        .border-top{
          border-top: 1px solid #f1f2f4;
        }
    }
</style>
