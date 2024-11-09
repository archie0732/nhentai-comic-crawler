export interface archieHistory {
    username: string;
    lastDate: string;
    "list-count": number;
    list: archieList[];
}
export interface archieList {
    title: string;
    id: string;
    date: string;
}
