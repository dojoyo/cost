<template>
    <el-dialog
        :visible.sync="visible"
        width="400px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="record-dialog"
    >
        <div slot="title" class="header">
            <div class="title">查阅记录</div>
            <div class="options">
                <i class="iconfont icon-x1 pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <div class="max-height-content">
            <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#f5f9ff'}" border>
                <el-table-column label="人员" width="150" prop="user.userName"></el-table-column>
                <el-table-column label="查阅时间" align="center" prop="readTime"></el-table-column>
            </el-table>
        </div>
    </el-dialog>
</template>
<script>
import api from "@/api/cost";
export default {
    name: 'viewRecord',
    props: {
        month: String,
        year: String
    },
    data() {
        return {
            visible: false,
            tableData:[]
        };
    },
    mounted() {

    },
    methods: {
        // 打开弹窗
        open() {
            this.visible = true;
            this.getData()
        },
        getData(){
            api.messageList({
                year: this.year,
                month: this.month
            }).then(res=>{
                if(res.code === 200){
                    this.tableData = res.data;
                }
            })
        }
    }
};
</script>
<style lang="scss">
    .record-dialog{
        .el-dialog__title{
            line-height: 48px;
            padding-left: 15px;
        }
        .el-dialog__body{
            position: relative;
            height: 350px;
            width: 100%;
            padding-bottom: 40px!important;
            overflow: auto;
            .max-height-content {
                max-height: 295px;
                width: 100%;
                overflow: auto;
                .el-table{
                    tbody {
                        tr td:first-child{
                        background: #f5f9ff;
                        }
                    }
                }
            }
            
        }
    }
</style>
