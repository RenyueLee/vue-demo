import request from '@/utils/request'

/**
 * 查询列表数据
 * @param {object} params
 * @returns {responseView}
 */
export function query(params) {
  return request({
    url: '/SmsNotifications/Query',
    method: 'get',
    params: params
  })
}

/**
 * 详细
 * @param {int} id
 * @returns {responseView}
 */
export function detail(id) {
  return request({
    url: '/SmsNotifications/Detail',
    method: 'get',
    params: { id }
  })
}

/**
 * 添加
 * @param {object} model
 * @returns {responseView}
 */
export function create(model) {
  return request({
    url: '/SmsNotifications/create',
    method: 'post',
    data: model
  })
}

/**
 * 添加
 * @param {string} model
 * @returns {responseView}
 */
export function createSmsCode(model) {
  return request({
    url: '/SmsNotifications/CreateSmsCode',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    method: 'post',
    data: model
  })
}
