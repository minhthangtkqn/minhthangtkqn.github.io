export type Flashcard = {
    _id: string;
    collection_id: string;
    title: string;
    description: string;
    front_type: string;
    front_value: string;
    back_type: string;
    back_value: string;
};
export type FlashcardCollection = {
    _id: string;
    title: string;
    description: string;
    total_card: number;
};

export const REFRESH_FLASHCARD_KEY = 'REFRESH_FLASHCARD_KEY';
export const REFRESH_FLASHCARD_COLLECTION_KEY = 'REFRESH_FLASHCARD_COLLECTION_KEY';
