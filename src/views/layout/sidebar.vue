<template>
  <div>
    <div class="icon-menu" :style="{'height':height+'px'}">
      <div class="logo">
<!--        <i class="iconfont icon-logo"></i><br/>-->
        <img src="@/assets/logo-side.png" style="height: 40px">
        <!--<i class="iconfont icon-logo-font" style="font-size: 16px"></i>-->
      </div>
      <ul>
        <li v-for="(item,index) in menu" :class="item.isActive?'active':''" @click="clickMenu(index)" :key="index"
            v-show="item.isRight">
          <i :class="'iconfont off '+ item.iconOff"></i>
          <i :class="'iconfont on '+ item.iconOn"></i>
          <span class="name">{{item.name || ' '}}</span>
          <div class="sub-icon-menu-wrap" v-if="item.childList && item.childList.length>0" @click.stop
               :style="{bottom:(172+(sideMenuCounter-1)*70-height)+'px',top:-100-(sideMenuCounter-1)*70+'px'}">
            <!-- v-if="item.childList && item.childList.length>0"-->
            <div v-for="(row,rIndex) in item.childList" :key="rIndex">
              <div class="s-title">{{row.title}}</div>
              <div class="s-wrap">
              <span class="sub-icon" v-for="(sub,sIndex) in row.childList" v-show="sub.isRight" :key="sIndex"
                    @click="clickSubMenu(index,rIndex,sIndex)">
                <i :class="'iconfont '+sub.icon+' '+sub.color"></i><br/>{{sub.name}}
              </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="user" @click="userSettingVisible=!userSettingVisible" v-if="avatar">
      <avatar :user="avatar"/>
    </div>
    <div class="user-setting" v-show="userSettingVisible"><!---->
      <!--
      <span class="setting-list" @click="$router.push({path:'/system/account'})">
        <i class="iconfont icon-gerenpianhaoshezhi"></i> 个人设置偏好
      </span>
      -->
      <span class="setting-list" @click="$router.push({path:'/system/account'})" v-show="hasRight(5)">
        <i class="iconfont icon-zhanghaoziliaoshezhi"></i> 账号资料设置
      </span>
      <span class="block-line"></span>
      <span class="setting-list" @click="$router.push({path:'/system/dashboard'})" v-show="hasRight(1)">
        <i class="iconfont icon-houtaizonglan"></i> 进入企业后台
      </span>
      <span class="setting-list" @click="logout">
        <i class="iconfont icon-dengchu"></i> 登出当前企业
      </span>
    </div>
  </div>
