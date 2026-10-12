# 階段三：連線 GitHub（hello-github）

約 30 分鐘。完成後，你的電腦就能把程式推上 GitHub。下一個階段由老師依課程安排。

**先記住一句話：登入和 GitHub 網站上的事用 `gh`，檔案版本（commit、push）用 `git`。**

> 課前準備：已完成安裝教材的模組一，並已註冊 GitHub 帳號。

---

## Step 1：登入 GitHub（只做一次）

把下面這段貼給 Antigravity IDE 的 AI：

```text
請確認 gh 已安裝（沒有才依 AGENTS.md 安裝），然後用瀏覽器裝置驗證方式登入 GitHub，不要用 personal access token：
1. 在背景執行 gh auth login --hostname github.com --git-protocol https --web
2. 把一次性代碼和驗證網址貼給我，我會自己到瀏覽器輸入
3. 我說完成後，用 gh auth status 確認登入成功
4. 執行 gh auth setup-git，讓 git push 使用 gh 的登入
5. 如果 git 還沒設定使用者名稱和信箱，用我的 GitHub 帳號名稱和 noreply 信箱設定
```

依 AI 給的網址和代碼，在瀏覽器完成登入，再回來告訴 AI「完成」。

## Step 2：寫一個小程式

在 PowerShell（macOS 用終端機）執行：

```powershell
mkdir ~/Documents/hello-github
cd ~/Documents/hello-github
uv init --bare
antigravity-ide .
```

> 若找不到 `antigravity-ide` 指令，改在 Antigravity IDE 選「檔案 → 開啟資料夾」（File → Open Folder），開啟 `hello-github`。

在 Antigravity IDE 對 AI 說：

```text
寫一個 hello.py，印出「Hello GitHub」和今天的日期。
```

在 Antigravity IDE 的終端機（選單「終端機 → 新增終端機」（Terminal → New Terminal））執行：

```powershell
uv run hello.py
```

## Step 3：推上 GitHub

```powershell
git init
git add -A
git commit -m "第一個版本"
gh repo create hello-github --private --source . --push
gh repo view --web
```

瀏覽器會打開你的 repo，看得到 `hello.py` 就成功了。

## Step 4：修改後再推送一次

隨意修改 `hello.py` 印出的文字，執行確認後：

```powershell
git add -A
git commit -m "修改訊息"
git push
```

重新整理網頁，看得到新的內容和 **2 個 commit**，就完成了。

---

> **公用電腦**：練習結束請執行 `gh auth logout`，避免下一位使用者用到你的帳號。
