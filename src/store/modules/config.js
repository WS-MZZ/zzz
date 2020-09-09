import { getSystemConfig } from '@/api/system'

const getDefaultState = () => {
  return {
    systemConfig: ''
  }
}

const state = getDefaultState()

const mutations = {
  SET_SYSTEM_CONFIG: (state, systemConfig) => {
    state.systemConfig = systemConfig
  }
}

const actions = {
  // getSystemConfig
  getSystemConfig({ commit }) {
    return new Promise((resolve, reject) => {
      getSystemConfig().then(response => {
        commit('SET_SYSTEM_CONFIG', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

