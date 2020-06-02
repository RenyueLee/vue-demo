import request from '@/utils/request'

/**
 * 查询部门列表数据
 * @param {object} params
 * @returns {responseView}
 */
export function query(params) {
  return request({
    url: '/departments/query',
    method: 'get',
    params: params
  })
}

/**
 * 删除指定ID部门,支持批量删除
 * @param {string} ids
 * @returns {responseView}
 */
export function remove(ids) {
  return request({
    url: '/departments/Remove',
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
    url: '/departments/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * 添加部门
 * @param {object} model
 * @returns {responseView}
 */
export function create(model) {
  return request({
    url: '/departments/create',
    method: 'post',
    data: model
  })
}

/**
 * 更新部门
 * @param {object} model
 * @returns {responseView}
 */
export function update(model) {
  return request({
    url: '/departments/update',
    method: 'post',
    data: model
  })
}

/**
 * 获取部门下拉列表数据
 * @returns {responseView}
 */
export function getSelectList() {
  return request({
    url: '/departments/getSelectList',
    method: 'get'
  })
}

/**
 * 获取部门树
 * @returns {responseView}
 */
export function getTree() {
  return request({
    url: '/departments/GetCatalogTree',
    method: 'get'
  })
}
