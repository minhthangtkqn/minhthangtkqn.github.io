import { BaseLayout } from "@/component";
import { FlashcardListPanel } from "./list-panel";
import { FlashcardDetailPanel } from "./detail-panel";

export const FlashcardModuleInfo = {
    name: 'flashcard',
};

export const FlashcardModule = () => {
    return (
        <BaseLayout
            primarySlot={<FlashcardListPanel />}
            secondarySlot={<FlashcardDetailPanel />}
        />
    );
};
