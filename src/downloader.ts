import { writeFileSync } from "fs";
import { join } from "path";
import { DefaultHeader } from "./information";

import axios from "axios";

export const saveImage = async (url: string, path: string) => {
  let counter = 0;

  const download = async () => {
    try {
      if (counter > 0) {
        await new Promise((f) => setTimeout(f, 1_500));
      }

      const response = await axios.get(url);

      writeFileSync(path, response.data);
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
