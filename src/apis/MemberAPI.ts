import axios from '@/plugins/axios'
import type { AxiosResponse } from 'axios'

// Type definitions for API payloads and responses
export interface SendEmailCodePayload {
  email: string
}

export interface RegisterPayload {
  email: string
  password: string
  [key: string]: any
}

export interface LoginPayload {
  email: string
  password: string
}

export interface EmailCodeResponse {
  [key: string]: any
}

export interface RegisterResponse {
  [key: string]: any
}

export interface LoginResponse {
  [key: string]: any
}

// ✅ 寄送驗證碼
export const sendEmailCode = (email: string): Promise<AxiosResponse<EmailCodeResponse>> =>
  axios.post('/api/Member/SendEmailCode', { email })

// ✅ 註冊會員
export const register = (payload: RegisterPayload): Promise<AxiosResponse<RegisterResponse>> =>
  axios.post('/api/Member/Register', payload)

export const login = (payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> =>
  axios.post('/api/Member/Login', payload)