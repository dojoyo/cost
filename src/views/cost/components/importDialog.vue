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
                导入
            </div>
            <div class="options">
                <i class="iconfont icon-guanbi pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="年份" :label-width="labelWidth" required class="w-100p" prop="year">
                <el-date-picker v-model="form.year" type="year" placeholder="请选择年份"></el-date-picker>
            </el-form-item>
            <el-form-item label="月份" :label-width="labelWidth" required prop="month">
                <el-select v-model="form.month" placeholder="请选择月份">
                    <el-option
                        v-for="item in monthOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文件选择" :label-width="labelWidth" required prop="file">
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="form.file">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="visible = false">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    name: 'importDialog',
    data() {
        return {
            visible: false,
            labelWidth: '100px',
            form: {
                year: '',
                month: '',
                file: []
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
                ],
                file: [
                    {
                        required: true, message: '请选择文件', trigger: 'change'
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
        open() {
            this.initForm();
            this.visible = true;
        },
        // 初始化表单
        initForm() {
            this.form = {
                year: '',
                month: '',
                file: ''
            };
            this.$nextTick(() => {
                this.$refs.form.clearValidate();
            });
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
    }
</style>
