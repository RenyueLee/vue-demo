import request from '@/utils/request'
const Qs = require('qs')

/**
 * 登录
 * @param {object} data
 * @returns {object}
 */
export function login(data) {
  return request({
    url: '/Accounts/Login',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)
  })
}

/**
 * 获取用户信息
 * @returns {responseView}
 */
export function getInfo() {
  return request({
    url: '/Accounts/GetCurrentUser',
    method: 'get'
  })
}

/**
 * 退登（注销）
 */
export function logout() {
  return request({
    url: '/accounts/logout',
    method: 'post'
  })
}

export function changePassword(resetPasswordView) {
  return request({
    url: '/Accounts/ChangePassword',
    method: 'post',
    data: resetPasswordView
  })
}
