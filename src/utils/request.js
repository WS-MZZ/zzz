import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer' + getToken() // 让每个请求携带自定义token 
    }
    return config
  },
  error => {
    console.log(error) //debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    //console.error('响应错误->' + error) // for debug
    if(error.response.status === 403){
      Message.error('权限不足')
    }
    return Promise.reject(error)
  }
)

export default service
