# AI 協作開發與研究課程教材（Windows / macOS）

從安裝開發環境開始，一步步練習和 AI 協作：整理文獻、寫程式、做網頁、交叉審查，最後完成一篇研究論文。

**貫穿全課程的主軸：AI 很快，但會出錯，要自己檢查。** 每個階段都會遇到 AI 犯錯的真實例子，練習怎麼發現、怎麼查證。

---

## 課程地圖

| 階段 | 學什麼 | 時間 | 操作 |
| --- | --- | --- | --- |
| [01 安裝環境](01-install/README.md) | 安裝 AI 編輯器 Antigravity IDE 與開發工具 | 模組一約 15～30 分鐘 | 學生 |
| [02 AI 整理文獻](02-organize-data/README.md) | 請 AI 把論文摘要整理成比較表，並檢查 AI 有沒有編造內容 | 約 30 分鐘 | 學生 |
| [03 連線 GitHub](03-hello-github/README.md) | 登入 GitHub，用 git 存版本、推上 GitHub | 約 30 分鐘 | 學生 |
| [04 網頁小遊戲](04-web-game/README.md) | 用自然語言請 AI 做出網頁小遊戲 | 約 30～40 分鐘 | 學生 |
| [05 AI 交叉審查](05-review-loop/README.md) | 用另一個 AI 審查程式，自己判斷要不要採納建議 | 兩次課，各 90 分鐘 | 學生 |
| [06 寫研究論文](06-research-paper/README.md) | 先凍結方法再分析，和 AI 協作完成每個數字都查得到來源的論文 | 約 3 小時＋課後作業 | 學生 |
| [07 超級電腦示範](07-hpc-demo/README.md) | 看 AI 在國網中心超級電腦上操作真實研究管線 | 約 20～30 分鐘 | 老師示範 |

時間有限時不一定每個階段都要上，依對象的建議路線見 [teacher/README.md](teacher/README.md)。

---

## 快速開始

1. **安裝 AI 編輯器**：照 [01-install/00-antigravity.md](01-install/00-antigravity.md) 手動下載安裝 Antigravity IDE。
2. **安裝模組一**：照 [01-install/README.md](01-install/README.md)，把安裝 Prompt 貼給 AI，或手動執行安裝指南。
3. **開始練習**：從 [02 AI 整理文獻](02-organize-data/README.md) 開始，依課程地圖往下做。

需要：Windows 10/11 或 macOS 電腦、Google 帳號（登入 Antigravity）、GitHub 帳號（階段三起）。

---

## 目錄結構

```text
ai-dev-course-kit/
├── README.md            ← 本文件：課程總覽
├── AGENTS.md            ← 給 AI 的規則（Python 一律用 uv、不全域安裝套件等）
├── 01-install/          ← 階段一：安裝環境（入口 README、Antigravity、Windows／macOS 安裝指南）
├── 02-organize-data/    ← 階段二：AI 整理文獻
├── 03-hello-github/     ← 階段三：連線 GitHub
├── 04-web-game/         ← 階段四：網頁小遊戲
├── 05-review-loop/      ← 階段五：AI 交叉審查
├── 06-research-paper/   ← 階段六：寫研究論文
├── 07-hpc-demo/         ← 階段七：超級電腦示範（老師示範）
└── teacher/             ← 給老師：課程路線、上課前檢查清單、參考答案、示範腳本
```

---

## 給老師

[teacher/README.md](teacher/README.md) 有：依對象選擇的課程路線、課前準備、上課前檢查清單、修改教材時要同步的地方。各階段的參考答案與示範腳本也在 `teacher/` 裡。

## 關於 AGENTS.md

[AGENTS.md](AGENTS.md) 是寫給 AI 的規則。用 Antigravity IDE 開啟這個資料夾時，AI 會自動讀取並遵守，例如 Python 一律用 uv 管理、不主動讀取 `teacher/` 的參考答案。各 AI 工具讀取規則檔的方式見 [01-install/README.md](01-install/README.md#agentsmd-的生效範圍)。
