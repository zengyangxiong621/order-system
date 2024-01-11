import axios from 'axios'
let baseURL = 'http://127.0.0.1'
let port = 3000

if (process.env.NODE_ENV === 'production') {
  baseURL = process.env.BASE_URL
  port = process.env.PORT
  console.log('This is production environment');
} else if (process.env.NODE_ENV === 'development') {
  console.log('This is development environment');
} else {
  console.log('This is neither production nor development environment');
}
export function request (config) {
  // 1.创建 axios 的实例
  const instance = axios.create({
    baseURL: baseURL+':'+port,
    timeout: 5000
  })
  // 2.axios 的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err =>{
    console.log(err)
  })
  // 2.2.响应拦截器
  instance.interceptors.response.use(res =>{
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}
