import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/console/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/console/currentUser',
    method: 'get',
    params: { token }
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/api/console/editUser',
    method: 'put',
    data
  })
}

export function logout() {
  return request({
    url: '/api/console/logout',
    method: 'post'
  })
}

export function getVerificationCode(data) {
  return request({
    url: '/api/console/email/sendCode',
    method: 'post',
    data
  })
}

export function submitNewPassword(data) {
  return request({
    url: '/api/console/forgotPassword',
    method: 'post',
    data
  })
}

export function updateCorpInfo(data) {
  return request({
    url: '/api/console/editEnterprise',
    method: 'put',
    data
  })
}

export function changePassword(data) {
  return request({
    url: '/api/console/updatePassword',
    method: 'put',
    data
  })
}

export function getUsers(params) {
  return request({
    url: '/api/sysUser/page',
    method: 'get',
    params
  })
}

export function updateAvatar(data) {
  return request({
    url: '/api/console/updateUserLogo',
    method: 'put',
    data
  })
}
