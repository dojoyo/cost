<template>
  <div v-if="dialogVisible" class="disk-process-wrap">
    <div class="flex">
      <span class="title" style="margin-right: auto">文件上传进度({{counter}}/{{list.length}})</span>
      <i class="iconfont icon-weiwanchengx pointer" v-show="finish" @click="closeDialog()"></i>
      <i class="iconfont icon-shouqi pointer" :class="{'icon-shouqi':open,'icon-arrow-down-2':!open}" @click="open=!open" v-show="!finish"></i>
    </div>
    <div class="list-content-wrap" v-show="open">
      <div class="divider"></div>
      <el-scrollbar style="width: 100%;height:300px">
        <div class="list-content" v-for="(item,index) in list" :key="index">
          <div class="flex" style="margin-bottom:5px" v-if="item.status">
            <img :src="item.icon" class="icn" />
            <div class="name">{{item.name}}</div>
            <div :class="item.status.value" style="font-size:12px; flex-shrink:0">【{{item.status.name}} {{item.size | formatSize(2)}}】</div>
            <el-tooltip effect="dark" content="重试" placement="top" style="flex-shrink: 0" v-if="item.status.value==='error'">
              <i class="iconfont icon-shangchuan1 pointer" @click="retry(index)"></i>
            </el-tooltip>
          </div>
          <el-progress v-if="item.status" :text-inside="true" :stroke-width="12" :percentage="parseInt(item.status.process)"></el-progress>
        </div>
      </el-scrollbar>
    </div>

  </div>
</template>
<script>
  // import api from '@/api/disk';
  import SparkMD5 from 'spark-md5';
  import axios from "axios";
  export default {
    name: '',
    components: {},
    computed: {
      process() {
        return this.$store.getters.diskProcess;
      }
    },
    watch: {
      process: {
        handler(nVal,oVal) {
          if(nVal && nVal.length>0){
            this.dialogVisible = true;
            this.open = nVal.length!==oVal.length?true:this.open;
            let finish = true;
            let counter = nVal.length
            nVal.map(item=>{
              if(item.status.value!=='finish'){
                finish = false;
                counter--
              }
              let type = this.$options.filters['getFileType'](item.name);
              switch (type) {
                case 'zip': // 压缩文件
                  item.icon = require('@/assets/disk/icn_zip.png');
                  break
                case 'image': // 图片文件
                  item.icon = require('@/assets/disk/icn_image.png');
                  break
                case 'word': // word文件
                  item.icon = require('@/assets/disk/icn_word.png');
                  break
                case 'ppt': // word文件
                  item.icon = require('@/assets/disk/icn_ppt.png');
                  break
                case 'excel': // word文件
                  item.icon = require('@/assets/disk/icn_excel.png');
                  break
                case 'pdf': // word文件
                  item.icon = require('@/assets/disk/icn_pdf.png');
                  break
                case 'video': // word文件
                  item.icon = require('@/assets/disk/icn_video.png');
                  break
                case 'radio': // word文件
                  item.icon = require('@/assets/disk/icn_radio.png');
                  break
                default :
                  item.icon = require('@/assets/disk/icn_oth.png');
              }
            })
            this.finish = finish;
            this.counter = counter;
            this.list = nVal;
            this.startTimer();
          }
        },
        immediate: true
      }
    },
    props: {},
    data() {
      return {
        dialogVisible: false,
        finish:false,
        open:true,
        list:[],
        counter:'',
        counterTimer:''
      };
    },
    methods: {
      closeDialog(){
        this.dialogVisible=false;
        if(this.counterTimer){
          clearInterval(this.counterTimer);
          this.counterTimer = ''
        }
        this.$store.dispatch("SET_DISK_LIST", []);
      },
      startTimer(){
        let _this = this;
        if(!_this.counterTimer){
          _this.counterTimer = setInterval(()=>{
            let finish = true;
            let counter = _this.process.length
            _this.process.map(item=>{
              if(item.status.value!=='finish'){
                finish = false;
                counter--
              }
            })
            _this.finish = finish;
            _this.counter = counter;
            if(_this.finish){
              clearInterval(_this.counterTimer);
              _this.counterTimer = '';
            }
          },300)
        }
      },
      retry(index){
        let _this = this;
        let file = _this.list[index];
        file.status = {
          name:'文件上传',
          value:'upload',
          process:'0',
          status:'upload'
        }
        _this.$set(this.list[index],'status',file.status);
        axios({
          method: 'put',
          url: file.presignUrl,
          headers: file.headers,
          data: file.result,
          onUploadProgress: progressEvent => {
            file.status.process = (progressEvent.loaded / progressEvent.total * 100 | 0);
            _this.$set(_this.list[index],'status',file.status);
          }
        }).then(function(res) {
          if(res && res.data && res.data.Status==='OK'){
            _this.$set(_this.list[index],'status',{
              name:'完成',
              value:'finish',
              process:'100',
              status:'success'
            });
            _this.$set(_this.list[index],'status',file.status);
            _this.$store.dispatch("SET_DISK_LIST", _this.list);
          }else {
            file.status = {
              name:'出错：',
              value:'error',
              process:'100',
              status:'exception'
            }
            _this.$set(this.list[index],'status',file.status);
            _this.$store.dispatch("SET_DISK_LIST", _this.list);
          }
        });
      },
    }
  };
</script>

<style lang="scss" scoped>
  .disk-process-wrap {
    position: fixed;
    z-index: 99999;
    right: 50px;
    bottom: 50px;
    width: 400px;
    padding: 12px;
    border-radius: 5px;
    background: #f7f7f7;
    border:solid 1px #e7e7e7;
    .flex{
      display: flex;
      align-items: center;
    }
    .title{
      font-size: 14px;
      color: #555;
      font-weight: 500;
    }
    .iconfont{
      font-size: 16px;
      color:#555
    }
    .divider{
      height: 1px;
      background: #e7e7e7;
      margin:12px -12px;
    }
    .list-content-wrap{
      width:100%;
    }
    .list-content{
      width: 100%;
      margin-top: 15px;
      .md5{
          color: #e5a147;
        }
      .upload{
        color: #46a0fc;
      }
      .finish{
        color: #6ac144;
      }
      .error{
        color: #f36d6f;
      }
      .icn{
        height: 20px;
        margin-right: 5px;
        flex-shrink: 0;
      }
      .name{
        font-size: 12px;
        color:#666;
        margin-right: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .iconfont{
        margin-left:10px
      }
    }
  }
</style>
