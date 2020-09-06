import request from '@/utils/request'

export function getApplicationList(params) {
  return request({
    url: '/api/sysApplication/page',
    method: 'get',
    params
  })
}

export function addApplication(params) {
  return request({
    url: '/api/sysApplication',
    method: 'post',
    params
  })
}

export function updateApplication(params) {
  return request({
    url: '/api/sysApplication',
    method: 'put',
    params
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

