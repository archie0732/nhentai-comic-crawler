import { artistAPI } from "../src/artist/artistAPI";
import { searchKeyword } from "../src/artist/getArtistId";
import { searchAPI } from "../src/search/searchAPI";

describe("serachAPI", () => {
  it("1. it will return doujin's media id in list at index 0 when search keyword", async () => {
    expect((await searchAPI("yan-yam")).lastDojin.media_id).toBe("3053879");
  });

  test("2. it will get artist's last doujin", async () => {
    expect((await artistAPI("yan-yam")).lastDojin["id"]).toBe(529628);
  });

  test("3. it will return dojin's media id in list in index 0 when search artist", async () => {
    expect((await artistAPI("2751")).lastDojin.media_id).toBe("3053879");
  });

  test("4. it will return the artist id who in n web", async () => {
    expect(await searchKeyword("hiten")).toBe("28235");
  });

  test("5. it will throw 404 when search invail artist id", async () => {
    await expect(searchKeyword("jasodjoposd")).rejects.toThrow(
      "Request failed with status code 404"
    );
  });
});
