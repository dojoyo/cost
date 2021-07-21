<template>
  <el-dialog :visible.sync="visible" width="600px" :show-close="false" :append-to-body="append" top="50px" class="target-wrap">
    <div slot="title" class="header">
      <div class="title">
        <i class="iconfont icon-wodemubiao primary"></i> {{title}}({{list.length}})
      </div>
      <div class="options">
        <i class="iconfont icon-guanbi pointer fs-22" @click="visible=false"></i>
      </div>
      <div class="clear"></div>
    </div>
    <div class="dialog-wrap">
      <el-table :data="list" :header-cell-style="{background:'#f3f3f3'}">
        <el-table-column label="员工" width="200">
          <template slot-scope="scope">
            <div class="flex" style="line-height: 32px" v-if="list[scope.$index]">
              <avatar :user="list[scope.$index]" />&nbsp;&nbsp; {{list[scope.$index].userName}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="dept.deptName" label="部门" width="200"></el-table-column>
        <el-table-column prop="position.name" label="职位"></el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<style lang="scss" scoped>

</style>
<script>
  import avatar from '@/components/avatar'
  import api from '@/api/okr'
  export default {
    name: 'TargetMembers',
    props: {
      append: {
        type: Boolean,
        default() {
          return false
        }
      },
      params:Object
    },
    components:{avatar},
    computed: {
      progressColor() {
        return this.$store.getters.progressColor
      },
    },
    data() {
      return {
        title:'',
        list:[],
        visible:false,
        dialogVisible:false,
        detail:{}
      }
    },
    watch:{
      params(val){
        if(val.params){
          console.log(val.params)
          if(val.params.type==='follow'){//关注列表
            this.getFollow()
          }else {
            this.getObjUsers()
          }

        }
      }
    },
    created() {},
    mounted(){},
    methods: {
      getFollow(){
        this.title = this.params.title;
        this.list = [];
        api.followList(this.params.params.id).then(res => {
          if (res.code === 200) {
            this.list = res.data;
            this.visible = true
          }
        }).catch(err => {
          console.log(err);
        })
      },
      getObjUsers(){
        this.title = this.params.title;
        this.list = [];
        api.objUsers(this.params.params).then(res => {
          if (res.code === 200) {
            this.list = res.data;
            if(res.data && res.data.length>0){
              this.visible = true
            }
          }
        }).catch(err => {
          console.log(err);
        })
      }
    },
  }
</script>

