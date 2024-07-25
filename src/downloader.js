// downloader.js
const fs = require("fs");
const path = require("path");
const axios = require("axios").default;

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
};

/**
 * Downloads images from nhentai and returns an array of objects containing file paths and buffers.
 *
 * @param {string} download_key - The key used for constructing the image URLs.
 * @param {number} pages - The number of pages to download.
 * @param {string} fileType - The file extension for the images (e.g., 'jpg', 'png').
 * @param {string} directory - The directory where the images will be saved.
 * @param {function} updateProgress - A function to update the progress.
 * @returns {Promise<{path: string, buffer: Buffer}[]>} - A promise that resolves to an array of objects containing file paths and buffers.
 */
async function alubm_downloader(
  download_key,
  pages,
  fileType,
  directory,
  updateProgress
) {
  const package = [];
  for (let i = 1; i <= pages; i++) {
    try {
      let url = `https://i5.nhentai.net/galleries/${download_key}/${i}.${fileType}`;
      const res = await axios.get(url, {
        headers: headers,
        responseType: "arraybuffer",
      });
      package.push({
        path: path.join(directory, `${i}.${fileType}`),
        buffer: res.data,
      });
    } catch (error) {
      const anthorType = fileType === "jpg" ? "png" : "jpg";
      try {
        let url = `https://i5.nhentai.net/galleries/${download_key}/${i}.${anthorType}`;
        const res = await axios.get(url, {
          headers: headers,
          responseType: "arraybuffer",
        });
        package.push({
          path: path.join(directory, `${i}.${anthorType}`),
          buffer: res.data,
        });
      } catch (error) {
        throw new Error(`Download error for ${url}: ${error.message}`);
      }
    }
    // Call the progress update function
    if (updateProgress) {
      updateProgress(((i / pages) * 100).toFixed(2));
    }
  }
  return package;
}

function comicWriteFile(files) {
  files.forEach(({ path, buffer }) => {
    try {
      fs.writeFileSync(path, buffer);
    } catch (error) {
      throw new Error(`error happen when writing file ${path}`);
    }
  });
}

module.exports = {
  comicWriteFile,
  alubm_downloader,
};
