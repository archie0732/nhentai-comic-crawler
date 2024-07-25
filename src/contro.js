const { alubm_downloader, comicWriteFile } = require("./downloader");
const information = require("./information");
const fs = require("fs");
const path = require("path");

/**
 * Downloads the comic from nhentai and optionally writes comic information to a JSON file.
 *
 * @param {string} id - The ID of the comic to download.
 * @param {string} savePath - The path where the comic will be saved.
 * @returns {Promise<{name: string, error_message: string[]}|null>} - A promise that resolves to an array of error reports.
 */
async function controDownload(id, savePath) {
  const error_message = [];
  const inforData = await information(id);
  try {
    if (!inforData) {
      error_message.push(`get comic information error`);
    } else {
      // Create folder path
      const emojiRegex = /[\p{Emoji}\p{Extended_Pictographic}]/gu;
      const folderName = inforData.secondTitle
        ? inforData.secondTitle
            .replace(/[/\\?%*:|"<>]/g, "")
            .replace(emojiRegex, "")
        : id;

      let folderPath = path.resolve(savePath || `./`);
      folderPath = path.join(folderPath, folderName);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      process.stdout.write(`正在下載: ${inforData.secondTitle} ⬇️\n`);

      function updateProgress(progress) {
        process.stdout.cursorTo(0);
        process.stdout.write(`目前進度: ${progress}%`);
      }

      const package = await alubm_downloader(
        inforData.download_key,
        Number(inforData.Pages),
        inforData.fileType,
        folderPath,
        updateProgress
      );

      comicWriteFile(package);
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.clearLine(0);
    }
  } catch (error) {
    error_message.push(error);
  }

  return error_message.length > 0
    ? { id: id, error_message: error_message }
    : null;
}

module.exports = { controDownload };
