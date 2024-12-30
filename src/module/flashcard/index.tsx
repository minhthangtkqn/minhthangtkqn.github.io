import { DetailedLayout } from "@/component";
import { FlashcardListPanel } from "./list-panel";
import { FlashcardDetailPanel } from "./detail-panel";

export const FlashcardModuleInfo = {
    name: 'flashcard' as const,
};

export const FlashcardModule = () => {
    return (
        <DetailedLayout
            primarySlot={<FlashcardListPanel />}
            secondarySlot={<FlashcardDetailPanel />}
        />
    );
};
