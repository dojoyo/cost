<template>
  <div>
    <el-row >
      <el-col :span="24">
        <span class="tab-btn" :class="{primary:view==='comment'}" @click="setInfo('comment')"><i class="iconfont icon-pinglun mr-5"></i>{{status!=='CM'?'评论':'沟通记录'}}</span>
        <span class="tab-btn" v-show="status!=='CM'" :class="{primary:view==='history'}" @click="setInfo('history')"><i class="iconfont icon-jindulishi mr-5"></i>进度历史</span>
        <span class="tab-btn" v-show="status!=='CM'" :class="{primary:view==='activity'}" @click="setInfo('activity')"><i class="iconfont icon-huodong mr-5"></i>活动</span>
        <like class="fr" v-show="status!=='CM'" :id="id" :type="'obj'"  />
        <span class="fr pointer mr-10" v-show="followListVisible" @click="showFollowList">
          <span class="fs-14 pointer" ><i class="iconfont icon-guanzhu mr-10 warning" ></i>已关注</span>
        </span>
        <follow class="fr mr-10" v-show="status!=='CM' && !followListVisible" :id="id" />
      </el-col>
    </el-row>

    <el-row class="mt-15" v-show="view==='comment'">
      <el-col :span="22" :offset="1">
        <el-row v-for="item in comment.list" style="margin-top: 10px; padding-bottom: 10px; border-bottom: solid 1px #ddd">
          <el-col :span="1">
            <avatar :user="item.commentUser" />
          </el-col>
          <el-col :span="23" class="comment-list" style="padding-left: 10px">
            <div>{{item.commentUser.userName}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.commentTime | TimeSecond}}
              <i class="iconfont icon-huifu fr pointer" v-if="!item.selfComment" @click="replyUser(item)"></i>
              <i class="iconfont icon-delete fr pointer" v-if="item.selfComment" @click="deleteComment(item.commentId)"></i></div>
            <div v-html="item.content"></div>
            <div style="padding: 10px 20px; border-radius: 5px; background: #f5f5f5; margin-top: 10px" v-show="item.replys && item.replys.length>0">
              <el-row v-for="(r,rIndex) in item.replys" :key="rIndex" style="margin-top: 10px">
                <el-col :span="2">
                  <avatar :user="r.commentUser" />
                </el-col>
                <el-col :span="22">
                  <div>{{r.commentUser.userName}}&nbsp;&nbsp;&nbsp;&nbsp;{{r.replyTime | TimeSecond}}
                    <i class="iconfont icon-huifu fr pointer" v-if="!r.selfComment" @click="replyUser(item)"></i>
                    <i class="iconfont icon-delete fr pointer" v-if="r.selfComment" @click="deleteComment(r.commentId)"></i></div>
                  <div v-html="r.content"></div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row v-show="comment.list && comment.list.length===0">
          <el-col>
            <div class="w-100p gray" style="text-align: center;">
              <img src="@/assets/no-comment.png">
              <br><span style="font-size: 14px">暂无数据</span><br/><br/>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="mt-15"  v-show="view==='history'">
      <el-col :span="22" :offset="1">
        <el-timeline>
          <el-timeline-item v-for="(item, index) in history.list" placement="top" :key="index" :timestamp="item.updateTime">
            <div v-show="item.progressType.value==='C'">
              {{item.progressType.name}}
            </div>
            <div v-show="item.progressType.value!=='C'">
              目标进度：{{item.progress.objProgress}}%
              <span v-show="item.progress.objProgressDiff!==0" :class="{'danger':item.progress.objProgressDiff<0,'success':item.progress.objProgressDiff>0}">
                  <i class="iconfont fs-12" :class="{'icon-xiajiang danger':item.progress.objProgressDiff<0,'icon-shangsheng success':item.progress.objProgressDiff>0}"></i>
                  {{item.progress.objProgressDiff}}%
                </span>
              <br/>
              更新说明：<span v-html="item.comment && item.comment.content"></span>
              <br/>
              <span v-show="item.progress.keyResultProgresses.length>0">
                  关键结果：
                  <span v-for="keyResult in item.progress.keyResultProgresses">
                    {{keyResult.keyResult}}:{{keyResult.progress}}%
                    <span v-show="keyResult.progressDiff!==0" :class="{'danger':keyResult.progressDiff<0,'success':keyResult.progressDiff>0}">
                     <i class="iconfont fs-12" :class="{'icon-xiajiang danger':keyResult.progressDiff<0,'icon-shangsheng success':keyResult.progressDiff>0}"></i>
                    {{keyResult.progressDiff}}%  &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </span>
                </span>
              <br/>
              <!--
              <div style="background: #eee;padding: 5px; margin-top: 5px" v-show="item.comment.content">
                {{item.updateUser.userName}}:{{item.comment.content}}
              </div>
              -->
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-col>

      <el-col :span="22" :offset="1" v-show="history.list && history.list.length === 0">
        <div class="w-100p gray" style="text-align: center;">
          <div style="margin: 0 auto"><i class="iconfont icon-zanwupinglun" style="font-size: 96px;"></i></div>
          <div style="margin: 0 auto; font-size: 14px">暂无数据</div>
        </div>
      </el-col>

    </el-row>

    <el-row class="mt-15"  v-show="view==='activity'">
      <el-col :span="22" :offset="1">
        <el-row v-for="item in activity.list" style="padding-bottom: 10px; margin-top: 10px;">
          <el-col :span="24" style="text-align: center;position: relative">
            <span style="padding: 0 10px; background: #fff">{{item.activityTime | DateTime}}</span>
            <div style="position: absolute; height: 1px; width: 42%; background: #ddd; top: 10px;left: 0;"></div>
            <div style="position: absolute; height: 1px; width: 42%; background: #ddd; top: 10px;right: 0;"></div>
          </el-col>
          <el-col :span="4" style="display: flex"><avatar :user="item.activityUser" /><div style="padding-top: 5px">{{item.activityUser.userName}}</div></el-col>
          <el-col :span="20">
            <div v-for="content in item.content" style="line-height: 32px" v-html="content"></div>
          </el-col>
        </el-row>
        <el-row v-show="activity.list && activity.list.length===0">
          <el-col>
            <div class="w-100p gray" style="text-align: center;">
              <div style="margin: 0 auto"><i class="iconfont icon-zanwupinglun" style="font-size: 96px;"></i></div>
              <div style="margin: 0 auto; font-size: 14px">暂无数据</div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <target-member :params="paramsMember" :append="true" />
  </div>
