// apis/CMSAPI.ts
import axios from '@/plugins/axios'
import type { AxiosResponse } from 'axios'

// Type definitions for API responses
export interface SubMenuContent {
  [key: string]: any
}

export interface SubMenuOption {
  [key: string]: any
}

export interface AboutUsReason {
  reason1: string | number
  reason2: string | number
  reason3: string | number
  reason4: string | number
  reason5: string | number
}

export interface AnnouncementItem {
  [key: string]: any
}

export interface CalculatorNotice {
  [key: string]: any
}

export interface PurchaseSettings {
  [key: string]: any
}

export interface ShippingFeePayload {
  [key: string]: any
}

export interface ShippingFeeResponse {
  [key: string]: any
}

export interface LoginAd {
  [key: string]: any
}

export interface FooterLink {
  [key: string]: any
}

export interface FooterDetail {
  [key: string]: any
}

// ✅ 子選單內容
export const getSubMenuContent = (subId: string | number): Promise<AxiosResponse<SubMenuContent>> =>
  axios.get(`/SubMenu/GetSubMenuContent?SubId=${subId}`)

// ✅ 下拉選單選項清單
export const getSubMenuOptions = (groupKey: string): Promise<AxiosResponse<SubMenuOption[]>> =>
  axios.get(`/SubMenu/GetSubMenuOptions?groupKey=${groupKey}`)

// ✅ About Us 相關
export const getAboutUsReasons = (): Promise<AboutUsReason> =>
  axios.get(`/AboutUs/GetReasons`).then(response => response.data)

// ✅ 公告
export const getAnnouncements = (): Promise<AxiosResponse<AnnouncementItem[]>> =>
  axios.get(`/Announcement/GetLatest`)

// ✅ 注意事項（id=99261）
export const getCalculatorNotice = (id: string | number): Promise<AxiosResponse<CalculatorNotice>> =>
  axios.get(`/Calculator/GetNotice?id=${id}`)

// ✅ 代購費率設定
export const getPurchaseSettings = (): Promise<AxiosResponse<PurchaseSettings>> =>
  axios.get('/Calculator/GetPurchaseSettings')

// ✅ 運費試算 API：日本、美國、中國等通用
export const calculateShippingFee = (payload: ShippingFeePayload): Promise<AxiosResponse<ShippingFeeResponse>> =>
  axios.post('/Calculator/CalculateShippingFee', payload)

// ✅ 登入廣告
export const getLoginAds = (): Promise<AxiosResponse<LoginAd[]>> =>
  axios.get('/LoginAd/GetAll')

// ✅ 取得底部連結列表
export const getFooterLinks = (): Promise<AxiosResponse<FooterLink[]>> =>
  axios.get('/footer/links')

// ✅ 取得指定底部連結內容（例如 UID = 1）
export const getFooterDetail = (uid: string | number): Promise<AxiosResponse<FooterDetail>> =>
  axios.get(`/footer/links/${uid}`)