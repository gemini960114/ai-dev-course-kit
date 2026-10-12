# 第 3 輪審查 prompt

由產出者（Claude Code）產生，教師貼給專家 D、專家 E。

> 教學觀察：和第 1 輪相比，這一版多了兩件事：
> 1. **「只讀檔案，不要執行任何指令」**：避免審查者再修改使用者的設定。
> 2. **已決定事項列出之前否決過的建議**：結果兩位審查者都沒有再重複提出。
>
> 也加了「沒有重大問題就直接說可以發布」，讓審查有明確的結束點。

```text
你是 Windows/macOS 開發環境（WinGet、Homebrew、uv）與 AI agent 規則檔的專家。請審查 @README.md、@AGENTS.md、@windows/install-quick.md、@macos/install-quick.md 這四個檔案。這是給學生在自己筆電上安裝的課堂教材：模組一核心開發、模組二多媒體與進階 CLI、模組三論文寫作（Pandoc + LaTeX）；文件已經過兩輪專家審查並修正。

【請只讀檔案，不要執行任何指令或修改任何設定。】

以下是已經決定的事，請不要再提：
- 保留 Set-ExecutionPolicy RemoteSigned（只限 CurrentUser）
- Windows 用 Node.js LTS，macOS 用 Homebrew 的 node（版本差異已在文件註明）
- macOS 沿用 Xcode Command Line Tools 附的 Git
- 不處理 Intel Mac 的 brew PATH（/usr/local/bin 本來就在預設 PATH 裡）
- 用 hash -r（zsh 和 bash 都支援）
- 不安裝本地語音辨識
- macOS 中文字型用 Songti TC

請只找出「會讓學生安裝失敗、結果錯誤，或讓 AI 執行出錯」的問題，依 🔴 一定要修 / 🟡 建議修 排序。每一項寫明檔案與行號、問題、原因、可以直接替換的修改內容。不確定的地方請標「不確定」，不要猜測。如果沒有發現重大問題，請直接說「可以發布」。
```
