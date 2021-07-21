<template>
  <el-dialog :visible.sync="visible" width="600px" :show-close="false" top="50px" class="target-wrap" :append-to-body="true">
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
      <el-row v-for="item in list">
        <el-col class="obj-wrap" :span="24" @click.native="getDetail(item)">
          <div class="title">
            <div class="type">{{item.objTypeDisplay}}</div>
            <div class="name">{{item.objName}}</div>
          </div>
          <div class="w-100p">
            <div class="progress">
              <el-progress v-if="item.progressState" :percentage="item.progress" :color="progressColor[item.progressState.value]"></el-progress>
            </div>
            <div class="tips">
              <div v-if="params.view==='KR'">{{item.progressState && item.progressState.name}}数量:{{item.keyResultCount}}&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div v-if="params.view==='PC'">更新进度次数：{{item.progressUpdateCount}}&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div v-if="params.view==='SC'">得分：{{item.scores && item.scores['个人评分']}}&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <avatar :user="item.objUser" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <target-detail style="z-index: 3000" :visible="dialogVisible" :obj="detail" :append="true" v-on:closeTargetDetail="dialogVisible=false" v-on:refresh="getObjList()" />
  </el-dialog>
</template>
<style lang="scss" scoped>
  .obj-wrap{
    padding-bottom: 5px; margin-top: 10px; border-bottom: solid 1px #ddd; cursor: pointer;
    .title{
      align-items: center;
      display: flex;
      width: 100%;
      .type{
        padding: 3px 5px; border: solid 1px #ddd; border-radius: 5px; margin-right: 20px
      }
      .name{
        font-weight: bold;font-size: 16px; color: #4e545f
      }
    }
    .progress{
      width: 70%;float: left; margin-top: 8px
    }
    .tips{
      width: 30%;float: left; display: flex; line-height: 32px; justify-content:flex-end
    }
  }
  .obj-wrap:hover{
    background: #f5f7fa;
  }
</style>
<script>
  import avatar from '@/components/avatar'
  import targetDetail from '@/components/target/detail'
  import api from '@/api/okr'
  export default {
    name: 'TargetStatistics',
    props: {
      append: {
        type: Boolean,
        default() {
          return false
        }
      },
      params:Object
    },
    components:{avatar, targetDetail},
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
          console.log(val);
          this.getObjList()
        }
      }
    },
    created() {},
    mounted(){},
    methods: {
      getObjList(){
        this.title = this.params.title;
        this.list = [];
        api.objQuery(this.params.params).then(res => {
          if (res.code === 200) {
            this.list = res.data;
            if(res.data && res.data.length>0){
              this.visible = true
            }
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //获取目标详情
      getDetail(e){
        api.objDetail(e.objId).then(res => {
          if (res.code === 200) {
            this.dialogVisible = true;
            this.detail = res.data;
          }
        }).catch(err => {
          console.log(err);
        })
      },
    },
  }
</script>

