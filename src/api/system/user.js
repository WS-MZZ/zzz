import request from '@/utils/request'

export default {
    BASE_PATH: '/sys',
    request: request,
    
    getList() {
      return request({
        url: this.BASE_PATH + `/user/list`,
        method: 'get'
      })
    },
    addUser(data){
        return request({
            url: this.BASE_PATH + `/user`,
            method: 'post',
            data: data
        })
    },
    updateUser(data){
        return request({
            url: this.BASE_PATH + `/user`,
            method: 'put',
            data: data
        })
    },
    delUser(id){
        return request({
            url: this.BASE_PATH + `/user/${id}`,
            method: 'delete'
        })
    },
    freezeUser(id){
        return request({
            url: this.BASE_PATH + `/user/freeze/${id}`,
            method: 'put'
        })
    },
    unFreezeUser(id){
        return request({
            url: this.BASE_PATH + `/user/unfreeze/${id}`,
            method: 'put'
        })
    },
    resetPassword(id){
        return request({
            url: this.BASE_PATH + `/user/reset_password/${id}`,
            method: 'put'
        })
    },
    getRoleList(){
        return request({
            url: this.BASE_PATH + `/role/list`,
            method: 'get'
        })
    },
    getUserInfo(id){
        return request({
            url: this.BASE_PATH + `/user/${id}`,
            method: 'get'
        })
    },
    sendAuthenticationSms(username, phone){
        return request({
            url: this.BASE_PATH + `/auth-sms?username=${username}&phone=${phone}`,
            method: 'post'
        })
    },
    resetMyPwd(username, code){
        return request({
            url: this.BASE_PATH + `/reset-pwd?username=${username}&code=${code}`,
            method: 'put'
        })
    }
  
  }