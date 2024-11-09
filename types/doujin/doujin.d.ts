export declare const DefaultHeader: {
    readonly "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0";
};
declare enum ImageFormat {
    Png = "p",
    Jpg = "j",
    Gif = "g"
}
declare enum TagType {
    Tag = "tag",
    Category = "category",
    Language = "language",
    Artist = "artist",
    Parody = "parody",
    Character = "character"
}
type Image = {
    t: ImageFormat;
    w: number;
    h: number;
};
type Tag = {
    id: number;
    type: TagType;
    name: string;
    url: string;
    count: number;
};
export declare class Doujin {
    id: number;
    media_id: string;
    title: {
        english: string;
        japanese: string;
        pretty: string;
    };
    images: {
        pages: Image[];
        cover: Image;
        thumbnail: Image;
    };
    /** 掃描的人 */
    scanlator: string;
    upload_date: number;
    tags: Tag[];
    num_pages: number;
    num_favorites: number;
    constructor(data: Record<string, any>);
    download(targetPath: string, counter?: string, history?: boolean): Promise<void>;
}
/**
 * Fetches and parses information from nhentai.net for a given comic ID.
 *
 * @param {string} id - The nhentai comic ID.
 * @returns {Promise<Doujin>} - An object containing doujin information.
 */
export declare function doujinAPI(id: string | number): Promise<Doujin>;
export {};
