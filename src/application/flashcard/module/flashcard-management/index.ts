import { Module } from "@/__lib__/layout";
import {
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
    FlashcardCollectionListPanelInfo,
    FlashcardCollectionDetailPanelInfo,
} from './panel';
