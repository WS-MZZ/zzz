import request from '@/utils/request'

/**
 * cms 接口请求基础类
 */
export default {
  BASE_PATH: '',
  request: request,
  
  getList(searchParams) {
    let params = '?'
    if(searchParams.page){
      params += '&page=' + searchParams.page
    }
    if(searchParams.size){
      params += '&size=' + searchParams.size
    }
    if(searchParams.redirectType.length > 0){
      for(let i in searchParams.redirectType){
        params += '&redirectType=' + searchParams.redirectType[i]
      }
    }
    if(searchParams.state.length === 1){
        params += '&state=' + searchParams.state[0]
    }
    if(searchParams.keyword){
      params += '&keyword=' + searchParams.keyword
    }
    return request({
      url: this.BASE_PATH + `/list?${params}`,
      method: 'get'
    })
  },
  
  addOne(formData){
    return request({
      url: this.BASE_PATH,
      method: 'post',
      data: formData
    })
  },

  updateOne(formData){
    return request({
      url: this.BASE_PATH,
      method: 'put',
      data: formData
    })
  },

  getOne(id){
     return request({
      url: this.BASE_PATH + `?id=${id}`,
      method: 'get'
    })
  },

  setOnline(id){
    return request({
      url: this.BASE_PATH + `/online?id=${id}`,
      method: 'put'
    })
  },

  setOffline(id){
    return request({
      url: this.BASE_PATH + `/offline?id=${id}`,
      method: 'put'
    })
  },

  moveUp(id) {
    return request({
      url: this.BASE_PATH + `/moveup?id=${id}`,
      method: 'put'
    })
  },

  moveDown(id) {
    return request({
      url: this.BASE_PATH + `/movedown?id=${id}`,
      method: 'put'
    })
  },

  delete(id){
    return request({
      url: this.BASE_PATH + `?id=${id}`,
      method: 'delete'
    })
  }

}


