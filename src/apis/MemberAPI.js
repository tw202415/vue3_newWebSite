import axios from '@/plugins/axios'

// ✅ 寄送驗證碼
export const sendEmailCode = (email) =>
  axios.post('/Member/SendEmailCode', { email })

// ✅ 註冊會員
export const register = (payload) =>
  axios.post('/Member/Register', payload)

export const login = (payload) =>
  axios.post('/login.aspx', payload)
