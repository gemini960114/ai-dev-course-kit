# Windows 開發環境極簡安裝指南

本指南採用 Windows 原生 **WinGet** 與 Python 極速套件管理器 **uv**。  
請開啟 **Windows PowerShell**（一般使用者身分即可；Git、Node.js 等安裝程式若跳出 UAC 視窗，按「是」允許即可）。

> - 偵測到已存在的工具會保留現有版本、不會自動升級；請以各模組的「驗證」結果為準。
> - 以下命令會自動接受 WinGet 來源條款與各套件的授權協議，請確認你同意後再執行。
> - 安裝時請勿在已啟用 Python 虛擬環境（`.venv`）的視窗中執行。

> 開始之前：若要把安裝工作交給 AI，請先完成[第 0 步：安裝 Antigravity IDE](00-antigravity.md)。

---

## 事前確認：WinGet

Windows 11 已內建 WinGet；部分未更新的 Windows 10 可能沒有。先執行：

```powershell
winget --version
```

若出現「無法辨識 winget」，請開啟 Microsoft Store 搜尋「**應用程式安裝程式**（App Installer）」安裝或更新，重新開啟 PowerShell 後再繼續。

---

## 模組一：核心開發工具

包含：`Git`、`uv`、`Node.js LTS`、`GitHub CLI (gh)`。

複製以下指令貼入 PowerShell 執行（已存在則自動跳過）：

```powershell
# 1. 允許執行本機 PowerShell 腳本（避免 npm.ps1 報錯；僅影響目前使用者）
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force

# 2. 定義核心工具清單
$coreTools = @(
    @{ Cmd = "git";  Id = "Git.Git" },
    @{ Cmd = "uv";   Id = "astral-sh.uv" },
    @{ Cmd = "node"; Id = "OpenJS.NodeJS.LTS" },
    @{ Cmd = "gh";   Id = "GitHub.cli" }
)

# 3. 已存在則跳過，缺少才安裝；記錄失敗項目
$failed = @()
foreach ($tool in $coreTools) {
    if (Get-Command $tool.Cmd -ErrorAction SilentlyContinue) {
        $ver = (& $tool.Cmd --version 2>$null) -join " "
        Write-Host "[已安裝] $($tool.Cmd) ($ver)，跳過。" -ForegroundColor Yellow
    } else {
        Write-Host "[缺少] 正在安裝 $($tool.Id) ..." -ForegroundColor Cyan
        winget install --id $tool.Id -e --source winget --accept-package-agreements --accept-source-agreements
        if ($LASTEXITCODE -notin 0, -1978335189) { $failed += $tool.Id }  # -1978335189：已安裝、沒有可用的升級
    }
}

# 4. 即時重載環境變數 PATH（保留目前視窗原有的路徑）
$env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User") + ";" + $env:Path

if ($failed) {
    Write-Host "`n以下項目安裝失敗：$($failed -join ', ')。請查看上方錯誤訊息，處理後重新執行本段。" -ForegroundColor Red
} else {
    Write-Host "`n核心工具安裝檢查完成！" -ForegroundColor Green
}
```

### 核心工具驗證

```powershell
git --version
uv --version
node --version        # 階段四需要 22.12 以上（或 20.19 以上的 20 版）
npm --version
npx --version
gh --version
```

---

## 模組二：多媒體與進階 CLI 工具

分類安裝原則：
- **WinGet**：安裝系統原生二進位工具（`ffmpeg`, `ripgrep`, `jq`, `ImageMagick`）。
- **uv tool**：安裝 Python 生態獨立工具（`edge-tts`, `yt-dlp`）。

請先完成模組一（需要 `uv`），再複製以下指令執行（已存在則自動跳過）：

```powershell
$failed = @()

# 1. WinGet 安裝原生系統工具
$systemTools = @(
    @{ Cmd = "ffmpeg";  Id = "Gyan.FFmpeg" },
    @{ Cmd = "rg";      Id = "BurntSushi.ripgrep.MSVC" },
    @{ Cmd = "jq";      Id = "jqlang.jq" },
    @{ Cmd = "magick";  Id = "ImageMagick.ImageMagick" }
)

foreach ($tool in $systemTools) {
    if (Get-Command $tool.Cmd -ErrorAction SilentlyContinue) {
        Write-Host "[已安裝] $($tool.Cmd)，跳過。" -ForegroundColor Yellow
    } else {
        Write-Host "[缺少] 正在安裝 $($tool.Id) ..." -ForegroundColor Cyan
        winget install --id $tool.Id -e --source winget --accept-package-agreements --accept-source-agreements
        if ($LASTEXITCODE -notin 0, -1978335189) { $failed += $tool.Id }  # -1978335189：已安裝、沒有可用的升級
    }
}

# 2. uv tool 安裝 Python 獨立命令列工具
$pyTools = @("edge-tts", "yt-dlp")

foreach ($pkg in $pyTools) {
    if (Get-Command $pkg -ErrorAction SilentlyContinue) {
        Write-Host "[已安裝] $pkg，跳過。" -ForegroundColor Yellow
    } else {
        Write-Host "[缺少] 正在透過 uv 安裝 $pkg ..." -ForegroundColor Cyan
        uv tool install $pkg
        if ($LASTEXITCODE -ne 0) { $failed += $pkg }
    }
}

