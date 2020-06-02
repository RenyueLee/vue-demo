import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 使用meta.role确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 通过用户权限来过滤asyncRoutes部分路由
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRouters(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouters(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routers: constantRoutes,
  addRoutres: []
}

const mutations = {
  SET_ROUTES: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRoutes.concat(routers)
  }
}

const actions = {
  generateRouters({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRouters = filterAsyncRouters(asyncRoutes, roles)
      commit('SET_ROUTES', accessedRouters)
      resolve(accessedRouters)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
