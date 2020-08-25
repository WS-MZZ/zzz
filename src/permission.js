import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/404'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() 
    } else {
      // 菜单权限管理
      let permissions = store.getters.permissions
      if (permissions.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          // 生成可访问的路由表
          store.dispatch('GenerateRoutes', store.getters.permissions ).then(res => {
            router.addRoutes(store.getters.addRoutes)
            next({ ...to, replace: true })
          }).catch(err => {
            console.error(err)
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (to.path !== '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
