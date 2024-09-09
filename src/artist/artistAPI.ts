import fetch from "node-fetch";

import { Doujin } from "@/doujin/";

export class ArtistList {
  doujinList: Doujin[];

  lastDojin: Doujin;

  constructor(data: Record<string, any>) {
    this.doujinList = data["result"];
    this.lastDojin = data["result"][0];
  }
}

export const fetchArtistAPI = async (artistId: string) => {
  if (!/[^\d+$]/.test(artistId)) throw new Error("artist id error");

  const url = `https://nhentai.net/api/artist/${artistId}`;

  const resp = await fetch(url);
  if (!resp.ok) throw `http error, code: ${resp.status}`;

  const json = (await resp.json()) as Record<string, any>;

  return new ArtistList(json);
};
