const axios = require("axios").default;
const fs = require("fs");
const { downloaded } = require("./work/download");
const headers = require("./work/user_login");
const list = [
  {
    downloadedCode: "1066366",
    totalPage: 22,
  },
];

async function main() {
  for (const it of list) {
    try {
      const url = `https://i.nhentai.net/galleries/${it.downloadedCode}`;

      for (let i = 1; i <= it.totalPage; i++) {
        try {
          const m = await downloaded(url + `/${i}.png`, "");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {}
  }
}
