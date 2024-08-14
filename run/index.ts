import { readFileSync } from "fs";
import { archieDownload } from "../src";

type List = {
  path: string;
  data: string[] | number[];
};

const localData: List = JSON.parse(readFileSync("./res/downloadQueue.json", "utf-8"));

await archieDownload(localData.data, localData.path);