# 3. 確保 uv tool 的執行檔目錄（位置可用 uv tool dir --bin 查詢）已加入使用者 PATH
#    若顯示「Restart your shell to apply changes」可忽略，下一步會立即生效
uv tool update-shell

# 4. 再次重載 PATH（保留目前視窗原有的路徑）
$env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User") + ";" + $env:Path

if ($failed) {
    Write-Host "`n以下項目安裝失敗：$($failed -join ', ')。請查看上方錯誤訊息，處理後重新執行本段。" -ForegroundColor Red
} else {
    Write-Host "`n擴充工具安裝檢查完成！" -ForegroundColor Green
}
```

### 擴充工具驗證

```powershell
ffmpeg -version
rg --version
jq --version
magick -version
edge-tts --version
yt-dlp --version
```

### 擴充工具使用範例

```powershell
# 文字轉語音（台灣中文女聲）
edge-tts --voice zh-TW-HsiaoChenNeural --text "你好，這是測試" --write-media hello.mp3

# 專案全文搜尋：預設略過隱藏檔（如 .git）；在 Git 儲存庫內會遵守 .gitignore，
# 因此通常也會跳過 node_modules 與 .venv
rg "API_KEY"          # 全專案搜尋
rg -i "database_url"  # 不分大小寫
rg "def main" -t py   # 只搜 Python 檔
rg -l "TODO"          # 只列出檔名
rg "API_KEY" -g "!node_modules/**"  # 不在 Git 儲存庫時，手動排除 node_modules
```

---

## 模組三：文件轉換工具（Pandoc）

包含：`Pandoc`（Markdown、Word、HTML 等格式互轉）。安裝檔小，幾秒鐘就完成。

> 本課程的練習都**不需要全域安裝 LaTeX**。唯一需要 PDF 的是階段六的 APA 排版作業：照該作業的提示語，AI 會把 Tectonic 下載到那個專案的 `tools/` 資料夾（下載前會先詢問你）；無法下載時，可改用 Overleaf 線上編譯。

```powershell
$failed = @()

if (Get-Command pandoc -ErrorAction SilentlyContinue) {
    Write-Host "[已安裝] pandoc，跳過。" -ForegroundColor Yellow
} else {
    Write-Host "[缺少] 正在安裝 Pandoc ..." -ForegroundColor Cyan
    winget install --id JohnMacFarlane.Pandoc -e --source winget --accept-package-agreements --accept-source-agreements
    if ($LASTEXITCODE -notin 0, -1978335189) { $failed += "JohnMacFarlane.Pandoc" }
}

# 重載 PATH（保留目前視窗原有的路徑）
$env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User") + ";" + $env:Path

if ($failed) {
    Write-Host "`n以下項目安裝失敗：$($failed -join ', ')。請查看上方錯誤訊息，處理後重新執行本段。" -ForegroundColor Red
} else {
    Write-Host "`n文件轉換工具安裝檢查完成！" -ForegroundColor Green
}
```

### 文件轉換工具驗證

```powershell
pandoc --version
```

再實際把一份含中文表格的 Markdown 轉成 Word：

```powershell
Set-Location $env:TEMP
[IO.File]::WriteAllText("$env:TEMP\pandoc-test.md", "# 轉檔測試`n`n| 欄位 | 內容 |`n| --- | --- |`n| 中文 | 正常顯示 |", [Text.UTF8Encoding]::new($false))
pandoc pandoc-test.md -o pandoc-test.docx
if ($LASTEXITCODE -eq 0 -and (Test-Path pandoc-test.docx)) {
    Write-Host "Word 轉檔成功！" -ForegroundColor Green
    Start-Process pandoc-test.docx
} else {
    Write-Host "Word 轉檔失敗，請查看上方錯誤訊息。" -ForegroundColor Red
}
```

### 文件轉換工具使用範例

```powershell
pandoc report.md -o report.docx     # Markdown 轉 Word
pandoc report.docx -o report.md     # Word 轉 Markdown（方便交給 AI 整理）
pandoc report.md -o report.html     # Markdown 轉網頁
```

### 選讀：需要完整 LaTeX 時

自己要用 LaTeX 寫論文（例如學校的論文範本）時，才需要另外安裝完整的 LaTeX 發行版，例如 MiKTeX：`winget install --id MiKTeX.MiKTeX -e`（安裝檔較大，建議在家中寬頻網路安裝）。本課程不需要。

---

## 常見問題排除

1. **指令找不到（Command Not Found）**：
   - 請直接**關閉並重新開啟 PowerShell 視窗**讓系統環境變數徹底刷新。
   - 確認路徑：`where.exe git`、`where.exe uv`、`where.exe rg`。

2. **npm 出現「這個系統上已停用指令碼執行」**：
   - 執行：`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force`
   - 學校或公司管理的電腦可能被群組原則禁止變更，請改用 `.cmd` 版本執行：`npm.cmd -v`、`npx.cmd`。

3. **出現「無法辨識 winget」**：
   - WinGet 由 Microsoft Store 的「應用程式安裝程式」（App Installer）提供，安裝或更新後重新開啟 PowerShell 再試。

4. **winget 安裝 uv 失敗時的備用方式**：
   - 先執行 `winget source update` 後重試。
   - 仍失敗時，**經使用者確認後**才可改用 Astral 官方安裝指令：
     ```powershell
     powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "irm https://astral.sh/uv/install.ps1 | iex"
     ```
