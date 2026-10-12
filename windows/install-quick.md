# Windows 開發環境極簡安裝指南

本指南採用 Windows 原生 **WinGet** 與 Python 極速套件管理器 **uv**。  
請開啟 **Windows PowerShell**（一般使用者身分即可；Git、Node.js 等安裝程式若跳出 UAC 視窗，按「是」允許即可）。

> - 偵測到已存在的工具會保留現有版本、不會自動升級；請以各模組的「驗證」結果為準。
> - 以下命令會自動接受 WinGet 來源條款與各套件的授權協議，請確認你同意後再執行。
> - 安裝時請勿在已啟用 Python 虛擬環境（`.venv`）的視窗中執行。

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
        if ($LASTEXITCODE -ne 0) { $failed += $tool.Id }
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
node --version
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
        if ($LASTEXITCODE -ne 0) { $failed += $tool.Id }
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

## 模組三：論文寫作工具（Pandoc + LaTeX）

包含：`Pandoc`（文件轉換）、`MiKTeX`（LaTeX 排版引擎，提供 `xelatex`，支援中文）。

- 若電腦已安裝其他 LaTeX 發行版（例如 TeX Live），偵測到 `xelatex` 會自動跳過，不會重複安裝。
- MiKTeX 採「用到才下載」：初始安裝較小，編譯時缺少的 LaTeX 套件（如 `xeCJK`）會自動下載。
- MiKTeX 安裝檔較大，需要數分鐘；建議在穩定的寬頻網路下安裝。

```powershell
$failed = @()

# 1. Pandoc
if (Get-Command pandoc -ErrorAction SilentlyContinue) {
    Write-Host "[已安裝] pandoc，跳過。" -ForegroundColor Yellow
} else {
    Write-Host "[缺少] 正在安裝 Pandoc ..." -ForegroundColor Cyan
    winget install --id JohnMacFarlane.Pandoc -e --source winget --accept-package-agreements --accept-source-agreements
    if ($LASTEXITCODE -ne 0) { $failed += "JohnMacFarlane.Pandoc" }
}

# 2. LaTeX（MiKTeX）
$miktexInstalled = $false
if (Get-Command xelatex -ErrorAction SilentlyContinue) {
    Write-Host "[已安裝] LaTeX（xelatex），跳過。" -ForegroundColor Yellow
} else {
    Write-Host "[缺少] 正在安裝 MiKTeX ..." -ForegroundColor Cyan
    winget install --id MiKTeX.MiKTeX -e --source winget --accept-package-agreements --accept-source-agreements
    if ($LASTEXITCODE -ne 0) { $failed += "MiKTeX.MiKTeX" } else { $miktexInstalled = $true }
}

# 3. 重載 PATH（保留目前視窗原有的路徑）
$env:Path = [Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [Environment]::GetEnvironmentVariable("Path", "User") + ";" + $env:Path

# 4. MiKTeX：開啟缺少套件自動安裝（不跳出詢問視窗）
$initexmf = (Get-Command initexmf -ErrorAction SilentlyContinue).Source
if (-not $initexmf) {
    $fallback = "$env:LOCALAPPDATA\Programs\MiKTeX\miktex\bin\x64\initexmf.exe"
    if (Test-Path $fallback) { $initexmf = $fallback }
}
if ($initexmf) {
    & $initexmf --set-config-value="[MPM]AutoInstall=yes"
    if ($LASTEXITCODE -ne 0) { $failed += "MiKTeX 自動安裝設定" }
} elseif ($miktexInstalled) {
    $failed += "MiKTeX 自動安裝設定"
    Write-Warning "找不到 initexmf，請重新開啟 PowerShell 後執行：initexmf --set-config-value=`"[MPM]AutoInstall=yes`""
}

if ($failed) {
    Write-Host "`n以下項目安裝失敗：$($failed -join ', ')。請查看上方錯誤訊息，處理後重新執行本段。" -ForegroundColor Red
} else {
    Write-Host "`n論文工具安裝檢查完成！" -ForegroundColor Green
}
```

### 論文工具驗證

先確認版本：

```powershell
pandoc --version
xelatex --version
```

再實際編譯一份中文 PDF（**第一次會下載 xeCJK 等套件並建立字型快取，可能需要數分鐘，畫面停住屬正常現象，請勿按 Ctrl+C 中斷**）：

```powershell
Set-Location $env:TEMP
[IO.File]::WriteAllText("$env:TEMP\chinese-test.md", "中文論文測試：繁體中文可以正常顯示。", [Text.UTF8Encoding]::new($false))
pandoc chinese-test.md -o chinese-test.pdf --pdf-engine=xelatex -V CJKmainfont="Microsoft JhengHei"
if ($LASTEXITCODE -eq 0 -and (Test-Path chinese-test.pdf)) {
    Write-Host "中文 PDF 編譯成功！" -ForegroundColor Green
    Start-Process chinese-test.pdf
} else {
    Write-Host "中文 PDF 編譯失敗，請查看上方錯誤訊息。" -ForegroundColor Red
}
```

### 論文工具使用範例

```powershell
# Markdown 轉 Word（只需要 pandoc）
pandoc thesis.md -o thesis.docx

# Markdown 轉 PDF（中文需用 xelatex 並指定中文字型）
pandoc thesis.md -o thesis.pdf --pdf-engine=xelatex -V CJKmainfont="Microsoft JhengHei"

# 直接編譯 LaTeX 論文（.tex 檔內需已載入 xeCJK 並設定中文字型）
xelatex thesis.tex
```

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
