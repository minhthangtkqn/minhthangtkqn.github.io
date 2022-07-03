export type Card = {
    id: any;
    word: string;
    description: string;
};

export type Folder = {
    id: any;
    name: string;
    cards: Card[];
};