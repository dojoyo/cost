<template>
  <div v-loading="loading" :element-loading-text="'上传中('+loadProgress.toFixed(0)+'%)'" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="files-wrap" v-if="files && files.length>0 && list">
      <div class="item" v-for="(item,index) in files" :key="index">
        <span class="name"><i class="iconfont icon-fujian fs-12"></i>&nbsp;{{item && item.fileName}}</span>
        <span class="tips" v-if="view">
           <el-button type="text" class="button" @click="preview(item)">预览</el-button>
        </span>
        <span class="tips" v-if="!edit && view && down">
           <el-button type="text" class="button" @click="download(item)">下载</el-button>
        </span>
        <span class="tips" v-if="edit">
           <el-button type="text" class="button" @click="remove(index)">删除</el-button>
        </span>
        <!--
        <el-tooltip class="tips" effect="dark" content="在线预览" placement="top-start" v-if="view">
          <el-button type="text" class="button" @click="preview(item)"><i class="iconfont icon-yincang fs-12"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip class="tips" effect="dark" content="下载" placement="top-start" v-if="!edit && view">
          <el-button type="text" class="button" @click="download(item)"><i class="iconfont icon-xiajiang fs-12"></i>
          </el-button>
        </el-tooltip>
        <el-tooltip class="tips" effect="dark" content="删除" placement="top-start" v-if="edit">
          <el-button type="text" class="button" @click="remove(index)"><i class="iconfont icon-weiwancheng_pressedx fs-12"></i>
          </el-button>
        </el-tooltip>
        -->
      </div>
    </div>
    <div v-if="files && files.length===0 && emptyIcon && (!edit || (edit && icon==='none'))" style="text-align: center">
      <img src="@/assets/no-list.png"><br/>
      <span style="font-size: 14px; color: #666">暂无数据</span>
    </div>
    <!--上传附件-->
    <el-upload
      v-if="edit && icon!=='none'"
      ref="upload"
      :action="BASE_API+url"
      :headers="headers"
      :show-file-list="false"
      :data="{category: tag}"
      :accept="accept"
      :multiple="true"
      :auto-upload="true"
      :on-change="onChangeFile"
      :on-progress="uploadProcess"
    >
      <img v-if="icon==='images'" src="@/assets/add.png" style="width: 50px; height: 50px;">
      <div v-if="icon==='icon'" style="padding-left: 20px"><i class="iconfont icon-shangchuan fs-14"></i> <span
        class="fs-14" style="margin-left: 10px">上传附件</span></div>
      <!--      <div slot="tip" class="el-upload__tip" v-show="accept">仅支持{{accept}}格式</div>-->
    </el-upload>
    <!--在线预览附件-->
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :show-close="false" :fullscreen="true"
               :close-on-click-modal="false" :close-on-press-escape="false" class="preview">
      <div slot="title" class="header">
        <div class="title">
          {{fileTitle}}
        </div>
        <div class="options">
          <i class="iconfont icon-guanbi pointer fs-22" @click="dialogVisible=false"></i>
        </div>
        <div class="clear"></div>
      </div>
      <div style="margin: -15px;">
        <div v-show="previewType==='image'" style="text-align: center">
          <img :src="image" class="image">
        </div>
        <iframe v-if="dialogVisible && previewType==='file'" class="iframe w-100p" style="border:0" :style="{height:dialogHeight-78+'px'}" allowfullscreen id="filePreviewDialogVisible" :src="urlDialog"></iframe>
      </div>
    </el-dialog>
    <!--
    <el-dialog :visible.sync="dialogVisible" width="850px" :append-to-body="true" :show-close="false" top="50px"
               :fullscreen="true">
      <div slot="title" class="header">
        <div class="title">
          <i class="iconfont icon-shenpi_normal"></i> 附件查看
        </div>
        <div class="options" style="display: flex; align-items: center">
          <i class="iconfont icon-guanbi pointer fs-22" @click="hideDialog()"></i>
        </div>
        <div class="clear"></div>
      </div>
      <div v-show="previewType==='image'" style="text-align: center">
        <img :src="image" class="image">
      </div>
      <iframe id="pdfPlayer" :src="pdf" frameborder="0" width="100%" :height="height"></iframe>
    </el-dialog>
    -->
  </div>
