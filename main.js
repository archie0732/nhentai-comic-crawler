//@ts-check
const fs = require("fs");
const axios = require("axios").default;
const information = require("./work/information");
const { downloaded } = require("./work/download");
const cliProgress = require("cli-progress");
const Key = require("./work/user_login");

// list
const headers = Key.Headers;

// main
async function main() {
  let counter = 0;
  let okBook = 0;
  const downloadStatusList = [];

  const multibar = new cliProgress.MultiBar(
    {
      clearOnComplete: true,
      hideCursor: true,
      format: " {bar} | {text} | {value}/{total} | ETA: {eta_formatted}",
    },
    cliProgress.Presets.shades_grey
  );
  const strs = JSON.parse(fs.readFileSync("./data_save/list.json", "utf-8"));
  const nowTime = await information.downloadedTime();

  const bookProgress = multibar.create(strs.downloadList.length, 0, {
    text: "all download queue",
  });
  try {
    // read list.json to download
    for (let j = 0; j < strs.downloadList.length; j++) {
      let isError = 0;
      counter++;

      // new comic infor
      let curBook = {
        name: "",
        author: "",
        bookCode: strs.downloadList[j].replace("#", ""),
        comicURL:
          "https://nhentai.net/g/" + strs.downloadList[j].replace("#", ""),
        totalPage: 0,
        downloadedCode: "",
        status: [""],
        Time: nowTime,
      };

      try {
        const willdownloaddata = await information.getBasicInformation(
          curBook.bookCode,
          headers
        );
        if (willdownloaddata) {
          willdownloaddata.downloadDate = nowTime;

          curBook.Time = nowTime;
          curBook.downloadedCode = willdownloaddata.downloadCode;
          curBook.name = willdownloaddata.title;
          curBook.author = willdownloaddata.author;
          curBook.totalPage = willdownloaddata.pageCount;

          const downloadDate = await information.getDate();
          if (!fs.existsSync(`./data_save/comic/${downloadDate}`)) {
            fs.mkdirSync(`./data_save/comic/${downloadDate}`, {
              recursive: true,
            });
          }

          const invalidChars = /[\\/:*?"<>|]/g;
          let dirname = willdownloaddata.title.replace(invalidChars, "");

          if (dirname === "") {
            dirname = nowTime.replace(/-/g, "_") + `_${counter}`;
          }

          const Dpath = `./data_save/comic/${downloadDate}/${dirname}/`;

          if (!fs.existsSync(Dpath)) {
            fs.mkdirSync(Dpath, { recursive: true });
          }

          const pageProgress = multibar.create(willdownloaddata.pageCount, 0, {
            text: `now: ${dirname}`,
          });

          for (let i = 1; i <= willdownloaddata.pageCount; i++) {
            const url = `https://i.nhentai.net/galleries/${willdownloaddata.downloadCode}/${i}.jpg`;
            const name = url.split("/").pop();

            try {
              const Message = await downloaded(url, Dpath, name, headers);
            } catch (downloadedErr) {
              isError = 1;
              curBook.status.push(downloadedErr || "Unknow error");
              pageProgress.stop();
              break;
            }

            pageProgress.increment();
          }

          pageProgress.stop();
          multibar.remove(pageProgress);
        }
      } catch (error) {
        isError = 1;
        curBook.status.push(error || "Unknown error");
      }
      if (isError == 0) {
        okBook++;
      }
      curBook.status[0] =
        curBook.status.length == 1 ? "✅ correct" : "❌ error";
      downloadStatusList.push(curBook);
      bookProgress.increment();
    }
    bookProgress.stop();
  } catch (error) {
    bookProgress.stop();
    console.error(error);
  } finally {
    multibar.stop();
  }

  console.log(`排程結束，共 ${counter} 本，祝你觀賞愉快`);
  console.log(`✅ 共 ${okBook} 本下載成功!`);
  console.log(
    `❌ ${strs.downloadList.length - okBook} 本下載錯誤(缺頁或無法取得)`
  );
  /*
  console.log("日誌");
  for (const it of downloadStatusList) {
    console.log(it);
  }
  */

  const today = await information.getDate();
  const history = {
    downloadDate: today,
    list: downloadStatusList,
    "tool-maker": "archie0732",
  };
  const day = new Date();
  const dataName = day.toISOString().replace(/:/g, "").split(".")[0];

  fs.writeFileSync(
    `./data_save/report/${dataName}.json`,
    JSON.stringify(history, null, 2),
    "utf-8"
  );

  console.log("🔍 查看下載日誌: " + `./data_save/report/${dataName}.json`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("😅未捕獲的錯誤:", error);
    process.exit(1);
  });
