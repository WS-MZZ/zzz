
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
          sysEnterpriseCount: ''
        }, {
          appId: 123,
          createdBy: 'jack',
          createdDate: '2020-01-01',
          id: 4,
          maxLimit: 100,
          name: 'xxx财务系统',
          status: 'NORMAL',
          statusDesc: '',
          sysEnterpriseCount: ''
        }]
      }
    }
  },
  {
    url: '/api/sysApplication',
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
          }
        ]
      }
    }
  }
]
