import base from '@/api/cms/base'

let news = Object.assign({}, base)
news.BASE_PATH = '/sys/cms/news'

// 设置为 ‘推荐’/‘不推荐’
news.setRecommend = function(id, isRecommend){
    return this.request({
        url: this.BASE_PATH + `/recommend?id=${id}&recommend=${isRecommend}`,
        method: 'put'
      })
}

// 获取list
news.getList = function(searchParams) {
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
    if(searchParams.tag.length > 0){
        for(let i in searchParams.tag){
            params += '&tag=' + searchParams.tag[i]
        }
    }
    if(searchParams.isRecommend.length === 1){
        params += '&isRecommend=' + searchParams.isRecommend[0]
    }

    return this.request({
        url: this.BASE_PATH + `/list?${params}`,
        method: 'get'
    })
}

// 新增标签
news.addTag = function(name){
    return this.request({
        url: this.BASE_PATH + `/tag?name=${name}`,
        method: 'post'
    })
}

// 编辑标签
news.editTag = function(id, name){
    return this.request({
        url: this.BASE_PATH + `/tag?id=${id}&name=${name}`,
        method: 'put'
    })
}

// 获取tags
news.getTags = function(){
    return this.request({
        url: this.BASE_PATH + `/tag/list`,
        method: 'get'
    })
}

// 删除标签
news.delTag = function(name){
    return this.request({
        url: this.BASE_PATH + `/tag?name=${name}`,
        method: 'delete'
    })
}
export default news