# nhentia-comic-crawler

一個可以透過簡單的`node.js`來達成下載漫畫的程式

## 提供功能
* download comic on nhentia by use comic ID
* 可下載`nhentia`上的漫畫藉由`神奇小數字`


### 更新日誌(目前: 維護中)

|日期|內容|更新、維護內容|
|----|-------|----|
|2024-06-16|上傳初版|X|
|2026-06-17|版本更新|將code改為更能擴展的方式，支援npm 下載|

***



## 正在處理

* 登入與收藏

### 事情準備(用github action 可以跳到3.)

1. 確保電腦已有`node.js`
2. 去`npm`安裝套件

### 快速使用(確保以下載該套件後，複製程式碼)

* 下載單本

```js
const nweb = new nweb_download();
nweb.album_download('#504189');// 放入番號數字，有沒有#都可以
```
  
* 下載多本

```js
const nweb = new nweb_download();
const albums = ['#504189',"#300800"]
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
const nweb = new nweb_download(option);
```

* 更改headers  

```js
option={
  "headers":{
    "User-Agent":"<你要設定的user-agent>",
    "Cookie":"<你要設定的cookie>"
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

使用後有任何的問題或任何的意見歡迎在discuss提供

本項目僅供研究、學術用途，不得進行商業營利

**作者:archie0732**
