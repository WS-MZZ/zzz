import request from '@/utils/request'
// 用户列表
export function roleLists(params) {
  return request({
    url: '/api/sysRole/page',
    method: 'get',
    params
  })
}
// 新增角色
export function addRole() {
  return request({
    url: '/api/sysRole',
    method: 'POST'
  })
}

// 编辑角色
export function editRole(data) {
  return request({
    url: '/api/sysRole',
    method: 'PUT',
    data
  })
}
// 删除角色
export function delRole(id) {
  return request({
    url: `/api/sysRole/${id}`,
    method: 'DELETE'
  })
}
// 设置权限
export function setRole(data) {
  return request({
    url: '/api/sysRole/assignRolePermission',
    data
  })
}
// 系统权限选择
export function roleSelect(id) {
  return request({
    url: `/api/sysRole/sysPermissionSelectBox/${id}`,
    method: 'get'
  })
}
