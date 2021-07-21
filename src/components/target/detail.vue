<template>
  <el-dialog :visible.sync="dialogVisible" width="850px" top="50px" :show-close="false"  class="target-wrap" :append-to-body="append" :close-on-click-modal="false" :close-on-press-escape="false">
    <div slot="title" class="header" id="dialog">
      <div class="title">
        <i class="iconfont icon-fenlei primary"></i> {{target.period && target.period.periodName}}
      </div>
      <div class="options">
        <el-tooltip class="item" effect="dark" content="编辑目标" placement="top" v-show="target.privileges && target.privileges.editObj">
          <i class="iconfont icon-bianji pointer fs-22 mr-10" @click="editTarget()"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="结束目标" placement="top"  v-show="target.privileges && target.privileges.closeObj">
          <i class="iconfont icon-jieshu pointer fs-22 mr-10" @click="getScoreInfo()"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除目标" placement="top" v-show="target.privileges && target.privileges.deleteObj">
          <i class="iconfont icon-delete pointer fs-22 mr-10" @click="deleteTarget()"></i>
        </el-tooltip>
        <i class="iconfont icon-guanbi pointer fs-22" @click="dialogVisible=false"></i>
      </div>
      <div class="clear"></div>
    </div>
    <el-row v-if="target.objParent">
      <el-col :span="24"><i class="iconfont icon-home mr-10"></i>父目标：{{target.objParent && target.objParent.objName}}&nbsp;&nbsp;&nbsp;&nbsp; 进度{{target.objParent?target.objParent.objProgress.progress:0}}%</el-col>
      <!--<el-col :span="3"><el-progress :percentage="target.objParent?target.objParent.objProgress.progress:0" :color="progressColor[target.objParent.objProgress.progressState.value]"></el-progress></el-col>-->
    </el-row>
    <el-row :gutter="20">
      <el-col :span="15">
        <i class="iconfont icon-mubiao_normal fs-22 pr-10"></i>
        <span class="fs-22 gray-dark">{{target.objName}}</span>
        <br/>
        <span class="fs-14 gray">
            目标类型：{{target.objType==='DP' ? '部门' : ''}}{{target.objType==='PS' ? '个人' : ''}}{{target.objType==='CP' ? '公司':''}}&nbsp;&nbsp;&nbsp;&nbsp;
            截止时间：{{target.period && target.period.periodEnd}}&nbsp;&nbsp;&nbsp;&nbsp;
            更新时间：<span v-show="target.progressUpdateTime">{{target.progressUpdateTime | DateTime}}</span>
        </span>
        <el-progress class="mt-5" v-if="target.progressUpdateType && target.progressUpdateType.value==='AC' && target.objProgress" :percentage="target.objProgress?Number(target.objProgress.progress.toFixed(2)):0"
                     :color="progressColor[target.objProgress.progressState.value]"></el-progress>
        <el-slider v-if="target.progressUpdateType && target.progressUpdateType.value==='MU'"
                   v-model="target.objProgress && target.objProgress.progress"
                   :class="target.objProgress.progressState.value"
                   :disabled="!(target.privileges && target.privileges.updateProgress && target.objState && target.objState.value!=='CM')"
        ></el-slider>
      </el-col>
      <el-col :span="4" :offset="1" style="border-right:solid 1px #eee;">
        <div>
          <i class="iconfont icon-fuzeren pr-10"></i><span class="fs-14 gray">负责人</span><br/>
        </div>
        <div class="flex" style="margin-top: 5px; margin-left: 20px">
          <avatar :user="target.objUser"  />
          <div class="fs-14 gray" style="padding:5px 0 0 5px">{{target.objUser && target.objUser.userName}}</div>
        </div>
      </el-col>
      <el-col :span="3" class="txt-center">
        <i class="iconfont icon-pingfen pr-10"></i><span class="fs-14 gray">评分</span><br/>
        <span class="fs-32 primary">{{target.scores && target.scores['个人评分'] || '--'}}</span>
      </el-col>
    </el-row>
    <el-row class="mt-15" style="line-height: 28px; padding-bottom: 5px; border-bottom: solid 1px #ddd" >
      <el-col :span="24"><i class="iconfont icon-guanjianjiedian pr-10"></i>关键结果</el-col>
    </el-row>

    <el-row class="mt-15" style="line-height: 28px;" v-for="(item,index) in target.keyResults">
      <el-col :span="(target.privileges && target.privileges.updateProgress  && item.canView && item.progressState)?16:24" class="flex circle-progress">
        <el-progress :type="'circle'" :percentage="item.progress || 0" :width="60" :color="progressColor[(item.progressState && item.progressState.value) || 'NM']" class="fl" :class="item.progressState && item.progressState.value"></el-progress>
        <div style="margin-left: 15px; float: left">
          {{item.keyResult || '********'}}&nbsp;&nbsp;<span v-show="target.progressUpdateType.value==='AC'">[权重{{item.weight}}%]</span><br/>
          <span class="pr-10">当前进度:</span>

          <span v-if="target.privileges && target.privileges.updateProgress">
            <span v-if="item.canView===true && item.unitType.value==='SD'">
               <el-input  v-model="item.curVal"
                          size="mini" style="width:120px">
              <span slot="append">{{item.unit}}</span>
              </el-input>
            &nbsp;&nbsp;&nbsp;&nbsp;起始:{{item.startVal}}{{item.unit}}&nbsp;&nbsp;目标:{{item.endVal}}{{item.unit}}
            </span>


            <el-switch v-if="item.canView===true && item.unitType.value==='YN'"
                       v-model="item.curVal"
                       :active-value="100"
                       :inactive-value="0"
                       active-text="完成"
                       inactive-text="未完成"
                       :disabled="target.objState && target.objState.value==='CM'"
            >
            </el-switch>
             <span v-show="target.scores">{{item.canView?item.curVal:'**'}}%</span>
             <span v-show="!target.scores && item.canView===false">**%</span>
          </span>

          <span v-if="target.privileges && !target.privileges.updateProgress">
            <span v-show="item.canView">
               <span v-show="item.unitType.value === 'SD'">{{item.curVal}}{{item.unit}}</span>
               <span v-show="item.unitType.value === 'YN'">{{item.curVal===0?'未完成':'完成'}}</span>
            </span>
            <span v-show="!item.canView">
                ****
            </span>
          </span>
        </div>
      </el-col>
      <el-col :span="8" class="txt-right" v-if="target.privileges && target.privileges.updateProgress && item.canView && item.progressState">
        状态
        <el-radio-group v-model="item.progressState.value" style="margin-left: 10px">
          <el-radio v-for="radio in enumType.ProgressState" :label="radio.value" :class="radio.value" :disabled="target.objState && target.objState.value==='CM'">{{radio.name}}
          </el-radio>
        </el-radio-group>
        <br/>
        <el-button type="text" @click="showScoreRule(index)" v-show="target.objState && target.objState.value!=='CM'">设置打分规则</el-button>
      </el-col>
      <el-col :span="24">
        <div style="width: 95%; height: 1px; background: #efefef; margin-left: 2.5%; margin-top: 15px"></div>
      </el-col>
    </el-row>

    <el-row class="mt-15" v-show="target.privileges && target.privileges.updateProgress"><!--!target.scores && target.objState && target.objState.value!=='CM' -->
      <el-col :span="24">
        <dialog-panel :comment="comment" :tips="'更新进度说明'" v-on:setComment="setComment"/>
        <el-button type="primary" size="mini" round  @click="updateProgress" class="mt-15">更新进度</el-button>
      </el-col>
    </el-row>
    <div class="form mt-15" style="border-bottom:solid 1px #ddd;padding-bottom: 15px">
      <el-row class="user-wrap">
        <el-col :span="24" class="flex" style="line-height: 32px">
          <div class="pr-10"><i class="iconfont icon-fuzeren pr-10"></i>参与人</div>
          <div class="avatar" v-for="(item,index) in target.objMembers" @click="showObjMembersPanel">
            <span v-show="target.privileges && target.privileges.editObj  && !target.scores" class="close" @click.stop><i class="iconfont icon-guanbi" @click="removeObjMembers(index)"></i></span>
            <avatar :user="item" />
          </div>
          <div v-show="target.privileges && target.privileges.editObj && !target.scores"><i class="iconfont icon-tianjia pointer fs-22" @click="showObjMembersPanel"></i></div>
          <member-panel
            top="-360px"
            left="-275px"
            xKey="team"
            :visible="objMembersPanel"
            :member="target.objMembers"
            v-on:close="closeObjMembersPanel"
            v-on:setMember="setObjMembersMember" />
        </el-col>
      </el-row>
    </div>
    <!--互动操作-->
    <target-operation :id="target.objId" :type="'obj'" :status="target.objState && target.objState.value" :user="target.objUser" class="mt-15" ref="operation" v-on:replyUser="replyUser" />
    <div slot="footer">
      <target-dialog :id="target.objId" v-on:refreshOperation="refreshOperation" ref="dialog" />
    </div>

    <!--设置打分规则-->
    <target-score :target="target" :append="true" :index="score.index" v-on:TARGET_SCORE="getDetail"/>
    <!--编辑目标-->
    <target-edit :stage="target.period" :detail="edit.detail" :append="true" :type="'modify'" :id="target.objId" v-on:TARGET_EDIT="getDetail"/>
    <!--关闭目标-->
    <target-finish :stage="target.period" :append="true" :id="finish.id" :type="target.progressUpdateType && target.progressUpdateType.value"  v-on:TARGET_FINISH="getDetail" />
    <!--沟通选项-->
    <target-communicate :params="communicate" :append="true" v-on:SEND_COMMUNICATE="onCommunicate" />

  </el-dialog>
