# 第 1 輪審查 prompt

由產出者（Claude Code）產生，教師貼給專家 A。

> 教學觀察：這一版**沒有**要求「只讀不執行」，結果審查者在使用者電腦上執行了 `uv tool update-shell`。第 3 輪的 prompt 補上了這一點。

```text
你是 Windows/macOS 開發環境、套件管理（WinGet、Homebrew、uv）與 AI coding agent 規則檔設計的專家。
請審查以下 4 個檔案，找出錯誤與需要改進之處：

- @README.md：總入口，含給 AI 執行安裝的 Prompt
- @AGENTS.md：給 AI 助手（Claude Code、Cursor、Antigravity 等）讀取的環境規範，Windows/macOS 共用
- @windows/install-quick.md：Windows 安裝指南（PowerShell + WinGet + uv tool）
- @macos/install-quick.md：macOS 安裝指南（zsh + Homebrew + uv tool）

【背景】
- 用途：課堂教學，學生用自己的 Windows 或 Mac 筆電，照文件或把 Prompt 貼給 AI 完成安裝。
- 安裝分成三個模組，所有學生三個模組都會安裝：
  模組一：Git、uv、Node.js、gh
  模組二：ffmpeg、ripgrep、jq、ImageMagick、edge-tts、yt-dlp
  模組三：Pandoc、LaTeX（Windows 用 MiKTeX，macOS 用 MacTeX），用於寫中文論文
- macOS 版尚未在實機上測試過。

【已經決定、不需要再討論的事】
- 原生程式用 WinGet/Homebrew 安裝，Python CLI 工具用 uv tool 安裝。
- 不安裝本地語音辨識（whisper 等）。
- AGENTS.md 只列出有安裝的工具，Windows/macOS 共用一份。

【請檢查的重點】
1. 正確性：WinGet 套件 ID、Homebrew 套件與 cask 名稱、各工具的指令與參數是否正確、是否仍有效。
2. 腳本可靠性：「已安裝就跳過」的偵測是否可靠；PATH 重載是否足夠；重複執行是否安全；
   Apple Silicon 與 Intel Mac 是否都適用；Windows 上是否會遇到 UAC 或執行原則的問題。
3. 中文論文：xelatex 加上中文字型（Microsoft JhengHei / PingFang TC）的設定在兩個系統上是否真的能編譯成功。
4. AGENTS.md 作為 AI 規則檔的品質：規則是否明確、可執行、沒有互相矛盾；
   AI 是否能正確判斷作業系統並使用對應的指令；有沒有多餘、會浪費 token 的內容。
5. 一致性：四個檔案之間的工具清單、模組編號、檔案連結與用詞是否一致。
6. 對初學者的友善程度：學生最可能卡在哪一步，文件有沒有交代清楚。
7. 安全性：例如 curl | sh 的安裝方式、是否有不必要的 sudo 或管理員權限。

【回報格式】
- 依嚴重程度排序：🔴 一定要修（會導致安裝失敗或錯誤）、🟡 建議修、🟢 可有可無。
- 每一項都要寫：檔案與位置、問題是什麼、為什麼是問題、具體的修改建議（附可以直接替換的文字或指令）。
- 不確定的地方請明確標示「不確定」，不要猜測；有引用官方文件的話請附上來源。
- 不要重寫整份檔案，只列出需要修改的地方。
- 最後用 3～5 句話做整體評價。
```
