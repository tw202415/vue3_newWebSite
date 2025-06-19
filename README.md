# 一路發集運網 (ELFA Shipping Network)

一個現代化的海外代購集運服務網站，採用 Vue 3 + TypeScript + Tailwind CSS 開發。

## 🚀 功能特色

- **響應式設計**: 完美支援桌面端和移動端
- **多語言支援**: 繁體中文 / English
- **深色模式**: 支援明暗主題切換
- **會員系統**: 登入/註冊、VIP 會員功能
- **購物車**: 完整的購物車功能
- **代購商城**: 支援多國代購服務
- **現代化 UI**: 科技感十足的設計風格

## 🛠 技術棧

- **前端框架**: Vue 3 (Composition API)
- **開發語言**: TypeScript
- **樣式框架**: Tailwind CSS
- **路由管理**: Vue Router 4
- **圖標庫**: Lucide Vue Next
- **構建工具**: Vite
- **部署平台**: Netlify

## 📱 支援的功能

### 桌面端
- 完整的導航選單
- 豐富的動畫效果
- 詳細的產品展示
- 專業的聯絡表單

### 移動端
- 底部導航欄
- 觸控友好的介面
- 優化的購物體驗
- 響應式設計

## 🌍 支援的國家/地區

- 🇯🇵 日本 - 精品、美妝、電子產品
- 🇰🇷 韓國 - 美妝、時尚、K-POP 周邊
- 🇺🇸 美國 - 品牌商品、保健品、電子產品
- 🇩🇪 德國 - 工藝品、汽車用品、保健品

## 🚀 快速開始

### 環境要求

- Node.js 16.0 或更高版本
- npm 或 yarn

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

### 構建生產版本

```bash
npm run build
```

### 預覽生產版本

```bash
npm run preview
```

## 📁 專案結構

```
src/
├── components/          # 組件
│   ├── desktop/        # 桌面端組件
│   ├── mobile/         # 移動端組件
│   └── shared/         # 共用組件
├── composables/        # 組合式函數
├── pages/              # 頁面組件
├── types/              # TypeScript 類型定義
├── i18n/               # 國際化配置
├── utils/              # 工具函數
└── style.css           # 全域樣式
```

## 🎨 設計特色

- **科技感設計**: 採用漸變色彩和現代化動畫
- **3D 效果**: 立體化的視覺元素
- **流暢動畫**: 豐富的過渡效果和微互動
- **響應式佈局**: 適配各種螢幕尺寸

## 🔧 主要組件

### 響應式組件系統
- `ResponsiveComponent`: 自動切換桌面/移動端組件
- 統一的設計語言和用戶體驗

### 狀態管理
- `useAuth`: 用戶認證管理
- `useCart`: 購物車狀態管理
- `useTheme`: 主題切換管理
- `useI18n`: 國際化管理

## 🌐 線上展示

- **網站地址**: [https://cool-longma-e57870.netlify.app](https://cool-longma-e57870.netlify.app)
- **自動部署**: 支援 Netlify 自動部署

## 📝 開發說明

### 新增頁面
1. 在 `src/pages/` 創建新的 Vue 組件
2. 在 `src/main.ts` 中添加路由配置
3. 更新導航選單

### 新增語言
1. 在 `src/i18n/index.ts` 中添加翻譯
2. 在 `src/types/index.ts` 中更新 Language 類型

### 自定義主題
1. 修改 `tailwind.config.js` 中的顏色配置
2. 更新 `src/style.css` 中的自定義樣式

## 🤝 貢獻指南

1. Fork 這個專案
2. 創建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟一個 Pull Request

## 📄 授權

本專案採用 MIT 授權 - 查看 [LICENSE](LICENSE) 檔案了解詳情

## 📞 聯絡我們

- **Email**: service@elfa-shipping.com
- **電話**: +886-2-1234-5678
- **地址**: 台北市信義區信義路五段7號

---

⭐ 如果這個專案對你有幫助，請給我們一個 Star！