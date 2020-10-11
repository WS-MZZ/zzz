
module.exports = [
  {
    url: '/api/sysUser/page',
    type: 'get',
    response: config => {
      return [
        {
          accountNo: '13456',
          admin: true,
          createdBy: '卢本伟',
          createdDate: '2012-2-14',
          department: '技术部',
          email: '12345679@qq.com',
          englishName: 'MZZ',
          id: 1,
          mobilePhone: 15896352171,
          status: 'NORMAL',
          statusDesc: '很好',
          username: '卢本伟',
          workNo: '15616165165116',
          sysEnterpriseDetailVM: {
            accountNo: '1231654',
            contact: '花花',
            email: '131651@qq.com',
            expireDate: '1019-2-3',
            id: 2,
            logoUrl: 'logo',
            mobilePhone: '05111345',
            name: '大乐科技',
            stauts: 'NORMAL',
            statusDesc: '正常'
          },
          sysRoleDetailVMList: [{
            description: '描述',
            id: 3,
            name: '工程师'
          },
          {
            description: '描述2',
            id: 4,
            name: '工程师二'
          }
          ]
        }
      ]
    }
  },
  {
    url: '/api/sysUser/accountNo/',
    type: 'get',
    response: config => {
      return {
        accountNo: '134567',
        admin: true,
        createdBy: '卢本伟',
        createdDate: '2012-2-14',
        department: '技术部',
        email: '12345679@qq.com',
        englishName: 'MZZ',
        id: 1,
        mobilePhone: 15896352171,
        status: 'NORMAL',
        statusDesc: '很好',
        username: '卢本伟1',
        workNo: '15616165165116',
        sysEnterpriseDetailVM: {
          accountNo: '1231654',
          contact: '花花',
          email: '131651@qq.com',
          expireDate: '1019-2-3',
          id: 2,
          logoUrl: 'logo',
          mobilePhone: '05111345',
          name: '镇江科技',
          stauts: 'NORMAL',
          statusDesc: '正常'
        },
        sysRoleDetailVMList: [{
          description: '描述',
          id: 3,
          name: '工程师'
        },
        {
          description: '描述2',
          id: 4,
          name: '工程师二'
        }
        ]
      }
    }
  },
  {
    url: '/api/sysUser/',
    type: 'get',
    response: config => {
      return {
        accountNo: '134567',
        admin: true,
        createdBy: '卢本伟',
        createdDate: '2012-2-14',
        department: '技术部',
        email: '12345679@qq.com',
        englishName: 'MZZ',
        id: 1,
        mobilePhone: 15896352171,
        status: 'NORMAL',
        statusDesc: '很好',
        username: '卢本伟',
        workNo: '15616165165116',
        sysEnterpriseDetailVM: {
          accountNo: '1231654',
          contact: '花花',
          email: '131651@qq.com',
          expireDate: '1019-2-3',
          id: 2,
          logoUrl: 'logo',
          mobilePhone: '05111345',
          name: '大乐科技',
          stauts: 'NORMAL',
          statusDesc: '正常'
        },
        sysRoleDetailVMList: [{
          description: '描述',
          id: 3,
          name: '工程师'
        },
        {
          description: '描述2',
          id: 4,
          name: '工程师二'
        }
        ]
      }
    }
  },
  {
    url: '/api/sysUser',
    type: 'put',
    response: config => {
      return 'ok'
    }
  },
  {
    url: '/api/sysUser',
    type: 'post',
    response: config => {
      return 'ok'
    }
  },
  {
    url: '/api/sysUser/freeze/',
    type: 'put',
    response: config => {
      return 'ok'
    }
  }
]
