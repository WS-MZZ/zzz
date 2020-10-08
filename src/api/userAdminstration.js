import request from '@/utils/request'
// 用户列表
export function getApplicationList(params) {
  return request({
    url: '/api/sysUser/page',
    method: 'get',
    params
  })
}

// 用户编辑
export function userEditDetail(id) {
  return request({
    url: `/api/sysUser/${id}`,
    method: 'get'
  })
}
// 删除用户账号
export function delUser(id) {
  return request({
    url: `/api/sysUser/${id}`,
    method: 'DELETE'
  })
}
// 重置密码
export function resetEnterprisePass(id) {
  return request({
    url: `/api/sysUser/resetPassword/${id}`,
    method: 'PUT'
  })
}
// 冻结
export function freezeEnterprise(id) {
  return request({
    url: `/api/sysUser/freeze/${id}`,
    method: 'PUT'
  })
}
