# macOS 開發環境極簡安裝指南

本指南採用 macOS 套件管理器 **Homebrew** 與 Python 極速套件管理器 **uv**。  
請開啟「**終端機**」（Terminal，預設 shell 為 zsh），以一般使用者身分執行；遇到要求輸入密碼時，輸入本機登入密碼即可（輸入時畫面不會顯示字元）。

> - 建議使用 Apple Silicon（M 系列晶片）Mac 與近期版本的 macOS。Intel Mac 在 Homebrew 的支援層級較低，部分套件可能沒有預先編譯版本，需要較長的編譯時間或安裝失敗。
> - 偵測到已存在的工具會保留現有版本、不會自動升級；請以各模組的「驗證」結果為準。

> 開始之前：若要把安裝工作交給 AI，請先完成[第 0 步：安裝 Antigravity IDE](00-antigravity.md)。

---

## 事前準備：Homebrew

已安裝者會自動跳過。若電腦缺少 Xcode Command Line Tools（提供編譯器與 git），Homebrew 安裝程式會自動引導安裝並等待完成，可能需要數分鐘。

```zsh
# 1. 安裝 Homebrew（已安裝則跳過）
if command -v brew >/dev/null 2>&1; then
    echo "[已安裝] Homebrew，跳過。"
else
    echo "[缺少] 正在安裝 Homebrew ..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# 2. Apple Silicon（M 系列晶片）需將 brew 加入 PATH；Intel Mac 可略過
if [ -x /opt/homebrew/bin/brew ]; then
    grep -q 'brew shellenv' ~/.zprofile 2>/dev/null || echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

brew --version
```

---

## 模組一：核心開發工具

包含：`Git`、`uv`、`Node.js`、`GitHub CLI (gh)`。

- macOS 的 Git 由 Xcode Command Line Tools 提供，偵測到即沿用，不另外透過 Homebrew 安裝。
- Homebrew 的 `node` 是最新版，不一定是 LTS；一般教學與開發使用沒有差別。

複製以下指令貼入終端機執行（已存在則自動跳過）：

```zsh
command -v brew >/dev/null 2>&1 || echo "錯誤：找不到 brew，請先完成上方「事前準備」再執行本段。"

# 格式為「指令名稱:Homebrew 套件名稱」
coreTools=(git:git uv:uv node:node gh:gh)
failed=()

for t in "${coreTools[@]}"; do
    cmd=${t%%:*}; pkg=${t#*:}
    if command -v $cmd >/dev/null 2>&1; then
        echo "[已安裝] $cmd，跳過。"
    else
        echo "[缺少] 正在安裝 $pkg ..."
        brew install $pkg || failed+=("$pkg")
    fi
done

hash -r
echo
if [ ${#failed[@]} -gt 0 ]; then
    echo "以下項目安裝失敗：${failed[*]}。請查看上方錯誤訊息，處理後重新執行本段。"
else
    echo "核心工具安裝檢查完成！"
fi
```

### 核心工具驗證

```zsh
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
- **Homebrew**：安裝系統原生二進位工具（`ffmpeg`, `ripgrep`, `jq`, `ImageMagick`）。
- **uv tool**：安裝 Python 生態獨立工具（`edge-tts`, `yt-dlp`）。

請先完成模組一（需要 `uv`），再複製以下指令執行（已存在則自動跳過）：

```zsh
failed=()

# 1. Homebrew 安裝原生系統工具
systemTools=(ffmpeg:ffmpeg rg:ripgrep jq:jq magick:imagemagick)

