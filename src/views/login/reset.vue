<template>

  <div class="login-wrap">
    <div class="main-body">
      <div style="width: 100%">
        <i class="iconfont icon-logo" style="font-size: 48px"></i><br/><br/>
        <i class="iconfont icon-logo-font" style="font-size: 32px"></i><br/><br/>
      </div>
      <div class="center-box">
        <div class="login-tab">
          <span class="button on">密码修改</span> <span style="margin-left: 10px;">[首次登录需要修改密码]</span>
        </div>
        <div style="padding: 0 50px">
          <el-form :model="form" :rules="rules" ref="form" label-width="0" style="margin-top: 20px">
            <el-form-item label="" prop="name">
              <el-input v-model="form.psw" placeholder="请输入新密码" type="password" size="large"></el-input>
            </el-form-item>
            <el-form-item label="" prop="psw" style="margin-top: 20px">
              <el-input v-model="form.pswAgain" placeholder="再次确认密码" type="password" @keyup.enter.native="submit()" size="large"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit()" class="submit" :loading="!!requestLoading" style="margin-top:10px; width:100%; background: #3C6CBA; color: #fff; height: 44px;; border-color:#3C6CBA ">修 改</el-button>
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
  // import api from '@/api/system/members'
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
        psw: '',
        pswAgain:''
      },
      rules: {
        psw: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        pswAgain: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
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

          if(this.form.psw != this.form.pswAgain){
            this.$message.warning({message: '两次输入密码不一致！', duration: 1500})
          }else {
            this.reset()
          }
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 登录操作
    reset() {
      let _this = this;
      let params = {
        loginPassword:this.form.psw
      }
      api.userResetPwd(params,this.$store.state.user.user.jwtClaims.id).then(res => {
        if (res.code === 200) {
          _this.$message.success({message:'密码设置成功，请重新登录！', duration: 1500});
          _this.$store.dispatch('Logout','').then(() => {
            _this.$router.push({ path: '/login' })
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>
