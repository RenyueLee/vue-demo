import Mock from 'mockjs'

const List = []
const count = 100
const acceptingState = ['未受理', '受理中', '已完成']

for (let i = 1; i <= count; i++) {
  List.push(
    Mock.mock({
      id: i,
      报警单号: Mock.Random.natural(),
      报警人姓名: Mock.Random.cname(),
      报警人手机号: Mock.Random.natural(),
      报警人身份证号: Mock.Random.natural(),
      报警内容: Mock.Random.cword(100, 200),
      警情地址: Mock.Random.cword(10, 30),
      是否接受反馈: 1,
      受理状态: acceptingState[Mock.Random.integer(0, 2)],
      处理结果: Mock.Random.cword(50, 100),
      报警时间: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
    })
  )
}

export default [
  {
    url: '/alarmInfo/query',
    type: 'get',
    response: config => {
      // 获取传参
      const { queryString, page = 1, limit = 10, sort } = config.query
      // 查询过滤
      let mockList = List.filter(item => {
        if (queryString && item.报警单号.toString().indexOf(queryString) < 0) return false
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
    url: '/alarmInfo/remove',
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
    url: '/alarmInfo/detail',
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
    url: '/alarmInfo/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },
  {
    url: '/alarmInfo/allot',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  }
]
