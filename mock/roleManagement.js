module.exports = [
  {
    url: `/api/sysRole/page`,
    type: 'get',
    response: config => {
      return {
        total: 2,
        data: [{
          createdBy: '1111',
          createdDate: '2020-1-1',
          description: 'hhhh',
          id: '123',
          name: '卢本伟',
          userCount: '999'
        },
        {
          createdBy: '1111',
          createdDate: '2020-1-1',
          description: 'hhhh',
          id: '123',
          name: '卢本伟',
          userCount: '888'
        }
        ]
      }
    }
  },
  {
    url: `/api/sysRole`,
    type: 'post',
    response: config => {
      return {
        data: {
          code: 200
        }
      }
    }
  },
  {
    url: `/api/sysRole/sysPermissionSelectBox/`,
    type: 'get',
    response: config => {
      return {
        data: {
          all: [
            { child: [{ id: 1, name: '复选框A' }, { id: 2, name: '复选框B' }, { id: 3, name: '复选框C' }], id: 20, name: '首页', parentId: 1, sort: 1, type: '第一' },
            { child: [{ id: 4, name: '复选框D' }, { id: 5, name: '复选框E' }, { id: 6, name: '复选框F' }], id: 30, name: '文档管理-文档列表', parentId: 4, sort: 1, type: '第二' },
            { child: [{ id: 7, name: '复选框G' }, { id: 8, name: '复选框H' }, { id: 9, name: '复选框I' }], id: 40, name: '接口管理-应用授权管理', parentId: 7, sort: 1, type: '第三' },
            { child: [{ id: 10, name: '复选框J' }, { id: 11, name: '复选框K' }, { id: 12, name: '复选框L' }], id: 50, name: '接口管理-接口访问记录', parentId: 10, sort: 1, type: '第四' }
          ],
          selected: [1, 2, 3, 6, 8, 20, 30, 40]
        }
      }
    }
  }
]
