<template>
  <div class="login-wrap">
    <div class="top-wrap">
<!--      <div style="margin-right: 20px; text-align: center">-->
<!--        <i class="iconfont icon-logo" style="font-size: 20px"></i><br/>-->
<!--        <i class="iconfont icon-logo-font" style="font-size: 10px"></i>-->
<!--      </div>-->
      <img src="@/assets/logo.png" style="height: 35px;margin-right: 20px;">
      <span style="font-size: 18px;color: #0A1B37; margin-right: auto">凤翎办公协作平台</span>
<!--      <a href="https://www.cgvcap.com" target="_blank" style="margin-right: 64px">官网</a>-->
      <a :href="appUrl" target="_blank">下载凤翎</a>
    </div>
    <div v-show="view==='login'" class="main-body">
      <div class="center-box" :class="{'white-bg':type==='qrcode'}">
        <div class="login-tab">
          <span class="button" :class="{'on':type==='form'}" @click="type='form'" v-show="type!=='qrcode'">账号登录</span>
          <span class="button" :class="{'on':type==='formPhone'}" @click="type='formPhone'" v-show="type!=='qrcode'">免密登录</span>
          <strong style="font-size: 16px; color: #000" v-show="type==='qrcode'">扫码登录</strong>
          <span v-show="type!=='qrcode'" style="position: absolute;right: 2px; top: 2px;">
            <i class="iconfont icon-erweima" style="font-size: 42px; color: #A2A2A2; cursor: pointer" @click="getQrCode"></i>
          </span>
          <span v-show="type==='qrcode'" style="position: absolute;right: 2px; top: 2px;">
            <i class="iconfont icon-pc"  style="font-size: 42px; color: #A2A2A2; cursor: pointer" @click="type='form'"></i>
          </span>
        </div>
        <div style="padding:10px 20px 1px" v-show="type==='form'">
          <el-form :model="form" :rules="rules" ref="form" label-width="0" style="margin-top: 10px">
            <el-form-item label="" prop="name">
              <el-input v-model="form.name" placeholder="手机号/邮箱/用户名" type="text" size="large"></el-input>
            </el-form-item>
            <el-form-item label="" prop="psw" style="margin-top: 20px; padding-bottom: 0; margin-bottom: 0">
              <el-input v-model="form.psw" placeholder="密码" type="password" @keyup.enter.native="submit('form')"
                        size="large"></el-input>
            </el-form-item>
            <el-form-item label="" prop="psw" style="margin: 0;padding: 0; text-align: right">
              <el-button type="text" @click="showForget()" >
                忘记密码?
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit()" class="submit" :loading="!!requestLoading" style="width:100%; background: #3C6CBA; color: #fff; height: 44px;; border-color:#3C6CBA ">
                登 录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="padding:10px 20px 1px" v-show="type==='formPhone'">
          <el-form :model="formPhone" :rules="rulesPhone" ref="formPhone" label-width="0" style="margin-top: 10px">
            <el-form-item label="" prop="name">
              <el-input v-model="formPhone.name" placeholder="手机号" type="text" size="large">
                <template slot="prepend">+86</template>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="psw" style="margin-top: 20px">
              <el-input v-model="formPhone.psw" placeholder="输入6位数字验证码" @keyup.enter.native="submit('form')"  size="large">
                <el-button slot="append" @click="getCode()" style="border:none; box-shadow: none" :disabled="!canCode">
                  {{canCode?'获取验证码':(timer+'秒')}}
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit()" class="submit" :loading="!!requestLoading" style="margin-top:15px; width:100%; background: #3C6CBA; color: #fff; height: 44px;; border-color:#3C6CBA ">
                登 录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="padding: 5px 50px; text-align: center" v-show="type==='qrcode'">
          <transition name="el-fade-in-linear">
            <div v-show="type==='qrcode'" class="qrCodeUrl">
              <img :src="qrCodeUrl" style="width: 180px; height: 180px; margin-top: 20px"><br/>
              <div  style="display: flex; text-align: left; font-size: 14px; justify-content: center; align-items: center; padding: 20px">
                <i class="iconfont icon-saoyisao" style="font-size: 28px; padding-right: 10px; color:#3C6CBA "></i>
                <span>打开 <a :href="appUrl" target="_blank" style="text-decoration: none;"><strong style="color:#3C6CBA ">凤翎APP</strong></a><br/>扫一扫登录</span>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div v-show="view==='forget'" class="main-body">
      <div class="center-box" v-show="step===1">
        <div class="login-tab">
          <span class="button">忘记密码</span>
          <span style="position: absolute; left: 20px; top:16px; font-size: 14px; color: #0A1B37; cursor: pointer" @click="view='login'"><i class="el-icon-arrow-left"></i>登录</span>
        </div>
        <div style="padding:10px 20px 1px">
          <el-form :model="formPhoneForget" :rules="rulesPhoneForget" ref="formPhoneForget" label-width="0" style="margin-top: 10px">
            <el-form-item label="" prop="name">
              <el-input v-model="formPhoneForget.name" placeholder="手机号" type="text" size="large">
                <template slot="prepend">+86</template>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="psw" style="margin-top: 20px">
              <el-input v-model="formPhoneForget.psw" placeholder="输入6位数字验证码" @keyup.enter.native="forgetNext()"  size="large">
                <el-button slot="append" @click="getForgetCode()" style="border:none; box-shadow: none" :disabled="!canCode">
                  {{canCode?'获取验证码':(timer+'秒')}}
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="forgetNext()" class="submit" :disabled="formPhoneForget.psw.length!==6" :loading="!!requestLoading" style="margin-top:15px; width:100%; background: #3C6CBA; color: #fff; height: 44px;; border-color:#3C6CBA ">
                下一步
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="center-box" v-show="step===2">
        <div class="login-tab">
          <span class="button">忘记密码</span>
          <span style="position: absolute; left: 20px; top:16px; font-size: 14px; color: #0A1B37; cursor: pointer" @click="step=1"><i class="el-icon-arrow-left"></i>上一步</span>
        </div>
        <div style="padding:10px 20px 1px">
          <el-form :model="formPsw" :rules="rulesFormPsw" ref="formPsw" label-width="0" style="margin-top: 10px">
            <el-form-item label="" prop="name">
              <el-input v-model="formPsw.psw1" placeholder="设置新密码" type="password" size="large">
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="psw" style="margin-top: 20px">
              <el-input v-model="formPsw.psw2" placeholder="重复新密码" type="password" size="large">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resetPsw()" class="submit"  :loading="!!requestLoading" style="margin-top:15px; width:100%; background: #3C6CBA; color: #fff; height: 44px;; border-color:#3C6CBA ">
                确定
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="center-box" v-show="step===3" style="padding-top: 80px">
        <span class="iconfont icon-yishenpi" style="color:#4ec169; font-size: 60px"></span><br/><br/>
        修改成功
      </div>
    </div>
    <div class="copy-right">粤ICP备19111962号-1<br/>Copyright © 2019-2021 深圳市碧桂园创新投资有限公司</div>
  </div>

