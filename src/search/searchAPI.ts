import fetch from "node-fetch";

import { Doujin } from "../doujin/";

export class SearchList {
  doujinList: Doujin[];

  lastDojin: Doujin;

  constructor(data: Record<string, any>) {
    this.doujinList = data["result"];
    this.lastDojin = data["result"][0];
  }
}

export const searchAPI = async (keyword: string) => {
  const url = `https://nhentai.net/api/galleries/search?query=${keyword}`;

  const resp = await fetch(url);
  if (!resp.ok) throw `http error, code: ${resp.status}`;
  const json = (await resp.json()) as Record<string, any>;

  return new SearchList(json);
};
