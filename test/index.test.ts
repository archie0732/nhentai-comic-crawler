import { artistAPI } from "../src/artist/artistAPI";
import { searchKeyword } from "../src/artist/getArtistId";
import { searchAPI } from "../src/search/searchAPI";

describe("serachAPI", () => {
  it("it will return doujin's media id in list at index 0 when search keyword", async () => {
    expect((await searchAPI("yan-yam")).lastDojin.media_id).toBe("3045118");
  });

  test("it will return dojin's media id in list in index 0 when search artist", async () => {
    expect((await artistAPI("2751")).lastDojin.media_id).toBe("2828349");
  });

  test("it will return the artist id who in nweb", async () => {
    expect(await searchKeyword("hiten")).toBe("28235");
  });

  test("it will throw 404 when search artist id", async () => {
    await expect(searchKeyword("jasodjoposd")).rejects.toThrow("search artist id error: 404");
  });
});
