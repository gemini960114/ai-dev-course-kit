# 階段六：用 AI 協作寫研究論文

約 3 小時課堂（建議分兩次）＋課後作業 2 小時。用真實的臺灣高中資料，和 AI 一起完成一篇**可以信任**的研究短報告。

**重點：請 AI 直接寫論文很快，但數字、方法、文獻都可能是編的。這個階段練習一套流程，讓 AI 幫忙寫，但每一步都查得到根據。**

---

## 這個階段在做什麼

使用另一個專案 [mri-data-starter](https://github.com/gemini960114/mri-data-starter)，依照 **MRI-DATA** 的順序寫作：

```text
Methods（先寫方法並凍結）→ Results → Introduction → Discussion → Abstract → Title → Assembly
```

| 原則 | 為什麼 |
| --- | --- |
| **先定方法，再看結果** | 避免看到數字後才改方法、挑好看的結果 |
| **每個數字都要查得到來源** | 避免 AI 編造數據（工具會自動檢查） |
| **改了計畫就要記錄** | 讓研究過程透明、可檢驗 |

## 和前面階段的關係

| 前面學過的 | 在這裡怎麼用 |
| --- | --- |
| 01 安裝的 git、uv | 下載專案、建立 Python 環境、執行分析 |
| 02 檢查 AI 有沒有編造 | 「數字查核員」核對論文裡的每個數字；課後作業用 Elicit 自己找文獻 |
| 03 git commit | 用 `git tag methods-frozen` **凍結**研究方法 |
| AGENTS.md | 專案裡的 AGENTS.md 規定 AI：方法凍結前不能算結果、不能編造文獻 |

---

## 開始

在 PowerShell（macOS 用終端機）執行，**放在「文件」裡，不要放在教材資料夾內**：

```powershell
cd ~/Documents
git clone https://github.com/gemini960114/mri-data-starter
cd mri-data-starter
uv sync
uv run python src/get_data.py
antigravity-ide .
```

> 若找不到 `antigravity-ide` 指令，改在 Antigravity IDE 選「檔案 → 開啟資料夾」（File → Open Folder），開啟 `mri-data-starter`。

看到 `[OK] hs_school_year.csv 的 SHA-256 正確` 就完成了。接下來**照專案裡的 [學生操作手冊](https://github.com/gemini960114/mri-data-starter/blob/main/docs/student_guide.md) 一步一步做**，每一步要貼給 AI 的提示詞都在專案的 `prompts/` 資料夾。

> Windows 若出現 `Failed to hardlink files` 警告，可以忽略；或先執行 `$env:UV_LINK_MODE="copy"` 再 `uv sync`。

## 建議的時間安排

| 次數 | 內容 | 時間 |
| --- | --- | --- |
| 第一次課 | 分組與角色 → **M：研究方法並凍結** → **R：分析與結果** | 約 100 分鐘 |
| 第二次課 | I：前言 → D：討論 → A＋T：摘要與標題 → 組裝 → 分享 | 約 60 分鐘 |
| 課後作業 | 一、自己搜尋並閱讀文獻補進論文；二、轉成 APA 第 7 版格式 | 各約 1 小時 |

> APA 排版作業會由 AI 把 Tectonic 下載到專案的 `tools/` 資料夾，第一次編譯時自動下載需要的 LaTeX 套件，**不需要另外安裝 LaTeX**。下載失敗時，可以改把 LaTeX 原始檔上傳到 Overleaf 編譯。

---

> 資料來源：Chuang, C.-C. (2026). *tw-highschool-panel：臺灣高級中等學校校級面板資料（103–114 學年度）* (Version 2026.10.1) [Data set]. Zenodo. https://doi.org/10.5281/zenodo.23293537（CC BY 4.0；此為 2026.10.1 版的 DOI）
