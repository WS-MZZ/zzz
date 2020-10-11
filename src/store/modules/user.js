import { login, logout, getInfo, getAuth } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { loadAuthInfo } from '@/utils/permissionMap'
import { resetRouter } from '@/router'
import { mockuserauth } from '@/router/accessRoutes'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userInfo: '',
    auth: '',
    authMap: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_AUTH: (state, auth) => {
    state.auth = auth
  },
  SET_AUTH_MAP: (state, authMap) => {
    state.authMap = authMap
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, sysCode: 'sass' }).then(response => {
        commit('SET_TOKEN', response.id_token)
        setToken(response.id_token) // 存入cookie
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { username, logoUrl } = response
        commit('SET_USERINFO', response)
        commit('SET_NAME', username)
        commit('SET_AVATAR', logoUrl)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getAuth({ commit, state }) {
    return new Promise((resolve, reject) => {
      getAuth().then(response => {
        commit('SET_AUTH', response)
        const authIds = []
        if (response.length) {
          response.map(item => {
            authIds.push(item.id)
            if (item.child && item.child.length) {
              item.child.map(item2 => {
                authIds.push(item2.id)
              })
            }
          })
        }
        commit('SET_AUTH_MAP', loadAuthInfo(authIds))

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

