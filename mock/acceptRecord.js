import Mock from 'mockjs'

const List = []
const count = 5

for (let i = 1; i <= count; i++) {
  List.push(
    Mock.mock({
      id: i,
      // alarmInfoId: Mock.Random.integer(0, 1000),
      alarmInfoId: i,
      描述: Mock.Random.cword(5, 10),
      添加时间: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
    })
  )
}

export default [
  {
    url: '/acceptRecord/query',
    type: 'get',
    response: config => {
      // 获取传参
      const params = config.query
      // 查询过滤
      // const mockList = List.filter(item => {
      //   if (params.alarmInfoId && item.alarmInfoId !== Number.parseInt(params.alarmInfoId)) return false
      //   return true
      // })
      const mockList = List

      return {
        code: 20000,
        data: mockList,
        message: 'success',
        params: params
      }
    }
  },
  {
    url: '/acceptRecord/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  }
]
