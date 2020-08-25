const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permissions: state => state.user.permissions,
  addRoutes: state => state.user.addRoutes,
  my_routes: state => state.user.routes
}
export default getters
