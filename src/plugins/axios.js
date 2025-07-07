// plugins/axios.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://new_web.elf.tw/api', // 經由 nginx 代理，避免 SSL 錯誤
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// ✅ 統一攔截 response，回傳成功就取出 data，失敗就丟錯誤
instance.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.success) {
      return res.data // 直接把 data 回傳
    } else {
      return Promise.reject(new Error(res.message || '伺服器回傳錯誤'))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
