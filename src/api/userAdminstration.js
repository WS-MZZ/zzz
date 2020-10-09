import request from '@/utils/request'
// 用户列表
export function getApplicationList(params) {
  return request({
    url: '/api/sysUser/page',
    method: 'get',
    params
  })
}

// 用户详情
export function userEditDetail(id) {
  return request({
    url: `/api/sysUser/${id}`,
    method: 'get'
  })
}
// 用户修改
export function editUserInfo(data) {
  return request({
    url: '/api/sysUser',
    method: 'put',
    data
  })
}
// 用户新增
export function addUser(data) {
  return request({
    url: '/api/sysUser',
    method: 'post',
    data
  })
}
// 根据账号获取用户信息
export function getAccountnoInfo(accountNo) {
  return request({
    url: `/api/sysUser/accountNo/${accountNo}`,
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
// 解冻
export function freeThaw(id) {
  return request({
    url: `/api/sysUser/unfreeze/${id}`,
    method: 'put'
  })
}
// 角色下拉框
export function getRoleSelect(params) {
  return request({
    url: '/api/sysRole/page',
    method: 'get',
    params
  })
}

// 新增用户(老用户)
export function addOldUser(data) {
  return request({
    url: '/api/sysUser/insertExist',
    method: 'post',
    data
  })
}
