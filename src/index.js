const path = require("path");
const { controDownload } = require("./contro");
const fs = require("fs");

/**
 *
 * @param {string | string[]} id
 * @param {object} option
 * @param {string} option.path
 * @param {boolean} option.reports
 */
async function downlaod(id, option) {
  const ids = Array.isArray(id) ? id : [id];

  const downlaod_report = [];
  let failNum = 0;
  for (let i = 0; i < ids.length; i++) {
    process.stdout.write(`下載進度 ${i + 1}/${ids.length}\n`);
    const res = await controDownload(ids[i], option.path);
    if (res) {
      failNum++;
      downlaod_report.push(res);
    }
    process.stdout.moveCursor(0, -1);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
  }

  console.log(`所有進度都已下載完成，共有${failNum}/${ids.length}個下載錯誤`);

  if (downlaod_report && option.reports && downlaod_report.length) {
    const filePath = path.join(option.path, `report.json`);
    fs.writeFileSync(filePath, JSON.stringify(downlaod, null, 2), "utf-8");
    console.log(`可以查看下載報告: ${filePath}`);
  } else if (option.reports) {
    console.log(`下載漫畫時未發現任何問題，故沒有錯誤報告`);
  }
}

downlaod("#298472", { path: "./comic", reports: true });
