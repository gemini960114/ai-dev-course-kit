# AGENTS.md - AI 開發助理行為規範與環境指引

本專案與本機開發環境已完成標準化配置。所有 AI 助理（包括 Antigravity、Claude Code、Cursor、OpenCode 等）在協助開發、產生指令或執行任務時，**必須遵循以下規則**。

本規範同時適用 **Windows** 與 **macOS**。作業系統不同之處列於第 5 節；請先判斷目前的作業系統，再產生對應的指令。

> **`teacher/` 資料夾是老師的參考答案。** 協助學生做練習時，不要主動讀取或引用其中的內容；只有使用者明確表示自己是老師、要修改教材時才可以讀取。

---

## 1. 系統既有環境與可用工具

本機已依安裝指南配置以下工具：

- Windows：[01-install/windows.md](01-install/windows.md)（WinGet + `uv tool`）
- macOS：[01-install/macos.md](01-install/macos.md)（Homebrew + `uv tool`）

AI 不得盲目要求使用者重新安裝或再次全域下載；使用前若不確定某工具是否存在，先檢查（Windows：`Get-Command <指令>`；macOS：`command -v <指令>`），**確實缺少時**再依該系統安裝指南的對應方式提議安裝，不要改用其他來源或安裝方式（安裝指南「常見問題排除」列出的官方備援方式，須經使用者確認才可使用）。

### 核心開發（模組一）

- **Git**：版本控制
- **uv**：現代化極速 Python 套件與虛擬環境管理器
- **Node.js** (`node`, `npm`, `npx`)：JavaScript/TypeScript 執行環境
- **GitHub CLI (`gh`)**：GitHub 遠端操作

### 多媒體與進階 CLI 工具（模組二）

- **ffmpeg**：影音轉檔、串流與音訊處理
- **edge-tts**：高品質微軟神經網路語音合成（TTS）
- **yt-dlp**：影音下載與串流擷取
- **ripgrep (`rg`)**：極速程式碼與文件搜尋工具
- **jq**：命令列 JSON 剖析與過濾器
- **ImageMagick (`magick`)**：影像批次處理

### 論文寫作（模組三）

- **pandoc**：多格式文件轉換器（Markdown、Docx、PDF 等）
- **LaTeX（`xelatex`）**：論文排版（Windows 為 MiKTeX，macOS 為 MacTeX）；中文文件一律使用 `xelatex` 編譯

---

## 2. Python 專案開發規範（重要 ⭐️）

1. **嚴禁全域安裝**：
   - **禁止**直接執行全域 `pip install <package>`。
   - **禁止**要求使用者從 python.org 下載安裝 Python；需要特定 Python 版本時使用 `uv python install 3.12` 或 `uv venv --python 3.12`。
2. **全面優先使用 `uv` 管理環境**：
   - 新專案：`uv init`，再用 `uv add <package>` 加入依賴（自動建立 `.venv` 並記錄於 `pyproject.toml`）。
   - 既有 `requirements.txt` 專案：`uv venv` 建立虛擬環境，再 `uv pip install -r requirements.txt`。
   - 執行腳本：優先使用 `uv run python script.py`（不需手動啟用虛擬環境）；單檔臨時腳本可用 `uv run --with <package> script.py`。
   - 若需手動啟用虛擬環境：見第 5 節。
3. **獨立 CLI 工具管理**：
   - 若使用者需要安裝常駐的全域 Python CLI 工具，一律使用 `uv tool install <package>`。
   - 臨時免安裝試用請使用 `uvx <package>`。

---

## 3. 多媒體與 AI 任務規範

1. **語音生成（文字轉語音）**：
   - 優先使用 `edge-tts`（例如：`edge-tts --voice zh-TW-HsiaoChenNeural --text "內容" --write-media output.mp3`），避免呼叫高成本或需複雜設定的第三方 API。可用 `edge-tts --list-voices` 查詢語音。
2. **影音與音訊剪輯**：
   - 底層處理優先使用 `ffmpeg` 命令。
3. **影音下載與擷取**：
   - 優先使用 `yt-dlp`。
4. **文件轉換與論文排版**：
   - 文件格式轉換優先使用 `pandoc`；含中文的 PDF 輸出使用 `--pdf-engine=xelatex` 並以 `-V CJKmainfont=` 指定中文字型（字型名稱見第 5 節）。

---

## 4. 程式碼搜尋與檢視規範

1. **專案全文搜尋**：
   - 優先使用 `rg <關鍵字>`（ripgrep），嚴禁使用 Windows 慢速遞迴搜尋或 `find` 全碟掃描。
   - `rg` 預設略過隱藏檔（如 `.git`），在 Git 儲存庫內會遵守 `.gitignore`；不在 Git 儲存庫時需以 `-g '!node_modules/**'` 手動排除大型目錄。
2. **JSON 資料處理**：
   - 終端機處理 API 回傳值或 JSON 檔案時，優先搭配 `jq` 進行排版與篩選。

---

## 5. 作業系統差異

| 項目 | Windows | macOS |
| --- | --- | --- |
| 命令列 | PowerShell | zsh |
| 系統套件安裝 | `winget install --id <Id> -e` | `brew install <套件>`（GUI／大型套件如 `mactex-no-gui` 需加 `--cask`） |
| 檢查工具是否存在 | `Get-Command <指令>` | `command -v <指令>` |
| 手動啟用虛擬環境 | `.venv\Scripts\Activate.ps1` | `source .venv/bin/activate` |
| 中文 PDF 字型 | `Microsoft JhengHei` | `Songti TC`（或 `Heiti TC`） |

### Windows 注意事項

1. 若執行 `npm` / `npx` 時遇到腳本執行原則問題，請優先確認執行原則為 `RemoteSigned`（僅限 `-Scope CurrentUser`）；學校或公司電腦若無法變更，改用 `npm.cmd` / `npx.cmd`。
2. 產生的路徑與檔案指令應相容於 Windows 環境（注意路徑反斜線 `\` 與引號處理）。

### macOS 注意事項

1. 不要使用 `sudo` 執行 `brew` 或 `uv`；只有 MacTeX 的 `tlmgr` 補裝套件需要 `sudo`。
2. Apple Silicon 的 Homebrew 位於 `/opt/homebrew`，Intel Mac 位於 `/usr/local`；不要寫死其中一個路徑。
