import { constantRoutes1 } from './index'

export const mockuserauth = [{
  'id': 1100,
  'name': '首页',
  'type': 'PAGE',
  'sort': 10,
  'parentId': -1,
  'child': [{
    'id': 1101,
    'name': '查看公司信息',
    'type': 'BUTTON',
    'sort': 10,
    'parentId': 1100,
    'child': null
  }, {
    'id': 1102,
    'name': '编辑公司信息',
    'type': 'BUTTON',
    'sort': 20,
    'parentId': 1100,
    'child': null
  }, {
    'id': 1103,
    'name': '查看数据统计',
    'type': 'BUTTON',
    'sort': 30,
    'parentId': 1100,
    'child': null
  }]
}, {
  'id': 1200,
  'name': '文档管理-文档列表',
  'type': 'PAGE',
  'sort': 20,
  'parentId': -1,
  'child': [{
    'id': 1201,
    'name': '查看发票列表',
    'type': 'BUTTON',
    'sort': 10,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1202,
    'name': '查看发票详情',
    'type': 'BUTTON',
    'sort': 20,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1203,
    'name': '发票列表-删除',
    'type': 'BUTTON',
    'sort': 30,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1204,
    'name': '查看采购合同列表',
    'type': 'BUTTON',
    'sort': 40,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1205,
    'name': '查看采购合同详情',
    'type': 'BUTTON',
    'sort': 50,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1206,
    'name': '采购合同列表-删除',
    'type': 'BUTTON',
    'sort': 60,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1207,
    'name': '查看销售合同列表',
    'type': 'BUTTON',
    'sort': 70,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1208,
    'name': '查看销售合同详情',
    'type': 'BUTTON',
    'sort': 80,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1209,
    'name': '销售合同列表-删除',
    'type': 'BUTTON',
    'sort': 90,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1211,
    'name': '查看采购订单列表',
    'type': 'BUTTON',
    'sort': 110,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1212,
    'name': '查看采购订单详情',
    'type': 'BUTTON',
    'sort': 120,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1213,
    'name': '采购订单列表-删除',
    'type': 'BUTTON',
    'sort': 130,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1214,
    'name': '查看销售订单列表',
    'type': 'BUTTON',
    'sort': 140,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1215,
    'name': '查看销售订单详情',
    'type': 'BUTTON',
    'sort': 150,
    'parentId': 1200,
    'child': null
  }, {
    'id': 1216,
    'name': '销售订单列表-删除',
    'type': 'BUTTON',
    'sort': 160,
    'parentId': 1200,
    'child': null
  }]
}, {
  'id': 1300,
  'name': '接口管理-应用授权管理',
  'type': 'PAGE',
  'sort': 30,
  'parentId': -1,
  'child': [{
    'id': 1301,
    'name': '查看应用列表',
    'type': 'BUTTON',
    'sort': 10,
    'parentId': 1300,
    'child': null
  }, {
    'id': 1302,
    'name': '查看应用详情',
    'type': 'BUTTON',
    'sort': 20,
    'parentId': 1300,
    'child': null
  }]
}, {
  'id': 1400,
  'name': '接口管理-接口文档',
  'type': 'PAGE',
  'sort': 40,
  'parentId': -1,
  'child': [{
    'id': 140,
    'name': '查看接口文档',
    'type': 'BUTTON',
    'sort': 10,
    'parentId': 1400,
    'child': null
  }]
}, {
  'id': 1500,
  'name': '接口管理-接口访问记录',
  'type': 'PAGE',
  'sort': 50,
  'parentId': -1,
  'child': [{
    'id': 1501,
    'name': '查看接口访问记录列表',
    'type': 'BUTTON',
    'sort': 10,
    'parentId': 1500,
    'child': null
  }, {
    'id': 1502,
    'name': '查看接口访问记录详情',
    'type': 'BUTTON',
    'sort': 20,
    'parentId': 1500,
    'child': null
  }]
}, {
  'id': 1600,
  'name': '权限管理-系统用户管理',
  'type': 'PAGE',
  'sort': 60,
  'parentId': -1,
  'child': [{
    'id': 1601,
    'name': '查看系统用户列表',
    'type': 'BUTTON',
    'sort': 10,
    'parentId': 1600,
    'child': null
  }, {
    'id': 1602,
    'name': '用户管理（新增、编辑、重置密码）',
    'type': 'BUTTON',
    'sort': 20,
    'parentId': 1600,
    'child': null
  }, {
    'id': 1603,
    'name': '用户管理-删除',
    'type': 'BUTTON',
    'sort': 30,
    'parentId': 1600,
    'child': null
  }]
}, {
  'id': 1700,
  'name': '权限管理-角色管理',
  'type': 'PAGE',
  'sort': 70,
  'parentId': -1,
  'child': [{
    'id': 1701,
    'name': '查看角色列表',
    'type': 'BUTTON',
    'sort': 10,
    'parentId': 1700,
    'child': null
  }, {
    'id': 1702,
    'name': '角色管理（新增、编辑、设置权限）',
    'type': 'BUTTON',
    'sort': 20,
    'parentId': 1700,
    'child': null
  }, {
    'id': 1703,
    'name': '角色-删除',
    'type': 'BUTTON',
    'sort': 30,
    'parentId': 1700,
    'child': null
  }]
}, {
  'id': 1800,
  'name': '系统管理',
  'type': 'PAGE',
  'sort': 80,
  'parentId': -1,
  'child': [{
    'id': 1802,
    'name': '查看系统日志',
    'type': 'BUTTON',
    'sort': 20,
    'parentId': 1800,
    'child': null
  }]
}]

export function generateRoutes(userAuth) {
  if (userAuth) {
    constantRoutes1.map(item => {
      // debugger
      if (item.authId) {
        let hasRight = false
        userAuth.map(item1 => {
          if (item1.id === item.authId) {
            hasRight = true
          }
        })
        if (!hasRight) {
          item.hidden = true
          item.path = ''
          item.redirect = '/404'
        }
      } else {
        if (item.children) {
          item.children.map(item2 => {
            if (item2.authId) {
              let hasRight2 = false
              userAuth.map(item3 => {
                if (item2.authId === item3.id) {
                  hasRight2 = true
                }
              })
              if (!hasRight2) {
                item2.hidden = true
                item2.path = ''
              }
            }
          })
          let hasValidChildren = false
          for (let i = 0; i < item.children.length; i++) {
            if (item.children[i].path !== '' && !item.children[i].hidden) {
              hasValidChildren = true
              break
            }
          }
          if (!hasValidChildren) {
            item.hidden = true
            item.alwaysShow = false
          }
        }
      }
    })
  }
}
