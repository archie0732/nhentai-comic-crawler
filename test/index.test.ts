import { download } from "../src";

describe("download()",() => {
  it("should error illegal id list", async () => {
    await expect(download(["asdf"], "")).rejects.toThrow();
  });
  it("should download doujins", async () => {
    await expect(download(["500451"], "comics")).resolves.toBeUndefined();
  });
})
