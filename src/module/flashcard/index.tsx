import { BaseLayout } from "@/component";

export const FlashcardModuleInfo = {
    name: 'flashcard',
};

export const FlashcardModule = () => {
    return (
        <BaseLayout
            primarySlot={'Flashcard - Primary panel'}
            secondarySlot={'Flashcard - Secondary panel'}
        />
    );
};
