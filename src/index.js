const axios = require("axios");
const path = require("path");
const cheerio = require("cheerio");
const fs = require("fs");

class nweb_Loagin {
  constructor(
    UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0",
    Cookie = undefined
  ) {
    this.UserAgent = UserAgent;
    this.Cookie = this.Cookie;
    this.headers = { "User-Agent": this.UserAgent, Cookie: this.Cookie };
  }

  addDetail(headerName, headerValue) {
    this.headers[headerName] = headerValue;
  }

  get getheaders() {
    return this.headers;
  }
}

//

class nweb_Information {
  constructor(id = "504189", headers = new nweb_Loagin().header) {
    this.id = id.replace("#", "");
    this.headers = headers;
  }

  async fetch_BasicInformation() {
    const url = "https://nhentai.net/g/" + this.id + "/";

    try {
      const res = await axios.get(url, { headers: Headers });
      const $ = cheerio.load(res.data);
      // title
      const title =
        $("span.pretty:eq(1)").text() == ""
          ? this.id
          : $("span.pretty:eq(1)").text();
      //author
      const author = $("div.tag-container:eq(3) span.name").eq(0).text();

      const pictureURL = $("a.gallerythumb img").attr("data-src");

      if (pictureURL == undefined) {
        return {
          title: "unknow",
          author: "unknow",
          comicId: this.id,
          downloadDate: this.downloadedTime(),
          downloadId: "unknow",
          pageCount: "unknow",
          fileFormat: "unknow",
          status: "❌ URL is undefined!",
        };
      }

      const galleryID = pictureURL.split("/").slice(-2, -1)[0];
      const pagenum = $("div.thumb-container").length;
      const extension = pictureURL.substring(pictureURL.lastIndexOf("."));
      const data = {
        title: title,
        author: author,
        comicId: this.id,
        downloadDate: this.downloadedTime(),
        downloadId: galleryID,
        pageCount: pagenum,
        fileFormat: extension,
        status: "✅ all correct!",
      };

      return data;
    } catch (error) {
      return {
        title: this.id,
        author: "unknow",
        comicId: this.id,
        downloadDate: this.downloadedTime(),
        downloadId: "unknow",
        pageCount: "unknow",
        fileFormat: "unknow",
        status: "❌ comic status: " + error.response.status,
      };
    }
  }
  downloadedTime() {
    const today = new Date();
    const date = today.getDate();
    const mon = today.getMonth() + 1;
    const year = today.getFullYear();

    const hr = today.getHours();
    const min = today.getMinutes();
    const second = today.getSeconds();

    const nowTime =
      year + "-" + mon + "-" + date + "-" + hr + ":" + min + ":" + second;

    return nowTime;
  }
}

class nweb_Downloader {
  constructor(
    //init
    enterdata = {}
  ) {
    const defaultData = {
      path: __dirname + "/",
      headers: new nweb_Loagin().getheaders,
    };
    this.data = {
      ...defaultData,
      ...enterdata,
      headers: { ...defaultData.headers, ...enterdata.headers },
    };
  }
  // 下載一本
  async album_Downloader(id) {
    //get infor
    const infor = await new nweb_Information(id).fetch_BasicInformation();
    console.log(`🎈 now download: ${infor.title}`);
    if (infor.status == "✅ all correct!") {
      // update now path
      const invalidChars = /[\\/:*?"<>|]/g;
      const nowPath = this.data.path + infor.title.replace(invalidChars, "");
      // make dir
      if (!fs.existsSync(nowPath)) {
        fs.mkdirSync(nowPath, {
          recursive: true,
        });
      }
      // download page
      for (let i = 1; i <= infor.pageCount; i++) {
        const NowDownloadUrl = `https://i.nhentai.net/galleries/${infor.downloadId}/${i}${infor.fileFormat}`;
        const NowName = nowPath + "/" + i + infor.fileFormat;

        try {
          const temp = await this.download_One_Page(NowDownloadUrl, NowName);
          console.log(`🚩已完成: ${i}.jpg ，共 ${infor.pageCount} 頁`);
        } catch (error) {
          infor.status = "❌ error happen in downloading page!";
          if (!infor["error-on"]) {
            infor["error-on"] = [];
          }
          infor["error-on"].push(error);
        }
      }
      console.log(`🔽 下載完成: ${this.data.path}${infor.title}/`);
      //console.log(infor);
      return infor;
    } else {
      console.log(infor.status);
      return infor;
    }
  }
  //下載一頁
  async download_One_Page(now_url, now_path) {
    const fetch = (await import("node-fetch")).default;
    const res = await fetch(now_url, { headers: this.data.headers });
    if (res.status == 404) {
      console.log("404");
      throw `404 not found page: ${now_url}`;
    } else if (res.status == 403) {
      console.log("403");
      throw `403 forbidden on page: ${now_url}`;
    } else if (!res.ok) {
      console.log(res.status);
      throw `error code: ${res.status} on page: ${now_url}`;
    } else {
      const raw = Buffer.from(await res.arrayBuffer());
      const Dp = `${now_path}`;

      fs.writeFileSync(Dp, raw);
    }
  }
  async all_album_Downloader(download_queue) {
    if (!Array.isArray(download_queue)) {
      throw new Error("Parameter download_queue must be an array.");
    }
    let sucess = 0;
    for (const album of download_queue) {
      const resp = await this.album_Downloader(album);
      if (resp.status == "✅ all correct!") {
        sucess++;
      }
    }
    console.log("📢 all queue have already complete!");
    console.log(`✅ number of successes: ${sucess}`);
    const fail = download_queue.length - sucess;
    console.log(`❌ failed download count: ${fail}`);
    console.log(`🔍 veiw comic: ${__dirname}`);
  }
  get option_show() {
    return this.data;
  }
}

module.exports = nweb_Downloader;

// test area
// 504189
