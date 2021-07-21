<template>
  <el-dialog :visible.sync="dialogVisible" width="850px" :show-close="false"  :append-to-body="append" top="50px" class="target-wrap" :close-on-click-modal="false" :close-on-press-escape="false">
    <div slot="title" class="header">
      <div class="title">
        <i class="iconfont icon-jieshu primary"></i> 结束目标
      </div>
      <div class="options">
        <i class="iconfont icon-guanbi pointer fs-22" @click="dialogVisible=false"></i>
      </div>
      <div class="clear"></div>
    </div>
    <div class="dialog-wrap">
      <el-row class="mt-15" v-for="item in list" style="border-bottom: solid 1px #ddd; padding-bottom: 20px">
        <el-col :span="3">
          <el-progress :type="'circle'" :percentage="item.progress || 0" :width="60"
                       :color="progressColor[item.progressState.value]"
                        style="float: left"></el-progress>
        </el-col>
        <el-col :span="21">
          <el-row>
            <el-col :span="24">
              {{item.keyResult || '********'}}&nbsp;&nbsp;<span v-show="item.progressUpdateType.value==='AC'">[权重{{item.weight}}%]</span><br/>
              <span class="pr-10">当前进度:{{item.progress}}%&nbsp;&nbsp;&nbsp;&nbsp;起始:{{item.startVal}}&nbsp;&nbsp;&nbsp;&nbsp;结束:{{item.endVal}}</span>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="3" style="padding-top: 9px">结果打分</el-col>
            <el-col :span="21">
              <el-slider v-model="item.score" :step="10" :marks="marks" :class="item.progressState.value" style="width: 97%" @input="sumScoreResult"> </el-slider>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="3" class="mt-20">结果总结</el-col>
            <el-col :span="21" class="mt-20">
              <el-input type="textarea" placeholder="请输入内容" v-model="item.summary"></el-input>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px">
        <el-col :span="3">项目总结</el-col>
        <el-col :span="21">
          <el-input type="textarea" placeholder="请输入内容" v-model="summary"></el-input>
        </el-col>
      </el-row>

      <el-row style="margin-top: 15px">
        <el-col :span="20">
          <el-button type="primary" size="mini" class="mr-10" @click="setScore">确定</el-button>
          <el-button size="mini" @click="dialogVisible=false">取消</el-button>
        </el-col>
        <el-col :span="4" class="txt-right">
          <i class="iconfont icon-target"></i>得分:{{result.toFixed(2)}}
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>
<style lang="scss" scoped></style>
<script>
  import api from '@/api/okr'
  export default {
    name: 'targetClose',
    props: {
      stage: Object,
      type:String,
      visible: {
        type: Boolean,
        default() {
          return false
        }
      },
      append: {
        type: Boolean,
        default() {
          return false
        }
      },
      id:String
    },
    components:{},
    computed: {
      progressColor() {
        return this.$store.getters.progressColor
      }
    },
    data() {
      return {
        dialogVisible:false,
        list:[],
        result:0,
        summary:'',
        marks:{
          0:'0',10:'10',20:'20',30:'30',40:'40',50:'50',60:'60',70:'70',80:'80',90:'90',100:{
            style: {
              width: '30px'
            },
            label: '100'
          }
        }
      }
    },
    watch:{
      id(val){
        if(val){
         this.id = val;
         this.getScoreInfo();
         this.dialogVisible = true;
        }
      }
    },
    created() {},
    methods: {
      //获取评分信息
      getScoreInfo(){
        api.scoreInfo(this.id).then(res => {
          if (res.code === 200) {
            this.list = res.data
          }
        }).catch(err => {
          console.log(err);
        })
      },
      // 计算总分
      sumScoreResult(){
        let score = 0;
        if(this.type==='MU'){
          for(let i in this.list){
            score+=Number(this.list[i].score || 0);
          }
          score = score/this.list.length
        }else { //自动关联
          for(let i in this.list){
            score+=Number(this.list[i].score*this.list[i].weight/100);
          }
        }
        this.result = score;
      },
      //保存评分信息
      setScore(){
        let params = {
          objScore:this.result,
          scoreType:'PS',//todo 暂时hradcode 可用值:PS-个人评分,SS-上级评分
          summary:this.summary,
        }
        for(let i in this.list){
          params['scores['+i+'].keResultScore'] = Number(this.list[i].score);
          params['scores['+i+'].keyResultId'] = this.list[i].keyResultId;
          params['scores['+i+'].keyResultSummary'] = this.list[i].summary;
        }
        console.log(params);

        let _this = this;
        let h = this.$createElement;
        this.$msgbox({
          title: '评分内容',
          message: h('div', null, (()=>{
            let arr = [];
            for(let i in _this.list){
              arr.push(h('div', null, [
                h('span', null, '关键结果【'+_this.list[i].keyResult+'】评分：'),
                h('span', { style: 'color: orange; fontWeight:bold' }, _this.list[i].score+'分'),
                h('span', null, '  总结：'),
                h('span', { style: 'color: orange; fontWeight:bold' }, _this.list[i].summary),
              ]));
            }
            arr.push(h('div', null, [
              h('span', null, '项目评分：'),
              h('span', { style: 'color: orange; fontWeight:bold' }, _this.result + '分')
            ]));
            arr.push(h('div', null, [
              h('span', null, '项目总结：'),
              h('span', { style: 'color: orange; fontWeight:bold' }, _this.summary || '')
            ]));
            return arr
          })()),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass:'confirm-btn-scope'
        }).then(action => {
          api.setScore(params, this.id).then(res => {
            if (res.code === 200) {
              this.$message.success({message: '项目评分成功!', duration: 1500});
              this.dialogVisible = false;
              this.$emit('TARGET_FINISH');
            }
          }).catch(err => {
            console.log(err);
          })
        }).catch(() => {
        });

      },
      //关闭评分面板
      closePanel(){
        this.$emit('closeTargetFinishPanel');
      }
    }
  }
</script>


