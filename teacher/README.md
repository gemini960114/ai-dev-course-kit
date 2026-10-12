# 教師手冊：課程總覽

```text
teacher/
├── README.md            ← 本文件：課程總覽、課前準備、上課前檢查清單
├── 02-answers.md        ← 階段二參考答案
├── 05-course-plan.md    ← 階段五課程規劃與評分
└── 05-answers.md        ← 階段五參考答案
```

> 參考答案會一起上傳 GitHub，學生看得到也沒關係。學生練習時是用 VS Code 開啟**單一階段的資料夾**（或複製到「文件」的資料夾），AI 不會讀到這裡；根目錄的 AGENTS.md 也規定 AI 不主動讀取 `teacher/`。

---

## 五個階段

| 階段 | 資料夾 | 時間 | 學生學到什麼 | 教師資料 |
| --- | --- | --- | --- | --- |
| 一 | `01-install/` | 模組一約 15～30 分鐘；模組二、三建議回家安裝 | 安裝開發環境 | — |
| 二 | `02-organize-data/` | 約 30 分鐘 | 請 AI 整理文獻比較表，並**檢查 AI 有沒有編造內容** | `02-answers.md` |
| 三 | `03-hello-github/` | 約 30 分鐘 | 登入 GitHub，用 git 存版本、推上 GitHub | — |
| 四 | `04-web-game/` | 約 30～40 分鐘 | 用自然語言請 AI 做出網頁小遊戲 | — |
| 五 | `05-review-loop/` | 兩次課，各 90 分鐘 | 用另一個 AI 交叉審查，自己判斷要不要採納 | `05-course-plan.md`、`05-answers.md` |

**貫穿全課程的主軸：AI 很快，但會出錯，要自己檢查。** 階段二是第一次發現（AI 會補寫摘要沒有的內容），階段五是有系統地檢查（交叉審查）。

---

## 課前準備（請學生先完成）

- [ ] 註冊 GitHub 帳號
- [ ] 安裝 VS Code 與一個 AI 工具（例如 Claude Code）
- [ ] 完成階段一的**模組一**（Git、uv、Node.js、gh）
- [ ] 階段五需要**兩個不同的 AI 工具**（例如 Claude Code＋ChatGPT 或 Gemini 網頁版）

---

## 上課前檢查清單（老師）

| 項目 | 為什麼 | 怎麼確認 |
| --- | --- | --- |
| **edge-tts 是否正常** | 依賴微軟線上服務，偶爾會整體失效（2026-10 曾出現 403 錯誤，見 [rany2/edge-tts#490](https://github.com/rany2/edge-tts/issues/490)） | 執行 `edge-tts --text "測試" --write-media test.mp3`，有產生檔案即正常。失效時，階段四的音效改用 ffmpeg（README 已是預設做法） |
| **arXiv 論文狀態** | 論文可能被撤回或改版（階段二曾有一篇被撤回而更換） | 打開 `02-organize-data/` 各篇的 arXiv 連結，確認沒有標示 withdrawn |
| **階段四 GitHub Pages** | 選做步驟**尚未實測**，需要 public repo | 自己先用一個測試 repo 跑一次 |
| **macOS 安裝指南** | **尚未在實機上測試**過 | 找一台 Mac 跑完模組一到三 |
| **模組三的 LaTeX** | 需下載數 GB，全班同時下載會塞爆教室網路 | 提醒學生回家安裝；階段二的「轉成 Word」只需要 Pandoc |
| **公用電腦** | 學生的 GitHub 登入會留在電腦上 | 課後提醒學生執行 `gh auth logout` |

---

## 修改教材時要注意

| 修改 | 要同步的地方 |
| --- | --- |
| `05-review-loop/REVIEW-LOOP.md` | `05-review-loop/exercise/grade-stats/REVIEW-LOOP.md`（起始資料夾的副本，兩份必須相同） |
| 階段二的論文 | `teacher/02-answers.md` |
| `grades.csv` | `teacher/05-answers.md` 的正確答案；檔案必須保留 BOM 與 CRLF（`.gitattributes` 已設定） |
| 新增任何階段的答案 | 檔名用 `NN-answers.md`，與其他答案一致 |
