import request from '@/utils/request'

/**
 * 查询列表数据
 * @param {object} params
 * @returns {responseView} 
 */
export function query(params) {
  return request({
    url: '/roles/query',
    method: 'get',
    params: params
  })
}
