# 階段七教師示範腳本：Antigravity＋Remote-SSH＋Nano4 FreeSurfer 管線

示範使用的專案是 [freesurfer-nano4-pipeline](https://github.com/gemini960114/freesurfer-nano4-pipeline)（**私人 repo**，只有擁有者與 collaborator 能存取）。專案本身的完整說明見其 `README.md` 與 `QUICKSTART.md`；本文件只整理**課堂示範**需要的部分。

> 本文件不含任何帳號、密碼或 OTP。以下 `<你的帳號>` 請自行替換。

---

## 一、課前準備（至少前一天完成）

| 項目 | 怎麼確認 |
| --- | --- |
| **Nano4 帳號與 OTP** | 能用密碼＋OTP（雙重驗證）登入；生醫 GP1 計畫還有 SU 額度 |
| **教室網路能連 Nano4** | 在教室的電腦執行 `Test-NetConnection nano4.nchc.org.tw -Port 2222`，`TcpTestSucceeded` 為 `True`。學校網路可能擋 2222 埠，**一定要在教室實測** |
| **Antigravity 已安裝** | 能開啟，並能使用 Remote-SSH 連線（見下方第二節） |
| **遠端專案已安裝** | 在 Nano4 上已 clone、執行過 `scripts/setup_software.sh`（約 6 分鐘），且 `scripts/selftest.sh` 顯示 `SELFTEST PASS` |
| **事先跑好一個示範批次** | recon-all 每例需要**數小時**（約 3 SU），**上課時不可能現場跑完**。前一天先送出 1 例的示範批次，上課時展示進度與結果 |
| **示範資料可以公開** | 使用已去識別化、IRB 允許用於教學的影像；不要使用真實研究批次 |
| **備案** | 網路或 OTP 出問題時，改播示範影片 [AI4Science｜AI Agent × 國網 HPC 科研運算 (v1.0)](https://www.youtube.com/watch?v=1hYm45OMpQ4)（課前確認教室能播放 YouTube；保險起見可另存一份離線檔） |

### 遠端專案首次安裝（只需做一次）

在 Nano4 的終端機執行（私人 repo 需要先授權）：

```bash
gh auth login                     # 瀏覽器登入，到 github.com/login/device 輸入代碼
gh auth setup-git
git clone https://github.com/gemini960114/freesurfer-nano4-pipeline.git /work/<你的帳號>/FreeSurfer
cd /work/<你的帳號>/FreeSurfer
scripts/setup_software.sh --check  # 唯讀檢查
scripts/setup_software.sh          # 安裝容器與 MATLAB Runtime（約 6 分鐘）
scripts/selftest.sh                # 端對端自我測試（約 1～2 分鐘）
```

也可以在 Antigravity 連線後，直接對 AI 說「幫我安裝環境」，它會先唯讀檢查、提案，等你同意才安裝。

---

## 二、Antigravity 的 Remote-SSH 連線設定

### 1. SSH 設定檔

在筆電的 `~/.ssh/config`（Windows：`%USERPROFILE%\.ssh\config`）加入：

```text
Host nano4
    HostName nano4.nchc.org.tw
    Port 2222
    User <你的帳號>
```

### 2. 連線

1. 開啟 Antigravity，開啟命令面板（`Ctrl+Shift+P`／macOS `Cmd+Shift+P`），搜尋 **Remote-SSH** 的連線指令，選擇主機 `nano4`。（指令名稱可能依版本略有不同。）
2. 依提示輸入**密碼與 OTP**。若沒有出現輸入框，到設定中開啟「在終端機顯示 Remote-SSH 登入過程」（`remote.SSH.showLoginTerminal`），在終端機中輸入。
3. 連線後選「開啟資料夾」，開啟 `/work/<你的帳號>/FreeSurfer`。
4. 開啟 Antigravity 的 AI 面板，**一定要在專案資料夾裡開啟**，AI 才會讀到專案的 AGENTS.md 與 skills。

> 投影時注意：輸入 OTP 時先切換畫面，不要讓學生看到。

---

## 三、示範腳本（約 25 分鐘）

**原則：課堂上不送出正式批次。** 只示範「分析＋提案」，在 AI 要求同意時回答「先不要執行」；結果用事先跑好的批次展示。

| 時間 | 老師對 AI 說 | 預期反應 | 講解重點 |
| --- | --- | --- | --- |
| 3 分 | 「你目前要遵守哪些規則？」 | 提到：不能在登入節點計算、送出作業前要先提案並取得同意、用 uv 管理環境 | AGENTS.md 和 skills 在遠端專案一樣有效 |
| 4 分 | 「幫我檢查環境」 | 執行 `setup_software.sh --check`（唯讀），回報各元件都已安裝 | AI 先檢查，不會自己動手安裝 |
| 3 分（選做） | 「跑一次自我測試」 | `selftest.sh` 約 1～2 分鐘，`SELFTEST PASS` | 改過程式一定要先通過自我測試；會用到少量 SU |
| 5 分 | 「我有一批新的資料，放在 `downloads/<示範資料夾>`，幫我跑 FreeSurfer」 | 唯讀掃描 → 回報可分析的例數 → 提出計畫（佇列規格、成本、輸出位置、並行數）→ **問「確認執行嗎？」** | **回答「先不要執行」**。重點是 AI 停下來等人同意 |
| 4 分 | 「`<事先跑好的批次>` 跑到哪了？有沒有失敗的 case？」 | 執行 `status.sh`，顯示 ✅（每例 8/8 個 NIfTI 輸出）等狀態 | 「完成」有嚴格定義，不是 AI 說了算 |
| 6 分 | 打開專案的 `papers/agent-guarded-hpc-pipeline/incidents/README.md` | — | 帶學生看 20 個事件，討論偽完成（INC-11）、AI 自行 commit（INC-12）、結果無法重現（INC-20） |

### 若時間充裕

- 「我要下載結果」：AI 產生 `SHA256SUMS.txt`，說明用 FileZilla 下載哪些檔案、怎麼驗證檢查碼。可以呼應階段六「每個數字都要查得到來源」。

---

## 四、安全與注意事項

| 事項 | 做法 |
| --- | --- |
| **醫療資料** | 不投影原始 MRI 影像與 case 編號；只展示狀態表與事件目錄（已去識別化） |
| **OTP 與帳號** | 輸入時切換畫面；示範結束後中斷 Remote-SSH 連線 |
| **運算費用** | 課堂上不送出正式批次；selftest 會用到少量 SU |
| **登入節點** | 不要示範在登入節點直接執行 `run_case.sh` 或 recon-all（違反叢集規範，專案也會拒絕） |
| **私人 repo** | 學生無法存取該 repo，學生頁面（`07-hpc-demo/README.md`）只放觀察重點與事件摘要 |

---

## 五、備案：Antigravity CLI（agy）的瀏覽器主控台

若筆電無法使用 Remote-SSH，專案 README 另有做法：在 Nano4 上安裝 `agy` CLI，用 `scripts/agy.slurm` 把它派送到長時監看佇列（`ngsconsole`），再從瀏覽器開啟 Antigravity 網頁接管。詳細步驟見專案 README 的「Antigravity（agy CLI）安裝與 Slurm 遠端主控台」。

> 這套 Remote-SSH 與 agy 流程**尚未在教室環境實測**，請在課前依第一節的清單完整跑一次。
