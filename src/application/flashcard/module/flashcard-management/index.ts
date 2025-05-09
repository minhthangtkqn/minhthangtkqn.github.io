import { Module } from "@/__lib__/layout";
import { FlashcardDetailPanel, FlashcardDetailPanelInfo, FlashcardListPanel, FlashcardListPanelInfo } from "./panel";

export const FlashcardManagementModuleInfo = {
    name: 'flashcard-management' as const,
};
export const setupFlashcardListingModule = () => {
    const newModule = new Module(FlashcardManagementModuleInfo.name);
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
