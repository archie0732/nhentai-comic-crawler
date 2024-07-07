const axios = require("axios");
const cheerio = require("cheerio");
const nweb_Information = require("./information");
const fs = require("fs");
let header =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0";

async function download_One_Page(now_url, now_path) {
  try {
    const res = await fetch(now_url, { headers: { "User-Agent": header } });

    if (!res.ok) {
      throw new Error(`${res.status} not found page: ${now_url}`);
    }

    const raw = await res.arrayBuffer();
    const Dp = `${now_path}`;

    fs.writeFileSync(Dp, Buffer.from(raw));

    return "ok";
  } catch (error) {
    throw new Error(`Error downloading page: ${now_url} - ${error.message}`);
  }
}

async function album_Downloader(
  infor = { title: "", downloadId: "", status: "" },
  path = "./",
  input_header = ""
) {
  header = input_header;
  //get infor
  console.log(`🎈 now download: ${infor.title}`);
  if (infor.status === "✅ all correct!") {
    // update now path
    const invalidChars = /[\\/:*?"<>|]/g;
    const nowPath = path + infor.title.replace(invalidChars, "");
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
        const temp = await download_One_Page(NowDownloadUrl, NowName);
        console.log(`🚩已完成: ${i}.jpg ，共 ${infor.pageCount} 頁`);
      } catch (error) {
        infor.status = "❌ error happen in downloading page!";
        if (!infor["error-on"]) {
          infor["error-on"] = [];
        }
        infor["error-on"].push(error);
        console.log(error);
      }
    }
    if (infor.status == "✅ all correct!") {
      console.log(`🔽 下載完成: ${path}${infor.title}/`);
    } else {
      console.log(`🔽 下載失敗: ${path}${infor.title}`);
    }
    //console.log(infor);
    return infor;
  } else {
    console.log(infor.status);
    return infor;
  }
}
/*
async function test() {
  const a = await nweb_Information("#504189", header);
  const c = await album_Downloader(a);
  console.log(c);
}

test();
*/
module.exports = album_Downloader;
