import axios from '@/plugins/axios'

// ✅ 寄送驗證碼
export const sendEmailCode = (email) =>
  axios.post('/Member/SendEmailCode', { email })

// ✅ 註冊會員
export const register = (payload) =>
  axios.post('/Member/Register', payload)

// 已移除 login API，登入請用前端自動 POST 跳轉方式
