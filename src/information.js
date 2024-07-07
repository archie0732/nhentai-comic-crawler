const axios = require("axios");
const cheerio = require("cheerio");

async function nweb_information(id = "504189", headers = {}) {
  id = id.replace("#", "");
  const url = "https://nhentai.net/g/" + id + "/";

  try {
    const res = await axios.get(url, { headers: headers });
    const $ = cheerio.load(res.data);

    const pictureURL = $("a.gallerythumb img").attr("data-src");

    if (!pictureURL) {
      return {
        title: "unknown",
        author: "unknown",
        comicId: id,
        downloadTime: downloadedTime(),
        downloadId: "unknown",
        pageCount: "unknown",
        fileFormat: "unknown",
        status: "❌ URL is undefined!",
      };
    }

    const info_data = {
      title: $("span.pretty:eq(1)").text() || id,
      author: $("div.tag-container:eq(3) span.name").eq(0).text() || "unknown",
      comicId: id,
      downloadedTime: downloadedTime(),
      downloadId: pictureURL.split("/").slice(-2, -1)[0] || "unknown",
      pageCount: $("div.thumb-container").length,
      fileFormat:
        pictureURL.substring(pictureURL.lastIndexOf(".")) || "unknown",
      status: "✅ all correct!",
    };

    return info_data;
  } catch (error) {
    return {
      title: "unknown",
      author: "unknown",
      comicId: id,
      downloadTime: downloadedTime(),
      downloadId: "unknown",
      pageCount: "unknown",
      fileFormat: "unknown",
      status: "❌ Error fetching data",
    };
  }
}
function downloadedTime() {
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

module.exports = nweb_information;
