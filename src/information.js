const cheerio = require("cheerio");
const axios = require("axios");

/**
 * Fetches and parses information from nhentai.net for a given comic ID.
 *
 * @param {string} id - The nhentai comic ID.
 * @returns {Promise<{
 *   mainTitle: string,
 *   secondTitle: string,
 *   Parodies: string[],
 *   Characters: string[],
 *   Tags: string[],
 *   Artists: string[],
 *   Groups: string[],
 *   Languages: string[],
 *   Categories: string[],
 *   Pages: string,
 *   Uploaded: string[],
 *   cover: string,
 *   favorite: string,
 *   download_key: string,
 *   fileType: string
 * }|null>} - An object containing comic information or null if an error occurs.
 *
 * The returned object has the following structure:
 * - mainTitle: The main title of the comic.
 * - secondTitle: The secondary title of the comic.
 * - Parodies: An array of parodies tags.
 * - Characters: An array of characters tags.
 * - Tags: An array of general tags.
 * - Artists: An array of artists tags.
 * - Groups: An array of groups tags.
 * - Languages: An array of languages tags.
 * - Categories: An array of categories tags.
 * - Pages: The number of pages.
 * - Uploaded: The upload date.
 * - cover: The URL of the cover image.
 * - favorite: The number of favorites.
 * - download_key: The download key extracted from the cover URL.
 */
async function getInformation(id) {
  try {
    const url = "https://nhentai.net/g/" + id.replace("#", "");
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const mainTitle = $("h1").text();
    const secondTitle = $("h2").text();

    const allTags = {
      mainTitle: mainTitle,
      secondTitle: secondTitle,
      Parodies: [],
      Characters: [],
      Tags: [],
      Artists: [],
      Groups: [],
      Languages: [],
      Categories: [],
      Pages: "",
      Uploaded: "",
      cover: "",
      favorite: "",
      download_key: "",
      fileType: "",
    };

    $("#tags .tag-container").each(function () {
      const tags = $(this)
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim()
        .replace(":", "");
      const tag = $(this)
        .find(".tags .tag")
        .map(function () {
          return $(this).find(".name").text().trim();
        })
        .get();

      allTags[tags] = tag;
    });

    const coverURL = $("#cover").find("img").attr("data-src");
    const favorite = $(".buttons")
      .find("span.nobold")
      .text()
      .replace("(", "")
      .replace(")", "");

    allTags.cover = coverURL;
    allTags.favorite = favorite;
    allTags.Pages = allTags.Pages[0];
    const regex = /galleries\/(\d+)\//;
    const temp = allTags.cover.match(regex);
    const regex2 = /\.([a-zA-Z0-9]+)$/;
    allTags.fileType = allTags.cover.match(regex2)[1];
    allTags.download_key = temp ? temp[1] : null;

    if (allTags.download_key == null) {
      console.error(`can not find this comic downlaod key --- ${id}`);
      return;
    }

    return allTags;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = getInformation;

// Test area
//getInformation("#510617").then(console.log).catch(console.error);
