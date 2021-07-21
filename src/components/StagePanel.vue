<template>
  <div>
    <div @click="showStagePanel" style="cursor: pointer; font-size: 14px; color: #48525C; margin-right: 16px">
      <!--<i class="iconfont icon-fenlei mr-10 primary fs-12"></i>-->
      {{stage.cur.periodName}}<!--stage.dateTips-->
      <i class="iconfont icon-arrow-down-2 pl-10 fs-12" v-show="!stage.panelVisible"></i>
      <i class="iconfont icon-shouqi pl-10 fs-12" v-show="stage.panelVisible"></i>
    </div>
    <div class="stage-panel" v-show="stage.panelVisible">
      <div class="panel-body">
        <el-button  size="mini" @click="showRankPanel"><i class="iconfont icon-rili fs-12 mr-10 primary"></i>{{stage.dateTips}}<i class="iconfont icon-arrow-down-2 pl-10 fs-12" v-show="!stage.rankPanelVisible"></i>  <i class="iconfont icon-shouqi pl-10 fs-12" v-show="stage.rankPanelVisible"></i></el-button>
        <el-scrollbar class="scrollbar">
          <el-table v-if="stage.list && stage.list.length>0"
                    :data="stage.list" style="width: 100%; margin-top: -10px" :header-cell-style="{lineHeight:'28px'}"
                    :cell-style="{cursor:'pointer'}"
                    @row-click = "setCurStage"
          >
            <el-table-column label="周期名称">
              <template slot-scope="scope">
                <el-radio v-model="stage.curID" :label="stage.list[scope.$index].id">{{stage.list[scope.$index].periodName}}</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="periodStart" label="开始日期" width="150"></el-table-column>
            <el-table-column prop="periodEnd" label="结束日期" width="150"></el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </div>
    <div class="date-rank-panel"  v-show="stage.rankPanelVisible">
      <span class="btn" @click="setDateRank(1)">本月</span>
      <span class="btn" @click="setDateRank(2)">最近2个月</span>
      <span class="btn" @click="setDateRank(3)">最近半年</span>
      <span class="btn" @click="setDateRank(4)">本年</span>
      <el-divider></el-divider>
      <el-date-picker style="width: 200px;margin-left: 13px"
                      v-model="stage.startTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
      </el-date-picker>
      <div style="line-height: 12px; display: block; width: 100%; text-align: center"><i class="iconfont icon-arrow-down"></i></div>
      <el-date-picker style="width: 200px;margin-left: 13px"
                      v-model="stage.endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
      </el-date-picker>
      <div style="text-align: center;margin-top: -10px">
        <el-button type="primary" round size="mini" @click="setDateRank">确定</el-button>
        <el-button round size="mini" @click="stage.rankPanelVisible=false">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  let moment = require("moment");
  import api from '@/api/okr'
  export default {
    name: 'StagePanel',
    props: {},
    data() {
      return {
        stage:{
          panelVisible:false,
          rankPanelVisible:false,
          dateTips:'',
          startTime:'',
          endTime:'',
          list:[],
          cur:'',
          curID:''
        }
      }
    },
    watch:{
      stage(val){
        console.log(val)
      }
    },
    computed: {
      cutStage() {
        return this.$store.getters.stage
      }
    },
    created() {
      this.setDateRank(5);
      //this.getStageList();
    },
    methods: {
      //获取周期列表
      getStageList(){
        api.periodList({periodStart:this.stage.startTime,periodEnd:this.stage.endTime}).then(res => {
          if (res.code === 200) {
            this.stage.list = res.data;
            if(!this.cutStage){
              this.stage.cur=this.stage.list[0];
              this.stage.curID = this.stage.list[0].id;
              this.$store.dispatch('SetStage', this.stage.cur);
            }else {
              this.stage.cur=this.cutStage;
              this.stage.curID = this.cutStage.id;
            }
            this.$emit('stageChange',this.stage.cur);
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //显示周期选择面板
      showStagePanel(){
        this.stage.panelVisible = !this.stage.panelVisible;
        if(this.stage.panelVisible){
          this.getStageList();
        }
      },
      //显示周期时间范围选择面板
      showRankPanel(){
        this.stage.rankPanelVisible = !this.stage.rankPanelVisible;
      },
      //执行设置周期时间范围
      setStageDate(start,end,tips){
        this.stage.startTime = start;
        this.stage.endTime = end;
        this.stage.dateTips = tips;
        this.getStageList();
      },
      //设置周期时间范围
      setDateRank(type){
        let start,end;
        switch (type){
          case 1://本月
            start = moment().add(0,'month').format('YYYY-MM') + '-01';
            end = moment(start).add(1,'month').add(-1,'days').format('YYYY-MM-DD');
            this.setStageDate(start,end,'本月');
            //this.getStageList();
            this.stage.rankPanelVisible = false;
            break
          case 2://最近2个月
            start = moment().add(-1,'month').format('YYYY-MM') + '-01';
            end = moment(start).add(2,'month').add(-1,'days').format('YYYY-MM-DD');
            this.setStageDate(start,end,'最近2个月');
            //this.getStageList();
            this.stage.rankPanelVisible = false;
            break
          case 3://最近半年
            start = moment().add(-5,'month').format('YYYY-MM') + '-01';
            end = moment(start).add(6,'month').add(-1,'days').format('YYYY-MM-DD');
            this.setStageDate(start,end,'最近半年');
            //this.getStageList();
            this.stage.rankPanelVisible = false;
            break
          case 4://本年
            //this.setStageDate(moment().year()+'-01-01',moment().year()+'-12-31',moment().year()+'全年');
            this.setStageDate(moment().year()+'-01-01','2029-12-31',moment().year()+'全年');
            //this.getStageList();
            this.stage.rankPanelVisible = false;
            break
          case 5://去年
            //this.setStageDate(moment().year()+'-01-01',moment().year()+'-12-31',moment().year()+'全年');
            this.setStageDate((moment().year()-1)+'-01-01','2029-12-31',moment().year()+'全年');
            //this.getStageList();
            this.stage.rankPanelVisible = false;
            break
          default:
            this.setStageDate(this.stage.startTime,this.stage.endTime,this.stage.startTime+'~'+this.stage.endTime);
            this.stage.rankPanelVisible = false;
        }
      },
      //设置当前周期
      setCurStage(cur){
        this.stage.cur = cur;
        this.stage.curID = cur.id;
        this.stage.panelVisible = false;
        this.$emit('stageChange',this.stage.cur);
        this.$store.dispatch('SetStage', this.stage.cur);
      },
      setStage(e){
        console.log(e)
      }
    }
  }
</script>

<style lang="scss">
  .stage-panel{
    position: absolute;
    width: 600px;
    z-index: 100;
    background: #fff;
    border: solid 1px #eee;
    /*right: 0;*/
    /*top: 44px;*/
    left:90px;
    top: 59px;
    margin: 0;
    padding: 0;
    .panel-body {
      position: relative;
      padding: 10px 20px;
      height: 322px;
      overflow: hidden;
    }
    .panel-body:after {
      content: '';
      position: absolute;
      width: 570px;
      height: 15px;
      background: #fff;
      left: 20px;
      bottom: 0;
      z-index: 11;
    }
    .scrollbar{
      height:242px; margin-top: 10px
    }
  }
  .date-rank-panel{
    position: absolute;
    width: 230px;
    z-index: 101;
    background: #fff;
    border: solid 1px #eee;
    /*right: 277px;*/
    /*top: 100px;*/
    left:90px;
    top: 130px;
    margin: 0;
    padding: 0;
    .btn{
      display: block;
      height: 40px;
      line-height: 40px;
      color: #666;
      cursor: pointer;
      padding-left: 15px;
      transition: all 0.5s;
      -webkit-transition: all 0.5s;
    }
    .btn:hover{
      background: #eee;
      padding-left: 30px;
    }
  }
</style>
