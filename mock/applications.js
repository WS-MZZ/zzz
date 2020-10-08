
module.exports = [
  {
    url: '/api/sysApplication/',
    type: 'get',
    response: config => {
      return {
        appId: '321',
        appSecret: 'sasas12dasd123asda3123',
        createdBy: '卢本伟',
        createdDate: '2020/12/21 12:22',
        maxLimit: 1000,
        name: '达乐财务系统',
        remark: '描述',
        status: '正常',
        statusDesc: '状态描述'
      }
    }
  }
]
