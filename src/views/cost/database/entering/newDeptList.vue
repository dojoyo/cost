<template>
    <el-dialog
        :visible.sync="visible"
        width="350px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="new-dept-dialog"
    >
        <div slot="title" class="header">
            <div class="title">选择部门</div>
            <div class="options">
                <i class="iconfont icon-x1 pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <div class="max-dept-content">
            <el-checkbox-group v-model="checkList">
                <el-checkbox :label="dept" v-for="(dept, index) in tableData" :key="'dept'+index">{{dept.deptName}}</el-checkbox>
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
    name: 'newDeptList',
    data() {
        return {
            visible: false,
            tableData:[],
            checkList: [],
            id:''
        };
    },
    mounted() {

    },
    methods: {
        // 打开弹窗
        open(id) {
            this.id = id;
            this.visible = true;
            this.checkList = [];
            this.moreDatabaseList();
        },
        // 新增、编辑
        submitForm() {
            this.$emit('getNewDeptList', this.checkList)
            this.visible = false;
        },
        moreDatabaseList() {
            api.moreDatabaseList(this.id).then(res=>{
                if(res && res.code === 200){
                    this.tableData = res.data;
                }
            })
        }
    }
};
</script>
<style lang="scss">
    .new-dept-dialog{
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
