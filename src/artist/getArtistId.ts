import fetch from "node-fetch";

import { load } from "cheerio";

export const searchKeyword = async (artistName: string) => {
  const url = `https://nhentai.net/artist/${artistName}/`;

  const res = await fetch(url);

  if (!res.ok) throw new Error(`search artist id error: ${res.status}`);

  const $ = load(await res.text());

  return $("h1 a").attr("class")?.split("-")[1].trim();
};
