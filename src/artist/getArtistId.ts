import axios from "axios";
import { load } from "cheerio";

export const searchKeyword = async (artistName: string) => {
  const url = `https://nhentai.net/artist/${artistName}/`;

  const res = await axios.get(url);

  if (res.status != 200)
    throw new Error(`search artist id error: ${res.status}`);

  const $ = load(await res.data);

  return $("h1 a").attr("class")?.split("-")[1].trim();
};
