import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function updatePassword(oldPassword, newPassword) {
  return request({
    url: `/sys/me/change-password`,
    method: 'put',
    params: { "oldPwd":oldPassword,"newPwd":newPassword }
  })
}

export function getInfo(token) {
  return request({
    url: '/sys/me/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/sys/user/logout',
    method: 'post'
  })
}
