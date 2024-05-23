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
