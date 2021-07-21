export default {
  // 登录
  setUser (data) {
    return localStorage.setItem('CGVC_USER', JSON.stringify(data))
  },
  // 获取用户信息
  getUser () {
    return JSON.parse(localStorage.getItem('CGVC_USER'))
  },
  // 获取用户信息
  removeUser () {
    return localStorage.removeItem('CGVC_USER')
  }
}
