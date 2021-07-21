<template>
  <div>
    <el-button type="text" class="button" @click="preview()">{{tips}}</el-button>
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
  </div>
</template>
<script>
  function createObjectURL(object) {
    return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
  }
  import api from '@/api/user';

  export default {
    name: '',
    components: {},
    props: {
      file: { // 文件
        type: Object,
        default() {
          return {};
        }
      },
      tips:{
        type: String,
        default() {
          return '预览';
        }
      }
    },
    data() {
      return {
        loading: false,
        dialogVisible: false,
        previewType: '',
        image: '',
        pdf: '',
        height: (document.body.scrollHeight - 90) + 'px',
        urlDialog: 'https://preview.imm.aliyuncs.com/index.html',
        fileTitle: '',
        dialogHeight: ''
      };
    },
    methods: {
      // 阿里云预览
      preview() {
        this.dialogVisible = false;
        this.dialogHeight = document.body.clientHeight;
        this.fileTitle = this.file.fileName;
        this.urlDialog = 'https://preview.imm.aliyuncs.com/index.html?r='+Date.parse(new Date());
        let type = this.$options.filters.getFileType(this.file.fileName);
        if(type==='pdf' || type==='ppt' || type==='excel' || type==='word'){
          this.previewType = 'file';
          let params = {
            fileId:this.file.fileId,
            accessCode:this.file.accessCode
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
          this.image = 'https://dev-oss.cgvcap.com/file/' + this.file.fileId + '/' + this.file.accessCode;
        }else {
          this.$message.warning({ message: '该文档暂不支持在线预览！', duration: 1500 });
        }
      },

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
      download() { // 通过接口返回地址下载
        let params = {
          expireSecond: ''
        };
        api.getShareUrl(params, this.file.fileId, this.file.accessCode).then(res => {
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
