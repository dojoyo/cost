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
        <el-form  :model="form" ref="form" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="12">
               <el-form-item label="部门"  required  prop="deptId">
                  <el-cascader
                    ref="department"
                    class="mr-10"
                    v-model="form.deptId"
                    :options="deptTree"
                    :show-all-levels="false"
                    :props="{ checkStrictly: true, emitPath: false }"
                    clearable
                  ></el-cascader>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Date" required  prop="useDate">
                <el-date-picker v-model="form.useDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名" required prop="userId">
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
              <el-form-item label="Project" required prop="project">
                <el-input v-model="form.project" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Expert's Company" prop="expertCompany" required class="expert">
                <el-input v-model="form.expertCompany" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Expert's Position" prop="expertPosition" required class="expert">
                <el-input v-model="form.expertPosition" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Type" required prop="type">
                <el-input v-model="form.type" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="Hours" required prop="hours">
                  <el-input v-model="form.hours" type="number" autocomplete="off"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
         <el-row>
           <el-col :span="24">
              <el-form-item label="Remarks" required prop="remark" class="remarks">
                <el-input type="textarea" v-model="form.remark" autocomplete="off" :autosize="{ minRows: 2, maxRows: 4}"/>
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
import api from "@/api/cost";
import filter from '@/utils/filters'
export default {
    name: 'laborAddAndEdit',
    props:{
      enumType: Object,
      deptTree: Array
    },
    data() {
        return {
            title:'新增',
            form:{
                deptId:'',
                expertCompany:'',
                expertPosition:'',
                hours:'',
                project:'',
                remark:'',
                type:'',
                useDate:'',
                userId:'',
                databaseType:'KS-凯盛专家库'
            },
            rules:{
               deptId: [{ required: true, message: "请选择部门", trigger: "change" }],
               expertCompany: [{ required: true, message: "请输入企业", trigger: ['change','blur'] }],
               expertPosition: [{ required: true, message: "请输入职位", trigger: ['change','blur'] }],
               hours: [{ required: true, message: "请输入小时", trigger: ['change','blur'] }],
               project: [{ required: true, message: "请输入项目", trigger: ['change','blur'] }],
               remark: [{ required: true, message: "请输入备注",  trigger: ['change', 'blur'] }],
               useDate: [{ required: true, message: "请选择时间", trigger: 'change' }],
               userId: [{ required: true, message: "请输入用户名",  trigger: 'change' }],
               type: [{ required: true, message: "请输入类型",  trigger: ['change', 'blur'] }],
            },
            userOptions: [],
            loading: false,
            visible:false
        };
    },

    mounted() {
      
    },
    methods: {
        // 打开弹窗
        open(query) {
          this.userOptions = []
          this.visible = true
          this.$nextTick(()=>{
            this.$refs.form.resetFields();
            this.title = query.id ? '编辑':'新增'
            if(query.id){
              this.form = Object.assign({}, query);
              this.form.userId = query.user.userId
              this.form.deptId = query.dept.deptId
              this.form.useDate = filter.DateTimeEn(query.useDate)
              this.userOptions = [{
                  userName: query.user.userName,
                  userId: query.user.userId
              }]
            }
          })
              
        },
        // 新增、编辑
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const node = this.$refs.department.getCheckedNodes();
                    const userName = this.$refs.userSelect.selected.label
                    let method = 'addDatabaseList'
                    let params = {
                        ...this.form,
                        userName,
                        deptName: node[0].label
                    }
                    if (params.id) {
                        method = 'editDatabase'
                    }
                    api[method](params).then(res => {
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
