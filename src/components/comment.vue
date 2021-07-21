<template>
	<div>
    <div style="margin-bottom: 20px; font-size: 16px; font-weight: bold; margin-top: 20px">评论（{{total}}）</div>

    <el-row v-for="item in list" style="margin-top: 10px; padding-bottom: 10px; border-bottom: solid 1px #ddd">
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
    <el-row v-show="list && list.length===0">
      <el-col>
        <div class="w-100p gray" style="text-align: center;">
          <img src="@/assets/no-comment.png">
          <br><span style="font-size: 14px">暂无数据</span><br/><br/>
        </div>
      </el-col>
    </el-row>

    <div class="txt-right">
      <el-pagination
        v-if="list && list.length>0 && total>pageSize"
        style="margin-top: 20px"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <el-row style="margin-top: 20px">
      <el-col :span="20">
        <el-input placeholder="" ref="content" v-model="content" style="width: 100%"></el-input>
      </el-col>
      <el-col :span="3" :offset="1">
        <el-button type="primary" @click="send" style="width:100%">评论</el-button>
      </el-col>
    </el-row>
	</div>
</template>
<script>
import avatar from "@/components/avatar";
import api from '@/api/okr'
export default {
  components: { avatar },
  props: {
    id: String,
    type:String,
    step: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  watch:{
    id: {
      handler(val) {
        if(val){
          this.getList(true)
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      list:[],
      pageNum:1,
      pageSize:5,
      total:0,
      content:'',
      isReply:false,
      replyCommentId:''
    };
  },
  methods: {
    getList(init){
      if(init){
        this.list=[];
        this. pageNum=1;
        this.pageSize=5;
        this.total=0
      }
      let params = {
        bizType:this.type,
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }
      api.commentList(params, this.id).then(res => {
        if (res.code === 200) {
          this.list = res.data.list;
          this.total = res.data.total;
        }
      }).catch(err => {
        console.log(err);
      })
    },
    send(){
      let params = {
        bizType:this.type,
        content:this.content
      }
      if(this.isReply){
        params.messageType = 'CR';
        params.replyCommentId = this.replyCommentId
      }
      api.addComment(params, this.id).then(res => {
        if (res.code === 200) {
          this.content='';
          this.isReply = false;
          this.replyCommentId = '';
          this.$message.success({message: '发表评论成功', duration: 1500})
          this.getList();
        }
      }).catch(err => {
        console.log(err);
      })
    },
    // 分页更改
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getList();
    },
    // 换页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    replyUser(item){
      this.isReply = true;
      this.replyCommentId = item.commentId;
      this.$refs.content.$el.querySelector('input').focus();
    },
    deleteComment(id){
      this.$confirm('即将删除评论，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteComment(id).then(res => {
          if (res.code === 200) {
            this.getList();
            this.$message.success({message: '评论删除成功!', duration: 1500})
          }
        }).catch(err => {
          console.log(err);
        })

      }).catch(err => {});
    },
  }
};
</script>

<style lang="scss" scoped>
.users-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .avatar {
    width: 50px;
    margin-bottom: 15px;
    position: relative;

    .close {
      position: absolute;
      top: -15px;
      left: 28px;
      cursor: pointer;
      display: none;
    }

    .line {
      display: none;
    }

    .line:before {
      content: "";
      width: 80px;
      border-bottom: dotted 1px #c4c4c4;
      position: absolute;
      top: 15px;
      left: 35px;
    }

    .line:after {
      content: "";
      width: 8px;
      height: 8px;
      position: absolute;
      top: 9px;
      left: 117px;
      border: solid 2px #aaa;
      background: #ddd;
      border-radius: 50%;
    }
  }

  .avatar:hover {
    .close {
      display: block;
    }
  }

  .avatar.step {
    width: 140px;

    .line {
      display: block;
    }
  }

  .avatar.step.last {
    width: 50px;

    .line {
      display: none;
    }
  }
}
</style>
