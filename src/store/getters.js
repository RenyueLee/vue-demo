const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  loginName: state => state.user.loginName,
  permission_routers: state => state.permission.routers, // 路由列表
  addRouters: state => state.permission.addRouters,
  hasAuth: state => auth => {
    return state.user.roles.some(role => {
      return role === auth
    })
  }
}
export default getters
