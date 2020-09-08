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

export function activateEnterprise(id) {
  return request({
    url: '/api/sysEnterprise/unfreeze/' + id,
    method: 'put'
  })
}

export function freezeEnterprise(id) {
  return request({
    url: '/api/sysEnterprise/freeze/' + id,
    method: 'put'
  })
}

export function deleteEnterprise(id) {
  return request({
    url: '/api/sysEnterprise/' + id,
    method: 'delete'
  })
}

export function createEnterprise(data) {
  return request({
    url: '/api/sysEnterprise',
    method: 'post',
    data
  })
}
export function updateEnterprise(data) {
  return request({
    url: '/api/sysEnterprise',
    method: 'put',
    data
  })
}
export function getEnterpriseDetail(id) {
  return request({
    url: '/api/sysEnterprise/' + id,
    method: 'get'
  })
}

export function resetEnterprisePass(id) {
  return request({
    url: '/api/sysEnterprise/resetPassword/' + id,
    method: 'put'
  })
}
