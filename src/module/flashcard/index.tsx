import { DetailedLayout } from "@/component";
import { FlashcardListPanel } from "./list-panel";
import { FlashcardDetailPanel } from "./detail-panel";
import styled from "styled-components";

const StyledFlashcardModuleLayout = styled(DetailedLayout)`
    .primary {
        overflow-x: hidden;
    }
`;

export const FlashcardModuleInfo = {
    name: 'flashcard' as const,
};

export const FlashcardModule = () => {
    return (
        <StyledFlashcardModuleLayout
            primarySlot={<FlashcardListPanel />}
            secondarySlot={<FlashcardDetailPanel />}
        />
    );
};
