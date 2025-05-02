import { DetailedLayout } from "@/component";
import { FlashcardListPanel } from "./list-panel";
import { FlashcardDetailPanel } from "./detail-panel";
import styled from "styled-components";

const StyledFlashcardAppLayout = styled(DetailedLayout)`
    .primary {
        overflow-x: hidden;
    }
`;

export const FlashcardAppInfo = {
    name: 'flashcard' as const,
};

export const FlashcardApp = () => {
    return (
        <StyledFlashcardAppLayout
            primarySlot={<FlashcardListPanel />}
            secondarySlot={<FlashcardDetailPanel />}
        />
    );
};
