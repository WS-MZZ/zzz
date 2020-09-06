
module.exports = [
  {
    url: '/api/interfaceRecord/page',
    type: 'get',
    response: config => {
      return {
        total: 4,
        data: [
          {
            'costTime': 'magna non et',
            'createTime': '1998-10-29T23:51:39.522Z',
            'ipAddress': 'amet laboris ad dolor officia',
            'name': 'Ut reprehenderit officia dolore dolor',
            'recordId': '202010254478',
            'result': 'pariatur',
            'resultDesc': 'nisi cillum officia eu',
            'sysApplicationId': 'aliqua',
            'sysApplicationName': 'cillum',
            'sysEnterpriseId': 'deserunt est esse',
            'sysEnterpriseName': 'ipsum non'
          },
          {
            'costTime': 'veniam',
            'createTime': '1949-11-01T21:15:47.922Z',
            'ipAddress': 'minim',
            'name': 'id qui ad reprehenderit',
            'recordId': '202010254478',
            'result': 'esse',
            'resultDesc': 'nisi ad',
            'sysApplicationId': 'adipisicing veniam labore',
            'sysApplicationName': 'enim',
            'sysEnterpriseId': 'labore eiusmod irure est',
            'sysEnterpriseName': 'in voluptate'
          }
        ]
      }
    }
  },
  {
    url: '/api/interfaceRecord',
    type: 'get',
    response: config => {
      return {
        data: {
          'costTime': -93671,
          'createTime': '1977-04-20T11:21:23.594Z',
          'ipAddress': 'in cillum',
          'name': 'nisi in',
          'paramList': [
            {
              'fieldDesc': 'enim do',
              'fieldKey': 'magna aliquip sed et Duis',
              'fieldName': 'nulla ex',
              'fieldValue': 'in'
            },
            {
              'fieldDesc': 'c',
              'fieldKey': 'dolor sunt ullamco laboris',
              'fieldName': 'ad in',
              'fieldValue': 'quis'
            },
            {
              'fieldDesc': 'ea sunt nulla',
              'fieldKey': 'proident consequat',
              'fieldName': 'minim',
              'fieldValue': 'consectetur in voluptate aliquip'
            },
            {
              'fieldDesc': 'magna elit aliqua',
              'fieldKey': 'qui in incididunt ut',
              'fieldName': 'ut Duis veniam',
              'fieldValue': 'est amet'
            },
            {
              'fieldDesc': 'labore consectetur deserunt velit nulla',
              'fieldKey': 'laboris in nisi in est',
              'fieldName': 'commodo sunt sint culpa aliqua',
              'fieldValue': 'nostrud nisi'
            }
          ],
          'recordId': 'laborum commodo nulla in qui',
          'result': 'commodo',
          'resultDesc': 'tempor enim occaecat labore ut',
          'sysApplicationId': 'cupidatat eu dolor dolor',
          'sysApplicationName': 'in esse dolore veniam',
          'sysEnterpriseId': 'dolore',
          'sysEnterpriseName': 'amet'
        }
      }
    }
  }
]
