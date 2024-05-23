const path = require("path");
const fs = require("fs");

const Information = require("./information");

Headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0",
  Cookie:
    "cf_clearance=7qg8u0x3Rtl2fE9kg3pwMs8j9xcFhtfYz9WVbAKI7EM-1716114078-1.0.1.1-HgzfZLttZhJiQ1ZWIr5HndOBYC4BsZL.YXVY0dFJpc.LrevcPG_fypyCrL5WmOUPKxlU0VSwhKnegcGISAAG3g; csrftoken=wuidmMHemEtV2YKk3m55hL2mfAMvIkSP2Mqnc9YM9eRHSEBhR2BDykFVvDnTqIId",
};

async function write(data, nowdate) {
  console.log(data);

  data.downloadDate = nowdate;

  const filePath = path.join(
    __dirname,
    "../data_save/util/downloadHistory.json"
  );
  const downloadList = fs.readFileSync(filePath, "utf-8");

  const str = JSON.parse(downloadList);

  data.theNum = str.downloadHistory.length;
  str.downloadHistory.push(data);
  fs.writeFileSync(filePath, JSON.stringify(str, null, 2), "utf-8");

  console.log(data);

  return data;
}

async function test() {
  const a = await Information.getBasicInformation("452371");
  const sssss = write(a);
  //console.log(sssss);
}

module.exports = {
  write,
};

//test();
