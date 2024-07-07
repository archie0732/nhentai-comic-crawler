const downloader = require("./downloader");
const information = require("./information");

async function comic_download(ids = [], default_options = {}) {
  const options = {
    header: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0",
      ...default_options.header,
    },
    download_path: default_options.download_path || "./",
    print_downloader_result:
      default_options.print_downloader_result !== undefined
        ? default_options.print_downloader_result
        : false,
  };

  try {
    if (Array.isArray(ids) && ids.length > 0) {
      // 如果 ids 是陣列，處理每個元素
      for (const id of ids) {
        await comic_download(id, options);
      }
    } else {
      const comic_info = await information(ids, options.header);
      const download_data = await downloader(
        comic_info,
        options.download_path,
        options.header
      );
      if (options.print_downloader_result) {
        console.log(download_data);
      }
    }
  } catch (error) {
    console.error(`Error in nweb_controller: ${error.message}`);
    throw error;
  }
}

async function about_comic(
  id,
  headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0",
  }
) {
  try {
    const res = await information(id, headers);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { comic_download, about_comic };
