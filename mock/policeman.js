import Mock from 'mockjs'

const List = []
const count = 100
const department = ['定海区公安分局', '普陀区公安分局', '岱山县公安分局']

for (let i = 1; i <= count; i++) {
  List.push(
    Mock.mock({
      id: i,
      警员编号: Mock.Random.natural(),
      姓名: Mock.Random.cname(),
      手机号: Mock.Random.natural(),
      所属部门: department[Mock.Random.integer(0, 2)],
      添加时间: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
      头像: ''
    })
  )
}

export default [
  {
    url: '/policeman/query',
    type: 'get',
    response: config => {
      // 获取传参
      const { queryString, page = 1, limit = 10, sort } = config.query

      let mockList = List.filter(item => {
        if (queryString && (item.姓名.indexOf(queryString) < 0)) return false
        // if (params.queryString && (item.姓名.indexOf(params.queryString) < 0 ||
        //     item.警员编号.indexOf(params.queryString) < 0 ||
        //     item.手机号.indexOf(params.queryString) < 0)) return false
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
    url: '/policeman/remove',
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
    url: '/policeman/detail',
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
    url: '/policeman/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },
  {
    url: '/policeman/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },
  {
    url: '/policeman/getPolicemanByAlarmId',
    type: 'get',
    response: config => {
      // 获取传参
      // const id = Number.parseInt(config.query.alarmId)
      // 查询数据
      const model = List.find(item => item.id === 1)

      return {
        code: 20000,
        data: model,
        message: 'success'
      }
    }
  }
]
