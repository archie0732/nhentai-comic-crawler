import { Doujin } from "../doujin/";
export declare class ArtistList {
    doujinList: Doujin[];
    lastDojin: Doujin;
    constructor(data: Record<string, any>);
}
export declare const artistAPI: (artistId: string) => Promise<ArtistList>;
