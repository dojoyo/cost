<template>
    <el-dialog
        :visible.sync="visible"
        width="400px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="cost-dialog"
    >
        <div slot="title" class="header">
            <div class="title">
                导出
            </div>
            <div class="options">
                <i class="iconfont icon-guanbi pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="年份" :label-width="labelWidth" required class="w-100p" prop="year">
                <el-date-picker v-model="form.year" type="year" value-format="yyyy" format="yyyy" placeholder="请选择年份"></el-date-picker>
            </el-form-item>
            <el-form-item label="月份" :label-width="labelWidth" required prop="month">
                <el-select v-model="form.month" placeholder="请选择月份">
                    <el-option
                        v-for="item in enumType.FeeMonth"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="visible = false">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import minix from '../mixins'
import api from "@/api/cost";
export default {
    name: 'exportDialog',
    props:{
        url:String
    },
    data() {
        return {
            visible: false,
            labelWidth: '100px',
            form: {
                year: '',
                month: '',
                file: ''
            },
            rules: {
                year: [
                    {
                        required: true, message: '请选择年份', trigger: 'change'
                    }
                ],
                month: [
                    {
                        required: true, message: '请选择月份', trigger: 'change'
                    }
                ]
            },
            enumType: {
                FeeMonth: []
            },
        };
    },
    mixins:[minix],
    mounted() {
        this.getEnum('FeeMonth')
    },
    methods: {
        // 打开弹窗
        open() {
            this.initForm();
            this.visible = true;
        },
        // 初始化表单
        initForm() {
            this.form = {
                year: '',
                month: ''
            };
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
        },
        // 新增、编辑
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                   this.visible = false;
                   this.exportFile(this.url,this.form)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        exportFile(url,data){
            api.exportFile(url,data).then(res=>{
                let headers = res.headers;
                let title = headers['x-file-name'];
                let blob = new Blob([res.data], {
                    type: headers['content-type']
                });
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = decodeURIComponent(title);
                link.click();
                this.initForm()
            })
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
    }
</style>
