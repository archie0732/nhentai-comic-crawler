# nhentai-comic-crawler

>[!Note]  
>
> ## The old package has been deprecated
>
> ```bash
> # do not use this!!
>npm i nhentia_downloader 
>```
>
> because of name error
>please change npm command:
>
> ```bash
> npm i new_nhentai_downloader
>```

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
|2024-07-07|v2.0.7 ~ v2.0.8|fix the document name error|
|2024-07-07|v2.1.0 ~ v2.1.2|Avoiding the use of classes to make the code more readable and simplified|

***

## In Progress

*Login and Favorites

### Preparation

1. Ensure `node.js` is installed on your computer
2. Install the necessary package from npm

```bash
npm i new_nhentai_downloader
```

### Quick Start (Copy the code below according to your needs after installing the package)

* Download a single comic

```js
const nweb = require("new_nhentai_downloader");
nweb.comic_download("#504189"); // Insert the comic ID, with or without the #

```
  
* Download multiple comics

```js
const nweb = require('new_nhentai_downloader');
const albums = ['#504189',"#300800"]// Both " and ' can be used
nweb.comic_download(albums)
```

or,u can do this

```js
const nweb = require('new_nhentai_downloader');
nweb.comic_download(['#504189','#300800']);
```

### Customizing the Package

Currently available options:

* 1. custom download path  

```js
nweb.comic_downloade('#504189',{download_path:'./a/b/'});
```

* 2. Change user agent

```js
nweb.comic_download('#504189',{headers:'<u headers>'});
```

of cause, you also can do this:

```js
nweb.comic_download('504189',{download_path:'<path>',headers:'<headers>'});
```

### get comic information

maybe you just want to know about comic basic information:

```js
nweb.about_comic('#11111');
```

* More features will be added to `option`, to view `options`

```js
nweb.option_show("<u want to know the option's method name>");
```

about the `comic_download` method option:

```json
{
  "headers":{
    "User-Agent":"",
  },
  "download_path":"./",
  "print_download_result":false,
}

```
### Miscellaneous

Other convenient features are under development, and the project is currently in maintenance.

If you have any questions or suggestions, please provide them in the issues section.

This project is for research and academic purposes only and is not intended for commercial use.

#### Author: archie0732
