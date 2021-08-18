<template>
    <el-dialog
        :visible.sync="visible"
        width="500px"
        :show-close="false"
        :close-on-click-modal="false"
        custom-class="cost-dialog"
    >
        <div slot="title" class="header">
            <div class="title">费用分摊设置</div>
            <div class="options">
                <i class="iconfont icon-x1 pointer fs-22" @click="visible=false"></i>
            </div>
            <div class="clear"></div>
        </div>
        <div class="max-height-content">
            <el-table :data="tableData" style="width: 100%"  :header-cell-style="{background:'#f5f9ff'}" border>
                <el-table-column label="费用分摊部门" width="150" align="center" prop="dept.deptName"></el-table-column>
                <el-table-column label="数量" align="center" prop="cost">
                    <template slot-scope="scope">
                    <el-input v-model="scope.row.cost" type="number" size="mini" class="input-txt-right">
                        <span slot="suffix" class="lh-28">%</span>
                    </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="60" fixed="right" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="del(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="button-fixed-bottom">
            <el-button type="text" icon="el-icon-plus" class="blue-active" @click="showNewDeptList">新增部门</el-button>
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
    name: 'laborAddAndEdit',
    data() {
        return {
            visible: false,
            tableData:[],
            id:''
        };
    },
    mounted() {

    },
    methods: {
        // 打开弹窗
        open(query) {
            this.visible = true;
            this.id = query
            this.getData(query)
        },
        // 新增、编辑
        submitForm() {
            console.log(this.tableData)
            let list = []
            this.tableData.forEach(item=>{
                if(item.cost){
                    list.push({
                        cost:parseFloat(item.cost),
                        deptId:item.dept.deptId
                    })
                }
            })
            api.setCostShare({
                id:this.id,
                data: list
            }).then(res=>{
                if(res.code === 200){
                    this.visible = false
                    this.$message.success({ message: "设置成功!", duration: 1500 });
                }
            })
        },
        getData(id){
            api.costShareList(id).then(res=>{
                if(res.code === 200){
                    this.tableData = res.data;
                }
            })
        },
        del(data){
            this.$confirm('即将删除数据，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const index = this.tableData.indexOf(data)
                this.tableData.splice(index, 1)
            }).catch(err => {});
        },
        showNewDeptList() {
            this.$parent.$parent.$refs.newDeptList.open(this.id);
        },
        setNewDeptList(data) {
            let hasDept = false;
            data.forEach(item => {
                for(let i=0;i<this.tableData.length;i++) {
                if (item.deptId === this.tableData[i].dept.deptId) {
                    hasDept = true;
                    break;
                }
                }
                if (!hasDept) {
                this.tableData.push({
                    cost: '',
                    dept: {
                    deptId: item.deptId,
                    deptName: item.deptName
                    }
                })
                }
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
            padding-left: 80px;
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
    .lh-28{line-height: 28px;}
    .input-txt-right{input{text-align: right;}}
    .blue-active{color: #3C6CBA!important;}
    .button-fixed-bottom{
        position: absolute;
        bottom: 0;
        left: 15px;
    }
</style>
