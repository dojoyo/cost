import request from '@/utils/request';

export default {
  // 登录
  login(data) {
    return request({
      url: '/login',
      method: 'post',
      data: data
    });
  },
  // 登录
  loginPhone(data) {
    return request({
      url: '/anonymous/loginBySms',
      method: 'post',
      data: data
    });
  },
  // 获取用户信息
  logout() {
    return request({
      url: '/logout',
      method: 'post'
    });
  },
  // 获取验证码
  getCode(data) {
    return request({
      url: '/anonymous/sendVerifyCode',
      method: 'post',
      data: data
    });
  },
  // 获取二维码
  getQrcode(data) {
    return request({
      url: '/wechat/qrCode',
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': ''
      },
      responseType: 'arraybuffer'
    });
  },
  getMpQrcode(data){
    return request({
      url: '/mp/qrCode/generate',
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': ''
      },
      responseType: 'arraybuffer'
    });
  },
  getUserDetail(id) {
    return request({
      // url: '/admin/user/' + id,
      url: '/account/userInfo',
      method: 'get'
    });
  },
  getUserDetailById(id) {
    return request({
      // url: '/admin/user/' + id,
      url: '/contacts/user/'+id,
      method: 'get'
    });
  },
  getForgetCode(data){
    return request({
      url: '/mp/login/sendCode',
      method: 'post',
      data: data
    });
  },
  resetPsw(data){
    return request({
      url: '/mp/login/resetPwd',
      method: 'post',
      data: data
    });
  },
  getShareUrl(data,id,code){
    return request({
      url: '/file/shareUrl/'+id+'/'+code,
      method: 'get',
      params: data
    });
  },
  getPreview(data){
    return request({
      url: '/file/preview/getConfig',
      method: 'get',
      params:data
    })
  },
};
