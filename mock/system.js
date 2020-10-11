
module.exports = [
  {
    url: '/api/sysLog/page',
    type: 'get',
    response: config => {
      return {
        total: 4,
        data: [
          {
            'id': 45211697,
            'operateName': 'non',
            'operatePhone': 'id',
            'operateTime': '1975-05-09T13:54:02.693Z',
            'typeDesc': 'velit'
          },
          {
            'id': 88516177,
            'operateName': 'nulla',
            'operatePhone': 'in commodo anim',
            'operateTime': '2019-06-16T22:04:21.823Z',
            'typeDesc': 'nostrud labore dolore minim mollit'
          },
          {
            'id': -2235345,
            'operateName': 'ipsum',
            'operatePhone': 'nulla culpa fugiat',
            'operateTime': '2002-09-06T00:30:55.621Z',
            'typeDesc': 'occaecat'
          },
          {
            'id': -97383456,
            'operateName': 'ut qui ullamco enim',
            'operatePhone': 'in eiusmod adipisicing incididunt magna',
            'operateTime': '1954-03-01T08:06:38.011Z',
            'typeDesc': 'sint'
          }
        ]
      }
    }
  },
  {
    url: '/api/console/systemConfig',
    type: 'get',
    response: config => {
      return {
        backgroundUrl: '',
        favicon: 'https://api.saas.copeople.dev.aks.chilunyc.com/api/file/v1/72958a95acdf4d069c90ab62a11e0828.png',
        footer: '科广信息咨询（上海）有限公司  |  沪ICP备13047089号',
        logo: 'https://api.saas.copeople.dev.aks.chilunyc.com/api/file/v1/a3651e01f0df47368bc2a7772c3e7bc5.png',
        title: '科广数据管理系统'
      }
    }
  }
]
