<template>
    <el-dialog
        :visible.sync="visible"
        width="400px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="export-dialog"
    >
        <div slot="title" class="header">
            <div class="title">下载模板</div>
            <div class="options">
                <i class="iconfont icon-guanbi pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="年份"  required class="w-100p" prop="year">
                <el-date-picker v-model="form.year" type="year" value-format="yyyy" format="yyyy" placeholder="请选择年份" :picker-options="pickerOptionsStart"></el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="downLoadTempFile">下 载</el-button>
            <el-button @click="visible = false">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import api from "@/api/cost";
export default {
    name: 'downloadTemp',
    props:{
        method:String
    },
    data() {
        return {
            visible: false,
            labelWidth: '100px',
            form: {
                year: '',
            },
            rules: {
                year: [
                    {
                        required: true, message: '请选择年份', trigger: ['change','blur']
                    }
                ],
            },
            tempMethod: '',
            pickerOptionsStart: {
                disabledDate: (time) => {
                    const value = new Date(time).getFullYear();
                    return value < 2019 || value > new Date().getFullYear();
                }
            }
        };
    },
    mounted() {
    },
    methods: {
        // 打开弹窗
        open(tempMethod) {
            this.initForm();
            this.tempMethod = tempMethod;
            this.visible = true;
        },
        // 初始化表单
        initForm() {
            this.form = {
                year: new Date().getFullYear() + ''
            };
        },
        //下载模板
        downLoadTempFile(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.visible = false;
                    api[this.tempMethod]({year: this.form.year}).then(res => {
                        let headers = res.headers;
                        let title = headers['x-file-name'];
                        let blob = new Blob([res.data], {
                            type: headers['content-type']
                        });
                        let link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = decodeURIComponent(title);
                        link.click();
                    });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="scss">
    .export-dialog{
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
