const fs = require("fs");

async function downloaded(url, path, name, Headers) {
  const fetch = (await import("node-fetch")).default;
  //console.log("URL:", url);
  //console.log("File name:", name);

  let res = await fetch(url, {
    headers: Headers,
  });
  if (res.status == 404) {
    res = await fetch(url.replace("jpg", "png"), {
      headers: Headers,
    });
    if (!res.ok) {
      throw `404 on page ${name},url: ${url}`;
    }
  }
  if (res.status == 403) {
    throw `403  forbidden on page ${name},url: ${url}`;
  }
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const raw = Buffer.from(await res.arrayBuffer());

  const Dp = `${path}${name}`;

  fs.writeFileSync(Dp, raw);

  return `${name}: 下載成功`;
}

// Example usage
// Uncomment the following lines to test the function
/*
downloaded("https://i7.nhentai.net/galleries/2533645/3.jpg", "../data_save/comic/")
  .then(status => console.log("Status:", status))
  .catch(error => console.error("Error:", error));
*/

module.exports = {
  downloaded,
};