for t in "${systemTools[@]}"; do
    cmd=${t%%:*}; pkg=${t#*:}
    if command -v $cmd >/dev/null 2>&1; then
        echo "[已安裝] $cmd，跳過。"
    else
        echo "[缺少] 正在安裝 $pkg ..."
        brew install $pkg || failed+=("$pkg")
    fi
done

# 2. uv tool 安裝 Python 獨立命令列工具
pyTools=(edge-tts yt-dlp)

for pkg in "${pyTools[@]}"; do
    if command -v $pkg >/dev/null 2>&1; then
        echo "[已安裝] $pkg，跳過。"
    else
        echo "[缺少] 正在透過 uv 安裝 $pkg ..."
        uv tool install $pkg || failed+=("$pkg")
    fi
done

# 3. 將 uv tool 的執行檔目錄寫入 shell 設定檔（之後新開的終端機生效）
#    若顯示「already up-to-date」或「Restart your shell」屬正常，可忽略
uv tool update-shell || true

# 4. 讓目前這個終端機視窗也立即生效
export PATH="$(uv tool dir --bin):$PATH"
hash -r

echo
if [ ${#failed[@]} -gt 0 ]; then
    echo "以下項目安裝失敗：${failed[*]}。請查看上方錯誤訊息，處理後重新執行本段。"
else
    echo "擴充工具安裝檢查完成！"
fi
```

### 擴充工具驗證

```zsh
ffmpeg -version
rg --version
jq --version
magick -version
edge-tts --version
yt-dlp --version
```

### 擴充工具使用範例

```zsh
# 文字轉語音（台灣中文女聲）
edge-tts --voice zh-TW-HsiaoChenNeural --text "你好，這是測試" --write-media hello.mp3

# 專案全文搜尋：預設略過隱藏檔（如 .git）；在 Git 儲存庫內會遵守 .gitignore，
# 因此通常也會跳過 node_modules 與 .venv
rg "API_KEY"          # 全專案搜尋
rg -i "database_url"  # 不分大小寫
rg "def main" -t py   # 只搜 Python 檔
rg -l "TODO"          # 只列出檔名
rg "API_KEY" -g '!node_modules/**'  # 不在 Git 儲存庫時，手動排除 node_modules
```

---

## 模組三：文件轉換工具（Pandoc）

包含：`Pandoc`（Markdown、Word、HTML 等格式互轉）。安裝檔小，幾秒鐘就完成。

> 本課程的練習都**不需要全域安裝 LaTeX**。唯一需要 PDF 的是階段六的 APA 排版作業：照該作業的提示語，AI 會把 Tectonic 下載到那個專案的 `tools/` 資料夾（下載前會先詢問你）；無法下載時，可改用 Overleaf 線上編譯。

```zsh
failed=()

if command -v pandoc >/dev/null 2>&1; then
    echo "[已安裝] pandoc，跳過。"
else
    echo "[缺少] 正在安裝 Pandoc ..."
    brew install pandoc || failed+=("pandoc")
fi

hash -r
echo
if [ ${#failed[@]} -gt 0 ]; then
    echo "以下項目安裝失敗：${failed[*]}。請查看上方錯誤訊息，處理後重新執行本段。"
else
    echo "文件轉換工具安裝檢查完成！"
fi
```

### 文件轉換工具驗證

```zsh
pandoc --version
```

再實際把一份含中文表格的 Markdown 轉成 Word：

```zsh
cd "${TMPDIR:-/tmp}"
printf '%s\n' '# 轉檔測試' '' '| 欄位 | 內容 |' '| --- | --- |' '| 中文 | 正常顯示 |' > pandoc-test.md
if pandoc pandoc-test.md -o pandoc-test.docx; then
    echo "Word 轉檔成功！"
    open pandoc-test.docx
else
    echo "Word 轉檔失敗，請查看上方錯誤訊息。"
fi
```

### 文件轉換工具使用範例

```zsh
pandoc report.md -o report.docx     # Markdown 轉 Word
pandoc report.docx -o report.md     # Word 轉 Markdown（方便交給 AI 整理）
pandoc report.md -o report.html     # Markdown 轉網頁
```

### 選讀：需要完整 LaTeX 時

自己要用 LaTeX 寫論文（例如學校的論文範本）時，才需要另外安裝完整的 LaTeX 發行版，例如 MacTeX：`brew install --cask mactex-no-gui`（數 GB，建議在家中寬頻網路安裝）。本課程不需要。

---

## 常見問題排除

1. **指令找不到（command not found）**：
   - 請**關閉並重新開啟終端機**讓 PATH 設定生效。
   - 確認路徑：`command -v git`、`command -v uv`、`command -v rg`。

2. **安裝 Homebrew 後 `brew` 找不到（Apple Silicon）**：
   - 重新執行「事前準備」第 2 步，或手動執行：`eval "$(/opt/homebrew/bin/brew shellenv)"`。

3. **出現 `xcrun: error: invalid active developer path`**：
   - 系統更新後 Command Line Tools 失效，重新執行：`xcode-select --install`，在跳出的視窗按「安裝」。

4. **Homebrew 安裝 uv 失敗時的備用方式**：
   - 先執行 `brew update` 後重試。
   - 仍失敗時，**經使用者確認後**才可改用 Astral 官方安裝指令：
     ```zsh
     curl -LsSf https://astral.sh/uv/install.sh | sh
     ```
