<template>
  <div>
    <div style="display: flex; align-items: flex-start; padding: 15px" v-if="!template">
      <div class="round-title" style="margin-right: 10px">
        <avatar v-if="userInfo" :user="userInfo" />
      </div>
      <dialog-panel :comment="comment" v-on:setComment="setMsg" :tips="'沟通内容，文字上限2000。'"  ref="dialog" style="margin-right: auto; width: 85%; text-align: left" />
      <el-button type="primary" @click="sendMsg" style="margin-left: 10px">发送</el-button>
    </div>
    <div v-if="template==='1'"><!--应该在知识库文章页面详情评论-->
<!--      <dialog-panel :comment="comment" v-on:setComment="setMsg" :tips="'评论一句，知音难觅～'" ref="dialog" style="width: 100%; " />-->
      <el-input type="textarea" :rows="3" placeholder="评论一句，知音难觅～" v-model="msg"></el-input>
      <el-button type="primary" @click="sendMsg" style="margin-top: 10px" v-show="msg">发送</el-button>
    </div>
  </div>

</template>
<style lang="scss" scoped>

</style>
<script>
  import api from '@/api/okr'
  import dialogPanel from '@/components/DialogPanel'
  import avatar from '@/components/avatar'
  export default {
    name: 'targetDialog',
    props: {
      id:String,
      type:String,
      template:String
    },
    components:{avatar, dialogPanel},
    data() {
      return {
        userInfo:'',
        msg:'',
        comment:{},
        isReply:false,
        replyInfo:{}
      }
    },
    computed: {
      user(){
        return this.$store.getters.user
      }
    },
    watch:{},
    mounted(){
      setTimeout(()=>{
        this.userInfo = {
          userAvatar:this.user.user.jwtClaims.ua,
          userId:this.user.user.jwtClaims.id,
          userName:this.user.user.jwtClaims.un,
          size:35
        };
      },500)
    },
    methods: {
      setMsg(e){
        this.msg = e;
      },
      //发评论
      sendMsg(){
        if(this.msg.content==='' || this.msg===''){
          this.$message.warning({message: '内容不能为空', duration: 1500})
          return
        }
        let params = {
          bizType:this.type || 'obj',//可用值:obj-目标,bri-简报
          content:this.msg.content || this.msg || ''
        }
        if(this.isReply){
          params.messageType = 'CR';
          params.replyCommentId = this.replyInfo.commentId
        }
        if(this.msg.attachments && this.msg.attachments.length>0){
          for(let x in this.msg.attachments){
            params['attachments['+x+']'] = 'https://dev-oss.cgvcap.com/file/'+this.msg.attachments[x].fileId+'/'+this.msg.attachments[x].accessCode
          }
        }
        console.log(params, this.replyInfo);
        //return;
        api.addComment(params, this.id).then(res => {
          if (res.code === 200) {
            this.msg='';
            this.replyInfo = {};
            this.isReply = false;
            this.$message.success({message: '发表评论成功', duration: 1500})
            if(!this.template){
              this.$refs.dialog.cancelOperation();
            }
            this.$emit('refreshOperation');
          }
        }).catch(err => {
          console.log(err);
        })
      },
      replyUser(e){
        this.isReply = true;
        this.replyInfo = e;
        this.$refs.dialog.replyUser(e) // 调用子组件的方法
      },
      setDialog(e){
        this.$refs.dialog.setDialog(e) // 调用子组件的方法
      }
    }
  }
</script>


