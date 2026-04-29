import { Module } from "@/__lib__/layout";
import {
    CollectionStudyPanel,
    CollectionStudyPanelInfo,
    FlashcardCollectionListPanel,
    FlashcardCollectionListPanelInfo,
    FlashcardCollectionDetailPanel,
    FlashcardCollectionDetailPanelInfo,
    SamplePanel,
    SamplePanelInfo,
} from "./panel";

export const FlashcardManagementModuleInfo = {
    name: 'flashcard-management' as const,
};
export const setupFlashcardListingModule = () => {
    const newModule = new Module(FlashcardManagementModuleInfo.name);
    newModule.setupPanel({
        panelKey: CollectionStudyPanelInfo.name,
        PanelComponent: CollectionStudyPanel,
    });
    newModule.setupPanel({
        panelKey: FlashcardCollectionListPanelInfo.name,
        PanelComponent: FlashcardCollectionListPanel,
    });
    newModule.setupPanel({
        panelKey: FlashcardCollectionDetailPanelInfo.name,
        PanelComponent: FlashcardCollectionDetailPanel,
    });
    newModule.setupPanel({
        panelKey: SamplePanelInfo.name,
        PanelComponent: SamplePanel,
    });
    return newModule;
};

export {
    FlashcardCollectionListPanelInfo,
    FlashcardCollectionDetailPanelInfo,
} from './panel';
