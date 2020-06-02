import request from '@/utils/request'

/**
 * 查询列表数据
 * @param {string} url
 * @param {model} params
 * @returns {responseView}
 */
export function query(url, params) {
  return request({
    url: url,
    method: 'get',
    params: params
  })
}

/**
 * 删除指定ID数据,支持批量删除
 * @param {string} url
 * @param {string} ids
 * @returns {responseView}
 */
export function remove(url, ids) {
  return request({
    url: url,
    method: 'get',
    params: { ids }
  })
}

/**
 * 详细
 * @param {string} url
 * @param {int} id
 * @returns {responseView}
 */
export function detail(url, id) {
  return request({
    url: url,
    method: 'get',
    params: { id }
  })
}

/**
 * 更新
 * @param {string} url
 * @param {object} model
 * @returns {responseView}
 */
export function update(url, model) {
  return request({
    url: url,
    method: 'post',
    params: model
  })
}

/**
 * 添加
 * @param {string} url
 * @param {object} model
 * @returns {responseView}
 */
export function create(url, model) {
  return request({
    url: url,
    method: 'post',
    params: model
  })
}
