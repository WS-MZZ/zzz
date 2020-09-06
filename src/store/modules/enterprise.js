// import { login, logout, getInfo } from '@/api/user'

const getDefaultState = () => {
  return {
    corpId: 'xx'
  }
}

const state = getDefaultState()

const mutations = {
  SET_CORP_ID: (state, corpId) => {
    state.corpId = corpId
  }
}

const actions = {
  // getCorpList
  // getCorpListAndCorpName({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password, sysCode: 'enterprise' }).then(response => {
  //       commit('SET_TOKEN', response.id_token)
  //       setToken(response.id_token) // 存入cookie
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

