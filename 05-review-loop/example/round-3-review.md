# 第 3 輪審查：專家 D、專家 E（節錄）

> 兩位專家都只讀檔案，沒有執行指令；也都沒有重複提出已決定的事項。

---

## 專家 D

**結論：可以發布。** 沒有 🔴 項目。

### 🟡 建議修（邊界防禦）

1. **Windows MiKTeX 備援路徑補上全系統安裝路徑。** 目前只找使用者目錄 `%LOCALAPPDATA%\Programs\MiKTeX`。原文說法：「萬一少數學生以系統管理員身分點選了 Install for all users，**且環境變數索引發生延遲時**」會印出警告。建議再檢查 `C:\Program Files\MiKTeX\miktex\bin\x64\initexmf.exe`。

### 整體總評（原文節錄）

> 「這套教材結構嚴謹、品質極佳，隨時可以正式發布給學生使用！」

---

## 專家 E

**結論：可以發布。** 沒有 🔴 項目；兩項 🟡 可避免特定環境誤報完成。

### 🟡 建議修

1. **macOS 只偵測 `xelatex` 不足以保證中文編譯成功。** 裝過 BasicTeX 的電腦有 `xelatex` 但缺少 `xeCJK`，會跳過 MacTeX 並回報完成。建議用 `kpsewhich xeCJK.sty` 判斷，缺少時自動執行 `sudo tlmgr install xecjk`；README 的 Prompt 3 也改成檢查 xeCJK。
2. **Windows：MiKTeX 自動安裝設定失敗仍會回報完成。** `initexmf --set-config-value` 的結束碼沒有加入失敗清單。引用 MiKTeX 官方說明。
