import Mock from 'mockjs'

const List = []
const count = 100
const smsType = ['验证码短信', '通知短信']
const acceptingState = ['未受理', '受理中', '已完成']

for (let i = 1; i <= count; i++) {
  List.push(
    Mock.mock({
      id: i,
      短信内容: Mock.Random.cword(20, 50),
      短信类型: smsType[Mock.Random.integer(0, 1)],
      受理状态: acceptingState[Mock.Random.integer(0, 2)],
      添加时间: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
    })
  )
}

export default [
  {
    url: '/smsTemplates/query',
    type: 'get',
    response: config => {
      // 获取传参
      const { queryString, page = 1, limit = 10, sort } = config.query

      let mockList = List.filter(item => {
        if (queryString && item.短信内容.indexOf(queryString) < 0) return false
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
        data: pageList,
        total: mockList.length,
        message: 'success'
      }
    }
  },
  {
    url: '/smsTemplates/remove',
    type: 'get',
    response: config => {
      // 获取传参
      const ids = config.query.ids.split(',')
      // 过滤删除数据
      const mockList = List.filter(item => {
        if (ids.find(id => Number.parseInt(id) === item.id) !== undefined) return false
        return true
      })

      return {
        code: 20000,
        data: mockList,
        message: 'success'
      }
    }
  },
  {
    url: '/smsTemplates/Detail',
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
    url: '/smsTemplates/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },
  {
    url: '/smsTemplates/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  }
]
