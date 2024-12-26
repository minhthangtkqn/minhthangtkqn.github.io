import { BaseLayout } from "@/component";
import { FlashcardCategoryListPanel } from "./category-list-panel";
import { FlashcardDetailPanel } from "./detail-panel";

export const FlashcardModuleInfo = {
    name: 'flashcard',
};

export const FlashcardModule = () => {
    return (
        <BaseLayout
            primarySlot={<FlashcardCategoryListPanel />}
            secondarySlot={<FlashcardDetailPanel />}
        />
    );
};
