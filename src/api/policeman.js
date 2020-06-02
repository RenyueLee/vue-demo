import request from '@/utils/request'

/**
 * 查询列表数据
 * @param {object} params
 * @returns {responseView}
 */
export function query(params) {
  return request({
    url: '/policemen/query',
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
    url: '/policemen/Remove',
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
    url: '/policemen/detail',
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
    url: '/policemen/create',
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
    url: '/policemen/update',
    method: 'post',
    data: model
  })
}

/**
 * 根据报警ID获取警员信息
 * @param {int} alarminfoId
 * @returns {responseView}
 */
export function getPolicemanByAlarmId(alarminfoId) {
  return request({
    url: '/policemen/GetByAlarmInfoId',
    method: 'get',
    params: { alarminfoId }
  })
}

/**
 * 上传图片
 */
export function uploadImageFile() {
  return request({
    url: '/policemen/UploadImageFile',
    method: 'post'
  })
}
