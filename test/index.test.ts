import { archieDownload } from "../src";

describe("download()", () => {
  it("should error illegal id list", async () => {
    await expect(archieDownload(["asdf"], "")).rejects.toThrow();
  });
  it("should download doujins", async () => {
    await expect(archieDownload(["500451"], "comics")).resolves.toBeUndefined();
  });
});
