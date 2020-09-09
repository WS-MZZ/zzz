import request from '@/utils/request'

export function getSystemList(params) {
  return request({
    url: '/api/sysLog/page',
    method: 'get',
    params
  })
}

export function updateSystemConfig(data) {
  return request({
    url: '/api/console/systemConfig',
    method: 'post',
    data
  })
}

export function getSystemConfig() {
  return request({
    url: '/api/console/systemConfig',
    method: 'get'
  })
}
