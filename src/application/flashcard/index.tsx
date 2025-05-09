import { DetailedLayout, LayoutPanelSlot, ModuleManager, ModuleParamKey, PanelRegistry } from "@/__lib__/layout";
import styled from "styled-components";
import { useSearchParams } from "@/util";
import { useEffect, useState } from "react";
import { FlashcardManagementModuleInfo, setupFlashcardListingModule, FlashcardListPanelInfo, FlashcardDetailPanelInfo } from "./module";

const StyledFlashcardAppLayout = styled(DetailedLayout)`
    .primary {
        overflow-x: hidden;
    }
`;

export const FlashcardAppInfo = {
    name: 'flashcard' as const,
};

export const FlashcardApp = () => {
    const { params, updateSearchParams } = useSearchParams();
    const moduleKey = params.get(ModuleParamKey) ?? '';
    const primaryPanelKey = params.get(LayoutPanelSlot.PRIMARY) ?? '';
    const secondaryPanelKey = params.get(LayoutPanelSlot.SECONDARY) ?? '';
    const extensionPanelKey = params.get(LayoutPanelSlot.EXTENSION) ?? '';

    const [primaryPanel, setPrimaryPanel] = useState<PanelRegistry>();
    const [secondaryPanel, setSecondaryPanel] = useState<PanelRegistry>();
    const [extensionPanel, setExtensionPanel] = useState<PanelRegistry>();

    // cần đảm bảo các module được setup vào ModuleManager ngay từ đầu để lượt render đầu tiên có thể truy cập danh sách module & panel
    useEffect(() => {
        const moduleManager = ModuleManager.getModuleManager();
        // import & setup modules & panels
        moduleManager.setupModule(FlashcardManagementModuleInfo.name, setupFlashcardListingModule());

        const hasModuleKey = !!moduleKey;
        const hasPanelKey = primaryPanelKey || secondaryPanelKey || extensionPanelKey;

        if (!hasModuleKey || !hasPanelKey) {
            updateSearchParams(prev => {
                if (!hasModuleKey) {
                    prev.set(ModuleParamKey, FlashcardManagementModuleInfo.name);
                }
                if (!hasPanelKey) {
                    prev.set(LayoutPanelSlot.PRIMARY, FlashcardListPanelInfo.name);
                    prev.set(LayoutPanelSlot.SECONDARY, FlashcardDetailPanelInfo.name);
                    prev.delete(LayoutPanelSlot.EXTENSION);
                }
                return prev;
            });
        } else {
            // mapping module & panel key to get Component for displaying
            const moduleRegistry = moduleManager.getModule(moduleKey);
            setPrimaryPanel(moduleRegistry?.getPanel(primaryPanelKey));
            setSecondaryPanel(moduleRegistry?.getPanel(secondaryPanelKey));
            setExtensionPanel(moduleRegistry?.getPanel(extensionPanelKey));
        }
    }, [moduleKey, primaryPanelKey, secondaryPanelKey, extensionPanelKey]);

    return (
        <StyledFlashcardAppLayout
            PrimaryComponent={primaryPanel?.Component}
            SecondaryComponent={secondaryPanel?.Component}
            ExtensionComponent={extensionPanel?.Component}
        />
    );
};