</template>
<style>
  .confirm-btn-scope{
    background: #3C6CBA!important;
    border-color: #3C6CBA!important;
    color: #fff!important;
  }
</style>
<script>
  import dialogPanel from '@/components/DialogPanel'
  import targetEdit from '@/components/target/edit'
  import targetScore from '@/components/target/score'
  import targetFinish from '@/components/target/finish'
  import targetOperation from '@/components/target/operation'
  import targetDialog from '@/components/target/dialog'
  import targetCommunicate from '@/components/target/communicate'
  import avatar from '@/components/avatar'
  import memberPanel from '@/components/MemberPanel'

  import api from '@/api/okr'
  export default {
    name: 'TargetDetail',
    props: {
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
      obj:Object
    },
    components:{dialogPanel, memberPanel, avatar, targetEdit, targetFinish, targetOperation, targetScore, targetDialog, targetCommunicate},
    computed: {
      progressColor() {
        return this.$store.getters.progressColor
      },
      user(){
        return this.$store.getters.user
      }
    },
    data() {
      return {
        dialogVisible:false,
        msg:'',
        enumType:{},
        scoreRule:{
          dialogVisible:false,
          form:{},
          keyResult:{}
        },
        comment:{},
        target:{},
        objMembersPanel:false,
        edit:{
          visible:false,
          detail:{}
        },
        finish:{
          visible:false,
          id:'',
        },
        operation:{
          visible:false,
          id:''
        },
        score:{
          visible:false,
          id:''
        },
        communicate:{
          users:[],
          panelVisible:false,
          comment:{},
          msg:'',
          dialogVisible:false,
          params:{}
        }
      }
    },
    watch:{
      obj(val){
        this.target = val;
        for(let i in val.keyResults){
          this.$set(this.target.keyResults[i],'progressTxt',val.keyResults[i].progress);
        }
        this.target.objMembers = this.target.objMembers || [];

        this.dialogVisible = true;
      }
    },
    created() {
      this.getEnum('ProgressState');
    },
    mounted(){
      this.userInfo = {
        userAvatar:this.user.user.jwtClaims.ua,
        userId:this.user.user.jwtClaims.id,
        userName:this.user.user.jwtClaims.un,
        size:35
      };
    },
    methods: {
      //获取枚举类型
      getEnum(type){
        api.getEnum(type).then(res => {
          if (res.code === 200) {
            this.$set(this.enumType,type,res.data)
          }
        }).catch(err => {
          console.log(err);
        })
      },
      closeDialog(){
        this.dialogVisible = false
        this.$emit('closeTargetDetail');
      },
      //关闭
      targetDetail(){
        this.dialogVisible = false;
        this.$emit('TARGET_DETAIL');
      },
      //显示评分规则
      showScoreRule(index){
        console.log(index)
        this.score = {index:index}
      },
      //更新进度
      updateProgress(){
        let params = {
          'comment.content':this.comment.content || '',
        }
        if(this.comment.attachments && this.comment.attachments.length>0){
          for(let x in this.comment.attachments){
            params['comment.attachments['+x+']'] = 'https://dev-oss.cgvcap.com/file/'+this.comment.attachments[x].fileId+'/'+this.comment.attachments[x].accessCode
          }
        }

        if(this.target.progressUpdateType.value==='MU'){
          params.progress = this.target.objProgress.progress;
        }

        let j = 0;
        for(let i in this.target.keyResults){
          if(this.target.keyResults[i].canView){
            params['keyResults['+j+'].keyResultId'] = this.target.keyResults[i].keyResultId;
            params['keyResults['+j+'].progress'] = this.target.keyResults[i].progress;
            params['keyResults['+j+'].curVal'] = Number(this.target.keyResults[i].curVal);
              /*
              (()=>{
              if(this.target.keyResults[i].unitType.value==='SD'){
                return this.target.keyResults[i].progress
              }else {
                this.target.keyResults[i].progress
              }
            })();
            */
            params['keyResults['+j+'].progressState'] = this.target.keyResults[i].progressState?this.target.keyResults[i].progressState.value:'';
            j++
          }
        }

        console.log(params);


        if(this.target.progressUpdateType.value==='MU'){
          let _this = this;
          let h = this.$createElement;
          this.$msgbox({
            title: '更新提示',
            message: h('div', null, (()=>{
              let arr = [];

              if(this.target.progressUpdateType.value==='MU'){
                arr.push(h('div', null,
                  [
                    h('span', null, '目标进度：'),
                    h('span', { style: 'color: orange; fontWeight:bold' }, (params.progress||0)+'%')
                  ]));
              }

              for(let i in _this.target.keyResults){
                if(_this.target.keyResults[i].canView){
                  if(_this.target.keyResults[i].unitType.value==="SD"){//自定义单位
                    arr.push(h('div', null, [
                      h('span', null, '关键结果【'+_this.target.keyResults[i].keyResult+'】进度：'),
                      h('span', { style: 'color: orange; fontWeight:bold' }, _this.target.keyResults[i].curVal + _this.target.keyResults[i].unit)
                    ]));
                  }else {//开始完成
                    arr.push(h('div', null, [
                      h('span', null, '关键结果【'+_this.target.keyResults[i].keyResult+'】进度：'),
                      h('span', { style: 'color: orange; fontWeight:bold' }, _this.target.keyResults[i].curVal===0?'未完成':'完成')
                    ]));
                  }
                }
              }

              let comment = _this.removeSpan(_this.comment.content || '');
              arr.push(h('div', null, [
                h('span', null, '更新说明：'),
                h('span', { style: 'color: orange; fontWeight:bold' }, comment)
              ]));
              return arr
            })()),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            confirmButtonClass:'confirm-btn-scope'
          }).then(action => {
            api.updateProgress(params, this.target.objId).then(res => {
              if (res.code === 200) {
                this.comment = {
                  hidden:true
                };
                this.getDetail();
                this.refreshOperation();
                this.$message.success({message: '进度更新成功!', duration: 1500})
                /*
                this.$confirm('进度更新成功，是否发系统消息通知他人？', '提示', {
                  confirmButtonText: '是',
                  cancelButtonText: '否',
                  type: 'warning'
                }).then(() => {//进行通知
                  this.communicate = {
                    users:[],
                    panelVisible:false,
                    comment:{},
                    dialogVisible:true,
                    params:{},
                    type:'new',
                    id:this.target.objId,
                    messageType:res.data.messageType.value,
                    activities:res.data.activities
                  };
                }).catch(err => {
                  this.targetDetail();
                });
                */
              }
            }).catch(err => {
              console.log(err);
            })
          }).catch(() => {
          });
        }else {
          api.updateProgress(params, this.target.objId).then(res => {
            if (res.code === 200) {
              this.comment = {
                hidden:true
              };
              this.getDetail();
              this.refreshOperation();
              this.$message.success({message: '进度更新成功!', duration: 1500})

              /*
              this.$confirm('进度更新成功，是否发系统消息通知他人？', '提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
              }).then(() => {//进行通知
                this.communicate = {
                  users:[],
                  panelVisible:false,
                  comment:{},
                  dialogVisible:true,
                  params:{},
                  type:'new',
                  id:this.target.objId,
                  messageType:res.data.messageType.value,
                  activities:res.data.activities
                };
              }).catch(err => {
                this.targetDetail();
              });
              */
            }
          }).catch(err => {
            console.log(err);
          })
        }
        /*
        api.updateProgress(params, this.target.objId).then(res => {
          if (res.code === 200) {
            this.comment = {
              hidden:true
            };
            this.getDetail();
            this.refreshOperation();
            //this.$message.success({message: '进度更新成功!', duration: 1500})

            this.$confirm('进度更新成功!,是否要对本操作进行通知?', '提示', {
              confirmButtonText: '是',
              cancelButtonText: '否',
              type: 'warning'
            }).then(() => {//进行通知
              this.communicate = {
                users:[],
                panelVisible:false,
                comment:{},
                dialogVisible:true,
                params:{},
                type:'new',
                id:this.target.objId,
                messageType:res.data.messageType.value,
                activities:res.data.activities
              };
            }).catch(err => {
              this.targetDetail();
            });
          }
        }).catch(err => {
          console.log(err);
        })
        */
      },
      removeSpan(e){
        console.log('#####################')
        let content = '';
        let a = e.indexOf('<span class="success">');
        let a1 = e.indexOf('</span>',a);
        let b = e.indexOf('<span class="warning">');
        let b1 = e.indexOf('</span>',b);
        let c = e.indexOf('<span style="display: none">');
        let c1 = e.indexOf('</span>',c);
        console.log(a,b,c)
        if(a>-1){
          content = e.substring(0,a) + e.substring(a+22,a1) + e.substring(a1+7,e.length);
          console.log(content);
          return this.removeSpan(content)
        }else if(b>-1){
          console.log(content);
          content = e.substring(0,b) + e.substring(b+22,b1) + e.substring(b1+7,e.length);
          return this.removeSpan(content)
        }else if(c>-1){
          content = e.substring(0,c) + e.substring(c1+7,e.length);
          console.log(content);
          return this.removeSpan(content)
        } else {
          return e
        }
      },
      //监听评论
      setComment(e){
        this.comment = e;
      },
      //设置进度
      setProgress(index){
        this.$set(this.target.keyResults[index],'progress',Number(this.target.keyResults[index].progressTxt))
      },
      // 更新目标参与人
      setObjMembersMember(){
        let arr = [];
        for(let i in this.target.objMembers){
          if(this.target.objMembers[i].id){
            arr.push(this.target.objMembers[i].id || this.target.objMembers[i].userId)
          }
        }
        api.updateMembers({userIds:arr}, this.target.objId).then(res => {
          if (res.code === 200) {}
        }).catch(err => {
          console.log(err);
        })
      },
      //显示目标参与人面板
      closeObjMembersPanel(){
        setTimeout(()=>{
          this.objMembersPanel = false;
        })
      },
      //编辑目标
      editTarget(){
        this.edit={
          visible:true,
          detail:{
            progressUpdateType:this.target.progressUpdateType.value,
            deptId:this.target.objDept?this.target.objDept.deptId:'',
            objType:this.target.objType,
            objName:this.target.objName,
            users:this.target.objUser.userId!=='-1'?[this.target.objUser]:[],
            keyResults:(()=>{
              for(let i in this.target.keyResults){
                this.target.keyResults[i].unitType =  this.target.keyResults[i].unitType.value || this.target.keyResults[i].unitType
              }
              return this.target.keyResults
            })(),
            parent:{
              objName:this.target.objParent?this.target.objParent.objName:'',
              objId:this.target.objParent?this.target.objParent.objId:''
            },
            totalWeight:0
          }
        }
      },
      //结束项目相关信息
      getScoreInfo(){
        this.finish.id = '';
        setTimeout(()=>{
          this.finish.id = this.target.objId;
        },50)
      },
      //删除目标
      deleteTarget(){
        this.$confirm('即将删除目标,并且不能恢复，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.objDelete(this.target.objId).then(r => {
            if (r.code === 200) {
              this.$message.success({message: '目标删除成功', duration: 1500})
              this.targetDetail();
              //this.closeDialog();
              //this.$emit('refresh');
            }
          }).catch(err => {
            console.log(err);
          })
        }).catch(err => {});
      },
      //显示参加人员面板
      showObjMembersPanel(){
        if(!this.target.scores && this.target.privileges && this.target.privileges.editObj){
          this.objMembersPanel = true
        }
      },
      //移除参加人员
      removeObjMembers(index){
        this.target.objMembers.splice(index,1)
      },
      //刷新底部操作
      refreshOperation(){
        this.$refs.operation.refresh() // 调用子组件的方法
      },
      //获取目标详情 -- 用于刷新当前信息
      getDetail(){
        api.objDetail(this.target.objId).then(res => {
          if (res.code === 200) {
            this.target = res.data;
            for(let i in res.data.keyResults){
              this.$set(this.target.keyResults[i],'progressTxt',res.data.keyResults[i].progress);
            }
            this.target.objMembers = this.target.objMembers || [];
            this.$emit('TARGET_DETAIL')
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //回复用户
      replyUser(e){
        this.$refs.dialog.replyUser(e) // 调用子组件的方法
      },
      onCommunicate(){},
    },
  }
</script>