</template>
<style lang="scss" scoped>
  .tab-btn{
    font-size: 14px; cursor: pointer; padding-right: 20px; color: #888;
  }
  .tab-btn:hover{
    color: #48525C;
  }
  .comment-list{
    .icon-delete{
      display: none;
    }
  }
  .comment-list:hover{
    .icon-delete{
      display: block;
    }
  }
</style>
<script>
  import api from '@/api/okr'
  import like from '@/components/like'
  import follow from '@/components/follow'
  import avatar from '@/components/avatar'
  import targetMember from '@/components/target/member'

  //import Follow from "../follow";
  export default {
    name: 'targetOperation',
    props: {
      id:String,
      type:String,
      status:String,
      user:Object
    },
    components:{follow, like, avatar, targetMember},
    data() {
      return {
        view:'',
        comment:{
          pageNum:1,
          pageSize:10,
          list:'',
          total:0
        },
        history:{
          pageNum:1,
          pageSize:10,
          list:'',
          total:0
        },
        activity:{
          pageNum:1,
          pageSize:10,
          list:'',
          total:0
        },
        curUsers:this.$store.state.user,
        followListVisible:false,
        paramsMember:{}
      }
    },
    watch:{
      id(val){
        if(val){
          this.refresh();
        }
      }
    },
    mounted(){
      setTimeout(()=>{
        this.setInfo('comment')
      },100)
      this.followListVisible = this.curUsers.user.jwtClaims.id === this.user.userId
    },
    methods: {
      setInfo(type){
        this.view = type;
        switch (type){
          case 'comment':
            this.getCommentList();
            /*
            if(!this.comment.list){
              this.getCommentList();
            }
            */
            break
          case 'history':
            this.getHistory();
            /*
            if(!this.history.list){
              this.getHistory();
            }
            */
            break
          case 'activity':
            this.getActivity();
            /*
            if(!this.activity.list){
              this.getActivity();
            }
            */
            break
        }
      },
      //获取评论
      getCommentList(){
        let params = {
          bizType:this.type,//可用值:obj-目标,bri-简报
          pageNum:this.comment.pageNum,
          pageSize:this.comment.pageSize
        }
        api.commentList(params, this.id).then(res => {
          if (res.code === 200) {
            for(let i in res.data.list){
              res.data.list[i].content = res.data.list[i].content.replace(/\n/g, "<br/>")
            }
            this.comment.list = res.data.list;
            this.comment.total = res.data.total;
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //获取历史记录
      getHistory(){
        api.history(this.id).then(res => {
          if (res.code === 200) {
            this.history.list = res.data.reverse()
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //获取活动
      getActivity(){
        let params = {
          bizType:this.type,//可用值:obj-目标,bri-简报
          pageNum:this.activity.pageNum,
          pageSize:this.activity.pageSize
        }
        api.activity(params, this.id).then(res => {
          if (res.code === 200) {
            this.activity.list = res.data.list
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //刷新
      refresh(){
        console.log('refresh dialog')
        this.comment={
          pageNum:1,
            pageSize:10,
            list:'',
            total:0
        };
        this.history={
          pageNum:1,
            pageSize:10,
            list:'',
            total:0
        };
        this.activity={
          pageNum:1,
            pageSize:10,
            list:'',
            total:0
        };
        this.setInfo(this.view)
      },
      //删除评论
      deleteComment(id){
        this.$confirm('即将删除评论，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.deleteComment(id).then(res => {
            if (res.code === 200) {
              this.getCommentList();
              this.$message.success({message: '评论删除成功!', duration: 1500})
            }
          }).catch(err => {
            console.log(err);
          })

        }).catch(err => {});
      },

      //回复某人
      replyUser(user){
        this.$emit('replyUser',user)
      },

      showFollowList(){
        this.paramsMember = {
          params:{
            id:this.id,
            type:'follow'
          },
          title:'关注人列表'
        }
      }
    }
  }
</script>


