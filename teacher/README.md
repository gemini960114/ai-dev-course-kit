# 教師手冊：課程總覽

```text
teacher/
├── README.md            ← 本文件：課程總覽、課前準備、上課前檢查清單
├── 02-answers.md        ← 階段二參考答案
├── 05-course-plan.md    ← 階段五課程規劃與評分
├── 05-answers.md        ← 階段五參考答案
└── 07-demo-script.md    ← 階段七教師示範腳本（課前準備、Remote-SSH 設定、示範流程）
```

> 參考答案會一起上傳 GitHub，學生看得到也沒關係。學生練習時是用 Antigravity IDE 開啟**單一階段的資料夾**（或複製到「文件」的資料夾），AI 不會讀到這裡；根目錄的 AGENTS.md 也規定 AI 不主動讀取 `teacher/`。

---

## 七個階段

| 階段 | 資料夾 | 時間 | 學生學到什麼 | 教師資料 |
| --- | --- | --- | --- | --- |
| 一 | `01-install/` | 模組一約 15～30 分鐘；模組二、三可課後安裝 | 安裝開發環境 | — |
| 二 | `02-organize-data/` | 約 30 分鐘 | 請 AI 整理文獻比較表，並**檢查 AI 有沒有編造內容** | `02-answers.md` |
| 三 | `03-hello-github/` | 約 30 分鐘 | 登入 GitHub，用 git 存版本、推上 GitHub | — |
| 四 | `04-web-game/` | 約 30～40 分鐘 | 用自然語言請 AI 做出網頁小遊戲，並自己玩一輪檢查 AI 說的「完成」 | — |
| 五 | `05-review-loop/` | 兩次課，各 90 分鐘 | 用另一個 AI 交叉審查，自己判斷要不要採納 | `05-course-plan.md`、`05-answers.md` |
| 六 | `06-research-paper/` | 約 3 小時（建議分兩次）＋課後作業 2 小時 | 用 MRI-DATA 流程和 AI 協作寫研究論文，每個數字都查得到來源 | 使用獨立專案 [mri-data-starter](https://github.com/gemini960114/mri-data-starter) 的學生操作手冊 |
| 七 | `07-hpc-demo/` | 約 20～30 分鐘（**教師示範**，學生不操作） | 看 AI 在超級電腦上操作真實研究管線，以及 AI 在真實運作中犯過的 20 個錯誤 | `07-demo-script.md` |

**貫穿全課程的主軸：AI 很快，但會出錯，要自己檢查。** 階段二是第一次發現（AI 會補寫摘要沒有的內容），階段五是有系統地檢查（交叉審查），階段六是把檢查變成研究流程（先凍結方法、每個數字查得到來源）。

## 依對象選擇路線

時間有限時，不一定每個階段都要上。05 和 06 都在練習「判斷 AI」，可以依對象擇一：

| 對象 | 建議路線 | 說明 |
| --- | --- | --- |
| **教育、統計相關系所** | 01 → 02（`dropout-edu`）→ 03 → **06** | 06 的主題「高中少子化」與分組角色（統計所＋教育所）正好對應；05 可選上 |
| **工學院** | 01 → 02（`landslide-eng`）→ 03 → 04 → **05** | 04 網頁遊戲與 05 程式審查較貼近工程背景；06 的主題離工程較遠 |

**07 教師示範**適合放在任一路線的最後，作為「研究規模變大時，AI 協作會變成什麼樣子」的展望。

---

## 課前準備（請學生先完成）

- [ ] 註冊 GitHub 帳號
- [ ] 安裝 AI 編輯器 Antigravity IDE（[01-install/00-antigravity.md](../01-install/00-antigravity.md)；手動下載安裝，並用 Google 帳號登入）
- [ ] 完成階段一的**模組一**（Git、uv、Node.js、gh）
- [ ] 階段五需要**兩個不同的 AI**：Antigravity IDE 寫程式，另一個網頁版 AI（例如 ChatGPT）審查。審查用的 AI 要和 Antigravity 目前使用的**模型**不同

---

## 上課前檢查清單（老師）

| 項目 | 為什麼 | 怎麼確認 |
| --- | --- | --- |
| **edge-tts 是否正常** | 依賴微軟線上服務，偶爾會整體失效（2026-10 曾出現 403 錯誤，見 [rany2/edge-tts#490](https://github.com/rany2/edge-tts/issues/490)） | 執行 `edge-tts --text "測試" --write-media test.mp3`，有產生檔案即正常。失效時，階段四的音效改用 ffmpeg（README 已是預設做法） |
| **arXiv 論文狀態** | 論文可能被撤回或改版（階段二曾有一篇被撤回而更換） | 打開 `02-organize-data/` 各篇的 arXiv 連結，確認沒有標示 withdrawn |
| **階段四 GitHub Pages** | 選做步驟**尚未實測**，需要 public repo | 自己先用一個測試 repo 跑一次 |
| **macOS 安裝指南** | **尚未在實機上測試**過 | 找一台 Mac 跑完模組一到三 |
| **公用電腦** | 學生的 GitHub 登入會留在電腦上 | 課後提醒學生執行 `gh auth logout` |
| **階段七的遠端連線** | 示範要從教室連到 Nano4，學校網路可能擋 2222 埠；recon-all 每例需數小時 | 依 `07-demo-script.md` 第一節完成課前準備：教室實測連線、前一天先跑好示範批次；網路不通時改播示範影片（連結見 `07-demo-script.md`） |
| **階段六的資料下載** | 資料從 tw-highschool-panel 的 GitHub 下載並核對 SHA-256 | 在 mri-data-starter 執行 `uv run python src/get_data.py`，看到 `[OK]` 即正常；學校網路擋 GitHub 時，準備 zip 檔備用 |

---

## 修改教材時要注意

| 修改 | 要同步的地方 |
| --- | --- |
| `05-review-loop/REVIEW-LOOP.md` | `05-review-loop/exercise/grade-stats/REVIEW-LOOP.md`（起始資料夾的副本，兩份必須相同） |
| 階段二的論文 | `teacher/02-answers.md` |
| `grades.csv` | `teacher/05-answers.md` 的正確答案；檔案必須保留 BOM 與 CRLF（`.gitattributes` 已設定） |
| 新增任何階段的答案 | 檔名用 `NN-answers.md`，與其他答案一致 |
