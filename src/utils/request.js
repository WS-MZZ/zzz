import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['sysCode'] = 'saas'
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  // 这里是在给请求返回添加统一的前置处理
  response => {
    let res = response.data
    console.log(response)
    for (const key in response.headers) {
      if (key === 'x-total-count') {
        res = {
          total: response.headers['x-total-count'],
          data: response.data
        }
      }
    }
    return res
  },
  error => {
    if (error.response && (/^4/.test(String(error.response.status)) || /^5/.test(String(error.response.status)))) {
      if (error.response.data.detail === '没有用户') {
        return Promise.reject(error.response.data || 'Error')
      }
      // else if (error.response.data.detail === 'Access is denied') {
      // }
      if (error.response.data.status === 403) {
        error.response.data.detail = '暂无权限'
      }
      Message({
        message: error.response.data.title === 'Unauthorized' ? '身份验证已过期，请重新登录' : error.response.data.detail || '连接错误请重试',
        type: 'error',
        duration: 3 * 1000,
        onClose() {
          if (error.response.data.title === 'Unauthorized') {
            // 下面这个判断是为了如果用户没保持登录状态的话，在permissionjs中会跳转登录页，这样就不要再重新刷新页面了
            if (store.getters.name) {
              store.dispatch('user/resetToken')
              window.location.reload()
            } else {
              store.dispatch('user/resetToken')
            }
          }
        }
      })
      return Promise.reject(new Error(error.response.data.detail || 'Error'))
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
