import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { constantRouterMap, asyncRouterMap } from '@/router'

/**
 * 根据路由所需角色和当前用户所拥有的角色对比，来判断该用户是否可以看到该路由对应的菜单
 * @param permissions
 * @param route
 */
function hasPermission(permissions, route) {
  if(permissions.indexOf('SYSTEM_MANGE') >= 0){  // 用户系统管理权限的用户默认拥有所有权限
    return true
  } else if (route.meta && route.meta.permissions) {
    return permissions.some(role => route.meta.permissions.indexOf(role) >= 0)
  } 
}

/**
 * 递归过滤动态路由
 * @param routes asyncRouterMap
 * @param permissions
 */
export function filterAsyncRouterMap(routes, permissions) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouterMap(tmp.children, permissions)
      }
      res.push(tmp)
    }
  })
  return res
}

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    permissions: [],
    routes: constantRouterMap,
    addRoutes:[]
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = constantRouterMap.concat(routes);
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data)
          commit('SET_TOKEN', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.permissionCodes && data.permissionCodes.length > 0) { // 验证返回的permissions是否是一个非空数组
            commit('SET_PERMISSIONS', data.permissionCodes)
          } else {
            reject('该用户没有任务权限，请联系管理员!')
          }
          commit('SET_AVATAR', data.avatar)
          commit('SET_NAME', data.username)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 生成可访问的路由表
    GenerateRoutes({ commit, state }, permissions){
      return new Promise(resolve => {
        let accessedRoutes = filterAsyncRouterMap(asyncRouterMap, permissions)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    },

    // 登出（直接删除token信息和用户角色即可）
    LogOut({ commit, state }) {
          commit('SET_TOKEN', '')
          commit('SET_PERMISSIONS', [])
          removeToken()
    }
  }
}

export default user
