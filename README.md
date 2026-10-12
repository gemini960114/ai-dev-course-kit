# 開發與 AI 自動化環境安裝專案（Windows / macOS）

本專案提供 Windows 10/11 與 macOS 上的現代化開發、AI 多媒體與論文寫作環境安裝指引。兩個系統的模組編號相同，上課時可直接說「請安裝模組一」。

---

## 目錄結構

依課程順序編號：

```text
ai-dev-course-kit/
├── README.md          ← 本文件：課程總覽
├── AGENTS.md          ← 給 AI 助手的環境規範（兩個系統共用）
├── 01-install/        ← 階段一：安裝環境
│   ├── windows.md     ← Windows 安裝指南（WinGet + uv）
│   └── macos.md       ← macOS 安裝指南（Homebrew + uv）
├── 02-organize-data/  ← 階段二：AI 整理文獻（約 30 分鐘）
├── 03-hello-github/   ← 階段三：連線 GitHub（約 30 分鐘）
├── 04-web-game/       ← 階段四：網頁小遊戲（約 30～40 分鐘）
├── 05-review-loop/    ← 階段五：AI 交叉審查
└── teacher/           ← 老師專用：課程規劃與參考答案
```

## 課程順序

```text
01-install（安裝）→ 02-organize-data（AI 整理文獻）→ 03-hello-github（連線 GitHub）
→ 04-web-game（網頁小遊戲）→ 05-review-loop（AI 交叉審查）
```

## 安裝模組

| 模組 | 內容 | Windows | macOS |
| --- | --- | --- | --- |
| 模組一（核心開發） | Git、uv、Node.js、GitHub CLI (`gh`) | WinGet | Homebrew |
| 模組二（多媒體與進階 CLI） | ffmpeg、ripgrep (`rg`)、jq、ImageMagick、edge-tts、yt-dlp | WinGet + uv tool | Homebrew + uv tool |
| 模組三（論文寫作） | Pandoc、LaTeX（`xelatex`） | MiKTeX | MacTeX |

- **Windows**：[01-install/windows.md](01-install/windows.md)（Windows 10 請先確認 WinGet 可用，見文件中的「事前確認」）
- **macOS**：[01-install/macos.md](01-install/macos.md)（需先完成文件中的「事前準備」安裝 Homebrew）

---

## 給 AI 助手的執行 Prompt（複製即可使用）

如果你正在使用 AI 輔助工具（例如 Antigravity、Claude Code、Cursor、OpenCode 等），可以直接複製以下 Prompt 貼給 AI 執行安裝。AI 會依你的作業系統選擇對應的安裝指南。

### 推薦 Prompt 1：僅安裝核心開發環境（極簡安全）

```text
請先判斷我的作業系統，Windows 請參考 @01-install/windows.md，macOS 請參考 @01-install/macos.md，
執行其中的「模組一：核心開發工具」（macOS 若尚未安裝 Homebrew，請先完成「事前準備」）：
1. 先檢查 Git、uv、Node.js、gh 是否已存在。
2. 已安裝的項目請列出版本並略過；缺少的項目才透過 WinGet（Windows）或 Homebrew（macOS）安裝。
3. 任何一項安裝失敗時請停止並回報錯誤，不要回報成功。
4. 安裝完成後重載環境變數並執行版本驗證回報。
```

### 推薦 Prompt 2：安裝模組一與模組二（核心 + 多媒體與進階 CLI）

```text
請先判斷我的作業系統，Windows 請參考 @01-install/windows.md，macOS 請參考 @01-install/macos.md，
幫我檢查並安裝模組一與模組二：
- 系統原生工具（Git、uv、Node.js、gh、ffmpeg、ripgrep (rg)、jq、ImageMagick (magick)）請透過 WinGet（Windows）或 Homebrew（macOS）安裝。
- Python 工具（edge-tts, yt-dlp）請在 uv 安裝完成後透過 uv tool 安裝。
- 已存在的工具跳過，缺少的才安裝；套件名稱以安裝指南中的清單為準。
- 任何一項安裝失敗時請停止並回報錯誤，不要回報成功。
- 完成後重載 PATH，並回報所有工具的版本狀態。
```

### 推薦 Prompt 3：安裝論文寫作工具（Pandoc + LaTeX）

> LaTeX 需下載數 GB，建議在家中寬頻網路執行，避免全班同時在教室下載。

```text
請先判斷我的作業系統，Windows 請參考 @01-install/windows.md，macOS 請參考 @01-install/macos.md，
執行其中的「模組三：論文寫作工具」：
1. 先檢查 pandoc 與 xelatex 是否已存在（若已有其他 LaTeX 發行版，請跳過 LaTeX 安裝）。
2. 缺少的項目才安裝（Windows：MiKTeX；macOS：MacTeX）。
3. 任何一項安裝失敗時請停止並回報錯誤，不要回報成功。
4. 完成後重載 PATH，回報 pandoc 與 xelatex 版本，並執行指南中的「中文 PDF 編譯測試」。
```

---

## AGENTS.md 的生效範圍

不同 AI 工具讀取的規則檔不同，只有支援 `AGENTS.md` 的工具會在開啟這個資料夾時自動套用：

| AI 工具 | 專案規則 | 全域規則（Windows / macOS） |
| --- | --- | --- |
| Claude Code | 新版在沒有 `CLAUDE.md` 時會讀取 `AGENTS.md`；舊版請建立 `CLAUDE.md`，內容只寫一行 `@AGENTS.md` | `%USERPROFILE%\.claude\CLAUDE.md` / `~/.claude/CLAUDE.md` |
| Cursor | 直接讀取 `AGENTS.md` | Settings → Rules → User Rules |
| OpenCode | 直接讀取 `AGENTS.md` | `~/.config/opencode/AGENTS.md` |
| Antigravity | 直接讀取 `AGENTS.md` | 請依官方文件設定 |
| Gemini CLI | 建立 `GEMINI.md`，內容寫 `@AGENTS.md` | `%USERPROFILE%\.gemini\GEMINI.md` / `~/.gemini/GEMINI.md` |

> 複製到全域規則檔時，AGENTS.md 裡指向 `01-install/windows.md`、`01-install/macos.md` 的相對連結會失效，請改成這兩份文件在你電腦上的完整路徑。

---

## 人工手動安裝方式

若不透過 AI，亦可直接開啟 **Windows PowerShell** 或 macOS **終端機**，將對應安裝指南中的程式碼區塊整段複製貼上執行即可。
