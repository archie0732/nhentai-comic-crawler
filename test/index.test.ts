import { fetchSearch } from "@/search/searchAPI";

describe("serachAPI", () => {
  it("return doujin list index 0's meadia id", async () => {
    expect((await fetchSearch("yan-yam")).lastDojin.media_id).toBe("3045118");
  });

  it("i donnot know", () => {
    expect(/\d/.test("999999")).toBe(true);
  });

  it("i donnot know 2", () => {
    expect(/^\d+$/.test("hshadhh")).toBe(false);
  });

  it("i donnot know 3", () => {
    expect(/^\d+$/.test("hudshakhd0")).toBe(false);
  });
});
