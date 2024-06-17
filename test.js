const nweb_Downloader = require("./src/index");

option = {
  path: "./comic_test/",
};

const a = new nweb_Downloader(option);
a.album_Downloader("504189");
