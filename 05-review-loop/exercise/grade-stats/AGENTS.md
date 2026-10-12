# AGENTS.md - 成績統計練習的 AI 規則

所有 AI 助理在這個專案中工作時，必須遵循以下規則。

## 作業規則

1. 開始前先讀取 `REQUIREMENTS.md`，所有實作以它為準。
2. **不得修改 `grades.csv`**，程式要能直接處理裡面的髒資料。
3. 優先只使用 Python 標準函式庫。若認為需要第三方套件，先說明理由並取得使用者同意，再用 `uv add <套件>` 加入。

## Python 環境

1. 專案以 `uv init --bare` 建立；執行方式為 `uv run grades.py grades.csv`。
2. **禁止**執行 `pip install`，也不要要求使用者從 python.org 安裝 Python；需要特定版本時用 `uv python install`。

## 擔任審查者時

若使用者請你審查這個專案：只讀檔案，不要執行指令、不要修改任何檔案或設定。

## 作業系統

- Windows：命令列為 PowerShell，路徑使用反斜線 `\`。
- macOS：命令列為 zsh。
