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
        <el-table :data="tableData" style="width: 100%"  :header-cell-style="{background:'#f5f9ff'}" border>
          <el-table-column label="费用分摊部门" width="150" align="center" prop="dept.deptName"></el-table-column>
          <el-table-column label="数量" align="center" prop="cost">
            <template slot-scope="scope">
              <el-input v-model="scope.row.cost" type="number" size="mini" class="input-txt-right">
                 <span slot="suffix" class="lh-28">%</span>
              </el-input>
            </template>
          </el-table-column>
        </el-table>
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
                console.log(res)
                if(res.code === 200){
                    this.tableData = res.data
                    console.log(this.tableData)
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
            padding-left: 115px;
        }
        .el-dialog__body{
            max-height: 500px;
            width: 100%;
            overflow: auto;
          tbody {
            tr td:first-child{
              background: #f5f9ff;
            }
          }
        }
    }
    .lh-28{line-height: 28px;}
    .input-txt-right{input{text-align: right;}}
</style>