</template>
<script>
  import avatar from '@/components/avatar';
  import index from '@/utils/index';

  export default {
    computed: {
      menu() {
        let path = this.$store.getters.path;
        let menu = this.$store.getters.menu;
        for (let i in menu) {
          switch (menu[i].name) {
            case 'OKR':
              menu[i].isActive = path.indexOf('/okr') === 0;
              break;
            case '简报':
              menu[i].isActive = path.indexOf('/report') === 0;
              break;
            case '消息':
              menu[i].isActive = path.indexOf('/message') === 0;
              break;
            case '跟投':
              menu[i].isActive = path.indexOf('/invest') === 0;
              break;
            case '签到':
              menu[i].isActive = path.indexOf('/sign') === 0;
              break;
            case '评分':
              menu[i].isActive = path.indexOf('/score') === 0;
              break;
            case '投管':
              menu[i].isActive = path.indexOf('/manage') === 0;
              break;
            case '官网':
              menu[i].isActive = path.indexOf('/website') === 0;
              break;
            case '日程':
              menu[i].isActive = path.indexOf('/schedule') === 0;
              break;
            case '会议室':
              menu[i].isActive = path.indexOf('/meeting') === 0;
              break;
            case '审批':
              menu[i].isActive = path.indexOf('/approve') === 0;
              break;
            case '归档':
              menu[i].isActive = path.indexOf('/document') === 0;
              break;
            case '资讯':
              menu[i].isActive = path.indexOf('/information') === 0;
              break;
            case '订阅':
              menu[i].isActive = path.indexOf('/subscription') === 0;
              break;
            case '广告':
              menu[i].isActive = path.indexOf('/advertising') === 0;
              break;
            case '知识库':
              menu[i].isActive = path.indexOf('/knowledge') === 0 || path.indexOf('/repository') === 0;
              break;
            case '人力':
              menu[i].isActive = path.indexOf('/hr') === 0;
              break;
            case '财务':
              menu[i].isActive = path.indexOf('/finance') === 0;
              break;
            case '云盘':
              menu[i].isActive = path.indexOf('/disk') === 0;
              break;
            case '风向标':
              menu[i].isActive = path.indexOf('/indicator') === 0;
              break;
          }
        }
        return menu;
      },
      version() {
        return this.$store.getters.version;
      },
      user() {
        return this.$store.getters.user;
      },
      message() {
        return this.$store.getters.messageCount;
      },
      // approval(){
      //   let obj = this.$store.getters.approveCount
      //   let count = 0;
      //   for(let key in obj){
      //     count+= obj[key]
      //   }
      //   return count;
      // }
    },
    components: { avatar },
    data() {
      return {
        userSettingVisible: false,
        avatar: '',
        height: '',
        sideMenuCounter: 0

      };
    },
    mounted() {
      this.avatar = {
        userAvatar: this.user.user.jwtClaims.ua,
        userId: this.user.user.jwtClaims.id,
        userName: this.user.user.jwtClaims.un,
        size: 45
      };
      this.height = document.documentElement.clientHeight;
      let ar = this.user?this.user.user.jwtClaims.ar:[];
      for (let i in this.menu) {
        this.menu[i].isRight = this.menu[i].code ? index.hasRight(ar, this.menu[i].code) : true;
        this.sideMenuCounter = this.menu[i].isRight ? this.sideMenuCounter + 1 : this.sideMenuCounter;
        for (let x in this.menu[i].sideMenu) {
          this.menu[i].sideMenu[x].isRight = this.menu[i].sideMenu[x].code ? index.hasRight(ar, this.menu[i].sideMenu[x].code) : true;
        }
        for (let j in this.menu[i].childList) {
          this.menu[i].childList[j].isRight = this.menu[i].code ? index.hasRight(ar, this.menu[i].childList[j].code) : true;
          for (let k in this.menu[i].childList[j].childList) {
            this.menu[i].childList[j].childList[k].isRight = this.menu[i].code ? index.hasRight(ar, this.menu[i].childList[j].childList[k].code) : true;
          }
        }
      }
      this.getMsg();
      setTimeout(()=>{
        // this.getApprovalMsg();
      },500)
      this.conectSocket();
      // setInterval(()=>{
      //   this.$store.dispatch('GetMessageCount').then(() => {
      //   }).catch(err => {
      //     console.log(err);
      //   });
      // },2000)
      // this.$store.disapath

    },
    methods: {
      // icon菜单点击事件
      clickMenu(index) {
        if (!this.menu[index].isActive) {
          this.$store.dispatch('SetMenu', index);
          if (this.menu[index].path) {
            this.$router.push({ path: this.menu[index].path });
          } else if (this.menu[index].childList) {
            this.$router.push({ path: this.menu[index].childList[0].path });
          } else if(this.menu[index].sideMenu && this.menu[index].sideMenu.length>0){
            let list = this.menu[index].sideMenu;
            let can = true;
            list.map(item=>{
              if(this.hasRight(item.code) && can){
                if(item.path){
                  this.$router.push({ path: item.path });
                  can = false;
                }else if(item.children && item.children.length>0){
                  item.children.map(child=>{
                    if(this.hasRight(child.code) && can && child.path){
                      this.$router.push({ path: child.path });
                      can = false;
                    }
                  })
                }
              }
            })
          }
        }
      },
      clickSubMenu(parents, child, son) {
        this.$store.dispatch('SetChildMenu', [parents, child]);
        if (this.menu[parents].childList[child].path) {
          this.$router.push({ path: this.menu[parents].childList[child].path });
        } else if (this.menu[parents].childList[child].childList) {
          this.$router.push({ path: this.menu[parents].childList[child].childList[son].childList[0].path });
        }
      },
      logout() {
        this.$store.dispatch('Logout', '').then(() => {
          this.$message.success({ message: '登出成功', duration: 1500 });
          this.$router.push({ path: '/' });
        }).catch(err => {
          console.log(err);
        });
      },
      hasRight(code) {
        let ar = this.user?this.user.user.jwtClaims.ar:[];
        return index.hasRight(ar, code);
      },
      getMsg() {
        this.$store.dispatch('GetMessageCount').then(() => {
        }).catch(err => {
          console.log(err);
        });
      },
      // socket相关
      initWebSocket() {
        // 连接错误
        this.websocket.onerror = this.setErrorMessage;
        // 连接成功
        this.websocket.onopen = this.setOnopenMessage;
        // 收到消息的回调
        this.websocket.onmessage = this.setOnmessageMessage;
        // 连接关闭的回调
        this.websocket.onclose = this.setOncloseMessage;
        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = this.onbeforeunload;
      },
      setErrorMessage() {
        console.log('WebSocket连接发生错误' + '   状态码：' + this.websocket.readyState);
      },
      setOnopenMessage() {
        console.log('WebSocket连接成功' + '   状态码：' + this.websocket.readyState);
      },
      setOnmessageMessage(event) {
        this.getMsg();
      },
      setOncloseMessage() {
        console.log('WebSocket连接关闭' + '   状态码：' + this.websocket.readyState);
        this.conectSocket();
      },
      onbeforeunload() {
        this.closeWebSocket();
      },
      conectSocket() {
        let ws = (process.env.BASE_API.indexOf('https') > -1) ? 'wss://' : 'ws://';
        this.socketUrl = ws + process.env.BASE_API.substring(process.env.BASE_API.indexOf('//') + 2);
        if ('WebSocket' in window) {
          this.websocket = new WebSocket(this.socketUrl + '/websocket/message/' + this.user.user.jwtClaims.id);
          this.initWebSocket();
        } else {
          alert('当前浏览器 Not support websocket');
        }
      },
      send() {
        this.websocket.send(this.text);
        this.text = '';
      },
      closeWebSocket() {
        this.websocket.close();
      }
      // socket相关结束
    }
  };
