import Mock from 'mockjs'

const List = []
const count = 10
const Children = []
const DepartmentName = ['定海区公安分局局', '普陀区公安分局局', '岱山县公安分局局']

for (let i = 12; i <= 14; i++) {
  Children.push(
    Mock.mock({
      id: i,
      parentId: 1,
      部门名称: DepartmentName[i - 12],
      添加时间: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
    })
  )
}

for (let i = 1; i <= count; i++) {
  List.push(
    Mock.mock({
      id: i,
      parentId: 0,
      部门名称: '嵊泗公安分局' + i,
      添加时间: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
    })
  )
}

List.push(
  Mock.mock({
    id: 11,
    parentId: 0,
    部门名称: '舟山市公安局',
    children: Children,
    添加时间: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
  })
)

export default [
  {
    url: '/department/query',
    type: 'get',
    response: config => {
      // 获取传参
      const params = config.query

      const mockList = List.filter(item => {
        if (params.queryString && item.部门名称.indexOf(params.queryString) < 0) return false
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
    url: '/department/remove',
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
    url: '/department/detail',
    type: 'get',
    response: config => {
      // 获取传参
      const id = Number.parseInt(config.query.id)
      // 查询数据
      const model = List.find(item => item.id === id)
      model.上级部门 = '舟山市公安局'

      return {
        code: 20000,
        data: model,
        message: 'success'
      }
    }
  },
  {
    url: '/department/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  },
  {
    url: '/department/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        message: 'success'
      }
    }
  }
]
