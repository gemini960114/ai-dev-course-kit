# 第 1 輪判斷

審查者：專家 A  
判斷者：產出者（Claude Code）提出，教師確認後只套用同意的項目

| # | 建議 | 判斷 | 理由（怎麼驗證的） |
| --- | --- | --- | --- |
| 1 | macOS uv tool 後 PATH 未生效 | ✅ 接受 | 正確：`update-shell` 只影響之後新開的終端機。Windows 版不受影響，因為腳本最後會重新讀取 PATH |
| 2 | 拿掉 `xcode-select --install` | ✅ 接受 | Homebrew 安裝程式會自行安裝並等待 CLT；已安裝時 `xcode-select --install` 會回傳錯誤碼，AI 可能誤判失敗 |
| 3 | PingFang 改成 Songti TC | ⚠️ 部分接受 | **結論接受、理由否決**。Songti TC 與微軟正黑體也是 TTC 檔卻能正常使用，所以不能斷定 TTC 是失敗原因。改用 Songti TC 是實測可行的選擇；PingFang 失敗的真正原因，本紀錄無法確定（原本寫「真正原因是字型位置」，之後的審查指出沒有根據，已更正） |
| 4 | BasicTeX 補裝中文套件 | ⚠️ 部分接受 | 問題正確，但列出的套件有些用不到且無法驗證。所有學生都安裝完整版，因此改為**直接刪除 BasicTeX 選項**，少一個分支 |
| 5 | Prompt 2 寫明 Homebrew 套件名稱 | ✅ 接受 | 改成「ripgrep (rg)、ImageMagick (magick)」，同時寫出套件名稱與指令名稱 |
| 6 | 補上 Intel Mac 的 brew 路徑 | ❌ 否決 | `/usr/local/bin` 本來就在 macOS 預設的 PATH 中，安裝後立即可用 |
| 7 | MiKTeX `initexmf` 可能找不到 | ⚠️ 部分接受 | 「命令快取」不是真正的原因：重新讀取 PATH 後 `Get-Command` 會重新搜尋。但「找不到時靜默跳過」確實不好，補上預設路徑備援與警告訊息 |
| 8 | `hash -r` 改成 `rehash` | ❌ 否決 | 刻意使用 `hash -r`：zsh 與 bash 都支援；`rehash` 在 bash 中不存在 |
| 9 | 提醒首次編譯較久 | ✅ 接受 | 兩份指南都加上提醒 |

統計：接受 4 項、部分接受 3 項、否決 2 項

## 其他發現

審查者在使用者電腦上執行了會修改設定的 `uv tool update-shell`。產出者檢查後確認 `~\.local\bin` 原本就在 PATH 中，沒有實際影響。**之後的審查 prompt 都加上「只讀檔案，不要執行任何指令或修改任何設定」。**
