import axios from 'axios'
import Qs from 'qs'
import { Toast } from 'antd-mobile'

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000
})

// request 拦截
instance.interceptors.request.use(
  config => {
    if (config.method === 'get') {
      config.paramsSerializer = params => {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截
instance.interceptors.response.use(
  response => {
    // 接口请求成功处理
    return response
  },
  error => {
    if (!error.response.status) {
      //   console.log('接口出错未返回状态码');
      return
    }
    // 提示给用户具体报错信息
    Toast.fail(error.response.data.message, 2)
    return Promise.reject(error)
  }
)

export default instance
