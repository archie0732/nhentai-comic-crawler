import { readFileSync } from "fs";
import { fetchDoujin } from "./information";
import { archieHistory } from "../type/archieHistory";

/**
 * Downloads the comic from nhentai and optionally writes comic information to a JSON file.
 *
 * @param {string} alubm_id - The ID of the comic to download.
 * @param {object} option
 * @param {string} option.path
 * @param {boolean} option.error_reports
 * @param {boolean} option.dl_record
 * @param {string} option.dl_record_path
 */
export async function archieDownload(alubm_id: string | number | (string | number)[], path: string) {
  const ids = Array.isArray(alubm_id) ? alubm_id : [alubm_id];

  ids.forEach((val, index) => {
    if (typeof val === "string") {
      ids[index] = val.replace("#", "");
    }
  });

  if (
    !ids.every(
      (id) =>
        (typeof id == "number" && Number.isInteger(id) && Number.isFinite(id)) ||
        (typeof id == "string" && /^\d+$/.test(id))
    )
  ) {
    throw "ID 列表包含非法字元";
  }

  console.log(`🔍 預計下載 共計${ids.length}本`);
  let fail = 0;

  for (let i = 0; i < ids.length; i++) {
    try {
      const doujin = await fetchDoujin(ids[i]);

      const localData: archieHistory = JSON.parse(readFileSync("./res/history.json", "utf-8"));

      if (localData.list.some((item) => item.title === doujin.title.pretty)) {
        throw new Error(`❌ 重複下載 - ${doujin.title.pretty}`);
      } else await doujin.download(path);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`${error.message}`);
      }
      fail++;
    }
  }

  console.log(`👾 全部庁列下載完成 ${fail}/${ids.length}本失敗，祝您看漫愉快`);
}