</template>
<script>

  function createObjectURL(object) {
    return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
  }

  import request from '@/utils/request';
  import $index from '@/utils/index';
  import api from '@/api/user';

  export default {
    name: '',
    components: {},
    props: {
      files: { // 文件
        type: Array,
        default() {
          return [];
        }
      },
      url: { // 默认上传路径api
        type: String,
        default() {
          return '/file';
        }
      },
      tag: { // 上传所保存的文件夹--后端用
        type: String,
        default() {
          return '';
        }
      },
      accept: { // 接受文件类型
        type: String,
        default() {
          return '';
        }
      },
      edit: { // 是否可编辑
        type: Boolean,
        default() {
          return true;
        }
      },
      down: { // 是否可下载
        type: Boolean,
        default() {
          return true;
        }
      },
      icon: { // icon类型，不显示上传操作设置为none
        type: String,
        default() {
          return 'images';
        }
      },
      list: { // 是否显示上传后的列表
        type: Boolean,
        default() {
          return true;
        }
      },
      emptyIcon: { // 是否显示数据为空的提示
        type: Boolean,
        default() {
          return true;
        }
      },
      view: { // 是否可以预览下载
        type: Boolean,
        default() {
          return true;
        }
      },
      single: { // 是否单一文件
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        BASE_API: process.env.BASE_API,
        headers: {
          Authorization: 'Bearer ' + this.$store.state.user.user.token
        },
        loading: false,
        dialogVisible: false,
        previewType: '',
        image: '',
        pdf: '',
        height: (document.body.scrollHeight - 90) + 'px',
        curUploadCount: 0,
        urlDialog: 'https://preview.imm.aliyuncs.com/index.html',
        fileTitle: '',
        dialogHeight: '',
        loadProgress:0
      };
    },
    methods: {
      onChangeFile(file, fileList) {
        this.loadProgress = 0;
        this.loading = true;
        if (file.response && file.response.code === 200 && file.response.data) {
          let result = this.single ? file.response.data : this.files.concat(file.response.data)
          this.$emit('UPLOAD_FILE', result);
          this.curUploadCount++;
          if (this.curUploadCount === fileList.length) {
            this.$refs.upload.clearFiles();
            this.curUploadCount = 0;
            this.loading = false;
          }
        }
      },

      uploadProcess(event, file, fileList){
        this.loadProgress = event.percent;
      },
      // 阿里云预览

      preview(item) {
        this.dialogVisible = false;
        this.dialogHeight = document.body.clientHeight;
        this.fileTitle = item.fileName;
        this.urlDialog = 'https://preview.imm.aliyuncs.com/index.html?r='+Date.parse(new Date());
        let type = this.$options.filters.getFileType(item.fileName);
        if(type==='pdf' || type==='ppt' || type==='excel' || type==='word'){
          this.previewType = 'file';
          let params = {
            fileId:item.fileId,
            accessCode:item.accessCode
          }
          api.getPreview(params).then(res => {
            if (res.code === 200) {
              this.dialogVisible = true;
              setTimeout(()=>{
                this.initIframe(res.data);
              },0)
            }
          }).catch(err => {
            console.log(err);
          });
        }else if(type==='image'){
          this.previewType = 'image';
          this.dialogVisible = true;
          this.image = 'https://dev-oss.cgvcap.com/file/' + item.fileId + '/' + item.accessCode;
        }else {
          this.$message.warning({ message: '该文档暂不支持在线预览！', duration: 1500 });
        }
      },

      // 前端预览
      /*
      preview(item) {
        switch (this.$options.filters.getFileType(item.fileName)) {
          case 'pdf':
            this.previewType = 'pdf';
            this.loading = true;
            request({
              url: 'https://dev-oss.cgvcap.com/file/' + item.fileId + '/' + item.accessCode,
              method: 'get',
              responseType: 'arraybuffer'
            }).then(res => {
              this.loading = false;
              let headers = res.headers;
              let blob = new Blob([res.data], {
                type: headers['content-type']
              });

              let pre = process.env.NODE_ENV === 'development' ? process.env.BASE_URL : '.';
              this.pdf = pre + '/pdfjs/web/viewer.html?file=' + window.URL.createObjectURL(blob);
              window.open(this.pdf, '_blank');
              //this.dialogVisible = true;
            }).catch(err => {
              this.loading = false;
              console.log(err);
            });
            break;
          case 'image':
            this.previewType = 'image';
            this.dialogVisible = true;
            this.image = 'https://dev-oss.cgvcap.com/file/' + item.fileId + '/' + item.accessCode;
            break;
          default:
            this.$message.warning({message: '该文档暂不支持在线预览！', duration: 1500});
        }
      },
      */
      initIframe(data) {
        let _this = this;
        let name = this.$store.state.user.user.jwtClaims.un;
        let id = this.$store.state.user.user.jwtClaims.id.substring(this.$store.state.user.user.jwtClaims.id.length - 11);
        let curTime = new Date().getTime();
        let time = this.$options.filters.DateTimeSecondEn(curTime / 1000);
        let msg = name + '  ' + id + '  ' + time
        window.sendMessage = function (action, data) {
          let view = 'filePreviewDialogVisible'
          var iframe = document.getElementById(view);
          iframe.contentWindow.postMessage(_this.json2str({action: action, data: data}), '*');
        };

        let fuc = function (e) {
          try {
            var r = JSON.parse(e.data);
          } catch (err) {
            return;
          }
          switch (r.action) {
            case 'preview.ready':
              window.sendMessage('preview.init', {
                url: data.url,
                region: data.region,
                bucket: data.bucket,
                accessKeyId: data.accessKeyId,
                accessKeySecret: data.accessKeySecret,
                stsToken: data.stsToken,
                wmType: 1,
                wmValue: msg,
                wmFont: '14px',
                wmWidth: 300,
                wmHeight: 150,
                wmColor: 'rgba(192,192,192,0.3)',
                wmRotate: -Math.PI / 6,
                copy: 1
              });
              window.sendMessage('setConfig', {
                writerCustomStyle: function (isMobile) {
                  if (!isMobile) {
                    return {
                      //隐藏翻页按钮。
                      paginationDisplay: false,
                      //隐藏全屏按钮。
                      fullScreenButtonDisplay: false,
                      //预览容器上边距。
                      containerMarginTop: 0,
                      //预览容器下边距。
                      containerMarginBottom: 0,
                      //容器背景色。
                      containerBackground: '#ffffff'
                    };
                  } else {
                    return {};
                  }
                }
              });
              window.removeEventListener('message', fuc, false);
              break;
          }
        };
        window.addEventListener('message', fuc, false);
      },
      /*
       download(item) { // 通过路径下载
         this.loading = true;
         request({
           url: 'https://dev-oss.cgvcap.com/file/' + item.fileId + '/' + item.accessCode,
           method: 'get',
           responseType: 'arraybuffer'
         }).then(res => {
           this.loading = false;
           let headers = res.headers;
           let title = item.fileName;
           let blob = new Blob([res.data], {
             type: headers['content-type']
           });
           let link = document.createElement('a');
           link.href = window.URL.createObjectURL(blob);
           link.download = title;
           link.click();
         }).catch(err => {
           this.loading = false;
           console.log(err);
         });
       },
       */
      download(item) { // 通过接口返回地址下载
        let params = {
          expireSecond: ''
        };
        api.getShareUrl(params, item.fileId, item.accessCode).then(res => {
          if (res.code === 200) {
            let link = document.createElement('a');
            link.href = res.data.shareUrl;
            link.target = '_new';
            link.click();
            // document.body.removeChild(link);
          }
        }).catch(err => {
          this.$message.error({message: JSON.stringify(err), duration: 1500})
        })
      },
      remove(index) {
        let removeFile = Object.assign({}, this.files[index])
        this.files.splice(index, 1);
        this.$emit('UPLOAD_FILE', this.files);
        this.$emit('REMOVE_FILE', removeFile);

      },
      hideDialog() {
        this.dialogVisible = false;
        this.previewType = '';
        this.image = '';
        this.pdf = '';
      },
      json2str(obj) {
        return JSON.stringify(obj, function (key, val) {
          if (typeof val === "function") {
            val = val.toString();
          }
          return val;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .files-wrap {
    width: auto;
    margin-bottom: 10px;
    display: table;

    .item {
      font-size: 14px;
      display: table-row;
      align-items: center;
      font-weight: bold;

      .name {
        display: table-cell;
        color: #3f6eb8;
        padding: 5px 0;
      }

      .tips {
        font-size: 14px;
        display: table-cell;
        align-items: center;
        font-weight: bold;
        padding: 5px 0;
      }

      .button {
        margin-left: 10px;
        padding: 0 5px
      }
    }
  }

  .image {
    max-width: 100%;
  }
</style>
