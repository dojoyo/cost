<template>
    <el-dialog
        :visible.sync="visible"
        width="400px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="export-dialog"
    >
        <div slot="title" class="header">
            <div class="title">导出</div>
            <div class="options">
                <i class="iconfont icon-guanbi pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <el-form :model="form" ref="form" label-width="100px">
            <el-form-item label="年份">
                <el-select v-model="form.year">
                    <el-option
                        v-for="item in yearData"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="项目类型">
                <el-select v-model="form.investType">
                    <el-option
                        v-for="item in FeeInvestTypeAll"
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
    name: 'exportDialogManageIncome',
    props:{
        method:String,
        FeeInvestTypeAll: Array,
        yearData: Array
    },
    data() {
        return {
            visible: false,
            labelWidth: '100px',
            form: {
                year: '',
                investType: ''
            },
            enumType: {
                FeeMonth: []
            },
        };
    },
    mixins:[minix],
    mounted() {
    },
    methods: {
        // 打开弹窗
        open() {
            this.initForm();
            this.form.year = this.yearData[0].value
            this.form.investType = this.FeeInvestTypeAll[0].value
            this.visible = true;
        },
        // 初始化表单
        initForm() {
            this.form = {
                year: '',
                investType: ''
            };
        },
        // 新增、编辑
        submitForm() {
            this.visible = false;
            this.exportFile()
        },
        exportFile(){
            let params = {
                ...this.form
            }
            if (this.form.year === 'all') {
                params.year = ''
            }
            if (this.form.investType === 'all') {
                params.investType = ''
            }
            api[this.method](params).then(res=>{
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
