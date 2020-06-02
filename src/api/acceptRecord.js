import request from '@/utils/request'

/**
 * 根据报警ID查询受理记录
 * @param {int} alarmInfoId
 * @returns{responseView}
 */
export function query(alarmInfoId) {
  return request({
    url: '/acceptRecords/query',
    method: 'get',
    params: { alarmInfoId }
  })
}

/**
 * 详细
 * @param {int} id
 * @returns{responseView}
 */
export function detail(id) {
  return request({
    url: '/acceptRecords/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * 添加
 * @param {object} model
 * @returns{responseView}
 */
export function create(model) {
  return request({
    url: '/acceptRecords/create',
    method: 'post',
    model
  })
}
