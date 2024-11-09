import { doujinAPI } from "./doujin";
import { Doujin } from "./doujin";
declare const _default: {
    artistAPI: (artistId: string) => Promise<import("./artist").ArtistList>;
    doujinAPI: typeof doujinAPI;
    searchAPI: (keyword: string) => Promise<import("./search").SearchList>;
    dl: (album: number | string | Array<string>, dlPath?: string) => Promise<void>;
    Doujin: typeof Doujin;
};
export default _default;
