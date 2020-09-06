import request from '@/utils/request'

export function getEnterpriseList() {
  return request({
    url: '/api/console/enterprise/list',
    method: 'get'
  })
}

export function changeEnterprise(enterpriseId) {
  return request({
    url: '/api/console/changeEnterprise/' + enterpriseId,
    method: 'post'
  })
}

export function getSassEnterpriseList(params) {
  return request({
    url: '/api/sysEnterprise/page',
    method: 'get',
    params
  })
}
