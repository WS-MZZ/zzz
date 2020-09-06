
module.exports = [

  // update company info
  {
    url: '/api/console/editEnterprise',
    type: 'put',
    response: config => {
      return 'ok'
    }
  },

  {
    url: '/api/sysApplication/page',
    type: 'get',
    response: config => {
      return {
        total: 4,
        data: [{
          appId: 123,
          createdBy: 'jack',
          createdDate: '2020-01-01',
          id: 3,
          maxLimit: 100,
          name: 'xxx财务系统',
          status: 'NORMAL',
          statusDesc: '',
          sysEnterpriseCount: '1'
        }, {
          appId: 123,
          createdBy: 'jack',
          createdDate: '2020-01-01',
          id: 4,
          maxLimit: 100,
          name: 'xxx财务',
          status: 'FREEZE',
          statusDesc: '',
          sysEnterpriseCount: '2'
        }]
      }
    }
  },
  {
    url: '/api/sysApplication',
    type: 'post',
    response: config => {
      return 'ok'
    }
  },
  {
    url: '/api/sysApplication',
    type: 'put',
    response: config => {
      return 'ok'
    }
  },
  {
    url: '/api/sysApplication/freeze',
    type: 'put',
    response: config => {
      return 'ok'
    }
  },
  {
    url: '/api/sysApplication/unfreeze',
    type: 'put',
    response: config => {
      return 'ok'
    }
  },
  {
    url: '/api/sysApplication',
    type: 'delete',
    response: config => {
      return 'ok'
    }
  },
  {
    url: '/api/sysApplication/3',
    type: 'get',
    response: config => {
      return {
        data: {
          'appId': 'commodo culpa id in',
          'appSecret': 'Duis occaecat velit nisi',
          'id': 74182410,
          'maxLimit': 44995801,
          'name': 'mollit nostrud',
          'remark': 'et dolor eu ex ad',
          'sysEnterpriseIdList': [
            {
              'id': 30460664,
              'name': 'occaecat',
              'isExpired': false,
              'status': 'Exce',
              'statusDesc': 'elit nulla incididunt'
            },
            {
              'id': -88493571,
              'name': 'tempor aliqua esse aliquip Excepteur',
              'isExpired': true,
              'status': 'nulla ea esse anim',
              'statusDesc': 'ullamco cupidatat'
            }
          ]
        }
      }
    }
  },
  {
    url: '/api/console/enterprise/list',
    type: 'get',
    response: config => {
      return [{
        id: 1,
        isExpired: false,
        name: '小米山东',
        status: 'NORMAL',
        statusDesc: ''
      }, {
        id: 2,
        isExpired: false,
        name: '小米北京',
        status: 'NORMAL',
        statusDesc: ''
      }]
    }
  },
  {
    url: '/api/console/changeEnterprise/2',
    type: 'post',
    response: config => {
      return {
        id_token: '12345'
      }
    }
  },
  {
    url: '/api/sysEnterprise/unfreeze/1',
    type: 'put',
    response: config => {
      return 'ok'
    }
  },
  {
    url: '/api/sysEnterprise/freeze/1',
    type: 'put',
    response: config => {
      return 'ok'
    }
  },
  {
    url: '/api/sysEnterprise/1',
    type: 'delete',
    response: config => {
      return 'ok'
    }
  },
  {
    url: '/api/sysEnterprise',
    type: 'post',
    response: config => {
      return 'ok'
    }
  },
  {
    url: '/api/sysEnterprise',
    type: 'put',
    response: config => {
      return 'ok'
    }
  },
  {
    url: '/api/sysEnterprise/page',
    type: 'get',
    response: config => {
      return {
        total: 4,
        data: [
          {
            'accountNo': 'sint aliquip proident veniam nulla',
            'contact': 'tempor exercitation pariatur dolor',
            'createdBy': 'do nostrud',
            'createdDate': '1998-02-11T13:49:54.697Z',
            'expireDate': '1977-11-18',
            'id': 1031,
            'logoUrl': 'ut eu et d',
            'name': 'sit ex ea dolore',
            'status': 'NORMAL',
            'statusDesc': 'ullamco eu s'
          },
          {
            'accountNo': 'sint aliquip proident veniam nulla',
            'contact': 'tempor exercitation pariatur dolor',
            'createdBy': 'do nostrud',
            'createdDate': '1998-02-11T13:49:54.697Z',
            'expireDate': '1977-11-18',
            'id': 1031,
            'logoUrl': 'ut eu et d',
            'name': 'sit ex ea dolore',
            'status': 'FREEZE',
            'statusDesc': 'ullamco eu s'
          }
        ]
      }
    }
  },
  {
    url: '/api/sysEnterprise/1',
    type: 'get',
    response: config => {
      return {
        'accountNo': 'veniam voluptate ut aliquip',
        'contact': 'nulla ',
        'email': 'anim adipisicing dolor dolore quis',
        'expireDate': '2011-11-08',
        'id': 1,
        'logoUrl': 'aute ut id nulla',
        'mobilePhone': 'enim irure ea ullamco dolore',
        'name': 'non sed magna'
      }
    }
  }
]
