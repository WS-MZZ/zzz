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

export function getSysApplication(params) {
  return request({
    url: '/api/sysApplication',
    method: 'get',
    params
  })
}

export function getInterfaceRecordList(params) {
  return request({
    url: '/api/interfaceRecord/page',
    method: 'get',
    params
  })
}

export function getInterfaceRecord(params) {
  return request({
    url: '/api/interfaceRecord',
    method: 'get',
    params
  })
}

export function freezeApplication(params) {
  return request({
    url: '/api/sysApplication/freeze',
    method: 'put',
    params
  })
}

export function unfreezeApplication(params) {
  return request({
    url: '/api/sysApplication/unfreeze',
    method: 'put',
    params
  })
}

export function deleteApplication(params) {
  return request({
    url: '/api/sysApplication',
    method: 'delete',
    params
  })
}

