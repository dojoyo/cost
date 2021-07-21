import router from '@/router'
import store from '@/store'
import {
  getUser
} from './auth'
import NProgress from 'nprogress' // 进度条
// import 'nprogress/nprogress.css' // 进度条样式
import {
  Message
} from 'element-ui'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getUser()) {
    if (to.path === '/login') {
      next({
        path: '/home'
      })
    } else { // 实时拉取用户的信息
      store.dispatch('GetUser').then(res => {
        next()
      }).catch(err => {
        store.dispatch('FedLogOut').then(() => {
          Message.error('拉取用户信息失败，请重新登录！' + err)
          next({
            path: '/'
          })
        })
      })
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
