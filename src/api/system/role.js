import request from '@/utils/request'

export default {
    BASE_PATH: '/sys',
    request: request,
    
    getList() {
      return request({
        url: this.BASE_PATH + `/role/list`,
        method: 'get'
      })
    },
    addRole(data){
        return request({
            url: this.BASE_PATH + `/role`,
            method: 'post',
            data: data
        })
    },
    getOneRole(id){
        return request({
            url: this.BASE_PATH + `/role/${id}`,
            method: 'get'
        })
    },
    updateRole(data){
        return request({
            url: this.BASE_PATH + `/role`,
            method: 'put',
            data: data
        })
    },
    delRole(id){
        return request({
            url: this.BASE_PATH + `/role/${id}`,
            method: 'delete'
        })
    },
    getPermissions(){
        return request({
            url: this.BASE_PATH + `/permission/list`,
            method: 'get'
        })
    }

  }