<template>
  <div>
    <div class="frontend-dialog-wrap" :class="{'on':content}" @click="focusTextarea"  v-show="!operation" v-html="content || tips">
        <!--{{content || tips}}-->
    </div>
    <div class="operation-dialog-wrap" v-show="operation">
      <el-scrollbar class="scrollbar">
        <textareaEdit v-model="content" class="textareaEdit" @change="showMsg" ref="textarea"></textareaEdit>
        <el-row :gutter="30" style="margin-top: 5px">
          <el-col :span="12" v-for="(item,index) in attachments">{{item.fileName}}<i class="iconfont icon-delete pointer fr mr-10" @click="removeAttachment(index)"></i></el-col>
        </el-row>
      </el-scrollbar>
      <div class="btn-wrap">
        <!--
        <el-upload :action="uploadURL" :headers="headers" :show-file-list="false" :on-change="onChangeFile" :multiple="false" ref="upload" class="fl mr-10">
          <i class="iconfont icon-shangchuan"></i>
        </el-upload>
        -->
        <i class="iconfont icon-youxiang pointer fl mr-10 gray" @click="showMemberPanel"></i>
        <i class="iconfont icon-target pointer fl"></i>
        <member-panel
          top="-462px"
          left="50px"
          xKey="users"
          :visible="panelVisible"
          :member="users"
          :multi="true"
          :canSelectDept="true"
          v-on:setMember="addNotice"
          v-on:selectDept="addNoticeDept"
          v-on:close="panelVisible=false"
        />
        <span class="fr pointer mr-10" @click="cancelOperation">取消</span>
        <!--<span class="fr pointer primary mr-10" @click="setOperation">确定</span>-->
      </div>
    </div>
  </div>
</template>

<script>
  import memberPanel from '@/components/MemberPanel'
  import textareaEdit from '@/components/textarea'; //编辑框
  export default {
    name: 'DialogPanel',
    components:{textareaEdit, memberPanel},
    props: {
      visible: {
        type: Boolean,
        default() {
          return false
        }
      },
      comment: Object,
      tips:{
        type: String,
        default() {
          return '请输入内容'
        }
      }
    },
    data() {
      return {
        operation:false,
        content:'',
        attachments:[],
        uploadURL: process.env.BASE_API + '/file',
        headers: {
          Authorization: 'Bearer ' + this.$store.state.user.user.token
        },
        panelVisible:false,
        users:[],
      }
    },
    watch:{
      comment(val){
        console.log(val);
        this.content = val.content;
        this.attachments = val.attachments;
        this.operation=!val.hidden;
      }
    },
    created() {

    },
    mounted(){
      this.content = this.comment.content;
      if(this.content){
        this.operation = true;
        setTimeout(()=>{
          this.$refs.textarea.focusToLast();
        },50)
      }
    },
    methods: {
      onChangeFile(file) {
        if (file.response && file.response.code === 200 && file.response.data) {
          this.attachments.push(file.response.data[0])
          this.$refs.upload.clearFiles()
          this.$emit('setComment', {content:this.content,attachments:this.attachments});
        }
      },
      removeAttachment(index){
        this.attachments.splice(index,1)
        this.$emit('setComment', {content:this.content,attachments:this.attachments});
      },
      setOperation(){
        this.$emit('setComment', {content:this.content,attachments:this.attachments});
        this.operation = false;
      },
      cancelOperation(){
        this.content = '';
        this.attachments = [];
        this.operation = false;
      },
      showMsg(){
        this.$emit('setComment', {content:this.content,attachments:this.attachments});
      },
      showMemberPanel(){
        this.panelVisible=true;
      },
      addNotice(){
        //this.panelVisible = false;
        this.content = this.content || '';
        this.content += ('<span class="success">@'+this.users[0].userName+'</span><span style="display: none">[@u|'+this.users[0].id+'|'+this.users[0].userName+']</span> ');
        this.showMsg();
        setTimeout(()=>{
          this.$refs.textarea.focusToLast();
          this.users= [];
        },5)
      },
      addNoticeDept(e){
        console.log(e)
        //this.panelVisible=false;
        this.content += ('<span class="warning">@'+e.userName+'</span><span style="display: none">[@d|'+e.deptId+'|'+e.userName+']</span> ')
        this.showMsg();
        setTimeout(()=>{
          this.$refs.textarea.focusToLast();
        },5)
      },
      focusTextarea(){
        this.operation=true;
        setTimeout(()=>{
          this.$refs.textarea.focusToLast();
        },50)
      },
      replyUser(e){
        console.log(e)
        this.operation = true;
        this.content = '';
        setTimeout(()=>{
          this.$refs.textarea.focusToPosition();
        },10)
        /*
        let content = this.removeSpan(e.content);
        this.content += '回复:  <span class="success">@'+e.commentUser.userName+'<span style="display: none">[@u|'+e.commentUser.userId+'|'+e.commentUser.userName+']</span></span>   <br/><div style="background: #efefef; padding: 10px 25px">' + content + '</div> '
        setTimeout(()=>{
          this.$refs.textarea.focusToPosition();
        },10)
        */
      },
      removeSpan(e){
        let content = '';
        let x = e.indexOf('<span style="display: none">[');
        let y = e.indexOf(']</span>',x)
        if(x>0){
          content = e.substring(0,x) + e.substring(y+8,e.length);
          return this.removeSpan(content)
        }else {
          return e
        }
      }
    }
  }
</script>

<style lang="scss">
  .frontend-dialog-wrap{
    border: solid 1px #ddd;
    background: #f3f3f3;
    padding: 7px 10px;
    cursor: text;
    border-radius: 3px;
    color: #999;
  }
  .frontend-dialog-wrap:hover{
    background: #fff;
  }
  .frontend-dialog-wrap.on{
    color: #333;
  }
  .operation-dialog-wrap{
    border: solid 1px #ddd;
    background: #fff;
    padding: 8px 10px;
    border-radius: 3px;
    width: 100%;
    height: 135px;
    position: relative;
    .scrollbar{
      height:100px;
      .el-textarea{
        textarea{
          position: relative;
          padding: 0;
          border:none;
        }
        textarea:before{
          content: '';
          position: absolute;
          width: 20px;
          height: 50px;
          background: #000;
          right: 0;
          z-index: 1;
        }
      }
    }
    .scrollbar:after{
      content: '';
      width: 100%;
      height: 15px;
      background: #fff;
      position: absolute;
      bottom: 0px;
      z-index: 1;
    }
    .btn-wrap{
      width: 98%;
      position: absolute;
      bottom: 5px;
    }
  }

</style>
