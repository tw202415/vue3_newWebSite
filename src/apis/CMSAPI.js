// apis/CMSAPI.js
import axios from '@/plugins/axios'

// ✅ 子選單內容
export const getSubMenuContent = (subId) =>
  axios.get(`/SubMenu/GetSubMenuContent?SubId=${subId}`)

// ✅ 下拉選單選項清單
export const getSubMenuOptions = (groupKey) =>
  axios.get(`/SubMenu/GetSubMenuOptions?groupKey=${groupKey}`)

// ✅ About Us 相關
export const getAboutUsReasons = () =>
  axios.get(`/AboutUs/GetReasons`)

// ✅ 公告
export const getAnnouncements = () =>
  axios.get(`/Announcement/GetLatest`)

// ✅ 注意事項（id=99261）
export const getCalculatorNotice = (id) =>
  axios.get(`/Calculator/GetNotice?id=${id}`)

// ✅ 代購費率設定
export const getPurchaseSettings = () =>
  axios.get('/Calculator/GetPurchaseSettings')

// ✅ 運費試算 API：日本、美國、中國等通用
export const calculateShippingFee = (payload) =>
  axios.post('/Calculator/CalculateShippingFee', payload)

// ✅ 登入廣告
export const getLoginAds = () =>
  axios.get('/LoginAd/GetAll');

// ✅ 取得底部連結列表
export const getFooterLinks = () =>
  axios.get('/footer/links')

// ✅ 取得指定底部連結內容（例如 UID = 1）
export const getFooterDetail = (uid) =>
  axios.get(`/footer/links/${uid}`)

// ✅ 取得商品資料
export const getProducts = (payload) =>
  axios.post(`/shop/products`, payload)

// ✅ 取得商品資料
export const getDetail = (productId) =>
  axios.get(`/shop/detail/${productId}`)

// ✅ 取得商品評論
export const getReviews = (productId) =>
  axios.get(`/shop/reviews/${productId}`)

