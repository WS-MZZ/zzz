const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userInfo: state => state.user.userInfo,
  auth: state => state.user.auth,
  authMap: state => state.user.authMap,
  corpId: state => state.enterprise.corpId,
  systemConfig: state => state.config.systemConfig,
  theme: state => state.settings.theme
}
export default getters
