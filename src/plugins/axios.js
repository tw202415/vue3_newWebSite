// plugins/axios.js
import axios from 'axios'

// 打去43
const instance = axios.create({
  baseURL: 'https://new-web.elf.tw/api', // 經由 nginx 代理，避免 SSL 錯誤
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
})

// 打去140
const instance2 = axios.create({
  baseURL: 'https://new-web.elf.tw/api2', // 經由 nginx 代理，避免 SSL 錯誤
  //baseURL: 'http://localhost:8081/api2',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
})

//  新增 request 攔截器，自動帶入 JWT token
instance2.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 統一攔截 response，回傳成功就取出 data，失敗就丟錯誤
instance2.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === '200') {
      return res.body // 直接把 data 回傳
    } else {
      return Promise.reject(new Error(res.message || '伺服器回傳錯誤'))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
export { instance, instance2 }
