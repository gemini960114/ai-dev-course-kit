# 成績統計練習：從這裡開始

| 檔案 | 用途 |
| --- | --- |
| `REQUIREMENTS.md` | 程式要做什麼 |
| `REVIEW-LOOP.md` | 審查流程與可以直接複製的提示語 |
| `AGENTS.md` | 給 AI 的規則（AI 工具會自動讀取） |
| `grades.csv` | 測試資料（不要修改） |
| `review-log/` | 每一輪的審查紀錄放這裡 |
| `.gitignore` | 讓 git 忽略 `__pycache__` 等暫存檔（不用修改） |

---

## Step 1：初始化（只做一次）

在 Antigravity IDE 選單「終端機 → 新增終端機」（Terminal → New Terminal）開啟終端機，執行：

```powershell
git init
uv init --bare
```

完成後會多出 `pyproject.toml`。

> 一定要加 `--bare`：新版 uv 直接執行 `uv init` 會產生 `src/` 資料夾，不適合這個練習。

## Step 2：第 0 輪，請 AI 寫程式

1. 在這個 Antigravity IDE 視窗開啟 AI 面板，輸入：
   ```text
   請依照 REQUIREMENTS.md 寫出程式，並用 grades.csv 執行一次。
   ```
2. 看執行結果，自己對照 `REQUIREMENTS.md` 和 `grades.csv`，想想它算對了嗎？
3. 確認可以執行後，做第一次 commit：
   ```powershell
   git add -A
   git commit -m "第 0 輪：初版"
   ```

## Step 3：第 1 輪以後，交叉審查

照 `REVIEW-LOOP.md` 的步驟 ②～④，每一輪在 `review-log/` 存三個檔案：

1. **② 產生審查 prompt**：把 REVIEW-LOOP.md 步驟 ② 的提示語貼給**寫程式的 AI**，它會存成 `round-N-prompt.md`。**檢查裡面的「已決定的事」**，刪掉你沒決定過的項目。
2. **③ 交給另一個 AI 審查**：把 prompt 貼給**不同的 AI**（例如 ChatGPT 或 Gemini）。網頁版讀不到你的檔案，要把 `grades.py`、`REQUIREMENTS.md`、`grades.csv` 的內容一起貼上。**回覆原文由你自己存成 `round-N-review.md`。**
3. **④ 逐項判斷**：把回覆貼回寫程式的 AI，用步驟 ④ 的提示語請它逐項判斷。**自己確認判斷**，再用第二段提示語請它套用、實際執行，並存成 `round-N-decision.md`。

每一輪**不用 commit**。重複 Step 3，直到符合 REVIEW-LOOP.md 的「停止條件」（本作業**至少 2 輪**），最後再 commit 一次：

```powershell
git add -A
git commit -m "審查完成：共 N 輪"
```
