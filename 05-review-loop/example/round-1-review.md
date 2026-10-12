# 第 1 輪審查：專家 A（節錄）

> 原文較長，以下保留每一項的主張與關鍵說法。原文中的修改程式碼省略。

**審查過程中的動作（從審查者的執行紀錄可見）：** 讀取 4 個檔案，並執行了 `Get-Command`、`uv tool update-shell --help`，以及**會修改設定的 `uv tool update-shell`**。

## 🔴 一定要修

1. **macOS：`uv tool` 安裝後未在當前視窗匯入 PATH。** `uv tool update-shell` 只寫入設定檔，目前的終端機執行 `edge-tts --version` 會出現 `command not found`。建議補上 `export PATH="$HOME/.local/bin:$PATH"`。
2. **macOS：`xcode-select --install` 是非同步的 GUI 指令。** 整段貼上時 Homebrew 會在使用者點選同意前就開始安裝；已安裝 CLT 時會回傳錯誤碼。Homebrew 安裝程式本身就會處理 CLT，不需要手動呼叫。

## 🟡 建議修

3. **macOS：PingFang TC 在 XeLaTeX 極易失敗。** 原文說法：「是字型集合檔（TTC），XeLaTeX 的 xeCJK / fontspec 在解析 PingFang TC 時，因為無法正確對應集合內的 Regular 字重名，極常拋出 font-not-found」。建議改用 `Songti TC`。
4. **macOS：BasicTeX 缺少中文套件。** 建議附上 `sudo tlmgr install ctex xecjk fontspec ucharclasses ms environ`。
5. **README：Prompt 2 的 `rg`、`magick` 是指令名稱，不是 Homebrew 套件名稱。** AI 可能執行 `brew install rg magick` 而失敗。
6. **macOS：事前準備只處理 Apple Silicon，未兼顧 Intel Mac 的 `/usr/local/bin/brew`。**
7. **Windows：MiKTeX 安裝後 `initexmf` 可能找不到。** 原文說法：「有時 PowerShell 的命令快取無法第一時間由 `Get-Command initexmf` 抓到」，會靜默跳過 AutoInstall 設定。

## 🟢 可有可無

8. **`hash -r` 是 Bash 的指令，zsh 原生習慣寫 `rehash`。**
9. **首次編譯會建立字型快取，畫面靜止 1～2 分鐘**，建議提醒學生不要按 Ctrl+C。

## 整體評價（原文節錄）

> 「只要補齊上述 🔴 與 🟡 幾處細節修正，這份教材就能在學生的各型筆電上達成 **100% 開箱即用**。」

---

## 附：專家 A 的補充（課堂實務提醒）

審查後專家 A 另外提醒：全班同時在教室下載 MacTeX 可能塞爆網路，建議模組三回家安裝。這是上課安排的建議，不是文件錯誤，教師決定不修改文件、只在 README 的 Prompt 3 加一句提醒（第 2 輪）。
