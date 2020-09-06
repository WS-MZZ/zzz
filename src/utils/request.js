import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
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
      if (key === 'X-Total-Count') {
        res = {
          total: response.headers['X-Total-Count'],
          data: response.data
        }
      }
    }
    if (/^4/.test(String(response.status)) || /^5/.test(String(response.status))) {
      Message({
        message: res.detail || '连接错误请重试',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.detail || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