</template>
<style lang="scss" scoped>
  .login-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("../../assets/login.jpg") center no-repeat;
    background-size: auto 100%;

    .top-wrap{
      position: absolute;
      top: 16px;
      left: 10%;
      right: 10%;
      width: 80%;;
      display: flex;
      align-items: center;
      a{
        font-size: 16px;
        color: #0A1B37;
        text-decoration: none;
      }
      a:hover{
        color: #1D6EFF ;
      }
    }

    .main-body {
      position: absolute;
      width: 340px;
      height: 268px;
      /*right:160px;*/
      top: 50%;
      left: 50%;
      margin-top: -180px;
      margin-left: -170px;
      text-align: center;
    }

    .center-box {
      width: 100%;
      background: rgba(255, 255, 255, 0.4);
      position: relative;
      height: 275px;
      transition: all 0.8s;
      -webkit-transition: all 0.8s;
      .login-tab {
        position: relative;
        height: 50px;
        text-align: center;
        font-size: 16px;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px;

        .button {
          position: relative;
          margin: 0 20px;
          cursor: pointer;
        }

        .button.on {
          color: #3C6CBA;
        }

        .button.on:after {
          position: absolute;
          content: '';
          width: 36px;
          height: 2px;
          background: #3C6CBA;
          border-radius: 2px;
          left: 16px;
          top: 28px;
        }
      }
    }

    .copy-right {
      position: absolute;
      bottom: 20px;
      left: 0;
      right: 0;
      line-height: 24px;
      text-align: center;
      font-size: 14px;
      color: #223E6A;
    }

    .logo-wrap {
      position: absolute;
      top: 30px;
      left: 50px;
    }

    .culture {
      position: absolute;
      bottom: 100px;
      left: 50px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      color: #fff;
      text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.8);

    }

    .culture.view1 {
      animation: mymove1 12s infinite;
      -webkit-animation: mymove1 12s infinite; /* Safari 和 Chrome */
    }

    .culture.view2 {
      animation: mymove2 12s infinite;
      -webkit-animation: mymove2 12s infinite; /* Safari 和 Chrome */
    }

    .culture.view3 {
      animation: mymove3 12s infinite;
      -webkit-animation: mymove3 12s infinite; /* Safari 和 Chrome */
    }

    .shadow {

    }

    .qrCodeUrl {
      opacity: 0;
      animation: show 2s forwards;
      -webkit-animation: show 2s forwards; /* Safari 和 Chrome */
    }

    @keyframes show {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    .white-bg {
      background: #fff;
      height: 345px;
    }

    @keyframes mymove1 {
      0% {
        opacity: 1;
      }
      27% {
        opacity: 1;
      }
      33% {
        opacity: 0;
      }
      97% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @-webkit-keyframes mymove1 /*Safari and Chrome*/
    {
      0% {
        opacity: 1;
      }
      27% {
        opacity: 1;
      }
      33% {
        opacity: 0;
      }
      97% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes mymove2 {
      0% {
        opacity: 0;
      }
      27% {
        opacity: 0;
      }
      33% {
        opacity: 1;
      }
      60% {
        opacity: 1;
      }
      66% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }

    @-webkit-keyframes mymove2 /*Safari and Chrome*/
    {
      0% {
        opacity: 0;
      }
      27% {
        opacity: 0;
      }
      33% {
        opacity: 1;
      }
      60% {
        opacity: 1;
      }
      66% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }

    @keyframes mymove3 {
      0% {
        opacity: 0;
      }
      60% {
        opacity: 0;
      }
      66% {
        opacity: 1;
      }
      94% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    @-webkit-keyframes mymove3 /*Safari and Chrome*/
    {
      0% {
        opacity: 0;
      }
      60% {
        opacity: 0;
      }
      66% {
        opacity: 1;
      }
      94% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }

  /*
  .login {
    width: 100%;
    height: auto;
    background-size: cover;
    position: relative;
  }
  .logo{
    width: 40px;
  }
  .box {
    width: 320px;
    height: 280px;
    text-align: center;
    position: absolute;
    background: #fff;
    border-radius: 5px;
    left: 50%;
    top: 35%;
    margin: -140px 0  0 -160px;
    padding: 30px 20px;
  }
  .submit{
    margin-top: 10px;
    width: 100%;
  }
  */
</style>
<script>
  import moment from 'moment';
  import api from '@/api/user';
  import md5 from 'js-md5';
  export default {
    name: 'login',
    components: {},
    data() {
      return {
        view: 'login',
        step: 1,
        type: 'form',
        canCode: true,
        timer: 0,
        height: '',
        form: {
          name: '',
          psw: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入帐号', trigger: 'blur' }
          ],
          psw: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        formPhone: {
          name: '',
          psw: ''
        },
        rulesPhone: {
          name: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          psw: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        formPsw: {
          psw1: '',
          psw2: ''
        },
        rulesFormPsw: {
          psw1: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          psw2: [
            { required: true, message: '请输入确认密码', trigger: 'blur' }
          ]
        },
        formPhoneForget: {
          name: '',
          psw: ''
        },
        rulesPhoneForget: {
          name: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          psw: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },
        qrCodeUrl: '',
        randomId: '',
        websocket:'',
        appUrl:''
      };
    },
    mounted() {
      let _this = this;
      window.onresize = () => {
        _this.height = document.documentElement.clientHeight;
      };
      this.init();

      let pre = process.env.NODE_ENV === 'development' ? process.env.BASE_URL : '.';
      this.appUrl = pre + '/app/app.html';
    },
    computed: {
      requestLoading() {
        return this.$store.getters.requestLoading;
      }
    },
    methods: {
      init() {
        this.height = document.documentElement.clientHeight;
        this.$store.dispatch('FedLogOut');
      },
      submit() {
        this.$refs[this.type].validate((valid) => {
          if (valid) {
            this.login();
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 登录操作
      login() {
        if (this.type === 'form') {
          let params = {
            username: this.form.name.trim(),
            password: md5(this.form.psw)
          };
          this.$store.dispatch('Login', params).then(() => {
            this.$message.success({ message: '欢迎回来', duration: 1500 });
            this.$router.push({ path: '/cost/labor'});
            this.closeWebSocket();
            /*
            if(this.$store.state.user.user.jwtClaims.up){
              this.$message.success({ message: '登录成功，请修改初始密码！', duration: 1500 })
              this.$router.push({ path: '/reset' })
            }else {
              this.$message.success({ message: '欢迎回来', duration: 1500 })
              this.$router.push({ path: '/schedule/index' })
            }
            */
          }).catch(err => {
            console.log(err);
          });
        } else {
          let params = {
            mobileNo: this.formPhone.name,
            verifyCode: this.formPhone.psw
          };
          this.$store.dispatch('LoginPhone', params).then(() => {
            this.$message.success({ message: '欢迎回来', duration: 1500 });
            this.$router.push({ path: '/cost/labor' });
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 获取验证码
      getCode() {
        let _this = this;
        if (!this.formPhone.name) {
          this.$message.warning({ message: '请输入手机号码', duration: 1500 });
        } else if (this.canCode) {
          let params = { contact: this.formPhone.name, verifyCodeType: 'SL' };
          api.getCode(params).then(res => {
            if (res.code === 200) {
              this.canCode = false;
              this.timer = 60;
              this.$message.success({ message: '验证码已经发送，请注意查看！', duration: 1500 });
              let t = setInterval(() => {
                if (_this.timer < 0) {
                  this.canCode = true;
                  clearInterval(t);
                } else {
                  _this.timer--;
                }
              }, 1000);
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 获取qrcode
      getQrCode() {
        if (this.qrCodeUrl) {
          this.type = 'qrcode';
        } else {
          this.qrCodeUrl = '';
          this.randomId = this.randomId || (moment().format('YYYYMMDDHHmmss') + '' + Math.ceil(Math.random() * 10));
          let params = {
            codeType:'login',
            // path: 'pages/oauth/index?code=' + this.randomId,
            args:'code='+this.randomId,
            // scene: '',
            width: 800
          };
          api.getMpQrcode(params).then(res => {
            let headers = res.headers;
            let blob = new Blob([res.data], {
              type: headers['content-type']
            });
            this.qrCodeUrl = window.URL.createObjectURL(blob);
            this.type = 'qrcode';
            this.conectSocket();
          }).catch(err => {
            console.log(err);
          });
        }
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
        this.$store.dispatch('SetUser', JSON.parse(event.data).data);
        setTimeout(() => {
          this.$message.success({ message: '欢迎回来', duration: 1500 });
          this.$router.push({ path: '/cost/labor' });
        }, 500);
        this.closeWebSocket();
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
          this.websocket = new WebSocket(this.socketUrl + '/websocket/qrLogin/' + this.randomId);
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
        if (this.websocket) {
          this.websocket.close();
        }
      },
      // socket相关结束
      showForget(){
        this.view='forget';
        this.formPhoneForget.name = '';
        this.formPhoneForget.psw = '';
        this.step=1;
      },
      // 获取验证码
      getForgetCode() {
        let _this = this;
        if (!this.formPhoneForget.name) {
          this.$message.warning({ message: '请输入手机号码', duration: 1500 });
        } else if (this.canCode) {
          let params = { telNo: this.formPhoneForget.name, codeType: 'CP' };
          api.getForgetCode(params).then(res => {
            if (res.code === 200) {
              this.canCode = false;
              this.timer = 60;
              this.$message.success({ message: '验证码已经发送，请注意查看！', duration: 1500 });
              let t = setInterval(() => {
                if (_this.timer < 0) {
                  this.canCode = true;
                  clearInterval(t);
                } else {
                  _this.timer--;
                }
              }, 1000);
            }
          }).catch(err => {
            console.log(err);
          });
        }
      },
      forgetNext(){
        this.step = 2
      },
      resetPsw(){
        if(this.formPsw.psw1 !== this.formPsw.psw2){
          this.$message.warning({ message: '两次输入密码不一致！', duration: 1500 });
        }else {
          let params = {
            password:md5(this.formPsw.psw1),
            telNo:this.formPhoneForget.name,
            verifyCode:this.formPhoneForget.psw
          }
          api.resetPsw(params).then(res => {
            if (res.code === 200) {
              this.$message.success({ message: '密码重置成功！', duration: 1500 });
              this.step = 3;
              setTimeout(()=>{
                this.view = 'login';
                this.form.name = this.formPhoneForget.name;
                this.type='form';
              },2000)
            }
          }).catch(err => {
            console.log(err);
          });
        }
      }
    }
  };
</script>
