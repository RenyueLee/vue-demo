import Mock from 'mockjs'

const List = []
const count = 100
const smsType = ['验证码短信', '通知短信']
const sendState = ['已发送', '未发送', '发送失败']

for (let i = 1; i <= count; i++) {
  List.push(
    Mock.mock({
      id: i,
      手机号: Mock.Random.natural(),
      短信内容: Mock.Random.cword(20, 50),
      短信类型: smsType[Mock.Random.integer(0, 1)],
      发送状态: sendState[Mock.Random.integer(0, 2)],
      添加时间: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
      发送时间: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
    })
  )
}

export default [
  {
    url: '/smsNotification/query',
    type: 'get',
    response: config => {
      // 获取传参
      const { smsType, smsState, page = 1, limit = 10, sort } = config.query
      // 查询过滤
      let mockList = List.filter(item => {
        if (smsType && item.短信类型 !== smsType) return false
        if (smsState && item.发送状态 !== smsState) return false
        return true
      })

      // 排序
      if (sort === '-id') {
        mockList = mockList.reverse()
      }
      // 分页
      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        },
        message: 'success'
      }
    }
  },
  {
    url: '/smsNotification/detail',
    type: 'get',
    response: config => {
      // 获取传参
      const id = Number.parseInt(config.query.id)
      // 查询数据
      const model = List.find(item => item.id === id)

      return {
        code: 20000,
        data: model,
        message: 'success'
      }
    }
  },
  {
    url: '/smsNotification/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  }
]
