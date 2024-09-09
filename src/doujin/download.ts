import { writeFileSync } from "fs";

import fetch from "node-fetch";

export const saveImage = async (url: string, path: string) => {
  let counter = 0;

  const download = async () => {
    try {
      if (counter > 0) {
        await new Promise((f) => setTimeout(f, 1_500));
      }

      const response = await fetch(url);
      const raw = await response.arrayBuffer();
      const buffer = Buffer.from(raw);
      writeFileSync(path, buffer);
      return false;
    } catch (error) {
      if (counter > 5) throw error;
      return true;
    }
  };

  while (await download()) {
    counter++;
  }
};
