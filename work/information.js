const fs = require("fs");
const axios = require("axios").default;
const cheerio = require("cheerio");

//https://nhentai.net/g/452371/
//downloaded("https://i7.nhentai.net/galleries/2533645/3.jpg");
//getpage(urlCode);

function getpage(urlCode, page) {
  const url =
    "https://i.nhentai.net/galleries/" + urlCode + "/" + page + ".jpg";
  return url;
}

// test area: const urlCode = 2533645;

async function getBasicInformation(code, Headers) {
  const url = "https://nhentai.net/g/" + code + "/";

  const res = await axios.get(url, { headers: Headers });

  if (res.status != 200) {
    throw "fetch error";
  }
  const $ = cheerio.load(res.data);
  // title
  const title = $("span.pretty:eq(1)").text();
  //console.log(title);
  //author
  const author = $("div.tag-container:eq(3) span.name").eq(0).text();
  //console.log(author);

  const pictureURL = $("a.gallerythumb img").attr("data-src");

  if (pictureURL == undefined) {
    throw "URL not found";
  }

  //https://t3.nhentai.net/galleries/2533645/1t.jpg
  const galleryID = pictureURL.split("/").slice(-2, -1)[0];
  //console.log(galleryID);

  // page
  const pagenum = $("div.thumb-container").length;
  const data = {
    title: title,
    author: author,
    comicCode: code,
    downloadDate: "",
    downloadCode: galleryID,
    pageCount: pagenum,
  };

  //console.log(data);

  return data;
}

async function downloadedTime() {
  const today = new Date();

  const hr = today.getHours();
  const min = today.getMinutes();
  const second = today.getSeconds();

  const nowTime = hr + ":" + min + ":" + second;

  //console.log(nowTime);

  return nowTime;
}

async function getDate() {
  const today = new Date();

  const date = today.getDate();
  const mon = today.getMonth() + 1;
  const year = today.getFullYear();

  const nowDate = year + "-" + mon + "-" + date;

  return nowDate;
}

/* test area  */
//452371

//getBasicInformation("452371");
downloadedTime();
module.exports = {
  getpage,
  getBasicInformation,
  downloadedTime,
  getDate,
};
