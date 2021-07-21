<template>
  <el-dialog :visible.sync="dialogVisible" width="500" top="220px" append-to-body :show-close="false" class="target-wrap" :close-on-click-modal="false" :close-on-press-escape="false">
    <div slot="title" class="header">
      <div class="title">
        <i class="iconfont icon-mubiao_pressed"></i> {{type==='communicate'?'沟通内容':'消息通知'}}
      </div>
      <div class="options">
        <i class="iconfont icon-guanbi pointer fs-22" @click="dialogVisible=false"></i>
      </div>
      <div class="clear"></div>
    </div>
    <div class="form">
      <div class="row" style="height: 38px">
        <div class="label">{{type==='communicate'?'沟通对象':'通知对象'}}&nbsp;</div>
        <div class="flex">
          <div class="avatar" style="" v-for="(item,index) in users" @click="panelVisible=true">
            <span class="close" @click.stop><i class="iconfont icon-guanbi" @click="removeUsers(index)"></i></span>
            <avatar v-if="item" :user="item" />
          </div>
          <div v-show="users && users.length===0"><i class="iconfont icon-tianjia pointer fs-32" @click="panelVisible=true"></i></div>
        </div>
        <member-panel
          top="56px"
          left="-260px"
          xKey="team"
          :visible="panelVisible"
          :member="users"
          v-on:selectDept="addDept"
          v-on:close="closePanel"
        />
        <!--:canSelectDept="true"  todo 需要进一步完善可以选择部门操作-->
      </div>

      <el-row style="padding: 15px; margin-top: 20px" :gutter="20">
        <el-col :span="1">
          <div class="round-title">
            <avatar v-if="user" :user="user" />
          </div>
        </el-col>
        <el-col :span="19" :offset="1" style="text-align: left">
          <dialog-panel :comment="comment" v-on:setComment="setMsg" :tips="'沟通内容，文字上限2000。'" ref="dialog" />
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="sendMsg">发送</el-button>
        </el-col>
      </el-row>
    </div>
  </el-dialog>

</template>
<style lang="scss" scoped>
</style>
<script>
  import avatar from '@/components/avatar'
  import memberPanel from '@/components/MemberPanel'
  import dialogPanel from '@/components/DialogPanel'
  import api from '@/api/okr'
  export default {
    name: 'targetCommunicate',
    props: {
      append: {
        type: Boolean,
        default() {
          return false
        }
      },
      params:Object
    },
    components:{avatar, memberPanel, dialogPanel},
    computed: {
    },
    data() {
      return {
        draftParams:{},
        dialogVisible:false,
        type:'',
        users:[],
        panelVisible:false,
        comment:{
          content:'',
          attachments:[]
        },
        message:{},
        id:'',
        user:{
          userAvatar:this.$store.state.user.user.jwtClaims.ua,
          userId:this.$store.state.user.user.jwtClaims.id,
          userName:this.$store.state.user.user.jwtClaims.un,
        }
      }
    },
    watch:{
      params(val){
        this.dialogVisible = val.dialogVisible;
        this.type = val.type;
        this.id = val.id;
        this.messageType = val.messageType;
        this.panelVisible = false;
        this.draftParams = val.params;//草稿沟通保存的参数信息

        if(val.activities && val.activities.length>0){ //存在活动之类，默认添加
          let str = '<div style="background: #efefef; padding: 10px 20px">';
          let i;
          for(i in val.activities){
            str += '['+(parseInt(i)+1)+'].'+ val.activities[i] +'<br/>'
          }
          str+='</div><br/>'
          this.$set(this.comment,'content',str);
          this.setMsg(this.comment)
        }
      }
    },
    created() {},
    mounted(){},
    methods: {
      //初始化参数
      initParams(){
        this.dialogVisible=false;
        this.type='';
        this.users=[];
        this.panelVisible=false;
        this.comment={
          content:'',
          attachments:[]
        };
        this.message={};
        this.id='';
      },
      //同步更新通知内容
      setMsg(e){
        this.message = e;
      },
      //关闭选择人员面板
      closePanel(){
        this.panelVisible = false
      },
      //移除选中的人
      removeUsers(index){
        this.users.splice(index,1)
      },
      //发送通知消息
      sendMsg(){
        if(this.type==='communicate'){
          this.sendCommunicateMsg()
        }else {
          this.sendOperationMsg()
        }
      },
      //选中部门
      addDept(){},
      //发送操作通知--新建、发布、更新
      sendOperationMsg(){
        let params = {
          bizType:'obj',//可用值:obj-目标,bri-简报
          content:this.message.content || '',
          messageType:this.messageType,
        }
        for(let i in this.users){
          params.content += ' <span class="success">@'+this.users[i].userName+'<span style="display: none">[@u|'+this.users[i].id+'|'+this.users[i].userName+']</span></span> '
        }
        if(this.message.attachments && this.message.attachments.length>0){
          for(let x in this.message.attachments){
            params['attachments['+x+']'] = 'https://dev-oss.cgvcap.com/file/'+this.message.attachments[x].fileId+'/'+this.message.attachments[x].accessCode
          }
        }
        api.addComment(params, this.id).then(d => {//添加@人评论
          if (d.code === 200) {
            this.initParams();
            this.$emit('SEND_COMMUNICATE');
            this.$message.success({message: '信息通知成功', duration: 1500})
          }
        }).catch(err => {
          console.log(err);
        })
      },
      //发送沟通通知--草稿沟通
      sendCommunicateMsg(){
        api.objAddDraft(this.draftParams).then(res => {//保存草稿
          if (res.code === 200) {

            api.communicate(res.data).then(r => {//将草稿设置为沟通状态
              if (r.code === 200) {

                let params = {
                  bizType:'obj',//可用值:obj-目标,bri-简报
                  content:this.message.content || ''
                }
                for(let i in this.users){
                  params.content += ' <span class="success">@'+this.users[i].userName+'<span style="display: none">[@u|'+this.users[i].id+'|'+this.users[i].userName+']</span></span> '
                }
                if(this.message.attachments && this.message.attachments.length>0){
                  for(let x in this.message.attachments){
                    params['attachments['+x+']'] = 'https://dev-oss.cgvcap.com/file/'+this.message.attachments[x].fileId+'/'+this.message.attachments[x].accessCode
                  }
                }

                api.addComment(params, res.data).then(d => {//添加@人评论
                  if (d.code === 200) {
                    this.initParams();
                    this.$emit('SEND_COMMUNICATE');
                    this.$message.success({message: '沟通信息传达成功', duration: 1500})
                  }
                }).catch(err => {
                  console.log(err);
                })

              }
            }).catch(err => {
              console.log(err);
            })


          }
        }).catch(err => {
          console.log(err);
        })
      },
    },
  }
</script>

