import axios from '@/plugins/axios'

// ✅ 寄送驗證碼
export const sendEmailCode = (email) =>
  axios.post('/api/Member/SendEmailCode', { email })

// ✅ 註冊會員
export const register = (payload) =>
  axios.post('/api/Member/Register', payload)

export const login = (payload) =>
  axios.post('/api/Member/Login', payload)
