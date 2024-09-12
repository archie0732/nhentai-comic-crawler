import { artistAPI, searchKeyword } from "../src/artist";

artistAPI("yan-yam").then((r) => console.log(r.lastDojin["id"]));
