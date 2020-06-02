import request from '@/utils/request'

/**
 * 查询列表数据
 * @param {object} params
 * @returns {responseView}
 */
export function query(params) {
  return request({
    url: '/groups/query',
    method: 'get',
    params: params
  })
}

/**
 * 删除指定ID数据,支持批量删除
 * @param {string} ids
 * @returns {responseView}
 */
export function remove(ids) {
  return request({
    url: '/groups/Remove',
    method: 'post',
    data: ids
  })
}

/**
 * 详细
 * @param {int} id
 * @returns {responseView}
 */
export function detail(id) {
  return request({
    url: '/groups/Detail',
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
    url: '/groups/create',
    method: 'post',
    data: model
  })
}

/**
 * 更新
 * @param {object} model
 * @returns {responseView}
 */
export function update(model) {
  return request({
    url: '/groups/update',
    method: 'post',
    data: model
  })
}

/**
 * 获取权限下拉列表
 * @returns {responseView}
 */
export function getSelectList() {
  return request({
    url: '/groups/getSelectList',
    method: 'get'
  })
}
