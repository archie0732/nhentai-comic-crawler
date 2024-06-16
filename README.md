# nhentia-comic-crawler
download comic on nhentia by use comic ID

* 可下載`nhentia`上的漫畫藉由`神奇小數字`

### 1.事情準備(用github action 可以跳到3.)

1. 確保電腦已有`node.js`
2. 安裝套件

>axios
```bash
npm i axios
```
 > cli-progress
```
npm i cli-progress
```

### 2.使用方法

  1. 把神奇小數字輸入進`list1.json` 路徑 `./data_save/list1.json`
  2. 如果要下載多本`學習資料`，記得要用`,`隔開($`\textcolor{red}{要用"包起來}`$)不一定要`#`


  **ex:**
```json
{
"downloadList": [
    "#429341",
    "#195944",
    "#438475",
    "#313872",
    "#298053",
    "#260737"
  ]
}
```


確定路徑在`./nweb/`後在 輸入`node main.js`即可開始下載!

下載完後會把檔案放在`./data_save/comic/{今天的日期}/`
然後會再產生一個**紀錄檔** 路徑:`./data_save/report/{今天的日期}`，用以紀錄下載漫畫時的狀態


#### 4.關於狀態碼

1. `404 not found `: 找不到該本子(可能ID輸入錯誤或該本已被刪除)
2. `403 forbidden`: cookie 或user-agent 過期需要修 

> 修改方法:
> 到`./work/user_login.js`裡:  
> 修改`User-Agent` 跟 `Cookie`
```js
const Headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0",
  Cookie:
    "csrftoken=EJ0TNWV1Ig71xNDmPMooX8UWuGWEUjHVz6YyY3j42QqRSBQdYoIK1oqDc7JZWXDC; sessionid=4fthg86fvtfmsz6u1qz0bbmn2k597ef3",
};
```
> 進入`nhentia`官網==>F12 ==> network ==> 把`要求標頭`裡的兩個(Cookie、User-Agent) 複製==>修改

### 更新日誌(目前: 維護中)
|日期|更新內容|備註|
|----|-------|----|
|2024-06-16|定期維護|未發現問題|
