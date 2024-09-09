import fetch from "node-fetch";

import { Doujin } from "@/doujin/";
import { searchKeyword } from "./getArtistId";

export class ArtistList {
  doujinList: Doujin[];

  lastDojin: Doujin;

  constructor(data: Record<string, any>) {
    this.doujinList = data["result"];
    this.lastDojin = data["result"][0];
  }
}

export const artistAPI = async (artistId: string) => {
  let id = Number(artistId);

  if (isNaN(id)) id = Number(await searchKeyword(artistId));

  const url = `https://nhentai.net/api/galleries/tagged?tag_id=${artistId}`;

  const resp = await fetch(url);
  if (!resp.ok) throw `https error, code: ${resp.status}`;

  const json = (await resp.json()) as Record<string, any>;

  return new ArtistList(json);
};
