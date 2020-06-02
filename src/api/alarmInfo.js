import request from '@/utils/request'

/**
 * 查询报警列表数据
 * @param {object} params
 * @returns {responseView}
 */
export function query(params) {
  return request({
    url: '/alarmInfos/query',
    method: 'get',
    params: params
  })
}

/**
 * 删除指定ID的报警数据,支持批量删除
 * @param {string} ids
 * @returns {responseView}
 */
export function remove(ids) {
  return request({
    url: '/alarmInfos/Remove',
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
    url: '/alarmInfos/detail',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新
 * @param {object} model
 * @returns {responseView}
 */
export function update(model) {
  return request({
    url: '/alarmInfos/update',
    method: 'post',
    data: model
  })
}

/**
 * 报警分发
 * @param {object} model
 * @returns {responseView}
 */
export function allot(model) {
  return request({
    url: '/alarmInfos/allot',
    method: 'post',
    data: model
  })
}

/**
 * 报警回复
 * @param {object}} model
 * @returns {responseView}
 */
export function reply(model) {
  return request({
    url: '/alarmInfos/Reply',
    method: 'post',
    data: model
  })
}

/**
 * 填写处理结果
 * @param {object}} model
 * @returns {responseView}
 */
export function writeResult(model) {
  return request({
    url: '/alarmInfos/WriteResult',
    method: 'post',
    data: model
  })
}

/**
 * 根据受理状态获取案件统计
 * @returns {responseView}
 */
export function countAsAcceptingState() {
  return request({
    url: '/alarmInfos/CountAsAcceptingState',
    method: 'get'
  })
}

/**
 * 图标统计数据
 * @param {int} chartType
 * @returns {responseView}
 */
export function chartData(chartType) {
  return request({
    url: '/alarmInfos/ChartData',
    method: 'get',
    params: { chartType }
  })
}
