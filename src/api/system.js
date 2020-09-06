import request from '@/utils/request'

export function getSystemList(params) {
  return request({
    url: '/api/sysLog/page',
    method: 'get',
    params
  })
}
