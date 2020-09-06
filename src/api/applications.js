import request from '@/utils/request'

export function getApplicationList(params) {
  return request({
    url: '/api/sysApplication/page',
    method: 'get',
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

