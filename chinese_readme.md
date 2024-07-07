# nhentai-comic-crawler

>[!Note]  
>
> ## 舊套件以廢棄
>
> ```bash
>npm i nhentia_downloader
>```
>
>因為命名錯誤
>請更改npm 下載指令:
>
> ```bash
> npm i new_nhentai_downloader
>``

一個可以透過簡單的`node.js`來達成下載漫畫的程式

[back to English version / 英文版文檔](./README.md)

## 提供功能

* download comic on nhentai by use comic ID
* 可下載`nhentai`上的漫畫藉由`神奇小數字`

### 更新日誌(目前: 維護中)

|日期|內容|更新、維護內容|
|----|-------|----|
|2024-05-23|v1.0.0|X|
|2024-05-30|v1.0.1 ~ v1.0.2|定期維護|
|2024-06-17|v2.0.1 ~ v2.0.2|將code改為更能擴展的方式，支援npm 下載|
|2024-06-20|v2.0.3 ~ v2.0.4|更新文檔，修復漫畫下載會跑到node_module裡的問題|
|2024-06-24|v2.0.5 ~ v2.0.6|新增英文文檔，修復一些小問題|
|2024-07-07|v2.0.7 ~ v2.0.8|修正文檔拼寫錯誤|

***

## 正在處理

* 登入與收藏

### 事情準備(用github action 可以跳到3.)

1. 確保電腦已有`node.js`
2. 去`npm`安裝套件

```bash
npm i new_nhentai_downloader
```

### 快速使用(確保以下載該套件後，根據需求複製下面程式碼)

* 下載單本

```js
const nweb_Downloader = require("new_nhentai_downloader");
const nweb = new nweb_Downloader();
nweb.album_Downloader("#504189");// 放入番號數字，有沒有#都可以

```
  
* 下載多本

```js
const nweb_Downloader = require('new_nhentai_downloader');
const nweb = new nweb_Downloader();
const albums = ['#504189',"#300800"]// " 與 ' 都可以
nweb.all_album_downloader(albums)
```

### 自訂義套件

目前提供

> * 更改下載路徑
> * 更改`user agent`

**其他功能還在時裝中，請在稍等**  

* 更改(漫畫下載)路徑

```js
option={
  path:'D:/a/b' // 你要設定的路徑
}
const nweb = new nweb_download(option);//把option 加入class 預設設定中
// 後續動作，如上面示例
```

* 更改headers  

```js
option={
  "headers":{
    "User-Agent":"<你的user-agent>",
    "Cookie":"<你的cookie>"
  }
}
const nweb = new nweb_download(option);
```

* 理論上，更多的功能選擇都會放在`option`裡，查看option

```js
const nweb = new nweb_downloader();
console.log(nweb.option_show);
```

### 其他

目前還在實裝其他更方便的功能，項目目前也處於維護狀態

使用後有任何的問題或任何的意見歡迎在issues提供

本項目僅供研究、學術用途，不得進行商業營利

**作者:archie0732**
