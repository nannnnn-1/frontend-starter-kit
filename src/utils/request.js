// src/utils/request.js

import axios from 'axios'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/userStore' // 稍后我们会创建这个文件

// 1. 创建Axios实例
const service = axios.create({
  // baseURL 将由Vite proxy处理，所以这里不需要
  timeout: 10000, // 请求超时时间
})

// 2. 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求前做些什么
    const userStore = useUserStore()
    if (userStore.token) {
      // 让每个请求携带自定义token
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.error('Request Error:', error) // for debug
    return Promise.reject(error)
  }
)

// 3. 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // FastAPI通常会将业务数据放在response.data中
    return response.data
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数
    // 对响应错误做点什么
    console.error('Response Error:', error) // for debug
    
    let errorMessage = '网络错误，请稍后再试'
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 401:
          errorMessage = '认证失败，请重新登录'
          // 清除token并跳转到登录页
          useUserStore().logout() 
          break
        case 403:
          errorMessage = '您没有权限执行此操作'
          break
        case 404:
          errorMessage = '请求的资源未找到'
          break
        case 500:
          errorMessage = data?.detail || '服务器内部错误'
          break
        default:
          errorMessage = data?.detail || `请求错误，状态码：${status}`
      }
    }
    
    message.error(errorMessage)
    
    return Promise.reject(error)
  }
)

export default service