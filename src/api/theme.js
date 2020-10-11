import request from '@/utils/request'

export function getThemeColor(params) {
  return request({
    url: '/api/console/systemClass',
    method: 'get',
    params
  })
}

export function updateThemeColor(data) {
  return request({
    url: '/api/console/systemClass',
    method: 'post',
    data
  })
}

