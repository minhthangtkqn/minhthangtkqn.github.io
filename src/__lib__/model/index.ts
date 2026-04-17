export type Flashcard = {
    _id: string;
    title: string;
    description: string;
    front_type: string;
    front_value: string;
    back_type: string;
    back_value: string;
};

export const REFRESH_FLASHCARD_KEY = 'REFRESH_FLASHCARD_KEY';
