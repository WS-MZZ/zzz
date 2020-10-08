import request from '@/utils/request'

export function getApplicationList(params) {
  return request({
    url: '/api/sysApplication/page',
    method: 'get',
    params
  })
}

export function addApplication(data) {
  return request({
    url: '/api/sysApplication',
    method: 'post',
    data
  })
}

export function updateApplication(data) {
  return request({
    url: '/api/sysApplication',
    method: 'put',
    data
  })
}

export function getSysApplication(id) {
  return request({
    url: '/api/sysApplication/' + id,
    method: 'get'
  })
}

export function getInterfaceRecordList(params) {
  return request({
    url: '/api/interfaceRecord/page',
    method: 'get',
    params
  })
}

export function getInterfaceRecord(recordId) {
  return request({
    url: '/api/interfaceRecord/' + recordId,
    method: 'get'
  })
}

export function freezeApplication(id) {
  return request({
    url: '/api/sysApplication/freeze/' + id,
    method: 'put'
  })
}

export function unfreezeApplication(id) {
  return request({
    url: '/api/sysApplication/unfreeze/' + id,
    method: 'put'
  })
}

export function deleteApplication(id) {
  return request({
    url: '/api/sysApplication/' + id,
    method: 'delete'
  })
}

export function getEnterpriseListOfApp(params) {
  return request({
    url: '/api/sysApplication/listEnterprise',
    method: 'get',
    params
  })
}

export function getAppsecret(appkey) {
  return request({
    url: '/api/sysApplication/appSecret/' + appkey,
    method: 'get'
  })
}

// 今日访问量
export function getTodayStatic(params) {
  return request({
    url: '/api/interfaceRecordStatic/pvCountByCurrentDay',
    method: 'get',
    params
  })
}

// 累计访问量
export function getCumulative(params) {
  return request({
    url: '/api/interfaceRecordStatic/pvCount',
    method: 'get',
    params
  })
}
