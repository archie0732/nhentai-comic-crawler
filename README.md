# nhentai-comic-crawler

A program for downloading comics using simple `node.js`

[the Chinese document / 中文版文檔](./chinese_readme.md)

## Features

* download comic on nhentai by use comic ID

### Update Log (Current Status: Maintenance)

|Date|Version|Updates and Maintenance|
|----|-------|----|
|2024-05-23|v1.0.0|Initial release|
|2024-05-30|v1.0.1 ~ v1.0.2|Regular maintenance|
|2024-06-17|v2.0.1 ~ v2.0.2|Refactored code for better scalability, added npm support|
|2024-06-20|v2.0.3 ~ v2.0.4|Updated documentation, fixed issue where comics were downloaded into node_modules|
|2024-06-24|v2.0.5 ~ v2.0.6|Upadte English version document,and fix some promble|
|2024-07-07|v2.0.7|fix the document name error|

***

## In Progress

*Login and Favorites

### Preparation

1. Ensure `node.js` is installed on your computer
2. Install the necessary package from npm

```bash
npm i nhentai_downloader
```

### Quick Start (Copy the code below according to your needs after installing the package)

* Download a single comic

```js
const nweb_Downloader = require("nhentai_downloader");
const nweb = new nweb_Downloader();
nweb.album_Downloader("#504189"); // Insert the comic ID, with or without the #

```
  
* Download multiple comics

```js
const nweb_Downloader = require('nweb_Downloader');
const nweb = new nweb_Downloader();
const albums = ['#504189',"#300800"]// Both " and ' can be used
nweb.all_album_downloader(albums)
```

### Customizing the Package

Currently available options:

* 1. Change download path

```js
option={
  path:'D:/a/b'  // Set your desired path
}
const nweb = new nweb_download(option);
```

* 2. Change user agent

```js
option={
  "headers":{
    "User-Agent":"<your user-agent>",
    "Cookie":"<your cookie>"
  }
}
const nweb = new nweb_download(option);
```

* More features will be added to `option`, to view `options`

```js
const nweb = new nweb_downloader();
console.log(nweb.option_show);
```

### Miscellaneous

Other convenient features are under development, and the project is currently in maintenance.

If you have any questions or suggestions, please provide them in the issues section.

This project is for research and academic purposes only and is not intended for commercial use.

#### Author: archie0732
