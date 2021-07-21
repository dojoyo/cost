<template>
  <!--
  <div class="login" :style="{'height':height+'px'}">
    <div class="box">
      <div><i class="iconfont icon-logo" style="font-size: 48px"></i><br/><br/><i class="iconfont icon-logo-font" style="font-size: 32px"></i></div>
      <el-form :model="form" :rules="rules" ref="form" label-width="0" style="margin-top: 30px">
        <el-form-item label="" prop="name">
          <el-input v-model="form.name" placeholder="你的邮箱或手机号" type="text"></el-input>
        </el-form-item>
        <el-form-item label="" prop="psw">
          <el-input v-model="form.psw" placeholder="密码" type="password" @keyup.enter.native="submit('form')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('form')" class="submit" :loading="!!requestLoading">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  -->
  <div class="login-wrap">
    <div class="main-body">
      <div style="width: 100%">
        <i class="iconfont icon-logo" style="font-size: 48px"></i><br/><br/>
        <i class="iconfont icon-logo-font" style="font-size: 32px"></i><br/><br/>
        <!--<span style="font-size: 24px;color: #000000;">碧桂园创投办公协作平台</span>-->
      </div>
      <div class="center-box">
        <div class="login-tab">
          <span class="button" :class="{'on':type==='form'}" @click="type='form'">账号登录</span><span class="button" :class="{'on':type==='formPhone'}"  @click="type='formPhone'">免密登录</span>
        </div>
        <div style="padding: 0 50px" v-show="type==='form'">
          <el-form :model="form" :rules="rules" ref="form" label-width="0" style="margin-top: 20px">
            <el-form-item label="" prop="name">
              <el-input v-model="form.name" placeholder="手机号/邮箱/用户名" type="text" size="large"></el-input>
            </el-form-item>
            <el-form-item label="" prop="psw" style="margin-top: 20px">
              <el-input v-model="form.psw" placeholder="密码" type="password" @keyup.enter.native="submit('form')" size="large"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit()" class="submit" :loading="!!requestLoading" style="margin-top:10px; width:100%; background: #3C6CBA; color: #fff; height: 44px;; border-color:#3C6CBA ">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div style="padding: 0 50px" v-show="type==='formPhone'">
          <el-form :model="formPhone" :rules="rulesPhone" ref="formPhone" label-width="0" style="margin-top: 20px">
            <el-form-item label="" prop="name">
              <el-input v-model="formPhone.name" placeholder="手机号" type="text" size="large">
                <template slot="prepend">+86</template>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="psw" style="margin-top: 20px">

              <el-input v-model="formPhone.psw" placeholder="输入6位数字验证码"  @keyup.enter.native="submit('form')" size="large">
                <el-button slot="append" @click="getCode()" style="border:none; box-shadow: none" :disabled="!canCode">{{canCode?'获取验证码':(timer+'秒')}}</el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit()" class="submit" :loading="!!requestLoading" style="margin-top:10px; width:100%; background: #3C6CBA; color: #fff; height: 44px;; border-color:#3C6CBA ">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--<div class="copy-right">粤ICP备19004658号<br/>©-2019 深圳市碧桂园创新投资有限公司</div>-->
  </div>

</template>
<style lang="scss" scoped>
  .login-wrap{
    position: absolute; top: 0; left: 0; right: 0; bottom:0; background: #f5f5f5;
    .main-body{
      position:absolute; width: 400px; left: 50%; margin-left: -200px; top: 50%;margin-top: -300px; text-align: center;
    }
    .center-box{
      width: 100%; margin-top: 35px; background: #fff; height: 300px;
      .login-tab{
        width: 100%; height: 60px; text-align: left; line-height: 60px; font-size: 16px; color: #000000;
        .button{
          margin-left: 50px;
          cursor: pointer;
        }
        .button.on{
          color: #3C6CBA; border-bottom: solid 2px #3C6CBA; padding-bottom: 5px
        }
      }
    }
    .copy-right{
      position: absolute;bottom: 20px;left: 0; right: 0; line-height: 24px; text-align: center;font-size: 14px;color: #A2A2A2;
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
  import api from '@/api/user'
export default {
  name: 'login',
  components: {},
  data() {
    return {
      type:'form',
      canCode:true,
      timer:0,
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
    }
  },
  mounted() {
    let _this = this
    window.onresize = () => {
      _this.height = document.documentElement.clientHeight
    }
    this.init()
  },
  computed: {
    requestLoading() {
      return this.$store.getters.requestLoading
    }
  },
  methods: {
    init() {
      this.height = document.documentElement.clientHeight
    },
    submit() {
      this.$refs[this.type].validate((valid) => {
        if (valid) {
          this.login()
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 登录操作
    login() {
      if(this.type==='form'){
        let params = {
          username: this.form.name.trim(),
          password: this.form.psw
        }
        this.$store.dispatch('Login', params).then(() => {
          this.$message.success({ message: '欢迎回来', duration: 1500 })
          this.$router.push({ path: '/okr/target' })
          /*
          if(this.$store.state.user.user.jwtClaims.up){
            this.$message.success({ message: '登录成功，请修改初始密码！', duration: 1500 })
            this.$router.push({ path: '/reset' })
          }else {
            this.$message.success({ message: '欢迎回来', duration: 1500 })
            this.$router.push({ path: '/okr/target' })
          }
          */
        }).catch(err => {
          console.log(err)
        })
      }else {
        let params = {
          mobileNo: this.formPhone.name,
          verifyCode: this.formPhone.psw
        }
        this.$store.dispatch('LoginPhone', params).then(() => {
          this.$message.success({ message: '欢迎回来', duration: 1500 })
          this.$router.push({ path: '/okr/target' })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 获取验证码
    getCode(){
      let _this = this;
      if(!this.formPhone.name){
        this.$message.warning({ message: '请输入手机号码', duration: 1500 })
      }else if(this.canCode){
        let params = {contact:this.formPhone.name,verifyCodeType:'SL'};
        api.getCode(params).then(res => {
          if (res.code === 200) {
            this.canCode=false;
            this.timer=60;
            this.$message.success({message: '验证码已经发送，请注意查看！', duration: 1500})
            let t = setInterval(()=>{
              if(_this.timer<0){
                this.canCode=true;
                clearInterval(t)
              }else {
                _this.timer--
              }
            },1000)
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }

  }
}
</script>
