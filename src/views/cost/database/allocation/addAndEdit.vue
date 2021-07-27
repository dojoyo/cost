<template>
    <el-dialog
        :visible.sync="visible"
        width="450px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="cost-dialog"
    >
        <div slot="title" class="header">
            <div class="title">{{title}}</div>
            <div class="options">
                <i class="iconfont icon-x1 pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <el-form :model="form" ref="form" :rules="rules" label-width="110px">
          <el-form-item label="数据库类型"  required prop="databaseType">
           <el-select v-model="form.databaseType" placeholder="请选择数据库类型">
              <el-option
                    v-for="item in enumType.FeeDatabaseType"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" required prop="userId">
            <el-select
                v-model="form.userId"
                ref="userSelect"
                filterable
                remote
                reserve-keyword
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
          <el-form-item label="部门" required prop="deptId">
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
          <el-form-item label="账号" required prop="account">
             <el-input v-model="form.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="使用频率" >
            <el-input v-model="form.frequency" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="visible = false">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import api from "@/api/cost";
export default {
    name: 'laborAddAndEdit',
    props:{
        enumType:Object,
        deptTree:Array
    },
    data() {
        return {
            title:'新增',
            form:{
                account:'',
                databaseType:'',
                deptId:'',
                frequency:'',
                userId:''
            },
            rules:{
               account: [{ required: true, message: "请输入账号", trigger:['change','blur'] }],
               databaseType: [{ required: true, message: "请选择数据库类型", trigger:'change' }],
               deptId: [{ required: true, message: "请输入选择部门", trigger:'change' }],
               userId: [{ required: true, message: "请输入用户名",  trigger: 'change' }],
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
              this.form = query
              this.form.databaseType = query.databaseType.value
              this.form.deptId = query.dept.deptId
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
                    let method = 'addAccount'
                    if (this.form.id) {
                        method = 'editAccount'
                    }
                    api[method](this.form).then(res => {
                        if (res.code === 200) {
                            this.$message.success('操作成功')
                            this.$parent.$parent.getList()
                            this.visible = false
                        } else {
                            this.$message.error('操作失败')
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
          .price .el-input__inner{
            border:none;
          }
        }
        .border-top{
          border-top: 1px solid #f1f2f4;
        }
    }
</style>
