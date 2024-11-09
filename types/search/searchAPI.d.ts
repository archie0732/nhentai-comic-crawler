import { Doujin } from "../doujin/";
export declare class SearchList {
    doujinList: Doujin[];
    lastDojin: Doujin;
    constructor(data: Record<string, any>);
}
export declare const searchAPI: (keyword: string) => Promise<SearchList>;
