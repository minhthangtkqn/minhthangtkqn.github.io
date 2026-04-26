import { Module } from "@/__lib__/layout";
import {
    FlashcardDetailPanel,
    FlashcardDetailPanelInfo,
    FlashcardListPanel,
    FlashcardListPanelInfo,
    FlashcardCollectionListPanel,
    FlashcardCollectionListPanelInfo,
    FlashcardCollectionDetailPanel,
    FlashcardCollectionDetailPanelInfo,
} from "./panel";

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
    newModule.setupPanel({
        panelKey: FlashcardCollectionListPanelInfo.name,
        PanelComponent: FlashcardCollectionListPanel,
    });
    newModule.setupPanel({
        panelKey: FlashcardCollectionDetailPanelInfo.name,
        PanelComponent: FlashcardCollectionDetailPanel,
    });
    return newModule;
};

export {
    FlashcardListPanelInfo,
    FlashcardDetailPanelInfo,
    FlashcardCollectionListPanelInfo,
    FlashcardCollectionDetailPanelInfo,
} from './panel';
