
module.exports = [
  {
    url: '/api/interfaceRecordStatic/pvCount',
    type: 'get',
    response: config => {
      return [
        {
          count: 7654321,
          key: 1
        }
      ]
    }
  },
  {
    url: '/api/interfaceRecordStatic/groupByApplicationId',
    type: 'get',
    response: config => {
      return [
        {
          count: 13412334,
          key: '达乐财务系统'
        },
        {
          count: 13412334,
          key: '公寓财务系统'
        }
      ]
    }
  },
  {
    url: '/api/interfaceRecordStatic/groupByEnterpriseId',
    type: 'get',
    response: config => {
      return [
        {
          count: 13412334,
          key: '北京齿轮易创科技公司'
        },
        {
          count: 13412334,
          key: '小米科技有限公司'
        }
      ]
    }
  },
  {
    url: '/api/interfaceRecordStatic/groupByType',
    type: 'get',
    response: config => {
      return [
        {
          count: 6456,
          key: '发票',
          percent: 60
        },
        {
          count: 3412,
          key: '合同',
          percent: 35
        },
        {
          count: 412,
          key: '订单',
          percent: 5
        }
      ]
    }
  },
  {
    url: '/api/interfaceRecordStatic/pvCountByCurrentDay',
    type: 'get',
    response: config => {
      return {
        failCount: 30,
        key: '1',
        successCount: 60,
        totalCount: 80
      }
    }
  }
]
