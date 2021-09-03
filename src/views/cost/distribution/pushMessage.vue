<template>
    <el-dialog
        :visible.sync="visible"
        width="350px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="push-user-dialog"
    >
        <div slot="title" class="header">
            <div class="title">选择人员</div>
            <div class="options">
                <i class="iconfont icon-x1 pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <div class="max-dept-content">
            <el-checkbox-group v-model="checkList">
                <el-checkbox :label="user" v-for="(user, index) in messageUsers" :key="'dept'+index">{{user.userName}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="visible = false">取 消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import api from "@/api/cost";
export default {
    name: 'pushMessage',
    props: {
        messageUsers: Array,
        month: String,
        year: String
    },
    data() {
        return {
            visible: false,
            checkList: []
        };
    },
    mounted() {

    },
    methods: {
        // 打开弹窗
        open() {
            this.visible = true
            this.checkList = []
        },
        // 新增、编辑
        submitForm() {
            let params = {
                userIds: [],
                year: this.year,
                month: this.month
            }
            if (!this.checkList.length) {
                this.$message.warning('请选择人员')
            } else {
                this.checkList.forEach(item => {
                    params.userIds.push(item.userId)
                })
                api.messagePush(params).then(res => {
                    if (res && res.code === 200) {
                        this.$message.success('操作成功')
                        this.visible = false;
                    }
                })
            }
        }
    }
};
</script>
<style lang="scss">
    .push-user-dialog{
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
            padding-left: 100px;
        }
        .el-dialog__body{
            height: 300px!important;
            width: 100%;
            overflow: auto;
        }
        
        .el-checkbox-group {
            > label {
                width: 100%;
                margin: 5px 0;
            }
        }
    }
</style>
