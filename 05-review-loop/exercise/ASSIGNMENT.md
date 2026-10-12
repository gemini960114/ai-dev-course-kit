# 練習題：CSV 成績統計小程式

用 AI 寫一個 Python 小程式，再用「AI 交叉審查流程」把它改到可以發布。  
**這份作業的重點不是程式本身，而是你的審查判斷紀錄。**

流程請依照 [REVIEW-LOOP.md](../REVIEW-LOOP.md)，示範案例見 [example](../example/README.md)。

---

## 一、程式需求

完整需求在起始資料夾的 [REQUIREMENTS.md](grade-stats/REQUIREMENTS.md)。摘要：讀取 `grades.csv`，輸出各科統計（母體標準差）、不及格名單、缺考名單、資料問題、重複學號；用 uv 管理，標準函式庫就能完成（使用第三方套件須說明理由）。

---

## 二、作業步驟

老師已經準備好起始資料夾 [grade-stats](grade-stats/)，裡面有：

```text
grade-stats/
├── README.md        ← 從這裡開始：三個步驟
├── REQUIREMENTS.md  ← 程式需求（AI 寫程式與審查者檢查時都以這份為準）
├── REVIEW-LOOP.md   ← 審查流程與提示語範本
├── grades.csv       ← 測試資料
├── AGENTS.md        ← AI 規則（要用 uv、不准 pip install 等）
├── .gitignore       ← 排除 __pycache__ 等暫存檔，避免被 commit
└── review-log/      ← 放每一輪的審查紀錄
```

把**整個 `grade-stats` 資料夾複製到教材資料夾以外的地方**（例如「文件」底下），用 Antigravity IDE 開啟它，再執行 `git init` 與 `uv init --bare`。

> 複製前先確認「文件」裡沒有同名的 `grade-stats` 資料夾；若已存在，請先改名備份，避免新舊檔案混在一起。

> 為什麼不能直接在教材資料夾裡做？AI 工具會讀取整個開啟的資料夾，在自己的專案資料夾裡練習，AI 才只會看到你的專案。

Windows（PowerShell，在教材資料夾中執行）：

```powershell
Copy-Item -Recurse 05-review-loop\exercise\grade-stats $HOME\Documents\grade-stats
cd $HOME\Documents\grade-stats
git init
uv init --bare
antigravity-ide .
```

macOS（終端機，在教材資料夾中執行）：

```zsh
cp -R 05-review-loop/exercise/grade-stats ~/Documents/grade-stats
cd ~/Documents/grade-stats
git init
uv init --bare
antigravity-ide .
```

**之後的作業都在這個資料夾裡進行**，AI 工具也在這裡開啟。

> 不想用指令的話：用檔案總管（Finder）把 `grade-stats` 資料夾複製到「文件」，在 Antigravity IDE 選「檔案 → 開啟資料夾」（File → Open Folder）開啟它，再在 Antigravity IDE 的終端機執行 `git init` 與 `uv init --bare`。

1. **第 0 輪：產出。** 確認已執行 `uv init --bare`，再對 AI 說「請依照 REQUIREMENTS.md 寫出程式，並用 grades.csv 執行一次」，確認可以執行後執行 `git add -A` 與 `git commit -m "第 0 輪：初版"`。
2. **第 1 輪以後：交叉審查。** 依 REVIEW-LOOP.md 的四個步驟進行，每一輪：
   - `review-log/round-N-prompt.md`：給審查者的 prompt
   - `review-log/round-N-review.md`：審查者回覆的原文
   - `review-log/round-N-decision.md`：你的逐項判斷與理由
3. **停止條件：** 完全依照 REVIEW-LOOP.md：一位與寫程式不同的 AI 審查者對**最後的版本**判定「可以發布」，且最後的版本已用 `grades.csv` 實際執行確認輸出正確。**本作業至少要做 2 輪**：即使第 1 輪就判定可以發布，也請再做 1 輪確認。停止後再執行 `git add -A` 與 `git commit -m "審查完成：共 N 輪"`。

> git 只需要 commit 兩次：初版與審查完成。每一輪的過程記錄在 `review-log/`。

**產出用與審查用請使用不同的 AI 工具。**

---

## 三、繳交內容

```text
grade-stats/
├── grades.py（或你的程式結構）
├── pyproject.toml
├── grades.csv、AGENTS.md、REQUIREMENTS.md、REVIEW-LOOP.md
├── review-log/
│   ├── round-1-prompt.md
│   ├── round-1-review.md
│   ├── round-1-decision.md
│   └── …（至少 2 輪）
└── .git/
```

另外繳交一段 **100～200 字的心得**：你否決了哪一個建議？你是怎麼確認審查者說錯的？

---

## 四、評分重點

| 項目 | 比重 |
| --- | --- |
| 判斷紀錄：每一項（包括接受的建議）都有判斷與**可以驗證**的理由，能連回需求、實際執行或官方文件 | 40% |
| 個人判斷抽核：老師隨機指定一項接受與一項否決，你能說明並重現查證方法 | 10% |
| 審查 prompt：有背景、已決定事項、只讀不執行、回報格式 | 20% |
| 程式用 `grades.csv` 執行的結果正確 | 20% |
| git 紀錄：初版與審查完成各一次 commit | 10% |

**加分：** 找到審查者說錯的地方，並用實際執行結果或官方文件證明。
