# 階段一：安裝開發環境

模組一約 15～30 分鐘；模組二、三可以課後安裝。Windows 和 macOS 的模組編號相同，上課時可以直接說「請安裝模組一」。

---

## 安裝步驟

**第 0 步（手動）：安裝 AI 編輯器**，見 [00-antigravity.md](00-antigravity.md)。有了 AI 編輯器，後面的模組才能交給 AI 安裝。

**第 1 步：取得教材。** 後面的安裝 Prompt 和練習都需要教材檔案在你的電腦上。

- **還沒有 Git（第一次上課）**：下載 [ZIP 檔](https://github.com/gemini960114/ai-dev-course-kit/archive/refs/heads/main.zip)，解壓縮到「文件」。Windows：在檔案上按右鍵 →「解壓縮全部」；macOS：連按兩下。解壓縮後的資料夾名稱是 `ai-dev-course-kit-main`。
- **已經有 Git**：在終端機執行：

  ```powershell
  cd ~/Documents
  git clone https://github.com/gemini960114/ai-dev-course-kit
  ```

**第 2 步起：安裝模組一～三**，可以把下方的 Prompt 貼給 AI，或照安裝指南手動執行。

| 模組 | 內容 | Windows | macOS |
| --- | --- | --- | --- |
| 模組一（核心開發） | Git、uv、Node.js、GitHub CLI (`gh`) | WinGet | Homebrew |
| 模組二（多媒體與進階 CLI） | ffmpeg、ripgrep (`rg`)、jq、ImageMagick、edge-tts、yt-dlp | WinGet + uv tool | Homebrew + uv tool |
| 模組三（文件轉換） | Pandoc | WinGet | Homebrew |

- **Windows**：[windows.md](windows.md)（Windows 10 請先確認 WinGet 可用，見文件中的「事前確認」）
- **macOS**：[macos.md](macos.md)（需先完成文件中的「事前準備」安裝 Homebrew）

---

## 交給 AI 安裝（複製即可使用）

在 Antigravity IDE 選「檔案 → 開啟資料夾」（File → Open Folder），開啟**教材的最上層資料夾**，再把下面的 Prompt 貼給 AI。AI 會依你的作業系統選擇對應的安裝指南。

### Prompt 1：模組一（核心開發，必裝）

```text
請先判斷我的作業系統，Windows 請參考 @01-install/windows.md，macOS 請參考 @01-install/macos.md，
執行其中的「模組一：核心開發工具」（macOS 若尚未安裝 Homebrew，請先完成「事前準備」）：
1. 先檢查 Git、uv、Node.js、gh 是否已存在。
2. 已安裝的項目請列出版本並略過；缺少的項目才透過 WinGet（Windows）或 Homebrew（macOS）安裝。
3. 全部嘗試完成後，若有任何一項失敗，請列出失敗項目與錯誤訊息，不要回報成功。
4. 安裝完成後重載環境變數並執行版本驗證回報。
```

### Prompt 2：模組一與模組二（核心 + 多媒體與進階 CLI）

```text
請先判斷我的作業系統，Windows 請參考 @01-install/windows.md，macOS 請參考 @01-install/macos.md，
幫我檢查並安裝模組一與模組二：
- 系統原生工具（Git、uv、Node.js、gh、ffmpeg、ripgrep (rg)、jq、ImageMagick (magick)）請透過 WinGet（Windows）或 Homebrew（macOS）安裝。
- Python 工具（edge-tts, yt-dlp）請在 uv 安裝完成後透過 uv tool 安裝。
- 已存在的工具跳過，缺少的才安裝；套件名稱以安裝指南中的清單為準。
- 全部嘗試完成後，若有任何一項失敗，請列出失敗項目與錯誤訊息，不要回報成功。
- 完成後重載 PATH，並回報所有工具的版本狀態。
```

### Prompt 3：模組三（文件轉換，Pandoc）

```text
請先判斷我的作業系統，Windows 請參考 @01-install/windows.md，macOS 請參考 @01-install/macos.md，
執行其中的「模組三：文件轉換工具」：
1. 先檢查 pandoc 是否已存在，缺少才安裝。
2. 安裝失敗時請列出錯誤訊息，不要回報成功。
3. 完成後重載 PATH，回報 pandoc 版本，並執行指南中的 Word 轉檔測試。
```

## 不透過 AI，手動安裝

開啟 **Windows PowerShell** 或 macOS **終端機**，把安裝指南中的程式碼區塊整段複製貼上執行即可。

---

## AGENTS.md 的生效範圍

教材最上層的 [AGENTS.md](../AGENTS.md) 是寫給 AI 的規則（例如 Python 一律用 uv、不全域安裝套件）。不同 AI 工具讀取的規則檔不同：

| AI 工具 | 專案規則 | 全域規則（Windows / macOS） |
| --- | --- | --- |
| Antigravity | 直接讀取 `AGENTS.md` | 請依官方文件設定 |
| Claude Code | 建立 `CLAUDE.md`，內容只寫一行 `@AGENTS.md`（最穩定；部分版本在沒有 `CLAUDE.md` 時也會直接讀取 `AGENTS.md`） | `%USERPROFILE%\.claude\CLAUDE.md` / `~/.claude/CLAUDE.md` |
| Cursor | 直接讀取 `AGENTS.md` | Settings → Rules → User Rules |
| OpenCode | 直接讀取 `AGENTS.md` | `~/.config/opencode/AGENTS.md` |
| Gemini CLI | 建立 `GEMINI.md`，內容寫 `@AGENTS.md` | `%USERPROFILE%\.gemini\GEMINI.md` / `~/.gemini/GEMINI.md` |

> 複製到全域規則檔時，AGENTS.md 裡指向 `01-install/windows.md`、`01-install/macos.md` 的相對連結會失效，請改成這兩份文件在你電腦上的完整路徑。
