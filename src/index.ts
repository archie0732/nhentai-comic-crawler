import { fetchDoujin } from "./information";
import ora from "ora";
import chalk from "chalk";

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
export async function download(
  alubm_id: string | number | (string | number)[],
  path: string
) {
  const ids = Array.isArray(alubm_id) ? alubm_id : [alubm_id];

  if (
    !ids.every(
      (id) =>
        (typeof id == "number" &&
          Number.isInteger(id) &&
          Number.isFinite(id)) ||
        (typeof id == "string" && /^\d+$/.test(id))
    )
  ) {
    throw "ID 列表包含非法字元";
  }

  for (let i = 0; i < ids.length; i++) {
    try {
      const doujin = await fetchDoujin(ids[i]);

      await doujin.download(path);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`${error.message}`);
      }
    }
  }

  console.log(`下載完成`);
}
