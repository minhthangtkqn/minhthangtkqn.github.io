export type FlashCard = {
    id: any;
    name: string;
    description: string;
};

export type Folder = {
    id: any;
    name: string;
    cards: FlashCard[];
};