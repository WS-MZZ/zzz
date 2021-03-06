import router from './router'
import { constantRoutes1, constantRoutes, resetRouter } from './router'
import { mockuserauth, generateRoutes } from './router/accessRoutes'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  if (!store.state.user.userInfo) {
    await store.dispatch('config/getSystemConfig')
  }
  // set page title
  document.title = store.state.config.systemConfig.title
  // set favicon
  document.querySelector('link[rel="icon"]').href = store.state.config.systemConfig.favicon

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      const hasAuthInfo = store.getters.auth
      if (hasGetUserInfo && hasAuthInfo) {
        try {
          await store.dispatch('user/getAuth')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          await store.dispatch('user/getAuth')
          store.dispatch('settings/getTheme')
          generateRoutes(store.getters.auth)
          resetRouter()
          router.options.routes = constantRoutes1
          router.addRoutes(constantRoutes1)
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
