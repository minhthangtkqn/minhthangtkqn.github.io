import { DetailedLayout } from "@/component";
import { FlashcardListPanel } from "./list-panel";
import { FlashcardDetailPanel } from "./detail-panel";
import styled from "styled-components";
import { useSearchParams } from "@/util";
import { CommonUrlParam } from "@/const";
import { useEffect } from "react";

const StyledFlashcardAppLayout = styled(DetailedLayout)`
    .primary {
        overflow-x: hidden;
    }
`;

export const FlashcardAppInfo = {
    name: 'flashcard' as const,
};

export const FlashcardApp = () => {
    // getModuleList()
    // => get panel of active module
    // => => mapping to get active panel for displaying

    const { params } = useSearchParams();
    const primaryPanelKey = params.get(CommonUrlParam.primary);
    const secondaryPanelKey = params.get(CommonUrlParam.secondary);
    const extensionPanelKey = params.get(CommonUrlParam.extension);

    useEffect(() => {
        if (!primaryPanelKey && !secondaryPanelKey && !extensionPanelKey) {
            // redirect to default route
        }
    }, []);

    return (
        <StyledFlashcardAppLayout
            primarySlot={<FlashcardListPanel />}
            secondarySlot={<FlashcardDetailPanel />}
        />
    );
};
