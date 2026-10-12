# 第 0 步：安裝 AI 編輯器 Antigravity IDE（手動）

本課程使用 **Antigravity IDE** 當作編輯器和 AI 助手。後面的安裝步驟可以交給 AI 完成，但 AI 編輯器本身要**先手動安裝**。

---

## 1. 下載

打開官方下載頁：**https://antigravity.google/download**

> ⚠️ **注意：頁面最上方的大按鈕是「Antigravity 2.0」，不是我們要的。**
> 請往下捲動，找到 **「Antigravity IDE (Standalone)」** 這一區，再依你的電腦選擇下載。

| 電腦 | 選擇 | 怎麼知道是哪一種 |
| --- | --- | --- |
| **Windows** | 大多數電腦選 **x64**；少數 ARM 筆電選 ARM64 | 「設定 → 系統 → 關於」的「系統類型」：寫「x64」選 x64，寫「ARM」選 ARM64 |
| **macOS** | **Apple Silicon**（M 系列晶片）或 **Intel** | 左上角蘋果選單 →「關於這台 Mac」：顯示「晶片 Apple M…」選 Apple Silicon，顯示「處理器 Intel」選 Intel |

## 2. 安裝

- **Windows**：執行下載的安裝檔，依畫面指示完成。
- **macOS**：打開下載的檔案，把 Antigravity IDE 拖進「應用程式」資料夾。

## 3. 第一次啟動

1. 開啟 Antigravity IDE，依畫面指示用 **Google 帳號登入**。
2. 確認看得到 AI 的對話面板，輸入一句「你好」測試能不能回應。

之後的練習都在 Antigravity IDE 裡進行，常用的兩個操作：

| 操作 | 怎麼做 |
| --- | --- |
| 開啟資料夾 | 選單「檔案 → 開啟資料夾」（File → Open Folder）；或在終端機輸入 `antigravity-ide .`（開啟目前所在的資料夾） |
| 開啟終端機 | 選單「終端機 → 新增終端機」（Terminal → New Terminal） |

> 若終端機找不到 `antigravity-ide` 指令，改用選單「檔案 → 開啟資料夾」（File → Open Folder）即可。

---

完成後，回到 [階段一的安裝說明](README.md)，把安裝 Prompt 貼給 Antigravity 的 AI，安裝模組一～三。
