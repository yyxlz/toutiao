///  进行 axios 配置
import axios from 'axios'
import local from '../utils/index'
import router from '../router/index'
import JSONBIG from 'json-bigint'

/// 配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  // 后台的原始数据   理想情况 json字符串
  // 后台可能没有任何响应内容  data 值是 null
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
// 导出 axios 文件

//  配置  请求头
//  if  判断是否 有 值
// if (local.getuser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getuser().token}`
// }
//  设置请求拦截器  来设置请求头的
//  config 设置请求头
axios.interceptors.request.use(function (config) {
  const user = local.getuser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, function (err) {
  return Promise.reject(err)
})

//  响应流拦截器  token 发生错误的时候 使用  响应拦截器 重新登录
axios.interceptors.response.use(res => res, err => {
  // 请求失败
  if (err.response.status === 401) {
    // 跳转登录页面  http://localhost:8080/#/login
    // window.location.href = 'http://localhost:8080/#/login'
    // window.location.hash = '#/login'
    // 建议使用 vue-router 来跳转 , push是router实例的函数
    return router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
