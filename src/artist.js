const axios = require("axios").default;
const cheerio = require("cheerio");

/**
 * Fetches the last book of the specified artist from nhentai and logs the image URLs.
 *
 * @param {string} artistName - The name of the artist to fetch the last book for.
 * @param {Object} header - The headers to include in the request.
 * @returns {Promise<Object|null>} - An object containing book details or null if an error occurs.
 *
 * @description This function makes a GET request to nhentai.net to fetch the last book for the given artist using the specified headers.
 */
async function getLastBook(artistName = "", header) {
  const url = "https://nhentai.net/artist/" + artistName;

  try {
    const res = await axios.get(url, { headers: header });
    const $ = cheerio.load(res.data);

    const lastBookElement = $(".gallery").first();

    if (!lastBookElement.length) {
      throw new Error("No gallery elements found.");
    }

    const lastBookName = lastBookElement.find(".caption").text();
    const lastBookHref = lastBookElement.find("a").attr("href");
    const lastBookId = lastBookHref ? lastBookHref.split("/")[2] : null;
    const imgURL =
      lastBookElement.find("img").attr("data-src") ||
      lastBookElement.find("img").attr("src");

    return {
      bookTitle: lastBookName,
      bookId: lastBookId,
      bookCover: imgURL,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

module.exports = { getLastBook };

// Example usage
getLastBook("tsumiki", {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0",
}).then((result) => {
  if (result) {
    console.log(result);
  } else {
    console.log("Failed to fetch the last book.");
  }
});
