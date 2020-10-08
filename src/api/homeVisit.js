import request from '@/utils/request'
// 今日访问量
export function todayVist() {
  return request({
    url: '/api/interfaceRecordStatic/pvCountByCurrentDay',
    method: 'get'
  })
}
// 累计访问量
export function cumulative() {
  return request({
    url: '/api/interfaceRecordStatic/pvCount',
    method: 'get'
  })
}

// 应用访问量排名
export function applicationRank() {
  return request({
    url: '/api/interfaceRecordStatic/groupByApplicationId',
    method: 'get'
  })
}

// 企业访问量排名
export function enterpriceRank() {
  return request({
    url: '/api/interfaceRecordStatic/groupByEnterpriseId',
    method: 'get'
  })
}
// 文档分布类型
export function distribution() {
  return request({
    url: '/api/interfaceRecordStatic/groupByType',
    method: 'get'
  })
}
