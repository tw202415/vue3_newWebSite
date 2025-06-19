# 貢獻指南

感謝您對一路發集運網專案的興趣！我們歡迎所有形式的貢獻。

## 如何貢獻

### 報告 Bug

如果您發現了 bug，請：

1. 檢查是否已有相關的 issue
2. 如果沒有，請創建新的 issue
3. 提供詳細的重現步驟
4. 包含您的環境資訊（瀏覽器、作業系統等）

### 提出新功能

如果您有新功能的想法：

1. 先創建一個 issue 討論您的想法
2. 等待維護者的回應和建議
3. 開始實作前請確認功能需求

### 提交程式碼

1. Fork 這個專案
2. 創建您的功能分支：`git checkout -b feature/amazing-feature`
3. 提交您的更改：`git commit -m 'Add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 開啟 Pull Request

## 開發規範

### 程式碼風格

- 使用 TypeScript
- 遵循 Vue 3 Composition API 最佳實踐
- 使用 Tailwind CSS 進行樣式設計
- 保持程式碼簡潔和可讀性

### 提交訊息格式

```
type(scope): description

[optional body]

[optional footer]
```

類型：
- `feat`: 新功能
- `fix`: 修復 bug
- `docs`: 文件更新
- `style`: 程式碼格式調整
- `refactor`: 重構
- `test`: 測試相關
- `chore`: 其他雜項

### 分支命名

- `feature/功能名稱`: 新功能
- `fix/問題描述`: 修復 bug
- `docs/文件類型`: 文件更新

## 測試

在提交 PR 前，請確保：

1. 程式碼能正常編譯：`npm run build`
2. 在不同裝置上測試響應式設計
3. 測試深色/淺色主題切換
4. 測試多語言功能

## 問題回報

如果您遇到問題，請提供：

1. 問題的詳細描述
2. 重現步驟
3. 預期行為
4. 實際行為
5. 螢幕截圖（如適用）
6. 環境資訊

## 聯絡方式

- 創建 GitHub issue
- 發送郵件至：service@elfa-shipping.com

感謝您的貢獻！