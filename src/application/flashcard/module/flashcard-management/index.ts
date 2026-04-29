import { Module } from "@/__lib__/layout";
import {
    CollectionStudyPanel,
    CollectionStudyPanelInfo,
    CollectionListPanel,
    CollectionListPanelInfo,
    CollectionDetailPanel,
    CollectionDetailPanelInfo,
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
        panelKey: CollectionListPanelInfo.name,
        PanelComponent: CollectionListPanel,
    });
    newModule.setupPanel({
        panelKey: CollectionDetailPanelInfo.name,
        PanelComponent: CollectionDetailPanel,
    });
    newModule.setupPanel({
        panelKey: SamplePanelInfo.name,
        PanelComponent: SamplePanel,
    });
    return newModule;
};

export {
    CollectionListPanelInfo,
    CollectionDetailPanelInfo,
} from './panel';