</script>
<style lang="scss" scoped>
  .icon-menu {
    position: relative;
    width: 70px;
    background: #3C6CBA;
    color: #fff;
    text-align: center;
    overflow: auto;

    .logo {
      position: fixed;
      padding: 12px 0 7px;
      width: 70px;
      text-align: center;
      background: #3C6CBA;
      z-index: 1;
      .iconfont {
        font-size: 28px;
      }
    }

    ul {
      padding: 0;
      margin: 50px 0 80px;

      li {
        list-style: none;
        height: 70px;
        cursor: pointer;
        display: block;
        line-height: 22px;
        font-size: 12px;
        padding-top: 25px;
        position: relative;
        transition: all 0.5s;
        -webkit-transition: all 0.5s;

        .iconfont {
          font-size: 24px;
        }

        .iconfont.off {
          display: block;
        }

        .iconfont.on {
          display: none;
        }

        .name {
          opacity: 1;
        }

        .tips {
          position: absolute;
          top: 13px;
          left: 40px;
          padding: 2px 5px;
          line-height: 13px;
          border-radius: 15px;
          background: #ff5b57;
          color: #fff;
          font-size: 12px;
          -moz-transform: scale(0.75,0.75);
          -webkit-transform: scale(0.75,0.75);
          -o-transform: scale(0.75,0.75);
          transform: scale(0.75,0.75);
        }

        .sub-icon-menu-wrap {
          display: none;
          position: absolute;
          z-index: 2;
          /*top: -450px;*/
          right: -239px;
          bottom: 0;
          overflow-y: auto;
          overflow-x: hidden;
          width: 239px;
          padding: 7px;
          background: #fff;
          color: #666;

          .s-title {
            text-align: left;
            font-weight: bold;
            font-size: 14px;
            color: #48525C;
            width: 100%;
            float: left;
          }

          .s-wrap {
            width: 100%;
            float: left;
            margin-bottom: 10px;
          }

          .sub-icon {
            display: block;
            float: left;
            width: 70px;
            height: 70px;
            border: solid 1px #fff;
            padding-top: 10px;

            .iconfont {
              font-size: 20px;
            }
          }

          .sub-icon:hover {
            border: solid 1px #e6e6e6;
          }
        }
      }

      li:hover {
        padding-top: 18px;
        background: rgba(0, 0, 0, .25);

        .iconfont.off {
          display: none;
        }

        .iconfont.on {
          display: block;
        }

        .name {
          opacity: 1;
        }

        .sub-icon-menu-wrap {
          display: block;
        }
      }

      li.active {
        background: rgba(0, 0, 0, .25);

        .iconfont.off {
          display: none;
        }

        .iconfont.on {
          display: block;
        }
      }

      li.active:before {
        content: '';
        position: absolute;
        right: 0;
        top: 30px;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-right: 8px solid rgba(255, 255, 255, .95);
        border-bottom: 6px solid transparent;
      }
    }
  }
  .icon-menu::-webkit-scrollbar {display:none}
  .user {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 70px;
    height: 70px;
    background: #3C6CBA;
    text-align: center;
    color: #48525C;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-setting {
    z-index: 10;
    position: absolute;
    bottom: 10px;
    left: 70px;
    width: 239px;
    background: #fff;
    padding: 5px 0;
    font-size: 14px;
    text-align: left;

    .setting-list {
      display: block;
      height: 40px;
      line-height: 40px;
      color: #666;
      cursor: pointer;
      padding-left: 15px;
      transition: all 0.5s;
      -webkit-transition: all 0.5s;

      .iconfont {
        font-size: 14px;
        padding-right: 5px;
      }
    }

    .setting-list:hover {
      background: #eee;
      padding-left: 30px;
    }

    .block-line {
      display: block;
      height: 1px;
      width: 209px;
      margin: 2px 15px;
      background: #eee;
    }
  }
</style>
