import { Module } from "@/__lib__/layout";
import { FlashcardDetailPanel, FlashcardDetailPanelInfo, FlashcardListPanel, FlashcardListPanelInfo } from "./panel";

export const FlashcardListingModuleInfo = {
    name: 'flashcard-listing' as const,
};
export const setupFlashcardListingModule = () => {
    const newModule = new Module(FlashcardListingModuleInfo.name);
    newModule.setupPanel({
        panelKey: FlashcardListPanelInfo.name,
        PanelComponent: FlashcardListPanel,
    });
    newModule.setupPanel({
        panelKey: FlashcardDetailPanelInfo.name,
        PanelComponent: FlashcardDetailPanel,
    });
    return newModule;
};

export {
    FlashcardListPanelInfo,
    FlashcardDetailPanelInfo,
} from './panel';
