# 第 2 輪審查：專家 B、專家 C（節錄）

> 本輪沒有產生新的 prompt，教師沿用第 1 輪的 prompt。兩位專家看到的是**第 1 輪修改前**的版本，所以有些項目已經處理過。原文較長，以下保留每一項的主張與關鍵說法。

---

## 專家 B（22 項）

開頭說明：「目前列出的 WinGet ID 沒有發現錯誤」，並逐一列出已核對的 WinGet ID 與 Homebrew 名稱。

### 🔴 一定要修

1. macOS 的 `xcode-select --install` 是非同步的，建議拆成兩階段。
2. macOS 幾乎不會透過 Homebrew 安裝 Git（CLT 已提供 `/usr/bin/git`），建議改用 `brew list --formula` 判斷，失敗時 `return 1`。
3. macOS `uv tool update-shell` 不更新目前的 PATH；建議用 `$(uv tool dir --bin)` 而非寫死 `~/.local/bin`。
4. **Windows 不應在安裝一開始永久修改使用者執行原則**，建議刪除 `Set-ExecutionPolicy`，改用 `npm.cmd`。
5. Windows 未先確認 WinGet 存在，缺少時會顯示假的「完成」，建議 `throw`。
6. **所有安裝迴圈都忽略安裝失敗並無條件顯示成功**，建議 Windows 用 `throw`、macOS 用 `return 1`。

### 🟡 建議修

7. macOS Homebrew PATH 只涵蓋 Apple Silicon，建議同時偵測 Intel 的 `/usr/local/bin/brew`。
8. 未交代 macOS 版本需求與 Intel Mac 的支援風險（引用 MacTeX 2026 需要 macOS 11、Homebrew 對 Intel 為 Tier 3）。
9. Windows（LTS）與 macOS（Current）的 Node.js 版本通道不一致，建議 Windows 改成 Current。
10. README「全套環境」的 Prompt 實際上漏掉模組三。
11. `rg` 不保證自動略過 `node_modules`（只在 `.gitignore` 中才會略過）。
12. 只驗證 `xelatex --version` 不夠，建議加入中文 PDF 實際編譯測試，範例用 `"中文…" | pandoc …`。
13. `xelatex thesis.tex` 不保證中文能編譯，`.tex` 需載入 xeCJK。
14. MiKTeX 官方寫法是 `AutoInstall=yes`，不是 `1`。
15. MacTeX 安裝後超過 6 GB，不宜寫「約 5 GB」；不建議提供 BasicTeX。
16. `curl | sh`／`irm | iex` 備援方式違反 AGENTS.md「不要改用其他來源」的規則。
17. 不同 AI 工具讀取的規則檔不同（Claude Code 讀 CLAUDE.md、Gemini CLI 讀 GEMINI.md）。
18. Windows PATH 重載會捨棄目前視窗特有的 PATH。
19. 「已安裝就跳過」只檢查命令，可能保留過舊版本。

### 🟢 可有可無

20. AGENTS.md 可明確規定判斷作業系統的方法（`$IsWindows`、`uname -s`）。
21. macOS 的 `which` 改為 `command -v`，與全文一致。
22. 自動接受授權條款（`--accept-package-agreements`）應先告知學生。

---

## 專家 C（14 項）

### 🔴 一定要修

1. macOS 的 PingFang TC 在新版 macOS 會編譯失敗，引用社群實測：macOS 15 起需從字體簿下載，macOS 26 移除；Songti／Heiti 在 15 與 26 都可用。
2. macOS 模組二安裝後同一個終端機驗證必定 `command not found`；並指出 `update-shell` 在某些情況會以錯誤碼結束，建議加 `|| true`。

### 🟡 建議修

3. README Prompt 2 把 `rg`、`magick` 當成安裝名稱。
4. **macOS 模組一沒有偵測 Homebrew 是否存在**，建議加入：`command -v brew … || { echo "錯誤…"; exit 1; }`
5. Windows 常見問題缺少「winget 不存在」的處理。
6. ripgrep 預設過濾行為描述不精確：`.gitignore` 只在 Git 儲存庫內生效。
7. README 的 Claude Code 說明已過時：新版在沒有 CLAUDE.md 時會讀取 AGENTS.md；建議補上 OpenCode；Antigravity 的全域規則位置標為「不確定」。
8. MiKTeX 第一次編譯會即時下載套件，需先警告。

### 🟢 可有可無

9. AGENTS.md 模組二的兩個小節可以合併；模組二在各檔案的名稱不一致。
10. Windows `uv tool update-shell` 會印出「Restart your shell」，可加註解說明可忽略。
11. macOS 事前準備可提醒 `xcode-select --install` 會跳出視窗。
12. `mactex-no-gui` 與 `basictex` 互斥，裝過 BasicTeX 的學生需先移除。
13. AGENTS.md 複製到全域規則檔後，相對連結會失效。

### 安全性結論

14. 「`Set-ExecutionPolicy` 限縮在 CurrentUser 範圍恰當」；建議補一句「學校電腦可能無法變更，請改用 npm.cmd」。

---

## 值得注意

- 專家 B 第 4 項（刪除 `Set-ExecutionPolicy`）與專家 C 第 14 項（保留恰當）**意見相反**。
- 專家 C 第 1 項說「macOS 26 移除 PingFang」，**與 Apple 官方字型清單不符**（macOS Tahoe 仍列有 PingFang TC）。
- 專家 B 第 15 項說 MacTeX「超過 6 GB」，第 1 輪專家 A 的課堂提醒說「約 2.8 GB」，**數字不一致**。
