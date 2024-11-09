import { doujinAPI } from "../doujin";
import { existsSync, readFileSync } from "fs";

import chalk from "chalk";

import type { archieList } from "@/localSave/a7history";

export const dl = async (
  album: number | string | Array<string>,
  dlPath: string = "./"
) => {
  let albums: Array<string> = [];

  console.log("🔍 取得本地下載紀錄....");
  const map = loadHistory();

  if (Array.isArray(album)) albums = album;
  else if (typeof album === "string") albums.push(album);
  else if (typeof album === "number") albums.push(album.toString());
  else
    throw new Error(
      "album type is error, only string, number, array can do it"
    );

  let errFlag = 0;
  console.log(`🕛 預計下載: ${albums.length} 本`);

  for (let i = 0; i < albums.length; i++) {
    albums[i] = albums[i].replace("#", "");

    if (isNaN(Number(albums[i])))
      throw new Error("you doujin id have invild character");

    try {
      const doujin = await doujinAPI(albums[i]);

      if (!checkDl(doujin.title.pretty, doujin.id.toString(), map)) {
        console.error(
          `${i + 1}. ❌ ${chalk.yellow(doujin.id)} ${doujin.title.pretty}` +
            chalk.red(" - 重複下載")
        );
        errFlag++;
      } else {
        await doujin.download(dlPath, (i + 1).toString());
      }
    } catch (error) {
      errFlag++;
    }
  }
  if (errFlag)
    console.log(`🎉 全部下載完成，共 ${errFlag}/${albums.length} 本失敗`);
  else console.log("`🎉 全部下載完成，未發現任何錯誤");
};

const checkDl = (
  title: string,
  id: string,
  local: Map<string, archieList> | null
) => {
  if (!local) return true;

  if (local.has(title) || local.has(id)) return false;

  return true;
};

const loadHistory = () => {
  const path = "./res/history.json";
  if (!existsSync(path)) {
    console.error("can not find the history.json");
    return null;
  }

  const data = JSON.parse(readFileSync(path, "utf-8"));

  const map = new Map<string, archieList>();

  data["list"].forEach((element: archieList) => {
    map.set(element.title, element);
    map.set(element.id, element);
  });

  return map;
};
